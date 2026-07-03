from datetime import datetime
from database.history_model import Activity
from database.auth import verify_password
from database.database import SessionLocal
from database.models import User
from database.auth import hash_password
from database.database import engine
from database.models import Base
from agents.future_simulator_agent import FutureSimulatorAgent
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from pypdf import PdfReader

import pandas as pd
import chromadb
import os

from llm.groq_client import GroqClient

from agents.rag_agent import RAGAgent
from agents.risk_agent import RiskAgent
from agents.recommendation_agent import RecommendationAgent
from agents.report_agent import ReportAgent

app = FastAPI()

Base.metadata.create_all(bind=engine)

# =====================================
# CORS
# =====================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================
# LLM & Agent Initialization
# =====================================

llm = GroqClient()

risk_agent = RiskAgent(llm)

recommendation_agent = RecommendationAgent(llm)

report_agent = ReportAgent(llm)

rag_agent = RAGAgent(llm)

future_simulator_agent = FutureSimulatorAgent(llm)

# =====================================
# ChromaDB
# =====================================

client = chromadb.PersistentClient(
    path="./vectorstore/chroma_db"
)

collection = client.get_or_create_collection(
    name="insurance_docs"
)

# =====================================
# Upload Folder
# =====================================

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)

# =====================================
# Home
# =====================================

@app.get("/")
def home():

    return {
        "message": "ActuaryOS Backend Running Successfully"
    }

# =====================================
# Dataset Upload
# =====================================

@app.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...)
):

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(filepath, "wb") as buffer:
        buffer.write(await file.read())

    df = pd.read_csv(filepath)

    return {
        "filename": file.filename,
        "rows": int(len(df)),
        "columns": int(len(df.columns)),
        "column_names": list(df.columns),
        "average_age": round(float(df["age"].mean()), 2),
        "average_bmi": round(float(df["bmi"].mean()), 2),
        "average_charges": round(float(df["charges"].mean()), 2),
        "smokers": int((df["smoker"] == "yes").sum()),
        "non_smokers": int((df["smoker"] == "no").sum())
    }

# =====================================
# PDF Upload For RAG
# =====================================

@app.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(filepath, "wb") as buffer:
        buffer.write(await file.read())

    reader = PdfReader(filepath)

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    chunks = [
        text[i:i+500]
        for i in range(
            0,
            len(text),
            500
        )
    ]

    start_id = collection.count()

    for idx, chunk in enumerate(chunks):

        collection.add(
            documents=[chunk],
            ids=[str(start_id + idx)]
        )
    db = SessionLocal()

    activity = Activity(
        email="system",
        activity_type="PDF Upload",
        description=file.filename,
        timestamp=str(datetime.now())
    )

    db.add(activity)
    db.commit()

    return {
        "message": "PDF uploaded successfully",
        "filename": file.filename,
        "chunks_added": len(chunks)
    }

# =====================================
# Risk Agent + Recommendation Agent
# =====================================

@app.post("/predict-risk")
def predict_risk(data: dict):

    risk_analysis = risk_agent.analyze(
        data
    )

    recommendations = recommendation_agent.recommend(
        risk_analysis
    )

    db = SessionLocal()

    activity = Activity(
    email=data["email"],
    activity_type="Risk Analysis",
    description="Risk analysis performed",
    timestamp=str(datetime.now())
)

    db.add(activity)
    db.commit()

    return {
        "risk_analysis": risk_analysis,
        "recommendations": recommendations
    }

# =====================================
# Report Agent
# =====================================

@app.post("/generate-report")
def generate_report(data: dict):

    report = report_agent.generate_report(
        customer_data=data["customer_data"],
        risk_analysis=data["risk_analysis"],
        recommendations=data["recommendations"]
    )

    db = SessionLocal()

    activity = Activity(
    email=data["email"],
    activity_type="Report Generated",
    description="AI report generated",
    timestamp=str(datetime.now())
)

    db.add(activity)
    db.commit()

    return {
        "report": report
    }

# =====================================
# RAG Knowledge Assistant
# =====================================

@app.post("/ask")
def ask_question(data: dict):

    rag_answer = rag_agent.query(
        data["question"]
    )

    # Check whether context was found
    if (
        "not found" in rag_answer.lower()
        or "no relevant" in rag_answer.lower()
        or len(rag_answer.strip()) < 20
    ):

        general_answer = llm.generate(
            f"""
            Explain the following topic
            in simple and detailed way:

            {data["question"]}
            """
        )

        final_answer = f"""
⚠ DOCUMENT CONTEXT STATUS

No relevant information was found in the uploaded PDFs.

🤖 GENERAL AI EXPLANATION

{general_answer}
"""

    else:

        simple_explanation = llm.generate(
            f"""
            Explain this in simple language:

            {rag_answer}
            """
        )

        final_answer = f"""
✅ DOCUMENT CONTEXT FOUND

{rag_answer}

🤖 SIMPLE EXPLANATION

{simple_explanation}
"""

    db = SessionLocal()

    activity = Activity(
        email=data["email"],
        activity_type="RAG Query",
        description=data["question"],
        timestamp=str(datetime.now())
    )

    db.add(activity)
    db.commit()

    return {
        "answer": final_answer
    }
# =====================================
# Future Simulator Agent
# =====================================

@app.post("/simulate-future")
def simulate_future(data: dict):

    result = future_simulator_agent.simulate(
        inflation_rate=data["inflation_rate"],
        claims_growth=data["claims_growth"],
        years=data["years"]
    )

    db = SessionLocal()

    activity = Activity(
    email=data["email"],
    activity_type="Future Simulation",
    description=f"Inflation={data['inflation_rate']} Claims={data['claims_growth']} Years={data['years']}",
    timestamp=str(datetime.now())
)

    db.add(activity)
    db.commit()

    return {
        "result": result
    }




@app.post("/register")
def register(data: dict):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == data["email"]
    ).first()

    if existing_user:
        return {
            "message": "Email already exists"
        }

    new_user = User(
        name=data["name"],
        email=data["email"],
        password=hash_password(
            data["password"]
        )
    )

    db.add(new_user)
    db.commit()

    return {
        "message": "Registration Successful"
    }


@app.post("/login")
def login(data: dict):

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == data["email"]
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    if not verify_password(
        data["password"],
        user.password
    ):
        return {
            "message": "Invalid Password"
        }

    return {
        "message": "Login Successful",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }

@app.get("/dashboard-stats/{email}")
def dashboard_stats(email: str):

    db = SessionLocal()

    activities = db.query(
        Activity
    ).filter(
        Activity.email == email
    ).all()

    rag_queries = 0
    risk_analyses = 0
    reports = 0
    simulations = 0

    for activity in activities:

        if activity.activity_type == "RAG Query":
            rag_queries += 1

        elif activity.activity_type == "Risk Analysis":
            risk_analyses += 1

        elif activity.activity_type == "Report Generated":
            reports += 1

        elif activity.activity_type == "Future Simulation":
            simulations += 1

    return {
        "rag_queries": rag_queries,
        "risk_analyses": risk_analyses,
        "reports": reports,
        "simulations": simulations
    }




@app.get("/history/{email}")
def get_history(email: str):

    db = SessionLocal()

    activities = db.query(
        Activity
    ).filter(
        Activity.email == email
    ).all()

    result = []

    for item in activities:

        result.append({
            "type": item.activity_type,
            "description": item.description,
            "timestamp": item.timestamp
        })

    return result

from fastapi.responses import FileResponse
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)
from reportlab.lib.styles import getSampleStyleSheet

@app.post("/download-report")
def download_report(data: dict):

    pdf_path = "generated_report.pdf"

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    elements = [
        Paragraph(
            "ActuaryOS AI Risk Assessment Report",
            styles["Title"]
        ),

        Spacer(1, 20),

        Paragraph(
            "Generated by ActuaryOS AI Platform",
            styles["Italic"]
        ),

        Spacer(1, 20),

        Paragraph(
            data["report"].replace("\n", "<br/>"),
            styles["BodyText"]
        )
    ]

    doc.build(elements)

    return FileResponse(
        path=pdf_path,
        filename="ActuaryOS_Report.pdf",
        media_type="application/pdf"
    )

@app.get("/model-info")
def model_info():

    return llm.get_model_info()
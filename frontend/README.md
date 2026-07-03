#  ActuaryOS – AI-Powered Actuarial Intelligence Platform

##  Project Overview

ActuaryOS is an AI-powered actuarial intelligence platform designed to assist insurance professionals in risk assessment, knowledge retrieval, automated report generation, and future risk forecasting.

The platform combines Agentic AI, Retrieval-Augmented Generation (RAG), Large Language Models (LLMs), and actuarial analytics to provide intelligent decision support for insurance companies.

ActuaryOS demonstrates how modern AI technologies can be integrated into actuarial workflows to improve efficiency, accuracy, and decision-making.

---

#  Problem Statement

Insurance companies generate and process large volumes of customer, policy, and claims data.

Traditional actuarial processes often face challenges such as:

* Manual risk assessment
* Time-consuming report generation
* Difficulty retrieving information from large policy documents
* Limited forecasting capabilities
* Lack of AI-assisted decision support

ActuaryOS addresses these challenges by integrating multiple AI agents into a unified platform.

---

#  System Architecture

Frontend (React.js)
        |
        v
Backend (FastAPI)
        |
        v
Agent Layer
├── Risk Analysis Agent
├── Recommendation Agent
├── Report Agent
├── Knowledge Assistant (RAG Agent)
└── Future Simulator Agent
        |
        v
Groq LLM (Llama 3.1 8B Instant)
        |
        v
Data Layer
├── SQLite Database
└── ChromaDB Vector Database
```

---

#  AI Agents

## 1. Risk Analysis Agent

Purpose:

Analyze customer insurance risk based on:

* Age
* BMI
* Number of Children
* Smoking Status

Output:

* Risk Level
* Risk Factors
* Risk Assessment
* Long-Term Risk Outlook

---

## 2. Recommendation Agent

Purpose:

Generate personalized recommendations based on the identified risk profile.

Output:

* Health recommendations
* Lifestyle suggestions
* Insurance recommendations
* Risk reduction strategies

---

## 3. Report Agent

Purpose:

Generate professional actuarial reports.

Output Sections:

* Executive Summary
* Customer Profile
* Risk Assessment
* Key Risk Factors
* Recommendations
* Business Impact
* Future Risk Outlook
* Conclusion

Reports can be downloaded as PDF documents.

---

## 4. Knowledge Assistant (RAG Agent)

Purpose:

Answer user questions using uploaded insurance documents.

Features:

* PDF Upload
* Document Chunking
* Vector Embeddings
* Semantic Search
* Context-Aware Question Answering

If context exists:

* Uses uploaded documents

If context does not exist:

* Provides general AI-generated knowledge

---

## 5. Future Simulator Agent

Purpose:

Forecast future insurance scenarios.

Input:

* Inflation Rate
* Claims Growth Rate
* Projection Period

Output:

* Executive Summary
* Future Risk Level
* Claims Trend Forecast
* Premium Adjustment Recommendations
* Business Impact Analysis
* Strategic Recommendations
* Conclusion

---

#  Technology Stack

## Frontend

* React.js
* React Router DOM
* Axios
* JavaScript
* CSS

## Backend

* FastAPI
* Uvicorn

## Database

* SQLite

## Vector Database

* ChromaDB

## Artificial Intelligence

* Groq API
* Llama 3.1 8B Instant

## Document Processing

* PyPDF
* Sentence Transformers

## PDF Generation

* ReportLab

---

#  Project Structure

```text
ActuaryOS
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── App.jsx
│
├── backend
│   ├── agents
│   │   ├── risk_agent.py
│   │   ├── recommendation_agent.py
│   │   ├── report_agent.py
│   │   ├── rag_agent.py
│   │   └── future_simulator_agent.py
│   │
│   ├── database
│   │
│   ├── llm
│   │   └── groq_client.py
│   │
│   ├── uploads
│   │
│   ├── vectorstore
│   │
│   └── main.py
│
└── README.md
```

---

#  Features

## Authentication

* User Registration
* User Login
* Secure Password Hashing

## Dashboard

* Risk Analysis Statistics
* Report Statistics
* RAG Query Statistics
* Future Simulation Statistics
* Activity Monitoring
* Active LLM Display

## Risk Analysis

* Customer Risk Evaluation
* Risk Categorization
* Risk Factor Identification

## Recommendations

* Personalized Risk Mitigation Suggestions

## Reports

* AI-Generated Actuarial Reports
* PDF Download Support

## Knowledge Assistant

* PDF Upload
* RAG-based Question Answering
* Context-Aware Responses
* General Knowledge Fallback

## Future Simulation

* Insurance Forecasting
* Risk Projection
* Premium Recommendations

## Activity Tracking

* User Activity History
* Audit Trail

## Profile Management

* User Profile Information

---

#  Installation Guide

## Step 1: Clone Repository

```bash
git clone <repository-url>
```

```bash
cd ActuaryOS
```

---

# Backend Setup

## Step 2: Navigate to Backend

```bash
cd backend
```

## Step 3: Create Virtual Environment

Windows:

```bash
python -m venv venv
```

Activate:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
python3 -m venv venv
```

```bash
source venv/bin/activate
```

---

## Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

If requirements file is unavailable:

```bash
pip install fastapi
pip install uvicorn
pip install pandas
pip install chromadb
pip install sentence-transformers
pip install groq
pip install pypdf
pip install reportlab
pip install python-dotenv
pip install sqlalchemy
pip install passlib[bcrypt]
```

---

## Step 5: Configure Environment Variables

Create:

```text
.env
```

Add:

```env
GROQ_API_KEY=your_groq_api_key
```

---

## Step 6: Start Backend Server

If main.py is directly inside backend:

```bash
uvicorn main:app --reload
```

If using app folder structure:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger API Docs:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

## Step 7: Open New Terminal

Navigate to frontend:

```bash
cd frontend
```

---

## Step 8: Install Dependencies

```bash
npm install
```

---

## Step 9: Start Frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

#  How To Run The Project

Terminal 1:

```bash
cd backend

venv\Scripts\activate

uvicorn main:app --reload
```

Terminal 2:

```bash
cd frontend

npm install

npm run dev
```

Open:

```text
http://localhost:5173
```

---

#  Demo Workflow

1. Register User
2. Login
3. Perform Risk Analysis
4. Generate Recommendations
5. Generate Report
6. Download PDF Report
7. Upload Insurance PDF
8. Ask Questions to Knowledge Assistant
9. Run Future Simulation
10. View Dashboard Statistics
11. View Activity History

---

#  Future Scope

* Multi-LLM Support
* Agent Collaboration Framework
* Advanced Risk Scoring Models
* Real-Time Claims Prediction
* Cloud Deployment
* Enterprise Authentication
* Explainable AI Dashboards
* Regulatory Compliance Assistant
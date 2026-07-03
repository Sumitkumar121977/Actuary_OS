import Notification from "../components/Notification";
import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function KnowledgeAssistantPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [pdfFile, setPdfFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const [notification, setNotification] = useState("");

  const uploadPDF = async () => {
    if (!pdfFile) {
      setNotification("❌ Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const response = await API.post(
        "/upload-pdf",
        formData
      );

      setUploadStatus(
        `${response.data.filename} uploaded successfully (${response.data.chunks_added} chunks)`
      );

      setNotification(
        "✅ PDF Uploaded Successfully"
      );

    } catch (error) {
      console.log(error);

      setNotification(
        "❌ PDF Upload Failed"
      );
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await API.post(
        "/ask",
        {
          question: question,
          email: user.email,
        }
      );

      setAnswer(response.data.answer);

      setNotification(
        "✅ Answer Generated Successfully"
      );

    } catch (error) {
      console.log(error);

      setNotification(
        "❌ Failed To Generate Answer"
      );
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div>
        <h1
          style={{
            fontSize: "34px",
            color: "#10B981",
            marginBottom: "10px",
          }}
        >
          📚 Knowledge Agent (RAG System)
        </h1>

        <Notification
          message={notification}
          type={
            notification.includes("❌")
              ? "error"
              : "success"
          }
        />

        <p
          style={{
            color: "#94A3B8",
            marginBottom: "30px",
          }}
        >
          Retrieval-Augmented Generation powered by ChromaDB and Groq AI.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#1E293B",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid #10B981",
            }}
          >
            <h3>📄 Upload PDFs</h3>
            <p style={{ color: "#94A3B8" }}>
              Insurance Policies,
              IRDA Guidelines,
              Actuarial Reports
            </p>
            <p
              style={{
                color: "#10B981",
                marginTop: "10px",
              }}
            >
              ✓ Ready
            </p>
          </div>

          <div
            style={{
              background: "#1E293B",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid #10B981",
            }}
          >
            <h3>✂️ Chunk Documents</h3>
            <p style={{ color: "#94A3B8" }}>
              Split documents into searchable chunks.
            </p>
            <p
              style={{
                color: "#10B981",
                marginTop: "10px",
              }}
            >
              ✓ Active
            </p>
          </div>

          <div
            style={{
              background: "#1E293B",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid #10B981",
            }}
          >
            <h3>🗄 ChromaDB</h3>
            <p style={{ color: "#94A3B8" }}>
              Store document vectors for retrieval.
            </p>
            <p
              style={{
                color: "#10B981",
                marginTop: "10px",
              }}
            >
              ✓ Connected
            </p>
          </div>

          <div
            style={{
              background: "#1E293B",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid #10B981",
            }}
          >
            <h3>🤖 Groq AI</h3>
            <p style={{ color: "#94A3B8" }}>
              Retrieve chunks and generate accurate answers.
            </p>
            <p
              style={{
                color: "#10B981",
                marginTop: "10px",
              }}
            >
              ✓ Running
            </p>
          </div>
        </div>

        <div
          style={{
            background: "#1E293B",
            padding: "25px",
            borderRadius: "15px",
            border: "1px solid #10B981",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              color: "#10B981",
              marginBottom: "20px",
            }}
          >
            📄 Upload PDF to Knowledge Base
          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setPdfFile(e.target.files[0])
            }
          />

          <button
            onClick={uploadPDF}
            style={{
              marginLeft: "15px",
              padding: "10px 20px",
              background: "#10B981",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Upload PDF
          </button>

          {uploadStatus && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                background: "#0F172A",
                borderRadius: "10px",
                border: "1px solid #10B981",
              }}
            >
              <p style={{ color: "#10B981" }}>
                ✅ {uploadStatus}
              </p>
            </div>
          )}
        </div>

        <div
          style={{
            background: "#1E293B",
            padding: "25px",
            borderRadius: "15px",
            border: "1px solid #334155",
          }}
        >
          <h2
            style={{
              color: "#10B981",
              marginBottom: "20px",
            }}
          >
            🤖 Ask Knowledge Agent
          </h2>

          <input
            type="text"
            placeholder="Ask a question from uploaded PDFs..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #475569",
              background: "#0F172A",
              color: "white",
              fontSize: "16px",
            }}
          />

          <button
            onClick={askQuestion}
            style={{
              marginTop: "15px",
              padding: "12px 25px",
              background: "#10B981",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            🔍 Ask AI
          </button>

          {loading && (
            <p
              style={{
                color: "#10B981",
                marginTop: "20px",
              }}
            >
              🤖 Searching ChromaDB...
            </p>
          )}

          {answer && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                background: "#0F172A",
                borderRadius: "12px",
                border: "1px solid #10B981",
              }}
            >
              <h3
                style={{
                  color: "#10B981",
                  marginBottom: "15px",
                }}
              >
                💬 AI Answer
              </h3>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.8",
                  color: "#E2E8F0",
                }}
              >
                {answer}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default KnowledgeAssistantPage;
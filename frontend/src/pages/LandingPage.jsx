import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F172A",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          marginBottom: "10px",
          color: "#60A5FA",
        }}
      >
        🤖 ActuaryOS
      </h1>

      <h2
        style={{
          fontSize: "28px",
          marginBottom: "20px",
        }}
      >
        AI-Powered Actuarial Copilot
      </h2>

      <p
        style={{
          maxWidth: "700px",
          color: "#CBD5E1",
          lineHeight: "1.8",
          marginBottom: "40px",
        }}
      >
        Transform insurance analytics with Artificial Intelligence.
        Perform Risk Analysis, Generate Reports, Query Insurance
        Policies using RAG, Simulate Future Risk Scenarios,
        and make smarter actuarial decisions.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "15px 30px",
            background: "#3B82F6",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🚀 Launch Dashboard
        </button>

        <button
          onClick={() => navigate("/knowledge-assistant")}
          style={{
            padding: "15px 30px",
            background: "#1E293B",
            color: "white",
            border: "1px solid #334155",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🤖 Try AI Assistant
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "1000px",
          marginTop: "60px",
        }}
      >
        <div
          style={{
            background: "#1E293B",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h3>📊 Risk Analysis</h3>
          <p>Analyze customer and policy risk profiles.</p>
        </div>

        <div
          style={{
            background: "#1E293B",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h3>🤖 RAG Assistant</h3>
          <p>Ask questions directly from insurance policies.</p>
        </div>

        <div
          style={{
            background: "#1E293B",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h3>📄 AI Reports</h3>
          <p>Generate actuarial reports automatically.</p>
        </div>

        <div
          style={{
            background: "#1E293B",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h3>🔮 Simulations</h3>
          <p>Forecast future insurance risk scenarios.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
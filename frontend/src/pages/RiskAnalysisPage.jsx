import Notification from "../components/Notification";
import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function RiskAnalysisPage() {
  const [notification, setNotification] = useState("");
  const [result, setResult] = useState(null);

  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [children, setChildren] = useState("");
  const [smoker, setSmoker] = useState("no");

  const [riskResult, setRiskResult] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await API.post("/upload", formData);

setResult(response.data);

setNotification(
  "✅ Dataset Uploaded Successfully"
);
    } catch (error) {
      setNotification(
  "❌ Risk Analysis Failed"
);
      console.log(error);
    }
  };

  const predictRisk = async () => {
    try {
      const user = JSON.parse(
  localStorage.getItem("user")
);

const response = await API.post("/predict-risk", {
  age: Number(age),
  bmi: Number(bmi),
  children: Number(children),
  smoker: smoker,
  email: user.email,
});
setNotification(
  "✅ Risk Analysis Completed Successfully"
);
      setRiskResult(response.data);

      localStorage.setItem(
        "customerData",
        JSON.stringify({
          age,
          bmi,
          children,
          smoker,
        })
      );

      localStorage.setItem(
        "riskAnalysis",
        response.data.risk_analysis
      );

      localStorage.setItem(
        "recommendations",
        response.data.recommendations
      );

    } catch (error) {
      alert("Prediction Failed");
      console.log(error);
    }
  };

  return (
    <Layout>
      <div>
        <h1
          style={{
            color: "#F97316",
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          📊 Risk Analysis Center
        </h1>
<Notification
  message={notification}
  type="success"
/>
        <p
          style={{
            color: "#CBD5E1",
            marginBottom: "30px",
          }}
        >
          Upload datasets and evaluate insurance risk profiles.
        </p>

        <div
          style={{
            background: "#1F2937",
            padding: "25px",
            borderRadius: "20px",
            border: "1px solid #EA580C",
          }}
        >
          <h2 style={{ color: "#FB923C" }}>
            📁 Dataset Upload
          </h2>

          <input
            type="file"
            onChange={handleFileUpload}
            style={{ marginTop: "15px" }}
          />

          {result && (
            <div
              style={{
                marginTop: "20px",
                background: "#111827",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3 style={{ color: "#FB923C" }}>
                Dataset Summary
              </h3>

              <p>Rows: {result.rows}</p>
              <p>Columns: {result.columns}</p>
              <p>Average Age: {result.average_age}</p>
              <p>Average BMI: {result.average_bmi}</p>
              <p>Average Charges: {result.average_charges}</p>
              <p>Smokers: {result.smokers}</p>
              <p>Non Smokers: {result.non_smokers}</p>
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: "30px",
            background: "#1F2937",
            padding: "25px",
            borderRadius: "20px",
            border: "1px solid #DC2626",
          }}
        >
          <h2 style={{ color: "#F87171" }}>
            ⚠ AI Risk Analysis
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <input
              type="number"
              placeholder="BMI"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
            />

            <input
              type="number"
              placeholder="Children"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
            />

            <select
              value={smoker}
              onChange={(e) => setSmoker(e.target.value)}
            >
              <option value="no">Non Smoker</option>
              <option value="yes">Smoker</option>
            </select>
          </div>

          <button
            onClick={predictRisk}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              background: "#DC2626",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            🤖 Analyze Risk
          </button>

          {riskResult && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                background: "#111827",
                borderRadius: "12px",
                border: "1px solid #374151",
              }}
            >
              <h3
                style={{
                  color: "#F87171",
                  marginBottom: "15px",
                }}
              >
                🤖 AI Risk Analysis
              </h3>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.8",
                  color: "#E5E7EB",
                }}
              >
                {riskResult.risk_analysis}
              </div>

              <h3
                style={{
                  color: "#FB923C",
                  marginTop: "25px",
                  marginBottom: "15px",
                }}
              >
                📋 AI Recommendations
              </h3>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.8",
                  color: "#E5E7EB",
                }}
              >
                {riskResult.recommendations}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default RiskAnalysisPage;
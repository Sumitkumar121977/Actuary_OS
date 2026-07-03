import Notification from "../components/Notification";
import { useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function FutureSimulatorPage() {
  const [inflation, setInflation] = useState("");
  const [claimsGrowth, setClaimsGrowth] = useState("");
  const [years, setYears] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const runSimulation = async () => {
    if (!inflation || !claimsGrowth || !years) {
      setNotification("❌ Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        setNotification("❌ Please login again");
        setLoading(false);
        return;
      }

      const response = await API.post(
        "/simulate-future",
        {
          inflation_rate: Number(inflation),
          claims_growth: Number(claimsGrowth),
          years: Number(years),
          email: user.email,
        }
      );

      setResult(response.data.result);

      setNotification(
        "✅ Simulation Completed Successfully"
      );
    } catch (error) {
      console.log(error);

      setNotification(
        "❌ Failed To Run Simulation"
      );
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div>
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "10px",
            color: "#38BDF8",
          }}
        >
          🔮 Future Risk Simulator
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
          Simulate future insurance risk scenarios using AI forecasting.
        </p>

        <div
          style={{
            background: "#1E293B",
            padding: "25px",
            borderRadius: "15px",
            border: "1px solid #334155",
          }}
        >
          <h3
            style={{
              color: "#38BDF8",
            }}
          >
            Simulation Inputs
          </h3>

          <p style={{ marginTop: "20px" }}>
            Inflation Rate (%)
          </p>

          <input
            type="number"
            value={inflation}
            onChange={(e) =>
              setInflation(e.target.value)
            }
            placeholder="Enter inflation rate"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #475569",
              background: "#0F172A",
              color: "white",
            }}
          />

          <p style={{ marginTop: "20px" }}>
            Expected Claims Growth (%)
          </p>

          <input
            type="number"
            value={claimsGrowth}
            onChange={(e) =>
              setClaimsGrowth(e.target.value)
            }
            placeholder="Enter claims growth"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #475569",
              background: "#0F172A",
              color: "white",
            }}
          />

          <p style={{ marginTop: "20px" }}>
            Projection Period (Years)
          </p>

          <input
            type="number"
            value={years}
            onChange={(e) =>
              setYears(e.target.value)
            }
            placeholder="Enter years"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #475569",
              background: "#0F172A",
              color: "white",
            }}
          />

          <button
            onClick={runSimulation}
            disabled={loading}
            style={{
              marginTop: "25px",
              padding: "12px 25px",
              background: "#0EA5E9",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {loading
              ? "Running..."
              : "🔮 Run AI Simulation"}
          </button>

          {loading && (
            <p
              style={{
                marginTop: "20px",
                color: "#38BDF8",
              }}
            >
              🤖 Running AI Forecast...
            </p>
          )}

          {result && (
            <div
              style={{
                marginTop: "30px",
                padding: "25px",
                background: "#0F172A",
                borderRadius: "12px",
                border: "1px solid #334155",
              }}
            >
              <h3
                style={{
                  color: "#38BDF8",
                  marginBottom: "15px",
                }}
              >
                🔮 AI Future Risk Forecast
              </h3>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.9",
                  color: "#E2E8F0",
                  fontSize: "15px",
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default FutureSimulatorPage;
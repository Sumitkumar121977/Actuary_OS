import ActivityTrendChart from "../components/ActivityTrendChart";
import ActivityChart from "../components/ActivityChart";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function DashboardPage() {
  const [stats, setStats] = useState({
    risk_analyses: 0,
    rag_queries: 0,
    reports: 0,
    simulations: 0,
  });

  const [activities, setActivities] = useState([]);

  const [modelInfo, setModelInfo] = useState({
  provider: "",
  model: "",
  status: "",
});

useEffect(() => {
  fetchStats();
  fetchActivities();
  fetchModelInfo();
}, []);

  const fetchStats = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const response = await API.get(
      `/dashboard-stats/${user.email}`
    );

    setStats(response.data);
  } catch (error) {
    console.log(error);
  }
};

const fetchModelInfo = async () => {
  try {

    const response = await API.get(
      "/model-info"
    );

    setModelInfo(response.data);

  } catch (error) {
    console.log(error);
  }
};

  const fetchActivities = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const response = await API.get(
      `/history/${user.email}`
    );

    setActivities(
      response.data.slice(-5).reverse()
    );
  } catch (error) {
    console.log(error);
  }
};

  return (
    <Layout>
      <div>
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
            color: "#38BDF8",
          }}
        >
          🚀 ActuaryOS Dashboard
        </h1>

        <p
          style={{
            color: "#94A3B8",
            marginBottom: "30px",
            fontSize: "18px",
          }}
        >
          AI-Powered Actuarial Intelligence Platform
        </p>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#1E293B",
              padding: "25px",
              borderRadius: "15px",
              border: "1px solid #334155",
            }}
          >
            <h3>⚠ Risk Assessments</h3>
            <h1>{stats.risk_analyses}</h1>
            <p>Insurance Risk Evaluations</p>
          </div>

          <div
            style={{
              background: "#1E293B",
              padding: "25px",
              borderRadius: "15px",
              border: "1px solid #334155",
            }}
          >
            <h3>📚 Knowledge Queries</h3>
            <h1>{stats.rag_queries}</h1>
            <p>Questions Answered by RAG</p>
          </div>

          <div
            style={{
              background: "#1E293B",
              padding: "25px",
              borderRadius: "15px",
              border: "1px solid #334155",
            }}
          >
            <h3>📄 Reports Generated</h3>
            <h1>{stats.reports}</h1>
            <p>AI Generated Reports</p>
          </div>

          <div
            style={{
              background: "#1E293B",
              padding: "25px",
              borderRadius: "15px",
              border: "1px solid #334155",
            }}
          >
            <h3>🔮 Future Simulations</h3>
            <h1>{stats.simulations}</h1>
            <p>Forecast Scenarios Executed</p>
          </div>
        </div>

 {/* Active AI Engine */}
<div
  style={{
    marginTop: "25px",
    background: "#1E293B",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid #10B981",
  }}
>
  <h2
    style={{
      color: "#10B981",
      marginBottom: "15px",
    }}
  >
    🤖 Active AI Engine
  </h2>

  <p style={{ color: "#CBD5E1" }}>
    Provider:
    <strong> {modelInfo.provider}</strong>
  </p>

  <p style={{ color: "#CBD5E1" }}>
    Active LLM:
    <strong> {modelInfo.model}</strong>
  </p>

  <p style={{ color: "#CBD5E1" }}>
    Status:
    <strong style={{ color: "#10B981" }}>
      {" "}🟢 {modelInfo.status}
    </strong>
  </p>

  <p
    style={{
      marginTop: "15px",
      color: "#94A3B8",
    }}
  >
    Powering Risk Analysis, RAG, Report Generation,
    and Future Simulation Agents.
  </p>
</div>

{/* Overview + Insights */}
<div
  style={{
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  }}
>
  <div
    style={{
      background: "#1E293B",
      padding: "25px",
      borderRadius: "15px",
      border: "1px solid #334155",
    }}
  >
    <h2>📊 Platform Overview</h2>

    <p
      style={{
        marginTop: "15px",
        lineHeight: "1.8",
        color: "#CBD5E1",
      }}
    >
      ActuaryOS is an AI-powered actuarial platform that integrates
      Risk Analysis, Recommendation Systems, Automated Report
      Generation, Future Risk Simulation, and Retrieval-Augmented
      Generation (RAG) to assist insurance professionals in making
      intelligent data-driven decisions.
    </p>
  </div>

  <div
    style={{
      background: "#1E293B",
      padding: "25px",
      borderRadius: "15px",
      border: "1px solid #334155",
    }}
  >
    <h2>🤖 AI Insights</h2>

    <ul
      style={{
        marginTop: "15px",
        lineHeight: "2",
        color: "#CBD5E1",
      }}
    >
      <li>
        ⭐ Most Used Feature: {
          stats.rag_queries >= stats.risk_analyses &&
          stats.rag_queries >= stats.reports &&
          stats.rag_queries >= stats.simulations
            ? "Knowledge Assistant"
            : stats.risk_analyses >= stats.reports &&
              stats.risk_analyses >= stats.simulations
            ? "Risk Analysis"
            : stats.reports >= stats.simulations
            ? "Reports"
            : "Future Simulator"
        }
      </li>

      <li>
        📊 Total Activities: {
          stats.rag_queries +
          stats.risk_analyses +
          stats.reports +
          stats.simulations
        }
      </li>

      <li>
        📄 Reports Generated: {stats.reports}
      </li>

      <li>
        🔮 Simulations Run: {stats.simulations}
      </li>

      <li>
        🤖 AI Status: Online
      </li>
    </ul>
  </div>
</div>

        {/* Recent Activities */}
        <div
          style={{
            marginTop: "25px",
            background: "#1E293B",
            padding: "25px",
            borderRadius: "15px",
            border: "1px solid #334155",
          }}
        >
          <h2>📜 Recent Activities</h2>

          {activities.length === 0 ? (
            <p
              style={{
                color: "#94A3B8",
                marginTop: "15px",
              }}
            >
              No activities found.
            </p>
          ) : (
            activities.map((activity, index) => (
              <div
                key={index}
                style={{
                  marginTop: "15px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #334155",
                }}
              >
                <h4
                  style={{
                    color: "#38BDF8",
                    marginBottom: "5px",
                  }}
                >
                  {activity.type}
                </h4>

                <p
                  style={{
                    color: "#CBD5E1",
                    marginBottom: "5px",
                  }}
                >
                  {activity.description}
                </p>

                <small
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  {activity.timestamp}
                </small>
              </div>
            ))
          )}
        </div>
      </div>
      <ActivityTrendChart stats={stats} />
    </Layout>
  );
}

export default DashboardPage;
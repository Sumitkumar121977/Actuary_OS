import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function ProfilePage() {
  const [stats, setStats] = useState({
    risk_analyses: 0,
    rag_queries: 0,
    reports: 0,
    simulations: 0,
  });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await API.get(
        `/dashboard-stats/${user.email}`
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalActivities =
    stats.risk_analyses +
    stats.rag_queries +
    stats.reports +
    stats.simulations;

  return (
    <Layout>
      <div>
        <h1
          style={{
            fontSize: "34px",
            color: "#38BDF8",
            marginBottom: "20px",
          }}
        >
          👤 User Profile
        </h1>

        <div
          style={{
            background: "#1E293B",
            padding: "30px",
            borderRadius: "20px",
            border: "1px solid #334155",
          }}
        >
          <h2 style={{ color: "#38BDF8" }}>
            {user.name}
          </h2>

          <p
            style={{
              color: "#CBD5E1",
              marginTop: "10px",
            }}
          >
            📧 {user.email}
          </p>

          <hr
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              borderColor: "#334155",
            }}
          />

          <h3 style={{ color: "#38BDF8" }}>
            📊 Statistics
          </h3>

          <p>Total Activities: {totalActivities}</p>
          <p>Risk Analysis: {stats.risk_analyses}</p>
          <p>Knowledge Queries: {stats.rag_queries}</p>
          <p>Reports Generated: {stats.reports}</p>
          <p>Future Simulations: {stats.simulations}</p>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
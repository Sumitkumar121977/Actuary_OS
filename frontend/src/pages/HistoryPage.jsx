import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function HistoryPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const response = await API.get(
      `/history/${user.email}`
    );

    setActivities(response.data);

  } catch (error) {
    console.log(error);
    alert("Failed to load history");
  }

  setLoading(false);
};

  return (
    <Layout>
      <div>
        <h1
          style={{
            fontSize: "34px",
            color: "#38BDF8",
            marginBottom: "10px",
          }}
        >
          📜 Activity History
        </h1>

        <p
          style={{
            color: "#94A3B8",
            marginBottom: "30px",
          }}
        >
          View all previous AI interactions and activities.
        </p>

        {loading && (
          <p
            style={{
              color: "#38BDF8",
            }}
          >
            Loading history...
          </p>
        )}

        {!loading && activities.length === 0 && (
          <div
            style={{
              background: "#1E293B",
              padding: "20px",
              borderRadius: "15px",
              border: "1px solid #334155",
            }}
          >
            No activity found.
          </div>
        )}

        {!loading &&
          activities.map((activity, index) => (
            <div
              key={index}
              style={{
                background: "#1E293B",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "15px",
                border: "1px solid #334155",
              }}
            >
              <h3
                style={{
                  color: "#38BDF8",
                }}
              >
                {activity.type}
              </h3>

              <p
                style={{
                  color: "#E2E8F0",
                  marginTop: "10px",
                }}
              >
                {activity.description}
              </p>

              <p
                style={{
                  color: "#94A3B8",
                  marginTop: "10px",
                  fontSize: "14px",
                }}
              >
                {activity.timestamp}
              </p>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export default HistoryPage;
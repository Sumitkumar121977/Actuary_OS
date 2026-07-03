import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function ActivityTrendChart({ stats }) {
  const data = [
    {
      activity: "Risk",
      count: stats.risk_analyses,
    },
    {
      activity: "Queries",
      count: stats.rag_queries,
    },
    {
      activity: "Reports",
      count: stats.reports,
    },
    {
      activity: "Simulation",
      count: stats.simulations,
    },
  ];

  return (
    <div
      style={{
        marginTop: "25px",
        background: "#1E293B",
        padding: "25px",
        borderRadius: "15px",
        border: "1px solid #334155",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        📈 Activity Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="activity" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="count"
            stroke="#38BDF8"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ActivityTrendChart;
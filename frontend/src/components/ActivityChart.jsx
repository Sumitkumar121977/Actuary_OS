import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ActivityChart({ stats }) {
  const data = [
    {
      name: "Risk Analysis",
      value: stats.risk_analyses,
    },
    {
      name: "Knowledge Queries",
      value: stats.rag_queries,
    },
    {
      name: "Reports",
      value: stats.reports,
    },
    {
      name: "Simulations",
      value: stats.simulations,
    },
  ];

  const COLORS = [
    "#38BDF8",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
  ];

  return (
    <div
      style={{
        background: "#1E293B",
        padding: "25px",
        borderRadius: "15px",
        border: "1px solid #334155",
        marginTop: "25px",
      }}
    >
      <h2>📊 Activity Distribution</h2>

      <div style={{ height: "350px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ActivityChart;
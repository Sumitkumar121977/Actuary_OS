import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");

  navigate("/");
};

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2
          style={{
            color: "#60A5FA",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          🤖 ActuaryOS
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            style={buttonStyle}
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() => navigate("/risk-analysis")}
            style={buttonStyle}
          >
            📊 Risk Analysis
          </button>

          <button
            onClick={() => navigate("/knowledge-assistant")}
            style={buttonStyle}
          >
            🤖 Knowledge Assistant
          </button>

          <button
            onClick={() => navigate("/reports")}
            style={buttonStyle}
          >
            📄 Reports
          </button>

          <button
            onClick={() => navigate("/future-simulator")}
            style={buttonStyle}
          >
            🔮 Future Simulator
          </button>

          <button
  onClick={() => navigate("/history")}
  style={buttonStyle}
>
  📜 Activity History
</button>

<button
  onClick={() => navigate("/profile")}
  style={buttonStyle}
>
  👤 Profile
</button>

        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: "#DC2626",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

const buttonStyle = {
  background: "#1F2937",
  color: "white",
  border: "1px solid #374151",
  padding: "12px",
  borderRadius: "10px",
  cursor: "pointer",
  textAlign: "left",
  fontSize: "15px",
};

export default Sidebar;
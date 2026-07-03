function Notification({ message, type }) {
  if (!message) return null;

  return (
    <div
      style={{
        background:
          type === "success"
            ? "#10B981"
            : "#EF4444",
        color: "white",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
        fontWeight: "bold",
      }}
    >
      {message}
    </div>
  );
}

export default Notification;
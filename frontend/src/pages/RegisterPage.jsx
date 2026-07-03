import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await API.post(
        "/register",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);

      if (
        response.data.message ===
        "Registration Successful"
      ) {
        navigate("/login");
      }

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F172A",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "#1E293B",
          padding: "35px",
          borderRadius: "20px",
          border: "1px solid #334155",
          color: "white",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#60A5FA",
            marginBottom: "10px",
          }}
        >
          🤖 ActuaryOS
        </h1>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Create Account
        </h2>

        <label>Full Name</label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #475569",
            background: "#0F172A",
            color: "white",
          }}
        />

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #475569",
            background: "#0F172A",
            color: "white",
          }}
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "25px",
            borderRadius: "10px",
            border: "1px solid #475569",
            background: "#0F172A",
            color: "white",
          }}
        />

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "14px",
            background: "#3B82F6",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Create Account
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#94A3B8",
          }}
        >
          Already have an account?
        </p>

        <button
          onClick={() =>
            navigate("/login")
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            background: "#1E293B",
            color: "white",
            border: "1px solid #475569",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
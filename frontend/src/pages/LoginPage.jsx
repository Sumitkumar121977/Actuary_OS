import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await API.post(
        "/login",
        {
          email,
          password,
        }
      );

      if (
        response.data.message ===
        "Login Successful"
      ) {

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

        alert("Login Successful");

        navigate("/dashboard");
      } else {

        alert(
          response.data.message
        );
      }

    } catch (error) {

      console.log(error);

      alert("Login Failed");
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
          width: "400px",
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
            marginBottom: "10px",
            color: "#60A5FA",
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
          Login
        </h2>

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
          placeholder="Enter your password"
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
          onClick={handleLogin}
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
          Login
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#94A3B8",
          }}
        >
          Don't have an account?
        </p>

        <button
          onClick={() =>
            navigate("/register")
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
          Create Account
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
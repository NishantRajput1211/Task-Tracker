import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import API from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      navigate("/dashboard");

    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2 className="login-title">Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="login-links">

          <Link to="/register">
            Go to Register
          </Link>

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;
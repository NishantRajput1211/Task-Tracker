import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Register.css";
function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await API.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert(
        res.data.message ||
        "Registration successful"
      );

      navigate("/");

    } catch (error) {

      console.log(error.response);
    
      if (error.response) {
    
        alert(
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message
        );
    
      } else {
    
        alert("Registration failed");
    
      }
    
    }

  };

  return (

    <div className="register-container">
  
      <div className="register-card">
  
        <h2>Create Account</h2>
  
        <p className="subtitle">
          Register to manage your tasks
        </p>
  
        <div className="register-form">
  
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
  
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
  
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
  
          <button onClick={handleRegister}>
            Register
          </button>
  
        </div>
  
        <p className="login-link">
          Already have an account?
          <span onClick={() => navigate("/")}>
            Login
          </span>
        </p>
  
      </div>
  
    </div>
  
  );
}

export default Register;
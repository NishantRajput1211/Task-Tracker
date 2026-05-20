import React, { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = () => {

    if (!email || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    alert("Password Reset Successful");

  };

  return (

    <div className="forgot-container">

      <div className="forgot-card">

        <h2>Reset Password</h2>

        <p className="forgot-subtitle">
          Enter your email and new password
        </p>

        <div className="forgot-form">

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
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <button onClick={handleReset}>
            Reset Password
          </button>

        </div>

      </div>

    </div>

  );

}

export default ForgotPassword;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { loginUser } from "../api"; 
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = async () => {
    try {
        const response = await loginUser(username, password);
        if (response.data.valid) {
          navigate("/search", { state: { userId: response.data.id } });
        } else {
          setError("Invalid username or password");
        }
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      }
  };

  return (
    <div className="login-container">
      <div id="rect"></div>
      <div id="cir"></div>

      {/* Left Side - Login Form */}
      <div className="login-left">
        <img src="/logo-login.png" alt="ClarityPull" className="logo" />
        <div className="login-box" id="login-bx">
          <h2 className="title">Welcome Back!</h2>

          <label className="label">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-text">{error}</p>}

          <div className="forgot-password">
            <button
              onClick={() => alert("Redirect to forgot password page")}
              className="link-button"
            >
              Forgot password?
            </button>
          </div>

          <button className="login-button" onClick={handleLogin}>
            Login
          </button>

          <div className="google-login">
            <button className="google-button">
              <img
                src="/google.png"
                alt="Login with Google"
                className="google-icon"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Illustration */}
      <div className="login-right">
        <img src="/log.png" alt="Dashboard Preview" className="illustration" />
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css"; // Shared CSS for both Auth pages

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for login goes here
    alert("Signed in successfully!");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p>Enter your details to access your account</p>
        <form onSubmit={handleSubmit}>
          <div className="auth-group">
            <label>Email</label>
            <input type="email" placeholder="email@example.com" required />
          </div>
          <div className="auth-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account created!");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Join us to start shopping today</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required />
          </div>

          <div className="auth-group">
            <label>Email Address</label>
            <input type="email" placeholder="email@example.com" required />
          </div>

          {/* New Phone Number Field */}
          <div className="auth-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="+1 (555) 000-0000" required />
          </div>

          <div className="auth-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

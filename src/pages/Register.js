import React, { useState } from "react";
import { register } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register({ name, email, password });
            setSuccess("Registration successful! You can now login.");
            setError("");
        } catch (err) {
            setError(err.response?.data || "Registration failed");
            setSuccess("");
        }
    };

    return (
  <div className="register-page">
    <div className="register-card">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="full-btn">Register</button>

        <p className="form-footer">
          Already have an account?
          <span className="link" onClick={() => Navigate("/login")}>
            {" "}Login
          </span>
        </p>
      </form>

      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
    </div>
  </div>
);

};

export default Register;

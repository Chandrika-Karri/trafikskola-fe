import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const Navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/api/users/login",
                { email, password }
            );
            const token = response.data;
            localStorage.setItem("token", token); // store JWT token

            const decoded = jwtDecode(token);
            console.log(decoded.role); // you can use the role for further logic
            alert("Login successful!");
            Navigate("/courses");
        } catch (err) {
            setError(err.response?.data || "Login failed");
        }
    };

    return (
  <div className="login-page">
    <div className="login-card">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />{" "}
        Show Password
      </div>

      <p style={{ marginTop: "10px" }}>
        <span
          onClick={() => Navigate("/forgot-password")}
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
        >
         Forgot Password?
        </span>
      </p>


        <button type="submit" className="full-btn">
          Login
        </button>

        <p className="form-footer">
          New user?
          <span
            onClick={() => Navigate("/register")}
            className="link"
          >
            {" "}Register here
          </span>
        </p>
      </form>

      {error && <p className="error-text">{error}</p>}
    </div>
  </div>
);

};

export default Login;

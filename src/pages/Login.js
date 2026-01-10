import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <p>
                  New user?
                  <span onClick={() => Navigate("/register")} style={{ color: "blue", cursor: "pointer" }}>
                      {" "}Register here
                  </span>
                </p>

            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Login;

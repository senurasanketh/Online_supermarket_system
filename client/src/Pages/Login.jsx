// components/Login.jsx
import React, { useState } from "react";
import "../Css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginbg from "../assets/loginbg.jpg";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest();
      console.log("response::> ", response);

      // Check if token exists (indicating success)
      if (response.token) {
        localStorage.setItem("token", response.token); // Store JWT
        localStorage.setItem("role", response.role); // Store role

        alert("Login successful");

        // Redirect based on role
        if (response.role === "1") {
          navigate("/dashboard"); // Admin goes to dashboard
        } else if (response.role === "2") {
          navigate("/"); // User goes to home page
        } else {
          alert("Unknown role");
        }
      } else {
        alert("Login error: " + (response.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const sendRequest = async () => {
    return await axios
      .post("http://localhost:5000/auth/login", {
        email: user.email,
        password: user.password,
      })
      .then((res) => res.data);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "93.5vh",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="login-container">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <h2 className="loginsize" align="center">
              Login
            </h2>
            <br />
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={handleInputChange}
              value={user.email}
            />
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              onChange={handleInputChange}
              value={user.password}
            />
            <button className="loginbt1" type="submit">
              Login
            </button>
            <p>
              Don't have an account? <a href="/signup">Signup</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

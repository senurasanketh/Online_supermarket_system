import React, { useState } from "react";
import "../Css/signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import signupbg from "../assets/signupbg.jpg";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phoneno: "",
    password: "",
    repassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.repassword) {
      alert("Passwords do not match");
      return;
    }

    sendRequest()
      .then((response) => {
        alert("Register Success");
        localStorage.setItem("token", response.token); // Store token
        localStorage.setItem("role", response.role || "2"); // Default to user role "2" if not provided
        navigate("/Login"); // Redirect to profile instead of login for auto-login
      })
      .catch((err) => {
        alert(err.response?.data?.message || err.message);
      });
  };

  const sendRequest = async () => {
    const response = await axios.post("http://localhost:5000/auth/signup", {
      name: user.name,
      email: user.email,
      address: user.address,
      phoneno: user.phoneno,
      password: user.password,
    });
    return response.data;
  };

  return (
    <div
      style={{
        backgroundImage: `url(${signupbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "auto",
        height: "auto",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="signup1-container">
        <div className="signup-box">
          <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <label>Name*</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              required
              value={user.name}
              onChange={handleInputChange}
            />
            <label>Email*</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
              value={user.email}
              onChange={handleInputChange}
            />
            <label>Address*</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter your address"
              required
              value={user.address}
              onChange={handleInputChange}
            />
            <label>Phone No*</label>
            <input
              type="text"
              name="phoneno"
              id="phoneno"
              placeholder="Enter your phone number"
              required
              value={user.phoneno}
              onChange={handleInputChange}
            />
            <label>Password*</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              value={user.password}
              onChange={handleInputChange}
            />
            <label>Re-password*</label>
            <input
              type="password"
              name="repassword"
              id="repassword"
              placeholder="Confirm your password"
              required
              value={user.repassword}
              onChange={handleInputChange}
            />
            <button type="submit">Signup</button>
            <p>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

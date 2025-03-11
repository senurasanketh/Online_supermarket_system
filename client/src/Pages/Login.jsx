import React from "react";
import "../Css/login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <form>
          <h2 align="center">Login</h2>
          <br></br>
          <label>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <button type="submit">Login</button>
          <p>
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

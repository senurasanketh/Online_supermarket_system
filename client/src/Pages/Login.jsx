import React from "react";

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <label>Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        required
      ></input>
    </div>
  );
}

export default Login;

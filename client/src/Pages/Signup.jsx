import React from "react";
import "../Css/signup.css";

function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <form>
          <h2>Signup</h2>
          <label>Name</label>
          <input type="text" name="name" id="name" required />

          <label>Email</label>
          <input type="email" name="email" id="email" required />

          <label>Address</label>
          <input type="text" name="address" id="address" required />

          <label>Phone No</label>
          <input
            type="text"
            name="phoneNo"
            id="phoneNo"
            pattern="[0-9]{10}"
            required
          />

          <label>Password</label>
          <input type="password" name="password" id="password" required />

          <label>Re-password</label>
          <input type="password" name="repassword" id="repassword" required />

          <button type="submit">Signup</button>

          <p>
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

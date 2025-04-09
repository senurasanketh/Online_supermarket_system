// controllers/AuthController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

const signup = async (req, res) => {
  console.log("signup::>", req.body);
  try {
    const { name, email, address, phoneno, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      address,
      phoneno,
      password: hashedPassword,
      role: "2", // Default role is "user" (can be overridden in request if needed)
    });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  console.log("login req:>", req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    console.log("user::> ", user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token with user ID, email, and role
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // Include role in token
      process.env.SECRET_KEY || "default_secret",
      { expiresIn: "1h" }
    );
    console.log("token::> ", token);

    // Return token and role in response
    res.json({
      message: "Login successful",
      token,
      role: user.role, // Send role to frontend
      user: user, // Send role to frontend
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const protectedRoute = (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}!`, user: req.user });
};

module.exports = { signup, login, protectedRoute };

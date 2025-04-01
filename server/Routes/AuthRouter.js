const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const authenticateToken = require("../middleware/auth");

// Routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/protected", authenticateToken, authController.protectedRoute);

module.exports = router;

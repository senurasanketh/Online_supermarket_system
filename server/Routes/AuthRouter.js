const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

// Routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/protected", authController.protectedRoute);

module.exports = router;

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Email and password are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

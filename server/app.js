//sqPPy5aULRbyQKDS              sankethsenura37
const express = require("express");
const mongoose = require("mongoose");

const UserRouter = require("./Routes/UserRoutes");
const EmployeeRouter = require("./Routes/EmplyeeRoutes");
const SupplierRouter = require("./Routes/SupplierRoutes");
const OrderDetailsRouter = require("./Routes/OrderDetailsRoutes");
const itemRouter = require("./Routes/ItemRoutes");
const authRouter = require("./Routes/AuthRouter");
const fileUpload = require("express-fileupload");

require("dotenv").config();

const app = express();
const cors = require("cors");

//file upload
app.use("/Assets", express.static(__dirname + "/Assets"));
app.use(fileUpload());

// middleware
app.use(express.json());
app.use(cors());
app.use("/users", UserRouter);
app.use("/employees", EmployeeRouter); //(req, res, next)=>{
app.use("/suppliers", SupplierRouter);

app.use("/items", itemRouter);
app.use("/orders", OrderDetailsRouter);
app.use("/auth", authRouter);
// app.use("/Login", itemRouter);
//(req, res, next)=>{
//res.send("It Is Working");
//})

mongoose
  .connect(
    "mongodb+srv://sankethsenura37:sqPPy5aULRbyQKDS@cluster3.ymqxi.mongodb.net/"
  )
  .then(() => console.log("connected to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));

// const mongoose = require("mongoose");
// require("./Model/UserModel");

// const User = mongoose.model("UserModel");

// // app.post("/users", async (req, res) => {
// //   const { name, email, address, phoneno, password, repassword } = req.body;

// //   try {
// //     const user = await User.create({
// //       name,
// //       email,
// //       address,
// //       phoneno,
// //       password,
// //       repassword,
// //     });

// //     res.send({ status: "ok", user });
// //   } catch (err) {
// //     console.error(err);
// //     res.send({ status: "error", message: err.message });
// //   }
// });

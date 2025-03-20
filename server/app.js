//sqPPy5aULRbyQKDS              sankethsenura37
const express = require("express");
const mongoose = require("mongoose");

const UserRouter = require("./Routes/UserRoutes");
const EmployeeRouter = require("./Routes/EmplyeeRoutes");
const SupplierRouter = require("./Routes/SupplierRoutes");
const OrderDetailsRouter = require("./Routes/OrderDetailsRoutes");
const itemRouter = require("./Routes/ItemRoutes");
const fileUpload = require("express-fileupload");

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
app.use("/orders", OrderDetailsRouter);
app.use("/items", itemRouter);
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

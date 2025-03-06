//sqPPy5aULRbyQKDS              sankethsenura37
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/UserRoutes");
const UserRouter = require("./Routes/UserRoutes");

const app = express();

// middleware
app.use("/users", UserRouter); //(req, res, next)=>{
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

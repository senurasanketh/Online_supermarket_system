const express = require("express");
const UserRouter = express.Router();

const User = require("../Model/UserModel");
//insert user controller
const UserControllers = require("../controllers/UserControllers");

UserRouter.get("/", UserControllers.getAllUsers);
UserRouter.post("/", UserControllers.AddUsers);

module.exports = UserRouter;

const express = require("express");
const UserRouter = express.Router();

const User = require("../Model/UserModel");
//insert user controller
const UserControllers = require("../controllers/UserControllers");

UserRouter.get("/", UserControllers.getAllUsers);
UserRouter.post("/", UserControllers.AddUsers);
UserRouter.get("/:id", UserControllers.getById);
UserRouter.put("/updateUser/:id", UserControllers.updateUser);
UserRouter.delete("/deleteUser/:id", UserControllers.deleteUser);

module.exports = UserRouter;

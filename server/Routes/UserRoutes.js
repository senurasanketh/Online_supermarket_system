const express = require("express");
const UserRouter = express.Router();

const User = require("../Model/UserModel");
//insert user controller
const UserControllers = require("../controllers/UserControllers");

UserRouter.get("/getallusers", UserControllers.getAllUsers);
UserRouter.post("/addusers", UserControllers.AddUsers);
UserRouter.get("/:id", UserControllers.getById);
UserRouter.put("/updateUser/:id", UserControllers.updateUser);
UserRouter.delete("/deleteUser/:id", UserControllers.deleteUser);
UserRouter.put("/handleUpdatePicture", UserControllers.handleUpdatePicture);
// UserRouter.post("/login", UserControllers.Login);

module.exports = UserRouter;

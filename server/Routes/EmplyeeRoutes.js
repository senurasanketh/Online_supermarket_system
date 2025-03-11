const express = required("express");
const EmployeeRouter = express.Router();

const Employee = require("../Model/EmployeeModel");
const EmployeeController = require("../controllers/EmployeeControllers");

UserRouter.get("/", UserControllers.getAllEmployees);
module.exports = EmployeeRouter;

const express = require("express");
const EmployeeRouter = express.Router();
const EmployeeController = require("../controllers/EmployeeControllers");

EmployeeRouter.post("/CreateEmployee", EmployeeController.addEmployees);
EmployeeRouter.get("/", EmployeeController.getAllEmployees);
EmployeeRouter.get(
  "/getEmployeeDetailsByID/:id",
  EmployeeController.employeegetById
);
EmployeeRouter.put("/updateEmployee/:id", EmployeeController.updateEmployee);
EmployeeRouter.delete("/deleteEmployee/:id", EmployeeController.deleteEmployee);

module.exports = EmployeeRouter;

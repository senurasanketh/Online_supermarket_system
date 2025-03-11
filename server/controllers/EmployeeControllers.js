const Employee = require("../Model/EmployeeModel");

const getAllEmployees = async (req, res, next) => {
  let employees;
  try {
    employees = await Employee.find();
  } catch (err) {
    console.log(err);
  }
  if (!employees) {
    return res.status(404).json({ message: "Employee not found" });
  }
  return res.status(200).json({ employees });
};

exports.getAllEmployees = getAllEmployees;

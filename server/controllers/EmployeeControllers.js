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

const addEmployees = async (req, res, next) => {
  const { name, email, address, nic, age, role, status } = req.body;

  try {
    const employees = new Employee({
      name,
      email,
      address,
      nic,
      age,
      Role: role,
      status,
    });
    await employees.save();
    return res.status(200).send({ employees });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const employeegetById = async (req, res, next) => {
  const id = req.params.id;
  let employees;

  try {
    employees = await Employee.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!employees) {
    return res.status(404).send({ message: "unable to employee" });
  }
  return res.status(200).json({ employees });
};

const updateEmployee = async (req, res, next) => {
  const id = req.params.id;
  const { name, address, age } = req.body;
  let employees;
  try {
    employees = await Employee.findByIdAndUpdate(id, {
      name: name,
      address: address,
      age: age,
    });
    employees = await employees.save();
  } catch (err) {
    console.log(err);
  }
  if (!employees) {
    return res.status(404).send({ message: "unable to user " });
  }
  return res.status(200).json({ employees });
};

const deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  let employees;
  try {
    employees = await Employee.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!employees) {
    return res.status(404).send({ message: "unable to user" });
  }
  return res.status(200).json({ employees });
};

exports.addEmployees = addEmployees;
exports.getAllEmployees = getAllEmployees;
exports.employeegetById = employeegetById;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("EmployeeModel", employeeSchema);

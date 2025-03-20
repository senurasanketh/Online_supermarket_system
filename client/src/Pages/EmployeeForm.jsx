import React, { useState } from "react";
import Nav from "../Components/Navbar/Nav";
import "../Css/employeeform.css"; // Import external CSS
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeForm() {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    address: "",
    nic: "",
    age: "",
    role: "",
    status: 0,
  });

  const HandleChange = (e) => {
    const target = e.target;
    const value = target.value;
    setEmployeeData({
      ...employeeData,
      [e.target.name]: value,
    });
  };

  function AddEmployees(e) {
    e.preventDefault();

    const employeeModel = {
      name: employeeData.name,
      email: employeeData.email,
      address: employeeData.address,
      nic: employeeData.nic,
      age: employeeData.age,
      role: employeeData.role,
      status: 1,
    };

    axios
      .post("http://localhost:5000/employees/CreateEmployee", employeeModel)
      .then((res) => {
        if (res.data.employees._id) {
          navigate("/employee");
        }
      });
  }

  function ClearData(e) {
    setEmployeeData({
      ...employeeData,
      name: "",
      email: "",
      address: "",
      nic: "",
      age: "",
      role: "",
      status: 0,
    });
  }

  return (
    <>
      <Nav />
      <div className="employee-form-container">
        <div>
          <form className="employee-form">
            <h3>Employee Form</h3>
            <label>Employee Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={employeeData.name}
              placeholder="Enter the name"
              onChange={(e) => HandleChange(e)}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={employeeData.email}
              placeholder="Enter the email"
              onChange={(e) => HandleChange(e)}
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter the Address"
              value={employeeData.address}
              onChange={(e) => HandleChange(e)}
            />

            <label>NIC</label>
            <input
              type="text"
              name="nic"
              id="nic"
              placeholder="Enter the NIC"
              value={employeeData.nic}
              onChange={(e) => HandleChange(e)}
            />

            <label>Age</label>
            <input
              type="text"
              name="age"
              id="age"
              placeholder="Enter the Age"
              value={employeeData.age}
              onChange={(e) => HandleChange(e)}
            />

            <label>Role</label>
            <select
              name="role"
              id="role"
              value={employeeData.role}
              onChange={(e) => HandleChange(e)}
            >
              <option value="">Select a Role</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
              <option value="Hourly Worker">Hourly Worker</option>
              <option value="Cashier">Cashier</option>
            </select>

            <button type="submit" onClick={(e) => AddEmployees(e)}>
              Add
            </button>
            <button type="button" onClick={(e) => ClearData(e)}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmployeeForm;

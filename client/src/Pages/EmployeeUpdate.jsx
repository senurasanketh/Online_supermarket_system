import React, { useEffect, useState } from "react";
import "../Css/employeeupdate.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../Components/Navbar/Nav";

function EmployeeUpdate() {
  const navigate = useNavigate();
  const updateID = useParams();
  console.log("updateID:> ", updateID);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    address: "",
    nic: "",
    age: "",
    role: "",
    status: 0,
  });

  useEffect(() => {
    GetEmployeeDetailsByID();
  }, []);

  function HandleChange(e) {
    const target = e.target;
    const value = target.value;
    setEmployeeData({
      ...employeeData,
      [e.target.name]: value,
    });
  }

  function UpdateEmployees(e) {
    e.preventDefault();
    const UpdateModel = {
      name: employeeData.name,
      address: employeeData.address,
      age: employeeData.age,
    };

    axios
      .put(
        `http://localhost:5000/employees/updateEmployee/${updateID.update}`,
        UpdateModel
      )
      .then((res) => {
        if (res.status == 200) {
          navigate("/Employee");
          ClearData(e);
        }
      });
  }

  function GetEmployeeDetailsByID() {
    axios
      .get(
        `http://localhost:5000/employees/getEmployeeDetailsByID/${updateID.update}`
      )
      .then((res) => {
        console.log("res::> ", res.data);
        setEmployeeData({
          ...employeeData,
          name: res.data.employees.name,
          email: res.data.employees.email,
          address: res.data.employees.address,
          nic: res.data.employees.nic,
          age: res.data.employees.age,
        });
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
            <h3>Update Employee Form</h3>
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
              placeholder="********"
              onChange={(e) => HandleChange(e)}
              readOnly="true"
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
              placeholder="********"
              value={employeeData.nic}
              onChange={(e) => HandleChange(e)}
              readOnly="true"
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

            <button type="submit" onClick={(e) => UpdateEmployees(e)}>
              Update
            </button>
            <button type="button" onClick={() => navigate("/Employee")}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmployeeUpdate;

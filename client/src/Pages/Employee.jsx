import React, { useEffect, useState } from "react";
import Nav from "../Components/Navbar/Nav";
import axios from "axios";
import "../Css/employeedetails.css"; // Import the external CSS file
import { useNavigate } from "react-router-dom";

function EmployeeDetails() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchHandler();
  }, []);

  const fetchHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5000/employees");
      if (res.data.employees.length > 0) {
        setEmployees(res.data.employees);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/EmployeeUpdate/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(
          `http://localhost:5000/employees/deleteEmployee/${id}`
        );
        fetchHandler();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  function AddEmployee() {
    navigate("/EmployeeForm");
  }

  return (
    <div className="employee-container">
      <Nav />
      <h2>Employee Details</h2>
      <div style={{ marginTop: "20px" }}>
        <button className="delete-btn" onClick={() => AddEmployee()}>
          Add User
        </button>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>NIC</th>
            <th>Age</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td>{employee.nic}</td>
                <td>{employee.age}</td>
                <td>{employee.Role}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(employee._id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No Employees Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDetails;

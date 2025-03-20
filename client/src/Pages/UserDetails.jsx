import React, { useEffect, useState } from "react";
import Nav from "../Components/Navbar/Nav";
import axios from "axios";
import "../Css/employeedetails.css"; // Import the external CSS file
import { useNavigate } from "react-router-dom";

function UserDetails() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchHandler();
  }, []);

  const fetchHandler = async () => {
    try {
      const res = await axios.get("http://Localhost:5000/users");
      if (res.data.employees.length > 0) {
        setUsers(res.data.employees);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://Localhost:5000/users/deleteUser/${id}`);
        fetchHandler();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className="employee-container">
      <Nav />
      <h2>Users Details</h2>
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
          {users.length > 0 ? (
            users.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.nic}</td>
                <td>{user.age}</td>
                <td>{user.Role}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(user._id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No users Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;

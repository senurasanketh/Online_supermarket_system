import React, { useEffect, useState } from "react";
import Nav from "../Components/Navbar/Nav";
import axios from "axios";
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
    <>
      <Nav />
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <div
          style={{
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#333",
              marginBottom: "30px",
              fontSize: "2.5rem",
            }}
          >
            Employee Details
          </h1>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={AddEmployee}
              style={{
                backgroundColor: "#e6d600",
                color: "#000",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#d4c400")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#e6d600")}
            >
              Add Employee
            </button>
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f5f5f5",
                  borderBottom: "2px solid #ddd",
                }}
              >
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Address
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  NIC
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Age
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Role
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid #ddd",
                      backgroundColor:
                        i % 2 === 0
                          ? "transparent"
                          : "rgba(245, 245, 245, 0.5)",
                    }}
                  >
                    <td style={{ padding: "12px" }}>{i + 1}</td>
                    <td style={{ padding: "12px" }}>{employee.name}</td>
                    <td style={{ padding: "12px" }}>{employee.email}</td>
                    <td style={{ padding: "12px" }}>{employee.address}</td>
                    <td style={{ padding: "12px" }}>{employee.nic}</td>
                    <td style={{ padding: "12px" }}>{employee.age}</td>
                    <td style={{ padding: "12px" }}>{employee.Role}</td>
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => handleUpdate(employee._id)}
                        style={{
                          backgroundColor: "#e6d600",
                          color: "#000",
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginRight: "10px",
                          transition: "background-color 0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#d4c400")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#e6d600")
                        }
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(employee._id)}
                        style={{
                          backgroundColor: "#f44336",
                          color: "white",
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          transition: "background-color 0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#d32f2f")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#f44336")
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    No Employees Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetails;

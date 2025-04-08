import React, { useEffect, useState } from "react";
import Nav from "../Components/Navbar/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Supplier() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchHandler();
  }, []);

  const fetchHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5000/suppliers");
      if (res.data.suppliers.length > 0) {
        setSuppliers(res.data.suppliers);
      }
    } catch (error) {
      console.error("error fetching supplier data", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/SupplierUpdate/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await axios.delete(
          `http://localhost:5000/suppliers/deletesupplier/${id}`
        );
        fetchHandler();
      } catch (error) {
        console.error("Error deleting supplier:", error);
      }
    }
  };

  function AddSuppliers() {
    navigate("/SupplierForm");
  }

  return (
    <>
      {" "}
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
            Supplier Details
          </h1>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={AddSuppliers}
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
              Add Supplier
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
                  Id
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
                  Phone No
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Item
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  City
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((supplier, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid #ddd",
                      backgroundColor:
                        i % 2 === 0
                          ? "transparent"
                          : "rgba(245, 245, 245, 0.5)", // Alternating rows
                    }}
                  >
                    <td style={{ padding: "12px" }}>{i + 1}</td>
                    <td style={{ padding: "12px" }}>{supplier.name}</td>
                    <td style={{ padding: "12px" }}>{supplier.email}</td>
                    <td style={{ padding: "12px" }}>{supplier.phoneno}</td>
                    <td style={{ padding: "12px" }}>{supplier.item}</td>
                    <td style={{ padding: "12px" }}>{supplier.city}</td>
                    <td style={{ padding: "12px" }}>{supplier.nic}</td>
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => handleUpdate(supplier._id)}
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
                        onClick={() => handleDelete(supplier._id)}
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
                    No Suppliers Found
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

export default Supplier;

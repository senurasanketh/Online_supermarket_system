import React, { useEffect, useState } from "react";
import Nav from "../Components/Navbar/Nav";
import "../Css/supplierdetails.css"; // Import the CSS file
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
      console.error("eroor fetching employee data", error);
    }
  };
  const handleUpdate = (id) => {
    navigate(`/SupplierUpdate/${id}`);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(
          `http://localhost:5000/suppliers/deletesupplier/${id}`
        );
        fetchHandler();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };
  function AddSuppliers() {
    navigate("/SupplierForm");
  }
  return (
    <div className="supplier-container">
      <Nav />
      <h2>Supplier Details</h2>
      <table className="supplier-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Item</th>
            <th>City</th>
            <th>NIC</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phoneno}</td>
                <td>{supplier.item}</td>
                <td>{supplier.city}</td>
                <td>{supplier.nic}</td>

                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(supplier._id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(supplier._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Employees Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Supplier;

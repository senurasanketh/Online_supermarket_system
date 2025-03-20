import React, { useState } from "react";
import Nav from "../Components/Navbar/Nav";
import "../Css/supplierform.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SupplierForm() {
  const navigate = useNavigate();
  const [supplierData, setSupplierData] = useState({
    name: "",
    email: "",
    phoneno: "",
    item: "",
    city: "",
    nic: "",
    status: "1",
  });

  const HandleChange = (e) => {
    const target = e.target;
    const value = target.value;
    setSupplierData({
      ...supplierData,
      [e.target.name]: value,
    });
  };

  function AddSuppliers(e) {
    e.preventDefault();

    const supplierModel = {
      name: supplierData.name,
      email: supplierData.email,
      phoneno: supplierData.phoneno,
      item: supplierData.item,
      city: supplierData.city,
      nic: supplierData.nic,
      status: 1,
    };
    axios
      .post("http://Localhost:5000/suppliers/addSupplier", supplierModel)
      .then((res) => {
        if (res.data.suppliers._id) {
          navigate("/Supplier");
        }
      });
  }

  function ClearData(e) {
    setSupplierData({
      ...supplierData,
      name: "",
      email: "",
      phoneno: "",
      item: "",
      city: "",
      nic: "",
      status: "0",
    });
  }

  return (
    <>
      <Nav />

      <div className="supplier-form-container">
        <form className="supplier-form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={supplierData.name}
            placeholder="Enter name"
            onChange={(e) => HandleChange(e)}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={supplierData.email}
            onChange={(e) => HandleChange(e)}
          />

          <label>Phone No</label>
          <input
            type="number"
            name="phoneno"
            id="phoneno"
            placeholder="Enter phone number"
            value={supplierData.phoneno}
            onChange={(e) => HandleChange(e)}
          />

          <label>Item</label>
          <input
            type="text"
            name="item"
            id="item"
            placeholder="Enter item name"
            value={supplierData.item}
            onChange={(e) => HandleChange(e)}
          />

          <label>City</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Enter city"
            value={supplierData.city}
            onChange={(e) => HandleChange(e)}
          />

          <label>NIC</label>
          <input
            type="text"
            name="nic"
            id="nic"
            placeholder="Enter NIC"
            value={supplierData.nic}
            onChange={(e) => HandleChange(e)}
          />

          <button
            type="submit"
            className="add-btn"
            onClick={(e) => AddSuppliers(e)}
          >
            Add
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={(e) => ClearData(e)}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default SupplierForm;

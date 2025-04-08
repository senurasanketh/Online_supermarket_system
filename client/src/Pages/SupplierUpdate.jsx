import React, { useEffect, useState } from "react";
import Nav from "../Components/Navbar/Nav";
import { useNavigate, useParams } from "react-router-dom";
import "../Css/supplierupdate.css";
import axios from "axios";
function SupplierUpdate() {
  const navigate = useNavigate();
  const updateID = useParams();
  const [supplierData, setSupplierData] = useState({
    name: "",
    email: "",
    phoneno: "",
    item: "",
    city: "",
    nic: "",
    status: "1",
  });
  useEffect(() => {
    GetSupplierDetailsByID();
  }, []);

  function HandleChange(e) {
    const target = e.target;
    const value = target.value;

    setSupplierData({
      ...supplierData,
      [e.target.name]: value,
    });
  }
  function UpdateSuppliers(e) {
    e.preventDefault();
    const UpdateModel = {
      name: supplierData.name,
      phoneno: supplierData.phoneno,
      item: supplierData.item,
      city: supplierData.city,
    };
    axios
      .put(
        `http://Localhost:5000/suppliers/updateSupplier/${updateID.update}`,
        UpdateModel
      )
      .then((res) => {
        if (res.status == 200) {
          navigate("/Supplier");
          ClearData(e);
        }
      });
  }

  function GetSupplierDetailsByID() {
    axios
      .get(`http://Localhost:5000/suppliers/getSupplierById/${updateID.update}`)
      .then((res) => {
        console.log("res::> ", res.data);
        setSupplierData({
          ...supplierData,
          name: res.data.suppliers.name,
          email: res.data.suppliers.email,
          phoneno: res.data.suppliers.phoneno,
          item: res.data.suppliers.item,
          city: res.data.suppliers.city,
          nic: res.data.suppliers.nic,
        });
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
      status: 0,
    });
  }
  return (
    <>
      <Nav />
      <div className="supplier-update-container">
        <div className="supplier-update-box">
          <h2>Update Supplier</h2>
          <form>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={(e) => HandleChange(e)}
              value={supplierData.name}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="********"
              onChange={(e) => HandleChange(e)}
              value={supplierData.email}
              readOnly="true"
            />

            <label>Phone No</label>
            <input
              type="number"
              name="phoneno"
              placeholder="Enter Phone No"
              onChange={(e) => HandleChange(e)}
              value={supplierData.phoneno}
            />

            <label>Item</label>
            <input
              type="text"
              name="item"
              placeholder="Enter Item"
              onChange={(e) => HandleChange(e)}
              value={supplierData.item}
            />

            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              onChange={(e) => HandleChange(e)}
              value={supplierData.city}
            />

            <label>NIC</label>
            <input
              type="text"
              name="nic"
              placeholder="********"
              onChange={HandleChange}
              value={supplierData.nic}
              readOnly="true"
            />

            <button type="submit" onClick={(e) => UpdateSuppliers(e)}>
              Update
            </button>
            <button type="button" onClick={() => navigate("/Supplier")}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SupplierUpdate;

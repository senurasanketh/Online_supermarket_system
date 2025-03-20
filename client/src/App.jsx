import { useState } from "react";
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Contactus from "./Pages/Contactus";
import PaymentOption from "./Pages/PaymentOption";
import Addressform from "./Pages/Addressform";
import Footer from "./Components/Footer";
import Myaccount from "./Pages/Myaccount";
import OnlinePayment from "./Pages/OnlinePayment";
import Employee from "./Pages/Employee";
import EmployeeForm from "./Pages/EmployeeForm";

import EmployeeUpdate from "./Pages/EmployeeUpdate";
import SupplierForm from "./Pages/SupplierForm";
import Supplier from "./Pages/Supplier";
import SupplierUpdate from "./Pages/SupplierUpdate";
import UserDetails from "./Pages/UserDetails";
import PaymentDetailsForm from "./Pages/PaymentDetailsForm";
import PaymentDetails from "./Pages/PaymentDetails";
import UserUpdateDetailsFor from "./Pages/UserUpdateDetailsFor";
import ItemAddForm from "./Pages/ItemAddForm";
import Item from "./Pages/Item";
import ItemUpdateForm from "./Pages/ItemUpdateForm";
import Products from "./Pages/Products";
// import CartPage from "./Pages/CartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/PaymentOption" element={<PaymentOption />} />
        <Route path="/Addressform" element={<Addressform />} />
        <Route path="/Myaccount" element={<Myaccount />} />
        <Route path="/OnlinePayment" element={<OnlinePayment />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/EmployeeForm" element={<EmployeeForm />} />
        <Route path="/EmployeeUpdate/:update" element={<EmployeeUpdate />} />
        <Route path="/SupplierForm" element={<SupplierForm />} />
        <Route path="/Supplier" element={<Supplier />} />
        <Route path="/SupplierUpdate/:update" element={<SupplierUpdate />} />
        <Route path="/UserDetails" element={<UserDetails />} />
        <Route path="/PaymentDetailsForm" element={<PaymentDetailsForm />} />
        <Route path="/PaymentDetails" element={<PaymentDetails />} />
        <Route path="/UserUpdateFor" element={<UserUpdateDetailsFor />} />
        <Route path="/ItemAddForm" element={<ItemAddForm />} />
        <Route path="/Item" element={<Item />} />
        <Route path="/ItemUpdateForm/:update" element={<ItemUpdateForm />} />
        <Route path="/Products" element={<Products />} />
        {/* <Route path="/CartPage" element={<CartPage />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;

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

function App() {
  return (
    <>
      {/* <Home />
      <Login />
      <Footer /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/PaymentOption" element={<PaymentOption />} />
        <Route path="/Addressform" element={<Addressform />} />
        <Route path="/Myaccount" element={<Myaccount />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

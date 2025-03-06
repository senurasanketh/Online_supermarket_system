import { useState } from "react";
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import Footer from "./Components/Footer";

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
      </Routes>
    </>
  );
}

export default App;

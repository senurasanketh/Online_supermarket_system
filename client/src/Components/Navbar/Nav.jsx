import React from "react";
import "../../Css/nav.css";
import nav from "../../assets/nav.png";
// import { Link } from "react-router-dom"; c4e1f6

function Nav() {
  return (
    <div className="navbar">
      <img src={nav} />
      <ul>
        <li>
          <a className="nav" href="/">
            {/* <Link to="/mainhome" className="active home-a"> */}
            Home
            {/* </Link> */}
          </a>
        </li>
        <li>
          <a className="nav" href="/product">
            Products
          </a>
        </li>
        <li>
          <a className="nav" href="/contactus">
            Contactus
          </a>
        </li>
        <li>
          <a className="nav" href="/dashboard">
            Dashboard
          </a>
        </li>
        <li>
          <a className="nav" href="/inventory">
            Inventory
          </a>
        </li>
        <li>
          <a className="nav" href="/order">
            Order
          </a>
        </li>
        <li>
          <a className="nav" href="/supplier">
            Supplier
          </a>
        </li>
        <li>
          <a className="nav" href="/payment">
            Payment
          </a>
        </li>
        <li>
          <a className="nav" href="/employee">
            Employee
          </a>
        </li>
        <li>
          <a className="nav" href="/item">
            Item
          </a>
        </li>
        <li>
          <a className="nav" href="/myaccount">
            My Account
          </a>
        </li>
        <li>
          <a className="nav" href="/login">
            Login
          </a>
        </li>
        <li>
          <a className="nav" href="/signup">
            Signup
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Nav;

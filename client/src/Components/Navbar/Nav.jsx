import React from "react";
import "../../Css/nav.css";
// import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navbar">
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
// //<style>
// ul {
//     list-style-type: none;
//     margin: 0;
//     padding: 0;
//     overflow: hidden;
//     background-color: #333;
//   }

//   li {
//     float: left;
//   }

//   li a {
//     display: block;
//     color: white;
//     text-align: center;
//     padding: 14px 16px;
//     text-decoration: none;
//   }

//   li a:hover {
//     background-color: #111;
//   }
//   </style>

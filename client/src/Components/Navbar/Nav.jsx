import React, { useEffect, useState } from "react";
import "../../Css/nav.css";
import nav from "../../assets/nav.png";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role"));
    console.log("role::> ", role);
    setRole(role);
  }, []);

  function logOutFunc() {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/Login");
    window.location.reload();
  }
  return (
    <div className="navbar">
      <img src={nav} />
      <ul>
        {role == "2" || role == "1" ? (
          <li>
            <Link className="nav" to="/">
              {/* <Link to="/mainhome" className="active home-Link"> */}
              Home
              {/* </Link> */}
            </Link>
          </li>
        ) : (
          <></>
        )}
        {role == "2" || role == "1" ? (
          <li>
            <Link className="nav" to="/Products">
              Products
            </Link>
          </li>
        ) : (
          <></>
        )}
        {role == "2" || role == "1" ? (
          <li>
            <Link className="nav" to="/contactus">
              Contactus
            </Link>
          </li>
        ) : (
          <></>
        )}
        {role == "1" || role == "1" ? (
          <li>
            <Link className="nav" to="/dashboard">
              Dashboard
            </Link>
          </li>
        ) : (
          <></>
        )}
        {/* {role == "1" ? (
          <li>
            <Link className="nav" to="/order">
              Order
            </Link>
          </li>
        ) : (
          <></>
        )} */}
        {role == "1" ? (
          <li>
            <Link className="nav" to="/supplier">
              Supplier
            </Link>
          </li>
        ) : (
          <></>
        )}
        {role == "1" ? (
          <li>
            <Link className="nav" to="/PaymentDetails">
              Payment
            </Link>
          </li>
        ) : (
          <></>
        )}
        {role == "1" ? (
          <li>
            <Link className="nav" to="/employee">
              Employee
            </Link>
          </li>
        ) : (
          <></>
        )}
        {role == "1" ? (
          <li>
            <Link className="nav" to="/item">
              Item
            </Link>
          </li>
        ) : (
          <></>
        )}
        {role == "1" || role == "2" ? (
          <li>
            <Link className="nav" to="/myaccount">
              My Account
            </Link>
          </li>
        ) : (
          <></>
        )}
      </ul>

      <ul>
        <li>
          <Link className="nav" to="/login">
            Login
          </Link>
        </li>

        <li>
          <Link className="nav" to="/signup">
            Signup
          </Link>
        </li>

        <li>
          <Link className="nav" to="/login" onClick={logOutFunc}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;

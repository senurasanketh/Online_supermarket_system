import React, { useState } from "react";
import Nav from "../Components/Navbar/Nav";
import Subnav from "../Components/Navbar/Subnav";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Button,
} from "@mui/material";
import "../Css/paymentoption.css"; // Import external CSS
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PaymentDropdown() {
  const navigate = useNavigate();
  const [payment, setPayment] = useState("");

  const handleChange = (event) => {
    setPayment(event.target.value);
  };

  const navigateAddressPage = () => {
    navigate("/Address");
  };

  return (
    <>
      <Nav />
      <Subnav />
      <div style={{ padding: "20px" }}>
        <div>
          <Typography sx={{ fontSize: "30px" }}>Checkout</Typography>
        </div>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Grid item md={6} xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div>
                <h4>Step 1:</h4>
                <h5>Delivery Address</h5>
              </div>
              <Button variant="contained" onClick={() => navigateAddressPage()}>
                Add Address
              </Button>
            </div>

            <Select
              value={payment}
              onChange={handleChange}
              className="payment-dropdown"
            >
              <MenuItem value="credit">
                <a href="Addressform">Credit Card</a>
              </MenuItem>
            </Select>
          </Grid>
          <Grid item md={6} xs={12}>
            <h4>Step 2:</h4>
            <h5>Choose Payment Method</h5>
            <Select
              value={payment}
              onChange={handleChange}
              className="payment-dropdown"
            >
              <MenuItem value="online">
                <a href="#">Online Payment</a>
              </MenuItem>
              <MenuItem value="cod">
                <a href="#">Cash on Delivery</a>
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default PaymentDropdown;

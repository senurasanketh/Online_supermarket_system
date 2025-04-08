import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  CircularProgress,
} from "@mui/material";
import Nav from "../Components/Navbar/Nav";

function PaymentOption() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, orderTotal } = location.state || { cart: [], orderTotal: 0 };
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const isAddressValid = () => {
    return Object.values(address).every((field) => field.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!cart || cart.length === 0) {
      setError("Your cart is empty. Add items before placing an order.");
      return;
    }
    if (!orderTotal || orderTotal <= 0) {
      setError("Order total is invalid.");
      return;
    }
    if (!isAddressValid()) {
      setError("Please fill in all address fields.");
      return;
    }

    const items = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      price: Number(item.price), // Ensure price is a number
      quantity: Number(item.quantity), // Ensure quantity is a number
      image: item.image,
    }));

    const orderData = {
      items,
      total: Number(orderTotal), // Ensure total is a number
      paymentMethod,
      shippingAddress: address,
    };

    if (paymentMethod === "online") {
      navigate("/OnlinePayment", { state: { cart, orderTotal, address } });
    } else if (paymentMethod === "cod") {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/orders/addOrders",
          orderData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        // Axios automatically parses JSON, so response.data is the parsed object
        const data = response.data;
        setLoading(false);
        setSuccessMessage("Order placed successfully! Redirecting...");
        navigate("/Order-Success");
        setTimeout(() => {
          navigate("/Order-Success", {
            state: {
              orderId: data.order.orderId,
              items: cart,
              total: orderTotal,
              deliveryDate: new Date(
                data.order.deliveryDate
              ).toLocaleDateString(),
              address,
              paymentMethod: "cod",
            },
          });
        }, 1000);
      } catch (error) {
        setLoading(false);
        console.error("Error creating COD order:", error);

        // Handle Axios-specific error
        const errorMessage =
          error.response?.data?.message || // Backend-provided message
          error.message || // Axios/network error
          "Failed to place order. Please try again.";
        setError(errorMessage);
      }
    }
  };

  return (
    <>
      <Nav />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Checkout
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Order Total: Rs{orderTotal.toFixed(2)}
          </Typography>
          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="success.main" align="center" sx={{ mb: 2 }}>
              {successMessage}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Full Name"
                name="fullName"
                value={address.fullName}
                onChange={handleAddressChange}
                required
                fullWidth
                disabled={loading}
              />
              <TextField
                label="Street Address"
                name="street"
                value={address.street}
                onChange={handleAddressChange}
                required
                fullWidth
                disabled={loading}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="City"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  required
                  fullWidth
                  disabled={loading}
                />
                <TextField
                  label="State"
                  name="state"
                  value={address.state}
                  onChange={handleAddressChange}
                  required
                  fullWidth
                  disabled={loading}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Zip Code"
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleAddressChange}
                  required
                  fullWidth
                  disabled={loading}
                />
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  required
                  fullWidth
                  disabled={loading}
                />
              </Box>
            </Box>
            <Box sx={{ mt: 4 }}>
              <FormControl component="fieldset" fullWidth disabled={loading}>
                <FormLabel component="legend">Select Payment Method</FormLabel>
                <RadioGroup
                  value={paymentMethod}
                  onChange={handlePaymentChange}
                  name="payment-method"
                >
                  <FormControlLabel
                    value="online"
                    control={<Radio />}
                    label="Online Payment"
                  />
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                {loading ? "Processing..." : "Continue"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/cart")}
                fullWidth
                disabled={loading}
              >
                Back to Cart
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default PaymentOption;

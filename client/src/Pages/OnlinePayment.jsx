import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import Nav from "../Components/Navbar/Nav";
import mater1 from "../assets/mater1.png";
import visa from "../assets/visa card.png";
import "../Css/payment.css";
import {
  Typography,
  Button,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";

function OnlinePayment() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, orderTotal, address } = location.state || {
    cart: [],
    orderTotal: 0,
    address: {},
  };

  const handleCardSelect = (cardType) => {
    setSelectedCard(cardType);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateCardDetails = () => {
    const cardNumberRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!selectedCard) return "Please select a card type";
    if (!cardDetails.cardHolderName.trim())
      return "Cardholder name is required";
    if (!cardNumberRegex.test(cardDetails.cardNumber))
      return "Invalid card number (must be 16 digits)";
    if (!expiryRegex.test(cardDetails.expiryDate))
      return "Invalid expiry date (MM/YY)";
    if (!cvvRegex.test(cardDetails.cvv))
      return "Invalid CVV (must be 3 digits)";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const validationError = validateCardDetails();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    const items = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const orderData = {
      items,
      total: orderTotal,
      paymentMethod: "online",
      shippingAddress: address,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/orders/addOrders",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);

      navigate("/order-success", {
        state: {
          orderId: response.data.order.orderId,
          items: cart,
          total: orderTotal,
          deliveryDate: new Date(
            response.data.order.deliveryDate
          ).toLocaleDateString(),
          address,
          paymentMethod: "online",
        },
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to process payment. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <div className="payment-container1">
          <form className="payment-form" onSubmit={handleSubmit}>
            <Typography variant="h5" align="center" gutterBottom>
              Payment - ${orderTotal.toFixed(2)}
            </Typography>
            {error && (
              <Typography color="error" align="center" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Typography variant="subtitle1">Select Card Type:</Typography>
            <div className="card-type-selection">
              <img
                src={mater1}
                alt="MasterCard"
                className={selectedCard === "mater1" ? "selected" : ""}
                onClick={() => handleCardSelect("mater1")}
                style={{ cursor: "pointer", margin: "0 10px" }}
              />
              <img
                src={visa}
                alt="Visa"
                className={selectedCard === "visa" ? "selected" : ""}
                onClick={() => handleCardSelect("visa")}
                style={{ cursor: "pointer", margin: "0 10px" }}
              />
            </div>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Card Holder's Name"
                name="cardHolderName"
                value={cardDetails.cardHolderName}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={loading}
                margin="normal"
              />
              <TextField
                label="Card Number"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                fullWidth
                required
                inputProps={{ maxLength: 16 }}
                disabled={loading}
                margin="normal"
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Expiry Date (MM/YY)"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  inputProps={{ maxLength: 5 }}
                  disabled={loading}
                  margin="normal"
                />
                <TextField
                  label="CVV"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  inputProps={{ maxLength: 3 }}
                  disabled={loading}
                  margin="normal"
                />
              </Box>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 3 }}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default OnlinePayment;

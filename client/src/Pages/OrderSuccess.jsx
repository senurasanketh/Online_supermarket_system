// OrderSuccess.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Css/ordersuccess.css";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderData = location.state || {
    orderId: "N/A",
    items: [],
    total: 0,
    deliveryDate: "N/A",
    address: {},
    error: null,
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order. We'll process it soon.</p>
        {orderData.error && <p style={{ color: "red" }}>{orderData.error}</p>}

        <div className="order-details">
          <h3>Order Details - #{orderData.orderId}</h3>

          <div className="address-info">
            <strong>Shipping Address:</strong>
            <p>{orderData.address.fullName}</p>
            <p>{orderData.address.street}</p>
            <p>
              {orderData.address.city}, {orderData.address.state}{" "}
              {orderData.address.zipCode}
            </p>
            <p>Phone: {orderData.address.phone}</p>
          </div>

          <div className="item-info">
            {orderData.items.map((item, index) => (
              <span key={index}>
                <strong>Item {index + 1}:</strong> {item.name} - $
                {(item.price * item.quantity).toFixed(2)}
              </span>
            ))}
            <span>
              <strong>Total:</strong> ${orderData.total.toFixed(2)}
            </span>
          </div>

          <div className="payment-info">
            <strong>Estimated Delivery:</strong> {orderData.deliveryDate}
          </div>
        </div>

        <button className="home-button" onClick={handleHomeClick}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;

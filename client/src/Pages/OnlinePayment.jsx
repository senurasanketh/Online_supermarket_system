import React from "react";
import Nav from "../Components/Navbar/Nav";
import master from "../assets/master.png";
import visa from "../assets/visa card.png";
import "../Css/payment.css"; // Import external CSS

function OnlinePayment() {
  return (
    <>
      <Nav />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="payment-container1">
          <form className="payment-form">
            <h3>Payment</h3>
            <h4>Saved Card:</h4>
            <div className="card-icons">
              <img src={master} alt="MasterCard" />
              <label>Master Card:</label>
              <input type="text" placeholder="Card Number" />
            </div>
            <div className="card-icons">
              <img src={visa} alt="Visa Card" />
              <label>Visa Card:</label>
              <input type="text" placeholder="Card Number" />
            </div>
          </form>

          <form className="payment-form">
            <h3>Add New Card</h3>
            <label>Card Holder's Name:</label>
            <input type="text" placeholder="Enter the name" />

            <label>Card Number:</label>
            <input type="text" placeholder="Enter the card number" />

            <label>Date</label>
            <input type="text" placeholder="MM/YY" />

            <label>CVV</label>
            <input type="text" placeholder="CVV" />

            <button type="submit">Add Card</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default OnlinePayment;

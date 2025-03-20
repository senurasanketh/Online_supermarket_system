import React from "react";
import Nav from "../Components/Navbar/Nav";

function PaymentDetailsForm() {
  return (
    <>
      <Nav />
      <div className="supplier-form-container">
        <form className="supplier-form">
          <label>Payment ID</label>
          <input
            type="text"
            name="name"
            id="name"
            // value={paymentData.name}
            // placeholder="Enter name"
            // onChange={(e) => HandleChange(e)}
          />

          <label>Order ID</label>
          <input
            type="text"
            name="orderid"
            id="orderid"
            placeholder="Enter orderid"
            // value={paymentData.orderid}
            // onChange={(e) => HandleChange(e)}
          />

          <label>Customer</label>
          <input
            type="text"
            name="customer"
            id="customer"
            placeholder="Enter phone number"
            // value={paymentData.customer}
            // onChange={(e) => HandleChange(e)}
          />

          <label>Amount</label>
          <input
            type="text"
            name="amount"
            id="amount"
            placeholder="Enter amount name"
            // value={paymentData.amount}
            // onChange={(e) => HandleChange(e)}
          />

          <label>Date</label>
          <input
            type="text"
            name="date"
            id="date"
            placeholder="Enter date"
            // value={paymentData.date}
            // onChange={(e) => HandleChange(e)}
          />

          <button
            type="submit"
            className="add-btn"
            onClick={(e) => AddSuppliers(e)}
          >
            Add
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={(e) => ClearData(e)}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default PaymentDetailsForm;

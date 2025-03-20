import React, { useEffect, useState } from "react";
import Nav from "../Components/Navbar/Nav";
import "../Css/supplierdetails.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentDetails() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchHandler();
  }, []);

  const fetchHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5000/payments");
      if (res.data.payments.length > 0) {
        setPayments(res.data.payments);
      }
    } catch (error) {
      console.error("eroor fetching employee data", error);
    }
  };
  const handleUpdate = (id) => {
    navigate(`/SupplierUpdate/${id}`);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(
          `http://localhost:5000/employees/deletesupplier/${id}`
        );
        fetchHandler();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };
  function AddSuppliers() {
    navigate("/SupplierForm");
  }
  return (
    <div className="supplier-container">
      <Nav />
      <h2>Payment Details</h2>
      <table className="supplier-table">
        <thead>
          <tr>
            <th>Payment Id</th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{payment.paymentid}</td>
                <td>{payment.orderid}</td>
                <td>{payment.customer}</td>
                <td>{payment.amount}</td>
                <td>{payment.date}</td>

                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(payment._id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(payment._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Employees Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentDetails;

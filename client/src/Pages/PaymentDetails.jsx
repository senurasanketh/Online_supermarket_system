import React, { useEffect, useState } from "react";
import Nav from "../Components/Navbar/Nav";
import "../Css/supplierdetails.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentDetails() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Assuming we'll use the getOrdersTable endpoint from the previous controller
      const res = await axios.get("http://localhost:5000/orders/getdetails");

      if (res.data.orders.length > 0) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  console.log("orders::> ", orders);

  // const handleUpdate = (orderId) => {
  //   navigate(`/OrderUpdate/${orderId}`);
  // };

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/orders/delete/${orderId}`);
        fetchOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
        setError("Failed to delete order. Please try again.");
      }
    }
  };

  const handleAddOrder = () => {
    navigate("/OrderForm");
  };

  return (
    <>
      {" "}
      <Nav />
      <div className="supplier-container">
        <div className="header-section">
          <h2>Order Payment Details</h2>
          {/* <button className="add-btn" onClick={handleAddOrder}>
          Add New Order
        </button> */}
        </div>

        {error && <div className="error-message">{error}</div>}

        <table className="supplier-table">
          <thead>
            <tr>
              <th>#</th>
              {/* <th>Order ID</th> */}
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>City</th>
              <th>Items</th>
              <th>Date</th>
              <th>Delivery Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10">Loading..</td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.orderId}>
                  <td>{index + 1}</td>
                  {/* <td>{order.orderId}</td> */}
                  <td>{order.shippingAddress.fullName || "Guest"}</td>
                  <td>{order.total}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.shippingAddress.city}</td>
                  <td>
                    {order.items && Array.isArray(order.items) ? (
                      <ol className="items-list">
                        {order.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            {item.name} - Qty: {item.quantity} - Rs
                            {(item.price * item.quantity).toFixed(2)}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      "No items"
                    )}
                  </td>
                  {/* <td>{order.itemCount}</td> */}
                  <td>{order.createdAt.split("T")[0]}</td>
                  <td>{order.deliveryDate.split("T")[0]}</td>
                  <td>
                    {/* <button
                    className="update-btn"
                    onClick={() => handleUpdate(order.orderId)}
                  >
                    Update
                  </button> */}
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No Orders Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PaymentDetails;

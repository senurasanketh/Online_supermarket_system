import React, { useEffect, useState } from "react";
import Nav from "../Components/Navbar/Nav";
import axios from "axios";
import "../Css/employeedetails.css"; // Import the external CSS file
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Dialog, DialogTitle, IconButton } from "@mui/material";

function Item() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [handleOpen, setHandleOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchHandler();
  }, []);

  const fetchHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5000/items");
      if (res.data.items.length > 0) {
        setItems(res.data.items);
      }
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/ItemUpdateForm/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/items/deleteItem/${id}`);

        fetchHandler();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  function AddItem() {
    navigate("/ItemAddForm");
  }

  const ViewImage = (image) => {
    setImageUrl(image);
    setHandleOpen(true);
  };

  function close() {
    setHandleOpen(false);
    setImageUrl("");
  }

  return (
    <div className="employee-container">
      <Nav />
      <h2>Item Details</h2>
      <div style={{ marginTop: "20px" }}>
        <button className="delete-btn" onClick={() => AddItem()}>
          Add Item
        </button>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>itemcode</th>
            <th>quantity</th>
            <th>price</th>
            <th>category</th>
            <th>image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.itemcode}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <IconButton onClick={() => ViewImage(item.image)}>
                    <VisibilityOutlinedIcon sx={{ color: "black" }} />
                  </IconButton>
                </td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(item._id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No item Found</td>
            </tr>
          )}
        </tbody>
      </table>

      <Dialog onClose={close} open={handleOpen}>
        <img
          src={`http://localhost:5000/Assets/${imageUrl}`}
          height="auto"
          width="200px"
        />
      </Dialog>
    </div>
  );
}

export default Item;

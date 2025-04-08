import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../Components/Navbar/Nav";
import "../Css/itemupdate.css";

function ItemUpdateForm() {
  const navigate = useNavigate();
  const { update } = useParams(); // Extract item ID from URL
  console.log("update::> ", update);
  const [itemData, setItemData] = useState({
    name: "",
    itemcode: "",
    quantity: "",
    price: "",
    category: "",
    image: "", // Store image filename
    imagePreview: "", // Store preview URL
  });

  // Fetch item details by ID when component mounts
  useEffect(() => {
    GetItemDetailsByID();
  }, []);

  // Fetch existing item details from the server
  function GetItemDetailsByID() {
    axios
      .get(`http://localhost:5000/items/itemgetById/${update}`)
      .then((res) => {
        const item = res.data.items;
        setItemData({
          name: item.name,
          itemcode: item.itemcode,
          quantity: item.quantity,
          price: item.price,
          category: item.category,
          image: item.image, // Set existing image filename
          imagePreview: item.image
            ? `http://localhost:5000/uploads/${item.image}`
            : "", // Display image if exists
        });
      })
      .catch((err) => console.error("Error fetching item:", err));
  }

  // Handle form input changes
  function HandleChange(e) {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    });
  }

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItemData({
        ...itemData,
        image: file, // Store the selected file
        imagePreview: URL.createObjectURL(file), // Generate preview URL
      });
    }
  };

  // Handle item update
  function UpdateItem(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", itemData.name);
    formData.append("quantity", itemData.quantity);
    formData.append("price", itemData.price);
    formData.append("image", itemData.image); // Append new image if selected

    axios
      .put(`http://localhost:5000/items/updateItem/${update}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Required for file upload
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Item updated successfully!");
          navigate("/Item");
        }
      })
      .catch((err) => console.error("Error updating item:", err));
  }

  return (
    <>
      <Nav />
      <div className="item-update-container">
        <form className="item-update-box" onSubmit={UpdateItem}>
          <h3>Update Item Form</h3>

          {/* Name Field */}
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={itemData.name}
            placeholder="Enter the name"
            onChange={HandleChange}
          />

          {/* Item Code Field (Read-Only) */}
          <label>Item Code</label>
          <input
            type="text"
            name="itemcode"
            value={itemData.itemcode}
            readOnly
          />

          {/* Quantity Field */}
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            value={itemData.quantity}
            placeholder="Enter the quantity"
            onChange={HandleChange}
          />

          {/* Price Field */}
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={itemData.price}
            placeholder="Enter the price"
            onChange={HandleChange}
          />

          {/* Category Field (Read-Only) */}
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={itemData.category}
            readOnly
          />

          {/* Image Upload Field */}
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {/* Image Preview */}
          {itemData.imagePreview && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={itemData.imagePreview}
                alt="Preview"
                className="image-preview"
                height="auto"
                width="200px"
              />
            </div>
          )}

          {/* Buttons */}
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate("/Item")}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default ItemUpdateForm;

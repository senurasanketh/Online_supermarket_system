import React, { useState } from "react";
import Nav from "../Components/Navbar/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/itemaddform.css";

function ItemAddForm() {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({
    name: "",
    itemcode: "",
    quantity: "",
    price: "",
    category: "",
    image: null,
    imagePreview: null,
  });
  const [error, setError] = useState(null); // Added error state

  const HandleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItemData({
        ...itemData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleCategoryChange = (e) => {
    // Added category handler
    setItemData({
      ...itemData,
      category: e.target.value,
    });
  };

  const AddItems = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    const formData = new FormData();
    formData.append("name", itemData.name);
    formData.append("itemcode", itemData.itemcode);
    formData.append("quantity", itemData.quantity);
    formData.append("price", itemData.price);
    formData.append("category", itemData.category);
    if (itemData.image) {
      formData.append("image", itemData.image); // This matches backend expectation
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/items/AddItem",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("res::> ", response.data);
      navigate("/item");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add item");
      console.error("Error:", err);
    }
  };

  const ClearData = () => {
    setItemData({
      name: "",
      itemcode: "",
      quantity: "",
      price: "",
      category: "",
      image: null,
      imagePreview: null,
    });
    setError(null);
  };

  return (
    <>
      <Nav />
      <div className="supplier-form-container">
        <form className="supplier-form" onSubmit={AddItems}>
          <h3>Item Add Form</h3>
          {error && <div className="error-message">{error}</div>}{" "}
          {/* Error display */}
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter item name"
            value={itemData.name}
            onChange={HandleChange}
          />
          <label>Item Code</label>
          <input
            type="text"
            name="itemcode"
            placeholder="Enter item code"
            value={itemData.itemcode}
            onChange={HandleChange}
          />
          <label>Quantity</label>
          <input
            type="number" // Changed to number type
            name="quantity"
            placeholder="Enter quantity"
            value={itemData.quantity}
            onChange={HandleChange}
          />
          <label>Price</label>
          <input
            type="number" // Changed to number type
            name="price"
            placeholder="Enter price"
            value={itemData.price}
            onChange={HandleChange}
          />
          <label>Category</label>
          <select
            name="category"
            value={itemData.category}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="Diary">Diary</option>
            <option value="Beverages">Beverages</option>
            <option value="Food Cupboard">Food Cupboard</option>
            <option value="House Hold">House Hold</option>
          </select>
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
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
          <button type="submit" className="add-btn">
            Add
          </button>
          <button type="button" className="cancel-btn" onClick={ClearData}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default ItemAddForm;

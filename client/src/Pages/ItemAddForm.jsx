import React, { useState } from "react";
import Nav from "../Components/Navbar/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/itemaddform.css"; // Import your CSS file

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

  // Handle input change
  const HandleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItemData({
        ...itemData,
        image: file,
        imagePreview: URL.createObjectURL(file), // Preview image
      });
    }
  };

  function AddItems(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", itemData.name);
    formData.append("itemcode", itemData.itemcode);
    formData.append("quantity", itemData.quantity);
    formData.append("price", itemData.price);
    formData.append("category", itemData.category);
    formData.append("image", itemData.image);

    axios.post("http://localhost:5000/items/AddItem", formData).then((res) => {
      console.log("res::> ", res);
    });
  }

  function ClearData() {
    setItemData({
      name: "",
      itemcode: "",
      quantity: "",
      price: "",
      category: "",
      image: null,
      imagePreview: null,
    });
  }

  return (
    <>
      <Nav />
      <div className="supplier-form-container">
        <form className="supplier-form">
          <h3>Item Add Form</h3>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter item name"
            value={itemData.name}
            onChange={(e) => HandleChange(e)}
          />

          <label>Item Code</label>
          <input
            type="text"
            name="itemcode"
            placeholder="Enter item code"
            value={itemData.itemcode}
            onChange={(e) => HandleChange(e)}
          />

          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            placeholder="Enter quantity"
            value={itemData.quantity}
            onChange={(e) => HandleChange(e)}
          />

          <label>Price</label>
          <input
            type="text"
            name="price"
            placeholder="Enter price"
            value={itemData.price}
            onChange={(e) => HandleChange(e)}
          />

          <label>Category</label>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={itemData.category}
            onChange={(e) => HandleChange(e)}
          />

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

          <button type="submit" className="add-btn" onClick={AddItems}>
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

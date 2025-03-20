import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../Components/Navbar/Nav";
import "../Css/itemupdate.css";

function ItemUpdateForm() {
  const navigate = useNavigate();
  const updateID = useParams();
  const [itemData, setItemData] = useState({
    name: "",
    itemcode: "",
    quantity: "",
    price: "",
    category: "",
    image: "",
  });

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
  useEffect(() => {
    GetItemDetailsByID();
  }, []);

  function HandleChange(e) {
    const target = e.target;
    const value = target.value;
    setItemData({
      ...itemData,
      [e.target.name]: value,
    });
  }

  function UpdateItem(e) {
    e.preventDefault();
    const UpdateModel = {
      name: itemData.name,
      quantity: itemData.quantity,
      price: itemData.price,
      image: itemData.image,
    };
    axios
      .put(
        `http://localhost:5000/items/updateItem/${updateID.update}`,
        UpdateModel
      )
      .then((res) => {
        if (res.status == 200) {
          navigate("/Item");
          ClearData(e);
        }
      });
  }

  function GetItemDetailsByID() {
    axios
      .get(`http://localhost:5000/items/itemgetById/${updateID.update}`)
      .then((res) => {
        console.log("res::> ", res.data);
        setItemData({
          ...itemData,
          name: res.data.items.name,
          itemcode: res.data.items.itemcode,
          quantity: res.data.items.quantity,
          price: res.data.items.price,
          category: res.data.items.category,
          image: res.data.items.image,
        });
      });
  }

  function ClearData(e) {
    setItemData({
      ...itemData,
      name: "",
      itemcode: "",
      quantity: "",
      price: "",
      category: "",
    });
  }
  return (
    <>
      <Nav />
      <div className="item-update-container">
        <form className="item-update-box">
          <h3>Update Item Form</h3>
          <label> Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={itemData.name}
            placeholder="Enter the name"
            onChange={HandleChange}
          />

          <label> ItemCode</label>
          <input
            type="text"
            name="itemcode"
            id="itemcode"
            value={itemData.itemcode}
            placeholder="Enter the itemcode"
            readOnly
          />

          <label> Quantity</label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            value={itemData.quantity}
            placeholder="Enter the quantity"
            onChange={HandleChange}
          />

          <label> Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={itemData.price}
            placeholder="Enter the price"
            onChange={HandleChange}
          />

          <label> Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={itemData.category}
            placeholder="Enter the category"
            readOnly
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

          <button type="submit" onClick={UpdateItem}>
            Update
          </button>
          <button type="button" onClick={() => navigate("/Item")}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default ItemUpdateForm;

import React from "react";
import "../Css/addressform.css"; // Import the CSS file
import Nav from "../Components/Navbar/Nav";
function Addressform() {
  return (
    <>
      <Nav />
      <div className="address-container">
        <div className="address-box">
          <form>
            <h3>Address Form</h3>

            <label>Customer Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />

            <label>Mobile No*</label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              placeholder="Enter your Phone number"
              required
            />

            <label>Address*</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your Address"
              required
            />

            <label>City*</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter your city"
              required
            />

            <label>Locality*</label>
            <input
              type="text"
              id="locality"
              name="locality"
              placeholder="Enter your locality"
              required
            />

            <label>Save Address As</label>
            <select>
              <option>Home</option>
              <option>Work</option>
              <option>Other</option>
            </select>

            <button type="submit">Add</button>
            <button type="cancel">Cancel</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addressform;

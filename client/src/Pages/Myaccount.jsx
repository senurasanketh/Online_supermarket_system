import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Navbar/Nav";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userID: "",
    name: "",
    email: "",
    address: "",
    phoneno: "",
    profilePicture: "",
  });
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("No user data found");
      setUser({
        userID: user._id,
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        phoneno: user.phoneno || "",
        profilePicture: user.profileImage || "",
      });
    } catch (err) {
      console.error("Profile fetch error:", err);
      navigate("/login");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdatePicture = async (e) => {
    e.preventDefault();
    if (!newProfilePic) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", newProfilePic);
    formData.append("userID", user.userID);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await axios.put(
        "http://localhost:5000/users/handleUpdatePicture",
        formData
      );

      if (response.data && response.data.updatedUser) {
        const updatedUser = {
          ...user,
          profilePicture: response.data.updatedUser.profileImage,
        };
        setUser(updatedUser);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("user")),
            profileImage: response.data.updatedUser.profileImage,
          })
        );
        setPreviewImage(null);
        setNewProfilePic(null);
        alert("Profile picture updated successfully!");
      }
    } catch (err) {
      alert(
        "Failed to update picture: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <Nav />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "400px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#333", marginBottom: "20px" }}>User Profile</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <img
                src={
                  previewImage ||
                  `http://localhost:5000/Assets/profilePicture/${
                    user.profilePicture
                  }?t=${Date.now()}`
                }
                alt="Profile"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #e6d600",
                }}
              />
            </div>
            <div style={{ textAlign: "left", width: "100%" }}>
              <p style={{ margin: "10px 0", color: "#555" }}>
                <strong>Name:</strong> {user.name}
              </p>
              <p style={{ margin: "10px 0", color: "#555" }}>
                <strong>Email:</strong> {user.email}
              </p>
              <p style={{ margin: "10px 0", color: "#555" }}>
                <strong>Address:</strong> {user.address}
              </p>
              <p style={{ margin: "10px 0", color: "#555" }}>
                <strong>Phone No:</strong> {user.phoneno}
              </p>
            </div>
          </div>

          {/* Update Profile Picture */}
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ color: "#333", marginBottom: "10px" }}>
              Update Profile Picture
            </h3>
            <form
              onSubmit={handleUpdatePicture}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  padding: "5px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#e6d600",
                  color: "#fff",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#d4c200")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#e6d600")}
              >
                Upload New Picture
              </button>
            </form>
          </div>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#e6d600",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "20px",
              width: "100%",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#d4c200")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e6d600")}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;

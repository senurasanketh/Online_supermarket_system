import React, { useEffect, useState } from "react";
import Nav from "../Components/Navbar/Nav";
import axios from "axios";
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
    <>
      {" "}
      <Nav />
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <div
          style={{
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#333",
              marginBottom: "30px",
              fontSize: "2rem",
            }}
          >
            Item Details
          </h2>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={AddItem}
              style={{
                backgroundColor: "#e6d600",
                color: "#000",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#d4c400")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#e6d600")}
            >
              Add Item
            </button>
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f5f5f5",
                  borderBottom: "2px solid #ddd",
                }}
              >
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Item Code
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Category
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Image
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid #ddd",
                      backgroundColor:
                        i % 2 === 0
                          ? "transparent"
                          : "rgba(245, 245, 245, 0.5)",
                    }}
                  >
                    <td style={{ padding: "12px" }}>{i + 1}</td>
                    <td style={{ padding: "12px" }}>{item.name}</td>
                    <td style={{ padding: "12px" }}>{item.itemcode}</td>
                    <td style={{ padding: "12px" }}>{item.quantity}</td>
                    <td style={{ padding: "12px" }}>{item.price}</td>
                    <td style={{ padding: "12px" }}>{item.category}</td>
                    <td style={{ padding: "12px" }}>
                      <IconButton onClick={() => ViewImage(item.image)}>
                        <VisibilityOutlinedIcon style={{ color: "#000" }} />
                      </IconButton>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => handleUpdate(item._id)}
                        style={{
                          backgroundColor: "#e6d600",
                          color: "#000",
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginRight: "10px",
                          transition: "background-color 0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#d4c400")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#e6d600")
                        }
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        style={{
                          backgroundColor: "#f44336",
                          color: "white",
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          transition: "background-color 0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#d32f2f")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#f44336")
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    No Items Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Dialog
            onClose={close}
            open={handleOpen}
            PaperProps={{
              style: {
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <img
              src={`http://localhost:5000/Assets/${imageUrl}`}
              style={{
                height: "auto",
                width: "200px",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default Item;

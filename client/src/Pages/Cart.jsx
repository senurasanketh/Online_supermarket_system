import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Nav from "../Components/Navbar/Nav";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(newQuantity, 1) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before placing an order.");
      return;
    }
    navigate("/PaymentOption", { state: { cart, orderTotal: cartTotal } });
  };

  return (
    <>
      {" "}
      <Nav />
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        {/* Keeping original Nav component without inline CSS */}
        <div style={{ padding: "20px" }}>
          <Typography
            variant="h3"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Shopping Cart
            <hr style={{ width: "150px", margin: "10px auto" }} />
          </Typography>

          {cart.length === 0 ? (
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                marginTop: "40px",
              }}
            >
              Your cart is empty
              <Button
                style={{
                  backgroundColor: "#e6d600",
                  color: "#000",
                  padding: "8px 16px",
                  marginLeft: "20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
                onClick={() => navigate("/Products")}
              >
                Continue Shopping
              </Button>
            </Typography>
          ) : (
            <>
              <TableContainer
                component={Paper}
                style={{
                  marginTop: "40px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Image
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Product
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Price
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Quantity
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Total
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow
                        key={item._id}
                        style={{ borderBottom: "1px solid #eee" }}
                      >
                        <TableCell>
                          <CardMedia
                            component="img"
                            style={{
                              height: "50px",
                              width: "50px",
                              objectFit: "contain",
                            }}
                            image={`http://localhost:5000/Assets/${item.image}`}
                            alt={item.name}
                          />
                        </TableCell>
                        <TableCell style={{ padding: "16px" }}>
                          {item.name}
                        </TableCell>
                        <TableCell style={{ padding: "16px" }}>
                          Rs{item.price}
                        </TableCell>
                        <TableCell style={{ padding: "16px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <IconButton
                              style={{ padding: "5px" }}
                              onClick={() =>
                                handleUpdateQuantity(
                                  item._id,
                                  item.quantity - 1
                                )
                              }
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography>{item.quantity}</Typography>
                            <IconButton
                              style={{ padding: "5px" }}
                              onClick={() =>
                                handleUpdateQuantity(
                                  item._id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                        <TableCell style={{ padding: "16px" }}>
                          Rs{(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell style={{ padding: "16px" }}>
                          <IconButton
                            style={{ color: "#ff0000" }}
                            onClick={() => handleRemoveFromCart(item._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Card
                style={{
                  maxWidth: "300px",
                  margin: "20px auto",
                  padding: "20px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent style={{ padding: "0" }}>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Total: Rs.{cartTotal.toFixed(2)}
                  </Typography>
                  <Button
                    style={{
                      backgroundColor: "#e6d600",
                      color: "#000",
                      width: "100%",
                      padding: "10px",
                      marginBottom: "15px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      color: "#000",
                      width: "100%",
                      padding: "10px",
                      border: "2px solid #e6d600",
                      borderRadius: "4px",
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                    onClick={() => navigate("/Products")}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;

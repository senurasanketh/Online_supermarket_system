import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Nav from "../Components/Navbar/Nav";
import { useNavigate } from "react-router-dom";

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => setProducts(data.items))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleQtyChange = (id, value) => {
    setQuantity((prev) => ({ ...prev, [id]: Math.max(value, 0) }));
  };

  const handleAddToCart = (product) => {
    if (!quantity[product._id] || quantity[product._id] === 0) {
      alert("Please select a quantity before adding to cart.");
      return;
    }

    const newCartItem = { ...product, quantity: quantity[product._id] };
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item._id === product._id
      );
      if (existingItemIndex >= 0) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += quantity[product._id];
        return updatedCart;
      }
      return [...prev, newCartItem];
    });

    alert(`${product.name} added to cart!`);
    setQuantity((prev) => ({ ...prev, [product._id]: 0 })); // Reset quantity
  };

  return (
    <div>
      <Nav />
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" align="center">
            Product List
            <hr style={{ width: "150px", margin: "10px 0" }} />
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffcc00",
              color: "#000",
            }}
            onClick={() => navigate("/Cart")}
          >
            View Cart ({cart.length})
          </Button>
        </div>

        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <Card sx={{ maxWidth: 340, m: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://localhost:5000/Assets/${product.image}`}
                  alt={product.name}
                  sx={{ objectFit: "contain" }} // Or use "cover" for a different effect
                />

                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.category}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    Price: Rs.{product.price}
                  </Typography>
                  <br />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() =>
                        handleQtyChange(
                          product._id,
                          (quantity[product._id] || 0) - 1
                        )
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      value={quantity[product._id] || 0}
                      onChange={(e) =>
                        handleQtyChange(product._id, Number(e.target.value))
                      }
                      style={{ width: 60, textAlign: "center" }}
                    />
                    <IconButton
                      onClick={() =>
                        handleQtyChange(
                          product._id,
                          (quantity[product._id] || 0) + 1
                        )
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: "#ffcc00", color: "#000" }} // Changed color to #ffcc00, text to black
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Products;

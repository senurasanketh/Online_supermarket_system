import React, { useState } from "react";
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

function Products() {
  // Sample product data (Replace with API later)
  const productList = [
    {
      id: 1,
      itemName: "Apple",
      description: "Fresh and juicy apples.",
      price: 1.99,
      picture: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      itemName: "Banana",
      description: "Sweet and ripe bananas.",
      price: 0.99,
      picture: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      itemName: "Orange",
      description: "Citrus and refreshing.",
      price: 2.49,
      picture: "https://via.placeholder.com/200",
    },
  ];

  const [quantity, setQuantity] = useState({}); // Store product quantities
  const [cart, setCart] = useState([]); // Store cart items

  // Handle Quantity Change
  const handleQtyChange = (id, value) => {
    setQuantity((prev) => ({ ...prev, [id]: Math.max(value, 0) }));
  };

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    if (!quantity[product.id] || quantity[product.id] === 0) {
      alert("Please select a quantity before adding to cart.");
      return;
    }

    const newCartItem = { ...product, quantity: quantity[product.id] };
    setCart((prev) => [...prev, newCartItem]);

    alert(`${product.itemName} added to cart!`);
  };

  return (
    <div>
      <Nav />
      <div style={{ padding: "20px" }}>
        <Typography variant="h3" align="center" fontWeight="bold">
          Product List
          <hr style={{ width: "150px", margin: "10px auto" }} />
        </Typography>

        <Grid container spacing={4}>
          {productList.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ maxWidth: 345, m: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.picture}
                  alt={product.itemName}
                />
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {product.itemName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    Price: ${product.price}
                  </Typography>
                  <br />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() =>
                        handleQtyChange(
                          product.id,
                          (quantity[product.id] || 0) - 1
                        )
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      type="number"
                      variant="outlined"
                      size="small"
                      value={quantity[product.id] || 0}
                      onChange={(e) =>
                        handleQtyChange(product.id, Number(e.target.value))
                      }
                      style={{ width: 60, textAlign: "center" }}
                    />
                    <IconButton
                      onClick={() =>
                        handleQtyChange(
                          product.id,
                          (quantity[product.id] || 0) + 1
                        )
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
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

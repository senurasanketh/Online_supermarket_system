import React from "react";
import Nav from "../Components/Navbar/Nav";
import { Grid, Typography } from "@mui/material";
import HomeLogo from "../assets/Home.png";

function Home() {
  return (
    <div>
      <Nav />
      <Grid container spacing={3} sx={{ height: "90vh" }}>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Typography
              sx={{ fontSize: "40px", fontWeight: "bold", padding: "15px" }}
            >
              "Shop smarter, save bigger! 🛒 Get fresh groceries and daily
              essentials delivered to your doorstep with ease. Start shopping
              today!"
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={HomeLogo} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;

import React from "react";
import Nav from "../Components/Navbar/Nav";
import { Grid, Typography } from "@mui/material";
import HomeLogo from "../assets/Home.png";
import homepage2 from "../assets/homepage2.jpg";

function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${homepage2})`,
        backgroundSize: "cover", // Ensures the image covers the full area
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents repeating
        width: "100%", // Full viewport width
        height: "93.5vh", // Full viewport height
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(255, 255, 255, 0.5)", // Transparent overlay
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                  sx={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    padding: "15px",
                    color: "black",
                  }}
                >
                  "Shop smarter, save bigger! 🛒 Get fresh groceries and daily
                  essentials delivered to your doorstep with ease. Start
                  shopping today!"
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
      </div>
    </div>
  );
}

export default Home;

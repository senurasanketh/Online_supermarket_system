import { Typography } from "@mui/material";
import React from "react";
import { Grid } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import master from "../assets/master.png";
import visacard from "../assets/visa card.png";
function Footer() {
  return (
    <div style={{ padding: "10px", borderTop: "1px solid black" }}>
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
            Enter Sri Lanka's freshest online grocery store for all your grocery
            needs- fresh to frozen and everything in between! Now, you can order
            ALL your daily necessities from the comfort of your home or anywhere
            you want! Choose from same-day, next-day & saver to ensure you get
            what you need when you need it.
          </Typography>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              background: "rgba(196, 225, 246, 0.5)", // Reduces opacity (0.5 = 50%)
              height: "150px",
              borderRadius: "20px",
              padding: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            ></div>
            <LocalOfferIcon />
            <Typography>
              Best Prices & Offers Enjoy the same lowest prices as your local
              Cargills Food City, Express & Food Hall store!
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              background: "rgba(196, 225, 246, 0.5)", // Reduces opacity (0.5 = 50%)
              height: "150px",
              borderRadius: "20px",
              padding: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            ></div>
            <PublicOutlinedIcon />
            <Typography>
              Wide Assortment Choose from a variety of products from branded,
              chilled, fresh & frozen. New products added weekly!
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              background: "rgba(196, 225, 246, 0.5)", // Reduces opacity (0.5 = 50%)
              height: "150px",
              borderRadius: "20px",
              padding: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            ></div>
            <ReplayOutlinedIcon />
            <Typography>
              Easy Returns Not satisfied with a product? Return it at the
              doorstep & get a refund within hours.
            </Typography>
          </div>
        </Grid>

        <Grid item md={4} xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography>
              <h3>Categories</h3>
              <ul>
                <li>Vegetables</li>
                <li>Categories</li>
                <li>Fruits</li>
                <li>Dairy</li>
                <li>Beverages</li>
                <li>Food Cupboard</li>
                <li>Household</li>
                <li>Cooking Essentials</li>
                <li>Essentials</li>
              </ul>
            </Typography>
          </div>
        </Grid>
        <Grid item md={4} xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>
              <h3>Payment Methods</h3>
              <img src={master} height="auto" width="50px" bgcolor="white" />
              <br></br>
              Masters<br></br>
              <img src={visacard} height="auto" width="50px" />
              <br></br>
              Visa Card
            </Typography>
          </div>
        </Grid>
        <Grid item md={4} xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography>
              <h3>Quick Links</h3>
              <a href="/Home">Home</a> <br></br>
              <a href="/Product">Product</a>
              <br></br>
              <a href="/Contactus">ContactUs</a>
              <br></br>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;

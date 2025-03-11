import React from "react";
import myImage from "../assets/contactusbg2.jpg";
import image from "../assets/telephone (1).png";
import image1 from "../assets/gmail.png";
import image2 from "../assets/location-pin.png";
import Nav from "../Components/Navbar/Nav";
import { Grid } from "@mui/material";

function Contactus() {
  return (
    <>
      <Nav />
      <div
        style={{
          backgroundImage: `url(${myImage})`,
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
            backgroundColor: "rgb(255, 255, 255, 0.4)", // Transparent overlay
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h1 align="center">Contact Us</h1>
            <br />
            <br />
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <div
                  style={{
                    width: "300px",
                    background: "rgba(196, 225, 246, 0.5)", // Reduces opacity (0.5 = 50%)
                    height: "250px",
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
                  >
                    <img src={image} height="auto" width="80px" />
                    <h2>Telephone Number:</h2>
                  </div>
                  <br></br>
                  <h4 style={{ textAlign: "center" }}>
                    We are available to assist you through our hotline at +1
                    (234) 567-890. Don't hesitate to call us for quick support.
                  </h4>
                </div>
              </Grid>
              <Grid item md={4} xs={12} sx={{ width: "300px" }}>
                <div
                  style={{
                    width: "300px",
                    background: "rgba(196, 225, 246, 0.5)", // Reduces opacity (0.5 = 50%)
                    height: "250px",
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
                  >
                    <img src={image1} height="auto" width="80px" />
                    <h2>Email:</h2>

                    <br></br>
                    <h4 style={{ textAlign: "center" }}>
                      If you prefer to reach out via email, you can contact us
                      at support@onlinesupermarket.com. We aim to respond to all
                      inquiries within 24 hours.
                    </h4>
                  </div>
                </div>
              </Grid>
              <Grid item md={4} xs={12} sx={{ width: "300px" }}>
                <div
                  style={{
                    width: "300px",
                    background: "rgba(196, 225, 246, 0.5)", // Reduces opacity (0.5 = 50%)
                    height: "250px",
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
                  >
                    <img src={image2} height="auto" width="80px" />
                    <h2>Location</h2>
                    <br></br>
                    <h4 style={{ textAlign: "center" }}>
                      Our main office is located at 123 Supermarket St,
                      Cityville, ABC. Visit us for any business-related
                      inquiries or support
                    </h4>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contactus;

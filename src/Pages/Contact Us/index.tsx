import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Textarea from "@mui/joy/Textarea";
import Footer from "../../Components/Footer";
export default function ContactUs() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#008c93",
          paddingTop: { lg: "80px", xs: "72px" },
        }}
      ></Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          height: "calc(100vh - 80px)",
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            padding: "24px",
            backgroundColor: "#e3ebeb",
            boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
            width: { lg: "40%", xs: "80%" },
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "700", color: "#008c93", marginBottom: "10px" }}
          >
            {" "}
            CONTACT US
          </Typography>
          <form>
            <TextField
              sx={{
                width: { lg: "90%", xs: "100%" },
                marginBottom: "18px",
                "& .MuiOutlinedInput-input": {
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "14px",
                  padding: "12px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "8px",
                },
              }}
              id="outlined-basic"
              placeholder="Name"
              variant="outlined"
            />
            <TextField
              sx={{
                width: { lg: "90%", xs: "100%" },
                marginBottom: "18px",
                "& .MuiOutlinedInput-input": {
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "14px",
                  padding: "12px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "8px",
                },
              }}
              id="outlined-basic"
              placeholder="Email"
              variant="outlined"
            />
            <Textarea
              sx={{
                width: { lg: "90%", xs: "100%" },
                margin: "0 auto 18px auto",
                backgroundColor: "#e3ebeb",
                boxShadow: "none",
                border: "1px solid #b0b6b6",
                padding: "10px 10px",
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "black",
                },
              }}
              id="outlined-basic"
              placeholder="Message"
              variant="outlined"
            />

            <Button
              sx={{
                width: { lg: "30%", xs: "90%" },
                color: "white",
                backgroundColor: "#008c93",
              }}
            >
              {" "}
              Send
            </Button>
          </form>
        </Box>
      </div>
      <Footer />
    </>
  );
}

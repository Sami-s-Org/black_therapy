import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Textarea from "@mui/joy/Textarea";
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
            width: "50%",
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
                width: "80%",
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
                width: "80%",
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
            <TextField
              sx={{
                width: "80%",
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
              placeholder="Text"
              variant="outlined"
            />

            <Button
              sx={{ width: "30%", color: "white", backgroundColor: "#008c93" }}
            >
              {" "}
              Send
            </Button>
          </form>
        </Box>
      </div>
    </>
  );
}

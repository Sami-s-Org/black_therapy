import { Box, Typography } from "@mui/material";
import React from "react";
import Footer from "../../Components/Footer";

export default function Promotion() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#008c93",
          paddingTop: { lg: "80px", xs: "72px" },
        }}
      ></Box>
      <Typography>Promotion</Typography>
      <Footer />
    </>
  );
}

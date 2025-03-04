import { Box, Typography } from "@mui/material";
import React from "react";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#008c93",
          paddingTop: { lg: "80px", xs: "72px" },
        }}
      ></Box>
      <Typography>Home</Typography>
    </>
  );
}

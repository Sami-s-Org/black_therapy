import { Box, Typography } from "@mui/material";
import React from "react";

export default function SignUp() {
  return (
    <div>
      <Box
        sx={{
          background: "black",
          height: "100vh",
          color: "white",
          paddingTop: { lg: "80px", xs: "72px" },
        }}
      >
        <Typography>Sign Up</Typography>
      </Box>{" "}
    </div>
  );
}

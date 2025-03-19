import { Box, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <div style={{ borderTop: "1px solid gray" }}>
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "30px auto",
          padding: { lg: "0px", xs: "20px" },
        }}
      >
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: { lg: "none", xs: "wrap", sm: "none" },
          }}
        >
          <Box sx={{ width: { lg: "35%", xs: "100%", sm: "35%" } }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <img
                  style={{ width: "2.25rem" }}
                  src="https://tripplanner.ai/_next/image?url=%2Flogo%2Flogo.webp&w=32&q=75"
                />
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    lineHeight: "2.5rem",
                    fontWeight: "500",
                  }}
                >
                  Trip Planner AI
                </Typography>
              </Box>
              <Typography
                sx={{
                  marginTop: "8px",
                  fontSize: "16px",
                  color: "#7d7d7d",
                  fontWeight: "500",
                }}
              >
                Turn your next trip into a hassle-free experience with Trip
                Planner AI.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: { lg: "0px", sm: "0px", xs: "30px" },
              width: { lg: "55%", xs: "100%", sm: "55%" },
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "30%", textAlign: "center" }}>
              <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
                Legal
              </Typography>
              <Typography
                sx={{ fontWeight: "400", fontSize: "16px", marginTop: "8px" }}
              >
                Terms and Conditions
              </Typography>
              <Typography
                sx={{ fontWeight: "400", fontSize: "16px", marginTop: "8px" }}
              >
                Privacy Policy
              </Typography>
            </Box>
            <Box sx={{ width: "30%", textAlign: "center" }}>
              <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
                Support
              </Typography>
              <Typography
                sx={{ fontWeight: "400", fontSize: "16px", marginTop: "8px" }}
              >
                Contact Us
              </Typography>
            </Box>
            <Box sx={{ width: "30%", textAlign: "center" }}>
              <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
                Itineraries
              </Typography>
              <Typography
                sx={{ fontWeight: "400", fontSize: "16px", marginTop: "8px" }}
              >
                Community Trips
              </Typography>
              <Typography
                sx={{ fontWeight: "400", fontSize: "16px", marginTop: "8px" }}
              >
                Find Destinations
              </Typography>
            </Box>
          </Box>
        </Box>{" "}
        <Box
          sx={{
            borderTop: "1px solid gray",
            marginTop: "30px",
            padding: "24px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "16px",
              color: "#7d7d7d",
              textAlign: { xs: "center", lg: "start", sm: "start" },
            }}
          >
            © 2023 Trip Planner AI. All rights reserved
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

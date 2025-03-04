import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { AddBox } from "@mui/icons-material";
import CustomModal from "../SignUpModel";
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleclose = () => {
    setMobileMenuOpen(false);
  };

  const navigate = useNavigate();

  const handlegoHome = () => {
    navigate("/home");
  };

  const handlegoDestination = () => {
    navigate("/destination");
  };

  const handlegoPromotion = () => {
    navigate("/promotion");
  };
  const handlegoContactUs = () => {
    navigate("/contactUs");
  };
  const handlegoCommunity = () => {
    navigate("/CommunityTips");
  };
  const handlegoBase = () => {
    navigate("/");
  };

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      {" "}
      <AppBar
        position="absolute"
        sx={{
          background: "transparent",
          boxShadow: "none",
          padding: { lg: "10px 20px", xs: "10px 0px" },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{
              display: { xs: "block", md: "none" },
              color: "white",
              padding: "0px",
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Box
            onClick={() => {
              handlegoBase();
              handleclose();
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "white",
                fontFamily: "Kanit",
                cursor: "pointer",
              }}
            >
              COMPANYLOGO
            </Typography>
          </Box>
          <PersonOutlineOutlinedIcon
            sx={{
              display: { xs: "block", md: "none" },
              color: "white",
              cursor: "pointer",
              fontSize: 40,
            }}
            onClick={() => setOpen(true)}
          />

          <CustomModal open={open} handleClose={() => setOpen(false)} />
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "20px" }}>
            <Button sx={{ color: "white" }} onClick={handlegoHome}>
              Home
            </Button>
            <Button sx={{ color: "white" }} onClick={handlegoDestination}>
              Destination
            </Button>
            <Button sx={{ color: "white" }} onClick={handlegoPromotion}>
              Promotion
            </Button>
            <Button sx={{ color: "white" }} onClick={handlegoCommunity}>
              Community Tips
            </Button>
            <Button sx={{ color: "white" }} onClick={handlegoContactUs}>
              Contact Us
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "transparent",
                color: "white",
                textTransform: "none",
                border: "1.5px solid white",
                borderRadius: "35px",
                marginLeft: "30px",
              }}
              onClick={() => setOpen(true)}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {mobileMenuOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "75px",
            left: 0,
            width: "100%",
            background: "white",
            zIndex: 1111111,
            textAlign: "center",
            padding: "20px",
            borderRadius: "0px 0px 20px 20px",
          }}
        >
          <Button
            sx={{
              color: "black",
              display: "block",
              width: "100%",
              textAlign: "start",
            }}
            onClick={() => {
              handlegoHome();
              handleclose();
            }}
          >
            Home
          </Button>
          <Button
            sx={{
              color: "black",
              display: "block",
              width: "100%",
              textAlign: "start",
            }}
            onClick={() => {
              handlegoDestination();
              handleclose();
            }}
          >
            Destination
          </Button>
          <Button
            sx={{
              color: "black",
              display: "block",
              width: "100%",
              textAlign: "start",
            }}
            onClick={() => {
              handlegoPromotion();
              handleclose();
            }}
          >
            Promotion
          </Button>
          <Button
            sx={{
              color: "black",
              display: "block",
              width: "100%",
              textAlign: "start",
            }}
            onClick={() => {
              handlegoCommunity();
              handleclose();
            }}
          >
            Community Tips
          </Button>
          <Button
            sx={{
              color: "black",
              display: "block",
              width: "100%",
              textAlign: "start",
            }}
            onClick={() => {
              handlegoContactUs();
              handleclose();
            }}
          >
            Contact Us
          </Button>
        </Box>
      )}
    </div>
  );
}

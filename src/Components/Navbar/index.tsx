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
import { useNavigate, useLocation } from "react-router-dom";
import CustomModal from "../SignUpModel";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleclose = () => {
    setMobileMenuOpen(false);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleNavigate = (path: string) => {
    navigate(path);
    handleclose();
  };

  const [open, setOpen] = useState(false);

  return (
    <div>
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
          <Box onClick={() => handleNavigate("/")}>
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
            {[
              { label: "Home", path: "/home" },
              { label: "Destination", path: "/destination" },
              { label: "Promotion", path: "/promotion" },
              { label: "Community Tips", path: "/CommunityTips" },
              { label: "Contact Us", path: "/contactUs" },
            ].map((item) => (
              <Button
                key={item.path}
                sx={{
                  color: "white",
                  fontWeight: isActive(item.path) ? 600 : "normal",
                }}
                onClick={() => handleNavigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
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
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            width: "100%",
            background: "white",
            zIndex: 1111111,
            textAlign: "center",
            padding: "20px",
            borderRadius: "0px 0px 20px 20px",
          }}
        >
          {[
            { label: "Home", path: "/home" },
            { label: "Destination", path: "/destination" },
            { label: "Promotion", path: "/promotion" },
            { label: "Community Tips", path: "/CommunityTips" },
            { label: "Contact Us", path: "/contactUs" },
          ].map((item) => (
            <Button
              key={item.path}
              sx={{
                color: "black",
                display: "block",
                width: "100%",
                textAlign: "start",
                fontWeight: isActive(item.path) ? 800 : "normal",
              }}
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      )}
    </div>
  );
}

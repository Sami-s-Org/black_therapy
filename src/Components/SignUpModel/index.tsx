import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const GOOGLE_CLIENT_ID =
  "125902982961-t704h2dd0vnpgq987hemog6kd4pv6icp.apps.googleusercontent.com";
const FACEBOOK_CLIENT_ID = "YOUR_FACEBOOK_CLIENT_ID";
const APPLE_CLIENT_ID = "YOUR_APPLE_CLIENT_ID";
const REDIRECT_URI = "http://localhost:3000/home";

const handleGoogleLogin = () => {
  const googleAuthURL =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=token` +
    `&scope=${encodeURIComponent("openid email profile")}` +
    `&include_granted_scopes=true` +
    `&prompt=select_account`;

  window.location.href = googleAuthURL;
};

// Redirect to Facebook OAuth
const handleFacebookLogin = () => {
  const facebookAuthURL = `https://www.facebook.com/v10.0/dialog/oauth?
    client_id=${FACEBOOK_CLIENT_ID}
    &redirect_uri=${REDIRECT_URI}
    &response_type=token
    &scope=email,public_profile`;

  window.location.href = facebookAuthURL;
};

// Redirect to Apple OAuth
const handleAppleLogin = () => {
  const appleAuthURL = `https://appleid.apple.com/auth/authorize?
    client_id=${APPLE_CLIENT_ID}
    &redirect_uri=${REDIRECT_URI}
    &response_type=code
    &scope=name%20email
    &response_mode=fragment`;

  window.location.href = appleAuthURL;
};

const CustomModal: React.FC<ModalProps> = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",

          borderRadius: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "8px",
            padding: "20px",
          }}
        >
          <img
            src="https://tripplanner.ai/_next/image?url=%2Flogo%2Flogo.webp&w=48&q=75"
            style={{ width: "50px" }}
            alt="Logo"
          />
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Sign In
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            Sign in to save your trip plans and access them on any device.
          </Typography>
        </div>

        <div
          style={{
            backgroundColor: "#e3ebeb",
            padding: "20px ",
            borderRadius: "0 0 20px 20px",
          }}
        >
          <Button
            onClick={handleGoogleLogin}
            sx={{
              width: "95%",
              margin: "8px auto",
              padding: "5px",
              display: "flex",
              alignItems: "center",
              color: "black",
              fontSize: "13px",
              backgroundColor: "white",
              justifyContent: "center",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/800px-Google_Chrome_icon_%28February_2022%29.svg.png"
              alt="Google Icon"
              style={{ width: "24px", height: "24px", marginRight: "8px" }}
            />
            Sign In With Google
          </Button>

          <Button
            onClick={handleFacebookLogin}
            sx={{
              width: "95%",
              margin: "8px auto",
              padding: "5px",
              display: "flex",
              fontSize: "13px",
              alignItems: "center",
              backgroundColor: "white",
              color: "black",
              justifyContent: "center",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
              alt="Facebook Icon"
              style={{ width: "24px", height: "24px", marginRight: "8px" }}
            />
            Sign In With Facebook
          </Button>

          <Button
            onClick={handleAppleLogin}
            sx={{
              width: "95%",
              margin: "8px auto",
              padding: "5px",
              backgroundColor: "white",
              display: "flex",
              fontSize: "13px",
              alignItems: "center",
              color: "black",
              justifyContent: "center",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple Icon"
              style={{ width: "22px", height: "22px", marginRight: "8px" }}
            />
            Sign In With Apple
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomModal;

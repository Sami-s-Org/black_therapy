import {
  Avatar,
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import BasicSelect from "../../Components/DatePicker";
import BasicSelector from "../../Components/CustomSelector";
import HeART from "../../assets/heart-red-svgrepo-com.svg";

const Days = [" 1 Day ", " 2 Day ", " 3 Day ", " 4 Day ", " 5 Day"];
export default function CommunityTips() {
  const [day, setDay] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value as string);
  };
  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div>
      {" "}
      <Box
        sx={{
          backgroundColor: "#008c93",
          paddingTop: { lg: "80px", xs: "72px" },
        }}
      ></Box>
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "24px auto",
          padding: { lg: "0px", xs: "20px" },
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "500" }}>
            Trip Finder
          </Typography>
          <Typography sx={{ marginTop: "12px" }}>
            Find trips created by other users and get inspired for your next
            trip!
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              marginTop: "12px",
            }}
          >
            <TextField
              sx={{
                width: { lg: "50%", xs: "60%" },
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
              placeholder="Search City"
              variant="outlined"
            />
            <Select
              sx={{
                width: { lg: "8%", xs: "25%" },
                height: "45px",
                "& .MuiOutlinedInput-input": {
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "14px",
                  padding: "12px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "8px",
                },
              }}
              value={day}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <> Day </>
              </MenuItem>
              <MenuItem value={10}> 1 Day </MenuItem>
              <MenuItem value={20}> 2 Day </MenuItem>
              <MenuItem value={30}> 3 Day </MenuItem>
            </Select>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              width: {
                lg: `calc(25% - 15px)`,
                sm: `calc(50% - 10px)`,
                xs: "`calc(100% - 0px)`",
              },
              marginBottom: "20x",
            }}
          >
            <img
              src="data:image/png;base64,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"
              style={{
                width: "100%",
                height: "180px",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            />
            <Typography
              sx={{
                display: "block",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",
                maxWidth: "100%", // Ensures it doesn't overflow
              }}
              variant="h6"
            >
              {truncateText(
                "Discover Seoul: An 8-Day Adventure Through the Heart of South Korea, where history meets modern culture and flavors. This exciting trip will take you through Seoul's iconic spots, amazing food markets, and historical landmarks. Experience the vibrant nightlife and breathtaking cityscapes.",
                4
              )}
            </Typography>

            <Typography
              sx={{
                marginTop: "8px",
                display: "block",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",
                maxWidth: "100%",
                color: "gray",
                fontSize: "14px",
              }}
            >
              {" "}
              {truncateText(
                "Embark on an exciting 8-day journey through the vibrant city of",
                12
              )}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Avatar
                  alt="Ash Simpson"
                  src=""
                  sx={{ width: 26, height: 26 }}
                />

                <Typography sx={{ fontSize: "14px" }}>Ash Simpson</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>4 Days</Typography>
                <h4>•</h4>
                <img src={HeART} style={{ height: "24px", width: "24px" }} />
                <Typography sx={{ fontSize: "14px" }}>12</Typography>
              </div>
            </div>
          </Box>{" "}
          <Box
            sx={{
              width: {
                lg: `calc(25% - 15px)`,
                sm: `calc(50% - 10px)`,
                xs: "`calc(100% - 0px)`",
              },
              marginBottom: "20x",
            }}
          >
            <img
              src="data:image/png;base64,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"
              style={{
                width: "100%",
                height: "180px",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            />
            <Typography
              sx={{
                display: "block",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",
                maxWidth: "100%", // Ensures it doesn't overflow
              }}
              variant="h6"
            >
              {truncateText(
                "Discover Seoul: An 8-Day Adventure Through the Heart of South Korea, where history meets modern culture and flavors. This exciting trip will take you through Seoul's iconic spots, amazing food markets, and historical landmarks. Experience the vibrant nightlife and breathtaking cityscapes.",
                4
              )}
            </Typography>

            <Typography
              sx={{
                marginTop: "8px",
                display: "block",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",
                maxWidth: "100%",
                color: "gray",
                fontSize: "14px",
              }}
            >
              {" "}
              {truncateText(
                "Embark on an exciting 8-day journey through the vibrant city of",
                12
              )}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Avatar
                  alt="Ash Simpson"
                  src=""
                  sx={{ width: 26, height: 26 }}
                />

                <Typography sx={{ fontSize: "14px" }}>Ash Simpson</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>4 Days</Typography>
                <h4>•</h4>
                <img src={HeART} style={{ height: "24px", width: "24px" }} />
                <Typography sx={{ fontSize: "14px" }}>12</Typography>
              </div>
            </div>
          </Box>{" "}
          <Box
            sx={{
              width: {
                lg: `calc(25% - 15px)`,
                sm: `calc(50% - 10px)`,
                xs: "`calc(100% - 0px)`",
              },
              marginBottom: "20x",
            }}
          >
            <img
              src="data:image/png;base64,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"
              style={{
                width: "100%",
                height: "180px",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            />
            <Typography
              sx={{
                display: "block",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",
                maxWidth: "100%", // Ensures it doesn't overflow
              }}
              variant="h6"
            >
              {truncateText(
                "Discover Seoul: An 8-Day Adventure Through the Heart of South Korea, where history meets modern culture and flavors. This exciting trip will take you through Seoul's iconic spots, amazing food markets, and historical landmarks. Experience the vibrant nightlife and breathtaking cityscapes.",
                4
              )}
            </Typography>

            <Typography
              sx={{
                marginTop: "8px",
                display: "block",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",
                maxWidth: "100%",
                color: "gray",
                fontSize: "14px",
              }}
            >
              {" "}
              {truncateText(
                "Embark on an exciting 8-day journey through the vibrant city of",
                12
              )}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Avatar
                  alt="Ash Simpson"
                  src=""
                  sx={{ width: 26, height: 26 }}
                />

                <Typography sx={{ fontSize: "14px" }}>Ash Simpson</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>4 Days</Typography>
                <h4>•</h4>
                <img src={HeART} style={{ height: "24px", width: "24px" }} />
                <Typography sx={{ fontSize: "14px" }}>12</Typography>
              </div>
            </div>
          </Box>{" "}
          <Box
            sx={{
              width: {
                lg: `calc(25% - 15px)`,
                sm: `calc(50% - 10px)`,
                xs: "`calc(100% - 0px)`",
              },
              marginBottom: "20x",
            }}
          >
            <img
              src="data:image/png;base64,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"
              style={{
                width: "100%",
                height: "180px",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            />
            <Typography
              sx={{
                display: "block",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",
                maxWidth: "100%", // Ensures it doesn't overflow
              }}
              variant="h6"
            >
              {truncateText(
                "Discover Seoul: An 8-Day Adventure Through the Heart of South Korea, where history meets modern culture and flavors. This exciting trip will take you through Seoul's iconic spots, amazing food markets, and historical landmarks. Experience the vibrant nightlife and breathtaking cityscapes.",
                4
              )}
            </Typography>

            <Typography
              sx={{
                marginTop: "8px",
                display: "block",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "normal",
                maxWidth: "100%",
                color: "gray",
                fontSize: "14px",
              }}
            >
              {" "}
              {truncateText(
                "Embark on an exciting 8-day journey through the vibrant city of",
                12
              )}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Avatar
                  alt="Ash Simpson"
                  src=""
                  sx={{ width: 26, height: 26 }}
                />

                <Typography sx={{ fontSize: "14px" }}>Ash Simpson</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>4 Days</Typography>
                <h4>•</h4>
                <img src={HeART} style={{ height: "24px", width: "24px" }} />
                <Typography sx={{ fontSize: "14px" }}>12</Typography>
              </div>
            </div>
          </Box>{" "}
        </Box>
      </Box>
    </div>
  );
}

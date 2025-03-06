import React, { useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BasicDatePicker from "../DatePicker";
import BasicSelector from "../CustomSelector";
import AAA from "../../assets/11.jpg";
import BBB from "../../assets/66.jpg";
import CCC from "../../assets/33.jpg";
import DDD from "../../assets/44.jpg";
import { useNavigate, useNavigation } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: AAA,
  },
  {
    id: 2,
    image: BBB,
  },
  {
    id: 3,
    image: CCC,
  },
  {
    id: 4,
    image: DDD,
  },
];

const Data = [
  {
    title: "TOP 10 RESORTS",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing ",
  },
  {
    title: "TOP 10 RESORTS",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "TOP 10 RESORTS",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "TOP 10 RESORTS",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];
const menuOptions = [" 1", " 2", " 3", " 4", " 5"];
const menuFrom = [
  "Lahore",
  "Faisalabad",
  "Sheikhupura",
  "Kasur",
  "Nankana Sahib",
];
const menuTo = ["Hunza", "Gilgit ", "Attabad Lake", " Karimabad", "Altit"];

const MainSlider: React.FC = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState<boolean[]>(
    Array(Data.length).fill(false)
  );
  const MAX_LENGTH = 100;

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleSwiper = (swiper: SwiperClass) => {
    swiperRef.current = swiper;
  };

  const toggleDescription = (index: number) => {
    const newIsExpanded = [...isExpanded];
    newIsExpanded[index] = !newIsExpanded[index];
    setIsExpanded(newIsExpanded);
  };

  const handleDotClick = (index: number) => {
    swiperRef.current?.slideTo(index);
    setActiveIndex(index);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        boxSizing: "border-box",
        backgroundImage: `url(${slides[activeIndex].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 3000 }}
        onSlideChange={handleSlideChange}
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}></SwiperSlide>
        ))}
      </Swiper>

      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { lg: "column", xs: "row" },
              justifyContent: "center",
              gap: "20px",
              transform: { lg: "translateY(-50%)", xs: "translateX(-50%)" },
              position: "absolute",
              zIndex: "111",
              top: { lg: "50%", xs: "43%", sm: "61%" },
              left: { lg: "5%", xs: "50%" },
            }}
          >
            {slides.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: "12px",
                  height: "12px",
                  border: "2px solid white",
                  borderRadius: "50%",
                  background: activeIndex === index ? "white" : "transparent",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                }}
                onClick={() => handleDotClick(index)} // Jump to slide when dot is clicked
              />
            ))}
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: { lg: "50%", xs: "10%" },
              left: { lg: "10%", xs: "6%" },
              transform: { lg: "translateY(-50%)", xs: "none" },
              color: "white",
              width: { lg: "40%", xs: "88%" },
              zIndex: "111",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                marginBottom: "16px",
                fontSize: { lg: "45px", xs: "32px" },
              }}
            >
              {Data[activeIndex].title}
            </Typography>

            <Typography
              sx={{
                fontSize: { lg: "14px", xs: "12px" },
                width: { lg: "80%", xs: "100%" },
                textAlign: { xs: "justify", lg: "start" },
              }}
            >
              {isExpanded[activeIndex]
                ? Data[activeIndex].description
                : `${Data[activeIndex].description.slice(0, MAX_LENGTH)}...`}
            </Typography>

            <Button
              onClick={() => toggleDescription(activeIndex)}
              sx={{
                backgroundColor: "#008c93",
                borderRadius: "30px",
                color: "white",
                padding: "6px 20px",
                fontSize: "12px",
                marginTop: "8px",
                cursor: "pointer",
                textTransform: "none",
              }}
            >
              {isExpanded[activeIndex] ? "See Less" : "See More"}
            </Button>
          </Box>
        </div>
        <Box
          sx={{
            height: "auto",
            position: "absolute",
            bottom: { lg: "50%", xs: "0%" },
            right: "0%",
            transform: { lg: "translateY(50%)", xs: "translateY(-0%)" },
            backgroundColor: "white",
            borderRadius: { lg: "20px 0 0 20px", xs: "20px 20px 0 0" },
            padding: { lg: "25px", xs: "30px" },
            width: { lg: "35%", xs: "100%" },
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            zIndex: "111",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#2fafb6" }}
          >
            FIND YOUR EASY FLIGHT
          </Typography>

          <form>
            <Box sx={{ marginTop: "12px" }}>
              <label
                style={{
                  color: "#2fafb6",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                From
              </label>
              <BasicSelector options={menuFrom} placeholder="Choose City " />
            </Box>

            <Box sx={{ marginTop: "12px" }}>
              <label
                style={{
                  color: "#2fafb6",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                To
              </label>
              <BasicSelector options={menuTo} placeholder="Choose City " />
            </Box>

            <Box sx={{ marginTop: "12px" }}>
              <label
                style={{
                  color: "#2fafb6",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Departure
              </label>
              <BasicDatePicker />
            </Box>

            <Box sx={{ marginTop: "12px" }}>
              <label
                style={{
                  color: "#2fafb6",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Return
              </label>
              <BasicDatePicker />
            </Box>

            <Box
              sx={{
                marginTop: "12px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <label
                  style={{
                    color: "#2fafb6",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Passengers
                </label>
                <BasicSelector options={menuOptions} />
              </Box>

              <Button
                sx={{
                  backgroundColor: "#008c93",
                  borderRadius: "30px",
                  color: "white",
                  padding: "10px 40px",
                  fontSize: "14px",
                  marginTop: "16px",
                  cursor: "pointer",
                }}
              >
                Search
              </Button>
            </Box>
          </form>
        </Box>
      </div>
    </Box>
  );
};

export default MainSlider;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import ContactUs from "../../Pages/Contact Us";
import Home from "../../Pages/Home";
import MainSlider from "../../Components/MianSlider";
import Destination from "../../Pages/Destination";
import Promotion from "../../Pages/Promotion";
import SignUp from "../../Pages/Signup";
import CommunityTips from "../../Pages/CommunityTips";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainSlider />} />
        <Route path="/home" element={<Home />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/communityTips" element={<CommunityTips />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

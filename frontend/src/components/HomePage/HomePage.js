import React from "react";
// import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";
import FeaturedPro from "./FeaturedPro";
import BackgroundSection from "./BackgroundSection";
import SmartTechSection from "./SmartTechSection";
import Featured from "./Featured";
// import Footer from "./Footer";

import DesignForm from '../DesignForm';

const HomePage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <FeaturedProducts />
      <FeaturedPro/>
      <BackgroundSection/>
      <SmartTechSection />
      <Featured />
        <DesignForm />

      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;

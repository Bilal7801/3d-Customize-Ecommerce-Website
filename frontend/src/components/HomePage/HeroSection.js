import React from "react";
import { useNavigate } from "react-router-dom";


import Home from '../../pages/Home';
import Canvas from '../../canvas'; // adjust if needed
// import Customizer from '../../pages/Customizer'; 

const HeroSection = () => {
  const navigate = useNavigate();

  const handleCustomizeClick = () => {
    navigate("/customize");
  };

  return (
    <section className="hero-section">
      <main className="app transition-all ease-in">
        <Home />
        <Canvas />
        {/* <Customizer /> */}
      </main>
    </section>
  );
};

export default HeroSection;

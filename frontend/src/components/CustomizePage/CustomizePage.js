import React from "react";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import EfficientSection from "./Efficientbanner";
import Featured from "../HomePage/Featured";
import Canvas from "../../canvas";
import Customizer from "../../pages/Customizer";
import state from '../../store';
import { useEffect } from 'react';
const CustomizePage = () => {

  useEffect(() => {
    state.intro = false;  // jab CustomizePage load ho, intro false kar do
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Header */}
      <Navbar />

      {/* Main Section */}
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900 pt-20">
        <h1 className="text-4xl font-bold mb-10">Customize Your Product</h1>

        {/* 3D Customizer */}
        <div className="w-full max-w-6xl h-[700px] bg-gray-800 rounded-xl shadow-lg p-6 relative overflow-hidden">
          <Canvas />

          {/* CONTROLS ko CANVAS ke upar place karte hain */}
          <Customizer />
        </div>
      </div>

      {/* Efficient Banner */}
      <div className="mt-16">
        <EfficientSection />
      </div>

      {/* Featured products */}
      <Featured />

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default CustomizePage;

import React from "react";
import mainBanner from "../../assets/images/main-banner-2.jpg"; // Adjust path if needed

const BackgroundSection = () => {
  return (
    <div
      className="relative w-full h-[120vh] bg-cover bg-center transition-all duration-300 dark:bg-gray-900 mt-10"
      style={{
        backgroundImage: `url(${mainBanner})`,
      }}
    >
      {/* Shop Now Button - precise position using Tailwind arbitrary values */}
      <div className="absolute bottom-[270px] left-[85px]">
        <button
          className="relative bg-gray-300 text-black px-10 py-2 rounded-full text-sm cursor-pointer overflow-hidden group transition-all"
        >
          <span className="relative z-[2] font-medium">Shop Now</span>
          <div className="absolute inset-0 w-0 bg-white/20 group-hover:w-full transition-all duration-300 ease-in-out"></div>
        </button>
      </div>
    </div>
  );
};

export default BackgroundSection;

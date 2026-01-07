import React from "react";
import Efficient from "../../assets/videos/Efficient.webm";

function EfficientSection() {
  return (
    <section className="w-full py-10">
      {/* White Box Wrapper */}
      <div className="w-full bg-white shadow-md h-[350px] flex items-center justify-center mb-8">
       
        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left Side: Text Content */}
          <div className="md:w-1/2 text-left mb-8 md:mb-0 mr-24">
            <h2 className="font-bold mb-4">
              <span className="block text-3xl md:text-5xl">EFFICIENT FROM</span>
              <span className="block text-4xl md:text-5xl">END-TO-END</span>
            </h2>
            <p className="text-gray-700 !mb-6 max-w-md font-medium">
              Significantly shorten your time-to-market with virtual sampling and remote collaboration.
            </p>
            <button className="relative bg-blue-600 dark:bg-gray-800 px-6 py-2 mt-2 rounded-lg text-sm cursor-pointer overflow-hidden group">
              <span className="relative z-[2] font-medium text-white dark:text-white">Learn More</span>
              <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-black/10 group-hover:w-full"></div>
            </button>
          </div>

          {/* Right Side: Video */}
          <div className="md:w-1/2 w-full max-w-full mt-4 md:mt-0"> {/* Added margin-top here */}
            <div className="w-full h-64 md:h-[400px] lg:h-[500px] flex items-center justify-center rounded-lg overflow-hidden">
              <video
                className="h-[300px] w-[550px]"
                loop
                autoPlay
                muted
              >
                <source src={Efficient} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EfficientSection;

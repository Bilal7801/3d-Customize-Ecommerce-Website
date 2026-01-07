import React from "react";
import LeftSidebar from "./LeftSidebar";


const ThreeDTop = () => {
    return (
        <>
          <div className="bg-[#4c4c4d] text-white w-full fixed top-0 left-0 py-95 px-12 text-center">
             <p className="text-lg font-semibold"> 3D Modal Area</p>
          </div>

          {/* LeftSidebar */}
          <div className="flex flex-row gap-5 mt-24 ml-4">
            <LeftSidebar />
          </div>
        </>
    );
}

export default ThreeDTop;

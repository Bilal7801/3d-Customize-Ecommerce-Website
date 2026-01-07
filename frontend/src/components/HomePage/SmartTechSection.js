import React, { useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import "../../styles/HomePageStyle/glow.css";
import { useNavigate } from "react-router-dom";
import habsiImage from "../../assets/images/habsi_black_1.jpg"; // Full image import

const SmartTechSection = () => {
  const [activeDetail, setActiveDetail] = useState(null);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const handlePlusClick = async (detailId, productId) => {
    if (activeDetail === detailId) {
      setActiveDetail(null);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8000/api/products/${productId}`);
      setProduct(res.data);
      setActiveDetail(detailId);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const positions = [
    "top-[32%] left-[38%]", // near hands
    "top-[65%] left-[50%]", // near foot
  ];
  const productIds = [1, 2]; // Replace with your actual product IDs

  return (
    <div className="flex flex-col lg:flex-row dark:bg-gray-900 p-4 md:p-8 gap-4 lg:gap-6">
      
      {/* Left Image + Buttons Section */}
      <div className="w-full lg:w-2/3 relative h-auto lg:h-[500px] flex items-center justify-center rounded-xl overflow-hidden shadow-md">
        <img
          src={habsiImage}
          alt="Strength Training"
          className="w-full h-full object-contain rounded-xl"
        />

        {/* Interactive Plus Buttons */}
        {[1, 2].map((id, index) => (
          <div
            key={id}
            className={`absolute ${positions[index]} bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-500 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer animate-glow pulse z-20`}
            onClick={() => handlePlusClick(id, productIds[index])}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`transition-transform duration-300 ${
                activeDetail === id ? "rotate-45" : ""
              } w-4 h-4 md:w-6 md:h-6`}
            >
              <path d="M4 12h16" />
              <path d="M12 4v16" />
            </svg>
          </div>
        ))}

        {/* Product Info Popup */}
        {activeDetail && product && (
          <div
            className={`absolute ${
              activeDetail === 1
                ? "top-[38%] left-[5%]"
                : "top-[70%] left-[20%]"
            } bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-[90%] md:w-72 transition-all duration-300 z-30`}
          >
            <div
              onClick={() => navigate(`/product-page/${product.product_id}`)}
              className="absolute top-2 right-2 p-2 rounded-full flex items-center justify-center cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-black dark:text-gray-200" />
            </div>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1">
              {product.category_name} / {product.product_category_name}
            </p>
            <h3 className="font-bold text-base md:text-lg dark:text-gray-100 mb-2">
              {product.product_title}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
              {product.product_desc}
            </p>
            <p className="text-sm md:text-base font-semibold text-orange-600 dark:text-orange-400 mt-2">
              ${product.product_price}
            </p>
          </div>
        )}
      </div>

      {/* Right Content (Text Section) */}
      <div className="w-full lg:w-1/3 flex flex-col justify-center px-2 md:px-4 lg:px-2">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-3 dark:text-gray-100 text-gray-800 leading-tight">
          Built for the Bold.
        </h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
          Dominate your training space with gear engineered for raw power,
          relentless performance, and results that speak for themselves.
          Whether you're flipping tires or chasing limits — you're built for more.
        </p>
        <button
          onClick={() => navigate("/shop/fitness-gear")}
          className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-base font-medium transition duration-300 w-fit"
        >
          Explore Fitness Gear →
        </button>
      </div>
    </div>
  );
};

export default SmartTechSection;

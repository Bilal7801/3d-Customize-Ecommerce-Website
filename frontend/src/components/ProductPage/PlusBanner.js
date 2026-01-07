import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import plusBannerImage from "../../assets/images/plusbanner1.jpg";
import axios from "axios";
import ProductSpecs from "./ProductSpecs";
import { useNavigate } from "react-router-dom";

const PlusBanner = () => {
  const [activeDetail, setActiveDetail] = useState(null);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // Define your plus buttons with positions and product IDs
  const plusButtons = [
    {
      id: 1,
      position: "top-[30%] left-[50%] sm:top-[35%] sm:left-[55%]",
      productId: 4, // Replace with real product IDs
    },
    {
      id: 2,
      position: "top-[60%] left-[40%] sm:top-[50%] sm:left-[47%]",
      productId: 5,
    },
  ];

  const handlePlusClick = async (id, productId) => {
    if (activeDetail === id) {
      setActiveDetail(null);
      setProduct(null);
      return;
    }

    try {
      // Fetch product data dynamically from your API
      const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
      setProduct(response.data);
      setActiveDetail(id);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-12 md:py-20 lg:py-28 bg-white dark:bg-gray-900">
      <div className="px-4 md:px-6 max-w-screen-xl w-full mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
          The Ultimate Activewear
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
          Perform at your best while looking effortlessly stylish in our premium sportswear.
        </p>
        <div className="mt-6 sm:mt-8 flex justify-center">
          <button className="relative px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#5B2EFF] hover:bg-[#4a25cc] text-white text-sm md:text-base font-medium flex items-center gap-2 transition-all duration-200 group">
            <span className="relative z-[2]">Shop now</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-white/20 group-hover:w-full rounded-full" />
          </button>
        </div>
      </div>

      {/* Full Height Image with Plus Buttons */}
      <div className="w-full mt-8 sm:mt-12 relative">
        <div className="relative w-full overflow-hidden shadow-lg">
          <img
            src={plusBannerImage}
            alt="Plus Banner"
            className="w-full h-auto object-cover"
          />

          {/* Dynamic Plus Buttons */}
          {plusButtons.map(({ id, position, productId }) => (
            <div
              key={id}
              className={`absolute ${position} transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer animate-glow pulse`}
              onClick={() => handlePlusClick(id, productId)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`transition-transform duration-300 w-4 h-4 sm:w-6 sm:h-6 ${activeDetail === id ? "rotate-45" : ""}`}
              >
                <path d="M4 12h16" />
                <path d="M12 4v16" />
              </svg>
            </div>
          ))}

          {/* Dynamic Detail Box */}
       {activeDetail && product && (
  <div
    className={`absolute ${
      activeDetail === 1
        ? "top-[55%] left-[20%] sm:top-[55%] sm:left-[50%]"
        : "top-[90%] left-[20%] sm:top-[70%] sm:left-[40%]"
    } transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-md shadow-lg w-[60%] sm:w-72 max-h-[75px] sm:max-h-none overflow-y-auto transition-all duration-300 mx-2 z-10`}
  >
    <div
      onClick={() => navigate(`/product-page/${product.product_id}`)}
      className="absolute top-2 right-2 p-1 sm:p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-black dark:text-white" />
    </div>
    <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
      {product.category_name} / {product.product_category_name}
    </p>
    <h3 className="font-bold text-sm sm:text-lg dark:text-gray-100 mb-1">
      {product.product_title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 text-[11px] sm:text-sm leading-tight">
      {product.product_desc}
    </p>
    <p className="text-[11px] sm:text-base font-semibold text-[#5B2EFF] dark:text-[#a57fff] mt-2">
      ${product.product_price}
    </p>
  </div>
)}

        </div>
      </div>

      <ProductSpecs />
    </section>
  );
};

export default PlusBanner;

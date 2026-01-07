import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import SecurePayment from "./SecurePayment";
import ProductRight from "./ProductRight";
import PlusBanner from "./PlusBanner";

const BASE_URL = "http://localhost:8000";

const ProductPage = () => {
  const { id } = useParams();
  const rightSectionRef = useRef(null);
  const leftSectionRef = useRef(null);
  const mainContainerRef = useRef(null);
  const [heightDifference, setHeightDifference] = useState(0);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Scroll sync logic
  useEffect(() => {
    let animationFrameId = null;

    const handleScroll = () => {
      if (!mainContainerRef.current || !rightSectionRef.current) return;

      const mainContainer = mainContainerRef.current;
      const rightSection = rightSectionRef.current;

      const containerTop = mainContainer.offsetTop;
      const containerHeight = mainContainer.scrollHeight + heightDifference + dropdownHeight;
      const windowHeight = window.innerHeight;

      const maxWindowScroll = Math.max(containerHeight - windowHeight, 0);
      const currentScroll = window.scrollY - containerTop;

      let scrollRatio = 0;
      if (currentScroll > 0 && maxWindowScroll > 0) {
        scrollRatio = Math.min(currentScroll / maxWindowScroll, 1);
      }

      const maxRightScroll = rightSection.scrollHeight - rightSection.clientHeight;
      rightSection.scrollTop = scrollRatio * maxRightScroll;
    };

    window.addEventListener("scroll", handleScroll);

    const preventIndependentScroll = (e) => {
      e.preventDefault();
      window.scrollBy({ top: e.deltaY });
    };

    const rightSection = rightSectionRef.current;
    if (rightSection) {
      rightSection.addEventListener("wheel", preventIndependentScroll, { passive: false });
      rightSection.addEventListener("touchmove", preventIndependentScroll, { passive: false });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (rightSection) {
        rightSection.removeEventListener("wheel", preventIndependentScroll);
        rightSection.removeEventListener("touchmove", preventIndependentScroll);
      }
    };
  }, [heightDifference, dropdownHeight]);

  const toggleReviewSection = () => {
    if (leftSectionRef.current) {
      const reviewSection = document.querySelector(".review-section");
      if (reviewSection.style.display === "none") {
        reviewSection.style.display = "block";
        setHeightDifference(100);
      } else {
        reviewSection.style.display = "none";
        setHeightDifference(0);
      }
    }
  };

  const handleDropdownChange = (newHeight) => {
    setDropdownHeight(newHeight);
  };

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-xl font-semibold text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-20 text-xl font-semibold">Product not found.</div>;
  }

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>

      <div
        ref={mainContainerRef}
        className="flex flex-col max-w-screen-xl mx-auto w-full px-4 md:px-6"
      >
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section */}
          <div
            ref={leftSectionRef}
            className="w-full md:w-1/2 flex flex-col space-y-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm"
          >
            <ProductImages
              images={[
                `${BASE_URL}/storage/${product.product_img1}`,
                `${BASE_URL}/storage/${product.product_img2}`,
                `${BASE_URL}/storage/${product.product_img3}`,
              ]}
            />

            <ProductDetails product={product} />
            <SecurePayment />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-300" />

          {/* Right Section */}
          <div
            ref={rightSectionRef}
            className="w-full md:w-1/2 bg-white p-4 sm:p-6 rounded-xl shadow-sm overflow-y-auto scrollbar-hide md:sticky md:top-0 md:h-[calc(100vh-64px)]"
          >
            <ProductRight product={product} onDropdownChange={handleDropdownChange} />
          </div>
        </div>
      </div>

      <PlusBanner />
    </>
  );
};

export default ProductPage;

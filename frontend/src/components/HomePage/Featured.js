import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ added
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = React.useRef(null);
  const navigate = useNavigate(); // ✅ added

  useEffect(() => {
    fetch("http://localhost:8000/api/products/featured", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch featured products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching products.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSlidesToShow(
        width >= 1024 ? 4 : width >= 600 ? 3 : width >= 480 ? 2 : 1
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CustomArrow = ({ direction, onClick }) => {
    const Icon = direction === "left" ? ChevronLeft : ChevronRight;
    return (
      <div
        className={`absolute top-1/2 ${direction === "left" ? "left-0" : "right-0"} transform -translate-y-1/2 z-10 
        bg-white border text-black p-2 rounded-full cursor-pointer shadow-md hover:shadow-lg transition-shadow`}
        onClick={onClick}
      >
        <Icon size={22} />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    infinite: false,  
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
    beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

 const totalGroups = Math.max(products.length - slidesToShow + 1, 1);
const progressWidth = 100 / totalGroups;
const progressPosition = (currentSlide % totalGroups) * progressWidth;


  return (
    <section className="px-6 py-12 bg-white text-gray-900 text-center">
      <div className="flex items-center justify-center mb-10">
        <div className="flex-grow border-t border-gray-300 mr-4"></div>
        <h1 className="text-xl sm:text-xl font-semibold whitespace-nowrap">
          Featured Products for You
        </h1>
        <div className="flex-grow border-t border-gray-300 ml-4"></div>
      </div>

      <motion.div
        key="featured"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="relative">
            <Slider ref={sliderRef} {...settings}>
              {products.map((product) => (
                <div key={product.id} className="p-4">
                  <div
                    className="relative h-[400px] w-full overflow-hidden rounded-xl cursor-pointer"
                    onClick={() => navigate(`/product-page/${product.id}`)} // ✅ navigate to detail
                  >
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-opacity duration-300"
                      initial={{ opacity: 1 }}
                      whileHover={{ opacity: 0 }}
                    />
                    <motion.img
                      src={product.hoverImage}
                      alt={`${product.name} Hover`}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                  <div
                    className="mt-3 text-sm font-normal text-gray-800 cursor-pointer hover:underline"
                    onClick={() => navigate(`/product-page/${product.id}`)} // ✅ clickable name
                  >
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    {product.price}
                  </div>

                  <button className="relative bg-blue-600 text-white px-10 py-2 rounded-full text-sm cursor-pointer overflow-hidden group transition-all">
                    <span className="relative z-[2] font-medium">Add to Cart</span>
                    <div className="absolute inset-0 w-0 bg-white/20 group-hover:w-full transition-all duration-300 ease-in-out"></div>
                  </button>
                </div>
              ))}
            </Slider>

            <div className="mt-8 mx-auto max-w-5xl h-0.5 bg-gray-200 rounded-full relative">
              <div
                className="absolute h-full bg-black rounded-full transition-all duration-300"
                style={{
                  width: `${progressWidth}%`,
                  left: `${progressPosition}%`,
                }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default FeaturedProducts;

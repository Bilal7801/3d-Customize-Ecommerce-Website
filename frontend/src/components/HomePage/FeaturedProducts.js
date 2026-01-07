import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import placeholderImg from "../../assets/images/1.jpg";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [category, setCategory] = useState("men");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [products, setProducts] = useState({ men: [], women: [] });
  const [loading, setLoading] = useState(true);

  const mapProducts = (apiProducts) =>
    apiProducts.slice(0, 10).map((product) => ({
      id: product.product_id,
      name: product.product_title,
      price: `$${product.product_price}`,
      image: product.product_img1
        ? `http://localhost:8000/storage/${product.product_img1}`
        : placeholderImg,
      hoverImage: product.product_img2
        ? `http://localhost:8000/storage/${product.product_img2}`
        : placeholderImg,
      cat_id: product.cat_id,
    }));

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        const allProducts = mapProducts(response.data);
        setProducts({
          men: allProducts.filter((p) => p.cat_id === 1),
          women: allProducts.filter((p) => p.cat_id === 2),
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSlidesToShow(width >= 1024 ? 4 : width >= 768 ? 2 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentSlide(0);
  };

  const CustomPrevArrow = ({ onClick }) => (
    <div
      className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <ChevronLeft size={24} />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div
      className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <ChevronRight size={24} />
    </div>
  );
const currentProducts = products[category] || [];
const totalSlides = currentProducts.length;
const totalPages = Math.max(totalSlides - slidesToShow + 1, 1);
const progressWidth = 100 / totalPages;
const progressPosition = (currentSlide % totalPages) * progressWidth;


  const settings = {
   dots: false,
  infinite: currentProducts.length > slidesToShow,
  speed: 500,
  slidesToShow,
  slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="px-6 py-12 bg-white dark:bg-gray-900 text-center text-gray-900 dark:text-white">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">Top Picks</h1>
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-gray-900 px-4 text-xl">Featured</span>
          </div>
        </div>
        <div className="flex justify-center text-3xl space-x-8 mb-8">
          <button
            onClick={() => handleCategoryChange("men")}
            className={`px-4 py-2 ${category === "men" ? "underline font-semibold" : ""}`}
          >
            Men
          </button>
          <button
            onClick={() => handleCategoryChange("women")}
            className={`px-4 py-2 ${category === "women" ? "underline font-semibold" : ""}`}
          >
            Women
          </button>
        </div>
      </div>

      <motion.div
        key={category}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          {loading ? (
            <p className="text-center text-lg">Loading...</p>
          ) : currentProducts.length === 0 ? (
            <p className="text-center text-lg">No products found.</p>
          ) : (
            <>
              <Slider {...settings}>
                {currentProducts.map((product) => (
                  <div key={product.id} className="p-2 sm:p-4">
                <Link to={`/product-page/${product.id}`}>
  <div className="relative group aspect-[3/4] overflow-hidden rounded-lg shadow-md cursor-pointer">
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
      className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    />
  </div>
</Link>

                    <div className="mt-3 text-center">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-gray-600 dark:text-gray-400">{product.price}</p>
                    </div>
                  </div>
                ))}
              </Slider>

              {/* Progress Bar */}
              <div className="w-full max-w-6xl mx-auto mt-6 h-1 bg-gray-200 dark:bg-gray-700 relative rounded">
                <div
                  className="absolute h-full bg-black dark:bg-white transition-all duration-300 rounded"
                  style={{
                    width: `${progressWidth}%`,
                    left: `${progressPosition}%`,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedProducts;



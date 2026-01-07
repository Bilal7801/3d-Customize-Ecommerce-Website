import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedPro = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const fallArrivals = useMemo(() => {
    const today = new Date();
    return products.filter((product) => {
      if (product.stock_status !== "In stock") return false;
      const addedDate = new Date(product.date);
      const diffTime = today - addedDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays <= 10;
    });
  }, [products]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setSlidesPerView(width >= 1024 ? 3 : width >= 768 ? 2 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = fallArrivals.length;
  const progressWidth =
    totalSlides > slidesPerView ? 100 / (totalSlides - slidesPerView + 1) : 100;
  const progressPosition = currentSlide * progressWidth;

  const getImageUrl = (imgPath) => `http://127.0.0.1:8000/storage/${imgPath}`;

  return (
    <div className="featured-pro-container p-6 dark:bg-gray-900 dark:text-white">
      <div className="text-center my-8">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-gray-900 px-4 text-xl font-bold tracking-wide">
              FALL ARRIVALS
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Static Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center flex flex-col items-center">
            <img
              src="http://127.0.0.1:8000/storage/products/watch2.png"
              alt="Featured"
              className="w-full max-w-[220px] sm:h-[300px] object-cover rounded-md mb-4"
            />
            <button className="relative border-2 border-black dark:border-orange-500 bg-black dark:bg-orange-500 text-white py-2 px-6 rounded-full text-sm overflow-hidden group">
              <span className="relative z-10 font-medium">MY SHOP</span>
              <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-in-out group-hover:w-full"></div>
            </button>
          </div>

          {/* Swiper Section */}
          <div className="md:col-span-3">
            <div className="relative pb-10">
              <div className="prev-arrow absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-700 p-2 rounded-full cursor-pointer border border-gray-300 dark:border-gray-600 shadow hover:shadow-md transition">
                <ChevronLeft size={24} />
              </div>
              <div className="next-arrow absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-700 p-2 rounded-full cursor-pointer border border-gray-300 dark:border-gray-600 shadow hover:shadow-md transition">
                <ChevronRight size={24} />
              </div>

              {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-300">
                  Loading products...
                </p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : fallArrivals.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-300">
                  No new arrivals in the last 10 days.
                </p>
              ) : (
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: ".prev-arrow",
                    nextEl: ".next-arrow",
                  }}
                  spaceBetween={20}
                  slidesPerView={slidesPerView}
                  onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                >
                  {fallArrivals.map((product) => (
                    <SwiperSlide key={product.product_id}>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center flex flex-col items-center h-full">
                        <div className="relative group w-full aspect-[3/4] max-w-[220px] overflow-hidden rounded-md cursor-pointer">
                          <img
                            src={getImageUrl(product.product_img1)}
                            alt={product.product_title}
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                          />
                          <img
                            src={getImageUrl(product.product_img2)}
                            alt={product.product_title}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          />
                        </div>

                        <h3 className="font-semibold text-lg mt-4 mb-1">
                          {product.product_title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          ${product.product_price}
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 w-full">
                        <button
  onClick={() => navigate(`/product-page/${product.product_id}`)}
  className="relative bg-blue-600 dark:bg-gray-700 text-white py-2 px-4 rounded-full text-sm overflow-hidden group"
>
  <span className="relative z-10 font-medium">Quick View</span>
  <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></div>
</button>
                          <button className="relative bg-green-600 text-white py-2 px-4 rounded-full text-sm overflow-hidden group">
                            <span className="relative z-10 font-medium">
                              Add to Cart
                            </span>
                            <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></div>
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {/* Progress Bar */}
              {fallArrivals.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 z-10">
                  <div className="mx-auto max-w-5xl h-0.5 bg-gray-200 dark:bg-gray-600 relative">
                    <div
                      className="absolute h-full bg-black dark:bg-white transition-all duration-300"
                      style={{
                        width: `${progressWidth}%`,
                        left: `${progressPosition}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPro;

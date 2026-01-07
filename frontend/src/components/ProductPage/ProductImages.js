import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
// import product1 from "../../assets/images/6.jpg";
// import product2 from "../../assets/images/7.jpg";
// import product3 from "../../assets/images/6.jpg";
// import product4 from "../../assets/images/7.jpg";
// import product5 from "../../assets/images/6.jpg";

// const images = [product1, product2, product3, product4, product5];

// const ProductImages = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [direction, setDirection] = useState(0);

const ProductImages = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

     if (!images || images.length === 0) {
        return <div className="text-center py-10 text-gray-500">No images available</div>;
    }
    
    const changeImage = (side) => {
        setDirection(side === "left" ? -1 : 1);
        setCurrentIndex((prevIndex) =>
            side === "left"
                ? (prevIndex - 1 + images.length) % images.length
                : (prevIndex + 1) % images.length
        );
    };

    return (
        <div className="flex flex-col items-center space-y-6 relative w-full px-4">
            {/* Image with Arrows */}
            <div className="relative w-full max-w-xl flex items-center justify-center">
                {/* Left Arrow */}
                <button
                    onClick={() => changeImage("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 
                        bg-white shadow-md rounded-full p-2 border border-gray-300 
                        hover:bg-gray-100 transition-all duration-300 z-10"
                >
                    <FaChevronLeft size={20} className="text-gray-600 hover:text-black" />
                </button>

                {/* Main Image */}
                <div className="relative w-full aspect-square max-w-[500px]">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt="Product"
                            className="absolute inset-0 w-full h-full object-cover rounded-md"
                            initial={{ x: direction * 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -direction * 100, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </AnimatePresence>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => changeImage("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 
                        bg-white shadow-md rounded-full p-2 border border-gray-300 
                        hover:bg-gray-100 transition-all duration-300 z-10"
                >
                    <FaChevronRight size={20} className="text-gray-600 hover:text-black" />
                </button>
            </div>

            {/* Image Counter */}
            <div className="bg-white rounded-full shadow text-sm font-semibold px-4 py-1 mt-4">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Thumbnails */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt="Thumbnail"
                        className={`w-20 h-24 object-cover cursor-pointer border-2 rounded-md 
                            ${index === currentIndex ? "border-black" : "border-transparent"}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductImages;

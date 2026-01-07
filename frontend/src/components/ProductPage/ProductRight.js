import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import product5 from "../../assets/images/6.jpg";
import toast from "react-hot-toast";
import api from "../../axios";
import { useNavigate } from 'react-router-dom';


const ProductRight = ({ product, onDropdownChange }) => {
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState([]);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  // Parse colors from product data
  const colors = product?.product_color
    ? product.product_color.split(',').map(color => ({
      name: color.trim(),
      hex: getColorHex(color.trim())
    }))
    : [];

  // Set initial selected color
  useEffect(() => {
    if (colors.length > 0 && !selectedColor) {
      setSelectedColor(colors[0]);
    }
  }, [colors, selectedColor]);

  function getColorHex(colorName) {
    const colorMap = {
      red: "#FF0000",
      green: "#008000",
      blue: "#0000FF",
      yellow: "#FFFF00",
      black: "#000000",
      white: "#FFFFFF",
      orange: "#FFA500",
      purple: "#800080",
      pink: "#FFC0CB",
      gray: "#808080",
      brown: "#A52A2A",
    };
    return colorMap[colorName.toLowerCase()] || "#CCCCCC";
  }


const handleAddToCart = async () => {
  try {
    const res = await api.post("/cart", {
      product_id: product.product_id,
      quantity,
      size: product.product_size || null,
      color: selectedColor?.name || null,
    });

    toast.success('✅ Product added to cart! Redirecting...');
    
    // Wait 1.5 seconds before redirecting to show the toast
    setTimeout(() => {
      navigate('/cart');
    }, 1500);

    console.log("Cart response:", res.data);
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error('❌ Failed to add product to cart.');
  }
};


  useEffect(() => {
    const dropdownHeight = colorDropdownOpen ? dropdownRef.current?.offsetHeight || 0 : 0;
    onDropdownChange && onDropdownChange(dropdownHeight);

    const resizeObserver = new ResizeObserver(() => {
      const newHeight = colorDropdownOpen ? dropdownRef.current?.offsetHeight || 0 : 0;
      onDropdownChange && onDropdownChange(newHeight);
    });

    if (dropdownRef.current) {
      resizeObserver.observe(dropdownRef.current);
    }

    return () => {
      if (dropdownRef.current) {
        resizeObserver.unobserve(dropdownRef.current);
      }
    };
  }, [colorDropdownOpen, onDropdownChange]);

  const toggleExpand = (section) => {
    setExpanded((prevExpanded) => {
      if (prevExpanded.includes(section)) {
        return prevExpanded.filter((item) => item !== section);
      } else {
        return [...prevExpanded, section];
      }
    });
  };

  if (!product) {
    return <div className="max-w-lg mx-auto p-4">Loading product details...</div>;
  }

  // Calculate discount if original price exists
  const originalPrice = parseFloat(product.original_price) || 0;
  const currentPrice = parseFloat(product.product_price) || 0;
  const discountPercentage = originalPrice > 0
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;



  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="text-left">

        <p> {product.product_category?.p_cat_title}</p>



        {/* <p>Category: {product.category?.cat_title}</p> */}

        <h1 className="text-xl font-bold !mt-3">{product.product_title}</h1>

        <div className="flex items-center gap-1 text-yellow-500 text-sm !mt-2">
          ⭐⭐⭐⭐☆ <span className="text-gray-500">(2)</span>
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-2xl font-bold !mt-4">${product.product_price}</p>
          {originalPrice > 0 && (
            <span className="text-gray-500 text-xl line-through !mt-5 !ml-2">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-900 !mt-2 !mb-1">Tax included</p>
        <span className="inline-block bg-orange-500 text-white text-xs !px-2 !py-1 !mr-1">
          New
        </span>
        {discountPercentage > 0 && (
          <span className="inline-block bg-red-500 text-white text-xs !px-2 !py-1 !mr-1">
            {discountPercentage}% off
          </span>
        )}
        <span className="inline-block bg-red-500 text-white text-xs !px-2 !py-1 !mr-1">
          Perfect for All Seasons
        </span>

        <p className="text-gray-800 text-sm !mt-4">
          {product.product_desc || 'No description available.'}
        </p>

        {/* Color Selection */}
        {colors.length > 0 && (
          <>
            <p className="text-sm font-medium text-gray-800 !mt-8">Color</p>
            <div className="relative z-20">
              <button
                className="w-full flex items-center justify-between border-2 border-gray-300 !px-7 !py-2 rounded-full !mt-2 cursor-pointer"
                onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
              >
                {selectedColor ? (
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: selectedColor.hex }}
                    ></span>
                    <span>{selectedColor.name}</span>
                  </div>
                ) : (
                  <span>Select Color</span>
                )}

                <motion.span
                  animate={{ rotate: colorDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown size={18} />
                </motion.span>
              </button>

              {colorDropdownOpen && (
                <motion.ul
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute w-full border-2 border-gray-300 rounded-2xl bg-white shadow-md z-20 dropdown-list"
                >
                  {colors.map((color) => (
                    <li
                      key={color.name}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedColor(color);
                        setColorDropdownOpen(false);
                      }}
                    >
                      <span
                        className="ml-3 w-5 h-5 rounded-full"
                        style={{ backgroundColor: color.hex }}
                      ></span>
                      <span>{color.name}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          </>
        )}

        {/* Quantity Counter */}
        <div className="relative flex items-center mt-4 gap-4 z-10">
          <div className="flex border rounded-full overflow-hidden">
            <button
              className="px-5 py-1.5 font-bold cursor-pointer"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span className="px-4 py-1 text-sm !mt-0.5">{quantity}</span>
            <button
              className="px-5 py-1.5 font-bold cursor-pointer"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="relative border px-6 py-2 rounded-full font-medium overflow-hidden group cursor-pointer transition-all duration-300 ease-in-out "
          >
            <span className="relative z-[2] text-black">Add to cart</span>
            <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-black/10 group-hover:w-full"></div>
          </button>
        </div>

        <button
          onClick={() =>
            navigate(`/purchase/${product.product_id}`, {
              state: {
                product,
                quantity,
                color: selectedColor?.name || null,
                size: product.product_size || null,
              },
            })
          }
          className="relative w-full bg-indigo-600 text-white py-2 rounded-full mt-4 mb-2 transition-all duration-200 ease-in-out overflow-hidden group cursor-pointer"
        >
          <span className="relative z-[2]">Buy Now</span>
          <div className="absolute inset-0 w-0 bg-black/10 transition-all duration-300 ease-in-out group-hover:w-full"></div>
        </button>

        <div className="text-left">
          <p className="text-green-600 mt-4">
            ● {product.stock_status === 'In stock' ? 'In stock' : 'Out of stock'} – Get yours today!
          </p>
        </div>

        <hr className="my-2 border-t-4 border-green-700 rounded-full" />

        <div className="text-left mt-10">
          <h2 className="text-lg font-bold">You might also need...</h2>
        </div>

        {/* Related products section */}
        <div className="flex items-center mt-2 bg-gray-100 !p-4">
          <img src={product5} alt="SSD" className="w-20 h-22" />
          <div className="ml-4">
            <p className="font-bold ">Hoodie Jacket etc.....</p>
            <p className="font-bold">$229.00</p>

            <button className="relative border-2 bg-white-200 border-gray-800 px-3 py-1 mt-2 rounded-full text-sm cursor-pointer overflow-hidden group">
              <span className="relative z-[2] font-semibold">Choose options</span>
              <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-black/10 group-hover:w-full"></div>
            </button>
          </div>
        </div>

        <hr className="mt-8 mb-3 border-t-1 border-gray-300" />

        {[
          {
            title: "Flexible credit available",
            content:
              "From Buy Now, Pay Later to our Monthly Payment Plans, we have a range of credit options available.",
          },
          {
            title: "Insure your product",
            content:
              "Select from a range of insurance options, so you can enjoy your product stress-free. Contact us for more details.",
          },
          {
            title: "Returning an item",
            content:
              "If you are not completely satisfied with your purchase, please contact our customer service team.",
          },
        ].map((item, index) => (
          <div key={index} className="border-b border-gray-300 mb-2 py-5 cursor-pointer">
            <button
              className="w-full flex justify-between items-center text-left font-semibold cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              {item.title}
              <motion.div
                animate={{ rotate: expanded.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {expanded.includes(index) ? <ChevronUp /> : <ChevronDown />}
              </motion.div>
            </button>

            <motion.div
              initial={false}
              animate={{ height: expanded.includes(index) ? "auto" : 0, opacity: expanded.includes(index) ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="mt-2 text-gray-700 text-left">{item.content}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRight;
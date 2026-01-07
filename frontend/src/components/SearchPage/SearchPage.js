import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import placeholderImg from '../../assets/images/1.jpg';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || null;
  const mainCategoryParam = searchParams.get("main_category") || null;
  const colorParam = searchParams.get("color") || "";
  const sizeParam = searchParams.get("size") || "";
  const priceParam = searchParams.get("price") || "";

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [mainCategoryName, setMainCategoryName] = useState("");
  const [productCategoryName, setProductCategoryName] = useState("");

  const [showColor, setShowColor] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const updateFilter = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  };

  useEffect(() => {
    const fetchNames = async () => {
      try {
        if (mainCategoryParam) {
          const { data } = await axios.get(`http://localhost:8000/api/categories/${mainCategoryParam}`);
          setMainCategoryName(data.cat_title || `Category #${mainCategoryParam}`);
        }
        if (categoryParam) {
          const { data } = await axios.get(`http://localhost:8000/api/product-categories/${categoryParam}`);
          setProductCategoryName(data.p_cat_title || `Product #${categoryParam}`);
        }
      } catch (err) {
        console.error("Error fetching category names:", err);
      }
    };
    fetchNames();
  }, [mainCategoryParam, categoryParam]);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (query) params.search = query;
    if (categoryParam) params.product_category_id = categoryParam;
    if (mainCategoryParam) params.category_id = mainCategoryParam;
    if (colorParam) params.color = colorParam;
    if (sizeParam) params.size = sizeParam;
    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number);
      if (!isNaN(min)) params.min_price = min;
      if (!isNaN(max)) params.max_price = max;
    }

    axios.get("http://localhost:8000/api/products", { params })
      .then(({ data }) => {
        setFilteredProducts(data);
        setLoading(false);
        if (mainCategoryParam && categoryParam) {
          setCategoryTitle(`${mainCategoryName} - ${productCategoryName}`);
        } else if (categoryParam) {
          setCategoryTitle(productCategoryName);
        } else if (mainCategoryParam) {
          setCategoryTitle(mainCategoryName);
        } else if (query) {
          setCategoryTitle(`Search: "${query}"`);
        } else {
          setCategoryTitle("All Products");
        }
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [query, categoryParam, mainCategoryParam, colorParam, sizeParam, priceParam]);

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Loading products...</div>;
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl font-light">Search results for</h1>
        <h2 className="text-xl sm:text-2xl font-semibold">
          {categoryTitle}
          <span className="text-gray-500 text-sm"> ({filteredProducts.length})</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 space-y-6">
          {/* Color */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 onClick={() => setShowColor(!showColor)} className="font-semibold text-sm mb-2 cursor-pointer flex justify-between">
              Filter by Color <span>{showColor ? "▲" : "▼"}</span>
            </h3>
            {showColor && (
              <div className="space-y-1">
                {["Red", "Blue", "Green", "Black", "White"].map(color => (
                  <button key={color} onClick={() => updateFilter("color", color)}
                    className={`block text-left text-sm px-2 py-1 rounded hover:bg-blue-100 ${
                      colorParam === color ? "bg-blue-200 text-blue-800" : "text-gray-700"
                    }`}>
                    {color}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Size */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 onClick={() => setShowSize(!showSize)} className="font-semibold text-sm mb-2 cursor-pointer flex justify-between">
              Filter by Size <span>{showSize ? "▲" : "▼"}</span>
            </h3>
            {showSize && (
              <div className="space-y-1">
                {["S", "M", "L", "XL", "XXL"].map(size => (
                  <button key={size} onClick={() => updateFilter("size", size)}
                    className={`block text-left text-sm px-2 py-1 rounded hover:bg-blue-100 ${
                      sizeParam === size ? "bg-blue-200 text-blue-800" : "text-gray-700"
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 onClick={() => setShowPrice(!showPrice)} className="font-semibold text-sm mb-2 cursor-pointer flex justify-between">
              Filter by Price <span>{showPrice ? "▲" : "▼"}</span>
            </h3>
            {showPrice && (
              <div className="space-y-1">
                {[
                  { label: "Under $50", value: "0-50" },
                  { label: "$50 - $100", value: "50-100" },
                  { label: "$100 - $200", value: "100-200" },
                  { label: "Above $200", value: "200-100000" },
                ].map(({ label, value }) => (
                  <button key={value} onClick={() => updateFilter("price", value)}
                    className={`block text-left text-sm px-2 py-1 rounded hover:bg-blue-100 ${
                      priceParam === value ? "bg-blue-200 text-blue-800" : "text-gray-700"
                    }`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        <main className="w-full md:w-3/4">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.product_id} onClick={() => navigate(`/product-page/${product.product_id}`)}
                  className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
                  <img
                    src={product.product_img1 ? `http://localhost:8000/storage/${product.product_img1}` : placeholderImg}
                    alt={product.product_title || "Product"}
                    className="h-64 w-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderImg; }}
                  />
                  <div className="p-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">New</span>
                    <h3 className="font-medium text-sm">{product.product_title || "No Title"}</h3>
                    <p className="text-gray-700 text-xs mb-2">
                      {product.product_desc
                        ? product.product_desc.length > 100
                          ? product.product_desc.slice(0, 100) + "..."
                          : product.product_desc
                        : "No description"}
                    </p>
                    <p className="font-bold mt-2 text-blue-600">${product.product_price || "0.00"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ Added useNavigate
import { ArrowRight } from 'lucide-react';

const ProductSpecs = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    if (!id) return;

    fetch(`http://127.0.0.1:8000/api/products/${id}/related`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching related products:', err));
  }, [id]);

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-16">
      

      {/* Images + Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-6">
        <div className="hidden xl:block"></div>
        {products.map((product) => (
          <div key={product.product_id} className="flex flex-col items-center space-y-3">
            <div className="w-[150px] h-[200px]">
              <img
                src={`http://127.0.0.1:8000/storage/${product.product_img1}`}
                alt={product.product_title}
                className="w-full h-full object-cover rounded-md shadow-md"
              />
            </div>
          <button
  onClick={() => navigate(`/product-page/${product.product_id}`)}
  className="relative px-6 py-2.5 rounded-full bg-[#5B2EFF] text-white text-sm md:text-base font-semibold flex items-center gap-2 transition-all duration-200 group"
>
  <span className="relative z-[2]">View details</span>
  <ArrowRight size={18} />
  <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-white/20 group-hover:w-full"></div>
</button>
          </div>
        ))}
      </div>

      {/* Brand name */}
      <div className="grid grid-cols-6 gap-4 items-center border-t py-4">
        <div className="font-semibold text-sm md:text-base">Title:</div>
        {products.map((product) => (
          <div key={product.product_id} className="text-center font-medium text-sm md:text-base">
            {product.product_title}
          </div>
        ))}
      </div>

      {/* Color */}
      <div className="grid grid-cols-6 gap-4 items-center border-t py-4">
        <div className="font-semibold text-sm md:text-base">Colors:</div>
        {products.map((product) => (
          <div key={product.product_id} className="text-sm md:text-base">
            {product.product_color}
          </div>
        ))}
      </div>

      {/* Sizes */}
      <div className="grid grid-cols-6 gap-4 items-center border-t py-4">
        <div className="font-semibold text-sm md:text-base">Available Sizes:</div>
        {products.map((product) => (
          <div key={product.product_id} className="text-sm md:text-base">
            {product.product_size}
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="grid grid-cols-6 gap-4 items-center border-t py-4">
        <div className="font-semibold text-sm md:text-base">Price:</div>
        {products.map((product) => (
          <div key={product.product_id} className="text-red-600 font-semibold text-sm md:text-base">
            ${product.product_price}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecs;

import React from 'react';
import { X, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

const CartSidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed right-0 top-0 w-full sm:w-[485px] h-screen bg-white dark:bg-gray-800 shadow-xl p-5 overflow-y-auto flex flex-col rounded-l-lg transform transition-transform duration-300 ease-in-out z-50 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute right-5 top-5 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
      >
        <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Cart Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center mt-4">
        Your cart
      </h2>

      {/* Empty Cart State */}
      <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
        <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600" />
        <p className="text-gray-600 dark:text-gray-300">Your cart is empty</p>
        <button className="relative bg-blue-700 px-8 py-2.5 rounded-full text-base cursor-pointer overflow-hidden group">
          <span className="relative z-[2] font-medium text-white">Start shopping</span>
          <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-black/10 group-hover:w-full"></div>
        </button>
      </div>

      {/* Hot Deals Section */}
      <div className="pt-6 relative">
        {/* Section Header with Arrows */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Hot deals on tech...</h3>
          <div className="flex gap-2">
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:scale-125 transition-transform duration-200" />
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:scale-125 transition-transform duration-200" />
          </div>
        </div>

        {/* Product Card */}
        <div className="border rounded-xl p-4 relative overflow-hidden dark:border-gray-700 flex flex-col sm:flex-row sm:pl-[130px]">
          {/* Product Image (Left Side) */}
          <div className="sm:absolute sm:left-0 sm:top-0 sm:bottom-0 sm:w-[120px] mb-4 sm:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
              alt="Fitness Tracker"
              className="h-full w-full object-cover sm:rounded-r-lg rounded-lg"
            />
          </div>

          {/* Product Content */}
          <div className="sm:pl-0">
            {/* Product Title with Arrows */}
            <div className="flex items-center gap-2 mb-2">
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300 cursor-pointer hover:scale-125 transition-transform duration-200" />
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300 cursor-pointer hover:scale-125 transition-transform duration-200" />
              <h4 className="text-base font-medium text-gray-800 dark:text-white">
                Polar A370 Fitness Tracker
              </h4>
            </div>

            {/* Pricing */}
            <div className="flex gap-4 mb-3">
              <span className="text-green-700 dark:text-green-400 font-bold">$120.00</span>
              <span className="text-gray-600 dark:text-gray-400 line-through">$154.50</span>
            </div>

            {/* Choose Options Button */}
            <button className="relative border-2 bg-white dark:bg-gray-800 border-gray-800 dark:border-gray-600 px-4 py-1 mt-2 rounded-full text-sm cursor-pointer overflow-hidden group w-full">
              <span className="relative z-[2] font-medium text-gray-800 dark:text-white">Choose options</span>
              <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-black/10 group-hover:w-full"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
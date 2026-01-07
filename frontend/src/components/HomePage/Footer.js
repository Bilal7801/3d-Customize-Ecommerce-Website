import React from "react";
import {
  MessageCircle,
  Package,
  RefreshCw,
  DollarSign,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const SupportInfoBar = () => {
  return (
    <div className="bg-blue-900 text-white dark:bg-[#171e28] dark:text-gray-200 py-4">
      <div className="container mx-auto flex flex-wrap gap-6 justify-between items-center px-4 md:px-10">
        {/* Item */}
        <div className="flex items-start space-x-2 w-full sm:w-1/2 md:w-auto">
          <MessageCircle size={24} />
          <div>
            <h3 className="font-semibold">Visit our support center</h3>
            <p className="text-sm">Expert help & advice</p>
          </div>
        </div>

        <div className="flex items-start space-x-2 w-full sm:w-1/2 md:w-auto">
          <Package size={24} />
          <div>
            <h3 className="font-semibold">Check your order status</h3>
            <p className="text-sm">Updates & tracking</p>
          </div>
        </div>

        <div className="flex items-start space-x-2 w-full sm:w-1/2 md:w-auto">
          <RefreshCw size={24} />
          <div>
            <h3 className="font-semibold">Returns & exchanges</h3>
            <p className="text-sm">All you need to know</p>
          </div>
        </div>

        <div className="flex items-start space-x-2 w-full sm:w-1/2 md:w-auto">
          <DollarSign size={24} />
          <div>
            <h3 className="font-semibold">Price-match guarantee</h3>
            <p className="text-sm">Our promise to you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
 <footer className="bg-black text-white px-4 sm:px-8 md:px-12 pt-10 pb-4 dark:bg-black dark:text-gray-300">

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        <div>
          <h3 className="text-orange-500 font-bold text-xl mb-4">ENTERPRISE</h3>
          <p>
            This is a demo store by Clean Canvas. All product images remain the sole property of the respective brands.
          </p>
          <div className="flex space-x-4 mt-6 text-2xl">
            <a href="#hy"><i className="fab fa-facebook-f hover:text-blue-500"></i></a>
            <a href="#hy"><i className="fab fa-instagram hover:text-orange-500"></i></a>
            <a href="#hy"><i className="fab fa-twitter hover:text-blue-500"></i></a>
            <a href="#hy"><i className="fab fa-linkedin hover:text-blue-500"></i></a>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4">Delivery & Returns</h3>
          <ul className="space-y-2">
            <li><a href="#hy" className="hover:text-blue-400">Shipping Information</a></li>
            <li><a href="#hy" className="hover:text-blue-400">Returns & Refunds</a></li>
            <li><a href="#hy" className="hover:text-blue-400">Track Your Order</a></li>
            <li><a href="#hy" className="hover:text-blue-400">Help & FAQs</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">About Enterprise</h3>
          <ul className="space-y-2">
            <li><a href="#hy" className="hover:text-blue-400">About Us</a></li>
            <li><a href="#hy" className="hover:text-blue-400">Our Brands</a></li>
            <li><a href="#hy" className="hover:text-blue-400">Advice & Reviews</a></li>
            <li><a href="#hy" className="hover:text-blue-400">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Sign up to our newsletter</h3>
          <p className="mb-4">Sign up for exclusive offers, original stories, events, and more.</p>
          <form className="relative w-full">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 pr-12 bg-white text-black rounded-full dark:bg-gray-800 dark:text-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-700 ">
        {/* Currency & Language */}
        {/* <div className="flex gap-4 flex-wrap"> */}
          {/* <div className="relative">
            <select className="bg-white dark:bg-gray-800 text-black dark:text-gray-300 border border-transparent px-4 py-2 pr-10 rounded-full focus:outline-none">
              <option>Sweden (SEK kr)</option>
              <option>USA (USD $)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-400 pointer-events-none" />
          </div> */}
          {/* <div className="relative">
            <select className="bg-white dark:bg-gray-800 text-black dark:text-gray-300 border border-transparent px-4 py-2 pr-10 rounded-full focus:outline-none">
              <option>English</option>
              <option>Swedish</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-400 pointer-events-none" />
          </div> */}
        {/* </div> */}

        {/* Payment Icons */}
        {/* <div className="flex gap-4">
          <img src="https://pk.visamiddleeast.com/dam/VCOM/regional/cemea/generic-cemea/pay-with-visa/find-a-card/visa-classic-new-800x450.png" alt="Visa" className="h-6 object-contain" />
          <img src="https://dpogroup.com/wp-content/uploads/2021/07/Asset-1@4x.png" alt="Mastercard" className="h-6 object-contain" />
        </div> */}
      </div>

      {/* Footer Links */}
     <div className="mt-4 flex flex-col md:flex-row items-center justify-between text-sm mb-0 pb-0">
  <p className="text-center mb-2 md:mb-0">
    © 2025 Enterprise Digital. Powered by Shopify
  </p>
  <div className="flex space-x-4">
    <a href="/about" className="hover:text-blue-500">About Us</a>
    <a href="/brands" className="hover:text-blue-500">Our Brands</a>
    <a href="/reviews" className="hover:text-blue-500">Advice & Reviews</a>
    <a href="/contact" className="hover:text-blue-500">Contact Us</a>
  </div>
</div>

    </footer>
  );
};

const MainLayout = () => {
  return (
    <div className="bg-white dark:bg-[#0f172a]">
      <SupportInfoBar />
      <Footer />
    </div>
  );
};

export default MainLayout;

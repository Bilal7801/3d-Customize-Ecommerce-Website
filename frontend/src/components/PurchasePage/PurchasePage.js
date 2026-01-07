import React, { useEffect, useRef, useState } from 'react';
import LeftPurchase from './LeftPurchase';
import RightPurchase from './RightPurchase';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PurchasePage = () => {
  const rightSectionRef = useRef(null);
  const mainContainerRef = useRef(null);
  const [heightDifference, setHeightDifference] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);
  const [addressInfo, setAddressInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const { state } = useLocation();
  const { product, quantity, color, size } = state || {};

  // Smooth scroll for sticky right section
  useEffect(() => {
    const handleScroll = () => {
      if (!mainContainerRef.current || !rightSectionRef.current) return;

      const mainContainer = mainContainerRef.current;
      const rightSection = rightSectionRef.current;

      const containerTop = mainContainer.offsetTop;
      const containerHeight = mainContainer.scrollHeight + heightDifference;
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

    window.addEventListener('scroll', handleScroll);

    const preventIndependentScroll = (e) => {
      e.preventDefault();
      window.scrollBy({ top: e.deltaY });
    };

    const rightSection = rightSectionRef.current;
    if (rightSection) {
      rightSection.addEventListener('wheel', preventIndependentScroll, { passive: false });
      rightSection.addEventListener('touchmove', preventIndependentScroll, { passive: false });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rightSection) {
        rightSection.removeEventListener('wheel', preventIndependentScroll);
        rightSection.removeEventListener('touchmove', preventIndependentScroll);
      }
    };
  }, [heightDifference]);

  // Load cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (product) {
          // Buy Now from product page
          const tempItem = {
            id: product.product_id,
            quantity: quantity || 1,
            color: color || 'N/A',
            size: size || 'N/A',
            product: product
          };
          setCartItems([tempItem]);
          setTotalAmount((quantity || 1) * product.product_price);

        } else if (state?.cart && Array.isArray(state.cart)) {
          // Checkout via state cart (from "Add to Cart")
          setCartItems(state.cart);
          const total = state.cart.reduce(
            (acc, item) => acc + (item.quantity || item.qty) * (item.product?.product_price || item.price || 0),
            0
          );
          setTotalAmount(total);

        } else {
          // Check localStorage for custom shirt "Buy Now"
          const localCart = localStorage.getItem('checkoutCart');
          if (localCart) {
            const parsed = JSON.parse(localCart);
            setCartItems(parsed);
            const total = parsed.reduce(
              (acc, item) => acc + (item.qty || 1) * (item.price || 0),
              0
            );
            setTotalAmount(total);
            return;
          }

          // Fallback: fetch backend cart
          const response = await axios.get('/api/cart');
          setCartItems(response.data);
          const total = response.data.reduce(
            (acc, item) => acc + item.quantity * item.product.product_price,
            0
          );
          setTotalAmount(total);
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCart();
  }, [product, quantity, color, size, state?.cart]);

  // Receive data from LeftPurchase form
  const handleDataChange = ({ contact, address, payment }) => {
    setContactInfo(contact);
    setAddressInfo(address);
    setPaymentMethod(payment);
  };

  return (
    <div
      ref={mainContainerRef}
      className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6 w-full max-w-screen-xl mx-auto px-4 md:px-6 py-6"
    >
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Right Summary Panel */}
      <div
        ref={rightSectionRef}
        className="w-full md:w-1/2 bg-white p-4 md:p-6 rounded-xl shadow-sm 
                   md:sticky md:top-0 md:h-[calc(100vh+60px)] md:overflow-y-auto scrollbar-hide"
      >
        <RightPurchase
          items={cartItems}
          contact={contactInfo}
          address={addressInfo}
          paymentMethod={paymentMethod}
        />
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-gray-300" />

      {/* Left Checkout Form */}
      <div className="md:w-1/2">
        <LeftPurchase onDataChange={handleDataChange} amount={totalAmount} />
      </div>
    </div>
  );
};

export default PurchasePage;

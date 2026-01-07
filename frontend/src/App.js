// src/App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './components/AuthContext'; 

// Pages & Components
import LogIn from './components/LogIn';
import SignUpForm from './components/SignUpForm';
import OtpVerification from './components/OtpVerification';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import MyAccount from './components/HomePage/MyAccount';
import MyOrders from './components/HomePage/MyOrders';
import MyWishlist from './components/HomePage/MyWishlist';
import MyReviews from './components/HomePage/MyReviews';
import MyReturns from './components/HomePage/MyReturns';
import HomePage from './components/HomePage/HomePage';
import CustomizePage from './components/CustomizePage/CustomizePage';
import ProductPage from './components/ProductPage/ProductPage';
import CartPage from './components/CartPage/CartPage';
import PurchasePage from './components/PurchasePage/PurchasePage';
import SearchPage from './components/SearchPage/SearchPage';
import OrderTrack from './components/OrderTrack/OrderTrack';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/my-account', element: <MyAccount /> },
      { path: '/my-orders', element: <MyOrders /> },
      { path: '/my-wishlist', element: <MyWishlist /> },
      { path: '/my-reviews', element: <MyReviews /> },
      { path: '/my-returns', element: <MyReturns /> },
      { path: '/login', element: <LogIn /> },
      { path: '/signin', element: <SignUpForm /> },
      { path: '/verify-otp', element: <OtpVerification /> },
      { path: '/reset-password', element: <ResetPasswordForm /> },
      { path: '/forgot-password', element: <ForgotPasswordForm /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/search-page', element: <SearchPage /> },
      { path: '/order-track', element: <OrderTrack /> },
      { path: '/product-page/:id', element: <ProductPage /> },
      { path: '/purchase/:id', element: <PurchasePage /> }
    ]
  },
  {
    path: '/customize',
    element: <CustomizePage />
  }
]);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        {/* Wrap the RouterProvider with AuthProvider to provide auth context */}
      <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

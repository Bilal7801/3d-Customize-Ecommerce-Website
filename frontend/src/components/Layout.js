import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './HomePage/Navbar';
import Footer from './HomePage/Footer';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

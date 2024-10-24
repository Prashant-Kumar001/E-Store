// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from './ScrollToTop.js'; // Import ScrollToTop

const Layout = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`${isDarkMode ? 'bg-black text-gray-100' : 'bg-gray-200 text-gray-900'}`}>
      <ScrollToTop /> {/* Add ScrollToTop here */}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

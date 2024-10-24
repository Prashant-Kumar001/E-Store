import React, { useState } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { FaCartArrowDown } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/toggle/themeSlice.js';
import { LoginButton, LogoutButton, isLogin } from '../components/Sighup.jsx';
import { FaUserAlt } from "react-icons/fa";
import { span } from 'framer-motion/client';

const Header = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.darkMode);
    const cartL = useSelector((state) => state.cart.productQuantity);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        dispatch(toggleTheme());
        localStorage.setItem('darkMode', !isDarkMode);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Function to close the menu when a link is clicked
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <header className={`sticky top-0 left-0 w-full z-50 shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                {/* Logo and Profile */}
                <div className='flex items-center gap-2'>
                    <h1 className={`text-2xl font-bold transition-all duration-300 border-2 border-gray-500 p-1 ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>
                        P <span className='text-yellow-500'>STORE</span>
                    </h1>
                    <NavLink to="/profile" className="ml-3">
                        <FaUserAlt size={23} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-all duration-300`} />
                    </NavLink>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? (
                        <FaTimes className={`text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                    ) : (
                        <FaBars className={`text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                    )}
                </div>

                {/* Navigation Links */}
                <nav className={`md:flex md:items-center md:gap-5 absolute md:relative w-full md:w-auto left-0 top-full md:top-0 ${isOpen ? 'block' : 'hidden'} md:block bg-gray-100 md:bg-transparent transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-gray-950' : 'bg-white'}`}>
                    <ul className="flex flex-col md:flex-row items-start md:items-center gap-3 p-4 md:p-0">
                        {/* Dark Mode Toggle */}
                        <li>
                            <button onClick={handleToggle} className="p-2 rounded-full shadow-md transition-all duration-300">
                                {isDarkMode ? (
                                    <FaSun className="text-yellow-300 w-6 h-6" />
                                ) : (
                                    <FaMoon className="text-gray-800 w-6 h-6" />
                                )}
                            </button>
                        </li>

                        <li>
                            <NavLink to="/" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : `${isDarkMode ? 'text-gray-300 hover:text-blue-300' : 'text-gray-700 hover:text-blue-500'} transition-all duration-300`}>
                                Home
                            </NavLink>
                        </li>

                        {['About', 'Products', 'Contact'].map((link) => (
                            <li key={link}>
                                <NavLink
                                    to={`/${link.toLowerCase()}`}
                                    onClick={handleLinkClick} // Close menu on click
                                    className={({ isActive }) =>
                                        isActive ? 'text-blue-500 font-bold' : `${isDarkMode ? 'text-gray-300 hover:text-blue-300' : 'text-gray-700 hover:text-blue-500'} transition-all duration-300`
                                    }
                                >
                                    {link}
                                </NavLink>
                            </li>
                        ))}

                        {/* Authentication */}
                        <li>
                            {isLogin() ? (
                                <span className=" px-3 py-1 logout"> <LogoutButton /></span>
                            ) : (
                                <span className=" px-3 py-1  login"> <LoginButton /></span>
                            )}
                        </li>

                        {/* Cart Icon */}
                        <li className="relative">
                            <NavLink to="/cart" onClick={handleLinkClick} className="relative">
                                {cartL > 0 && (
                                    <span className="absolute top-[-8px] right-[-11px] bg-red-500 rounded-full text-white h-5 w-5 flex items-center justify-center text-xs">{cartL}</span>
                                )}
                                <FaCartArrowDown size={23} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-all duration-300`} />
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

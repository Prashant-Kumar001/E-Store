import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importing social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-200 py-12 md:px-6 ">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Company Info Section */}
        <div>
          <h4 className="font-bold text-xl mb-4">About Us</h4>
          <p className="text-sm mb-4">
            We are committed to providing the best online shopping experience. Explore a wide range of products with top-notch quality and service.
          </p>
          <p className="text-sm">
            &copy; 2024 E-Store. All Rights Reserved.
          </p>
        </div>

        {/* Categories Section */}
        <div>
          <h4 className="font-bold text-xl mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Electronics</a></li>
            <li><a href="#" className="hover:text-blue-400">Fashion</a></li>
            <li><a href="#" className="hover:text-blue-400">Home & Garden</a></li>
            <li><a href="#" className="hover:text-blue-400">Health & Beauty</a></li>
            <li><a href="#" className="hover:text-blue-400">Toys & Games</a></li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div>
          <h4 className="font-bold text-xl mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Help & Support</a></li>
            <li><a href="#" className="hover:text-blue-400">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-blue-400">Track Your Order</a></li>
            <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div>
          <h4 className="font-bold text-xl mb-4">Stay Connected</h4>
          <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates and exclusive deals!</p>
          <form className="flex justify-center md:justify-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 w-2/3 text-gray-900 rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md text-white hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="container mx-auto text-center mt-10">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
        <nav>
          <ul className="flex justify-center space-x-6 text-sm">
            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400">Refund Policy</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

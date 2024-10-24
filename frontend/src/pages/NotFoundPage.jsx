import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importing an icon for the error message
import { Link } from 'react-router-dom'; // Import Link to navigate back to home

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[39vh] ">
      <div className="text-center">
        <FaExclamationTriangle className="text-6xl text-yellow-500 mb-4" />
        <h2 className="text-4xl font-bold ">404 - Page Not Found</h2>
        <p className="text-lg  mt-2">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link to="/" className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition duration-300">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

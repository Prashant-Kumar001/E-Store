import React from 'react';
import { useSelector } from 'react-redux';
const ILoading = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className={`flex items-center justify-center min-h-screen  ${isDarkMode ? 'bg-gradient-to-r from-gray-900 to-black' : ''} `}>
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        
        {/* Inner content */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <span className="text-blue-500 font-bold text-xl">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default ILoading;

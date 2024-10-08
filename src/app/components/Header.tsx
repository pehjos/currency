"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-gradient-to-r from-gray-900/70 to-gray-800/70 backdrop-blur-md shadow-lg px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-bold cursor-pointer">
          <span className="bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
            CurrencyViewer
          </span>
        </div>

        <div className="hidden md:flex space-x-8 text-lg">
          {["Home", "Features", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative group text-white transition duration-300 hover:text-teal-400"
            >
              {item}
              <span className="block h-[2px] max-w-0 group-hover:max-w-full transition-all duration-300 bg-teal-400"></span>
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="px-4 py-2 bg-gray-700 bg-opacity-70 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 focus:outline-none">
            Sign In
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg shadow-lg text-white transition-transform duration-300 transform hover:scale-105 focus:outline-none">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden focus:outline-none text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 z-30 flex items-center justify-center md:hidden">
          <div className="flex flex-col space-y-6 text-center text-2xl text-white">
            <button
              onClick={toggleMobileMenu}
              className="text-3xl absolute top-5 right-5 text-white"
            >
              ✕
            </button>
            {["Home", "Features", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={toggleMobileMenu}
                className="hover:text-teal-400 transition duration-300"
              >
                {item}
              </a>
            ))}
            <button className="px-4 py-2 bg-gray-700 bg-opacity-70 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 focus:outline-none">
              Sign In
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg shadow-lg text-white transition-transform duration-300 transform hover:scale-105 focus:outline-none">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

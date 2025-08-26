import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/slogo.png";
import { motion, AnimatePresence } from "framer-motion";

export default function SecondNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black/80 border border-gray-700 rounded-xl fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-7xl w-[90%] sm:w-[80%] lg:w-[70%] backdrop-blur-sm">
      {/* Left Side: Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-29 h-22 object-contain" />
        <span className="text-xl font-bold">Sneaker Street</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex  items-center gap-6">
        <Link to="/WishList">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </Link>

        <Link to="/Cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        </Link>

        <Link to="/Orders">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-6 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z" />
            </svg>
        </Link>

        <Link to="/products">
          <button className="px-4 py-2 bg-violet-600 rounded-lg hover:bg-violet-700 transition">
            Home
          </button>
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 w-full bg-black/90 border-t border-gray-700 flex flex-col items-center gap-6 py-6 md:hidden rounded-xl"
          >
            <Link
              to="/WishList"
              className="hover:text-violet-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              ❤️ Wishlist
            </Link>

            <Link
              to="/Cart"
              className="hover:text-violet-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              🛒 Cart
            </Link>

            <Link
              to="/Orders"
              className="hover:text-violet-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              📦 Orders
            </Link>

            <Link to="/products" onClick={() => setMenuOpen(false)}>
              <button className="px-4 py-2 bg-violet-600 rounded-lg hover:bg-violet-700 transition">
                Home
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

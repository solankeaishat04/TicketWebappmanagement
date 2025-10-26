import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white shadow-md">
      <div className="max-w-[1440px] mx-auto px-4">
        <nav className="flex items-center justify-between py-2 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3">
            <img
              src="/images/ticket_management_app_logo_triangular_tickets-removebg-preview.svg"
              alt="TicketWeb logo"
              className="h-10 w-10 md:h-16 md:w-16"
            />
            {/* Hide text on mobile */}
            <span className="text-xl md:text-2xl font-semibold hidden md:inline">
              TicketMaster
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-green-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-white text-green-600 font-medium hover:bg-green-100 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-green-600 rounded-lg shadow-lg p-3 flex flex-col space-y-2">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-green-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-white text-green-600 font-medium hover:bg-green-100 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

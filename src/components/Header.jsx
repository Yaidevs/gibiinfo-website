import React, { useEffect, useRef } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = ({ menuOpen, setMenuOpen }) => {
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="bg-[#008080] text-white fixed w-full z-20">
      <div className="w-full max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#home">
          <div className="flex items-center">
            <img src={logo} className="w-16 h-auto" alt="Gibi Info Logo" />
            <span className="text-3xl font-bold">Gibi Info</span>
          </div>
        </a>
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
        </button>

        {/* Navigation Menu */}
        <nav
          ref={menuRef}
          className={`absolute lg:static bg-[#008080] lg:bg-transparent w-full lg:w-auto top-[70px] left-0 lg:flex flex-col lg:flex-row items-center transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="lg:flex lg:space-x-6 text-center lg:text-left py-6 lg:py-0 w-full lg:w-auto">
            {["Home", "About Us", "Featured", "Testimonial"].map((item) => (
              <a
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="block py-3 px-8 text-lg hover:bg-[#007070] transition duration-200 rounded lg:rounded-none"
                key={item}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex space-x-4">
          <button className="bg-transparent border border-white text-white px-4 py-2 rounded-md">
            Download
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

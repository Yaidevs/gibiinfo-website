"use client";

import { useEffect, useRef, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./ExitExam/data/slice/authSlice";
import { FaUser, FaSignOutAlt, FaBook, FaUserCircle } from "react-icons/fa";

const Header = ({ menuOpen, setMenuOpen }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get user email from localStorage if available
  const getUserEmail = () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      return userEmail || null;
    } catch (error) {
      console.error("Error getting user email:", error);
      return null;
    }
  };

  // Get first letter of email for profile circle
  const getProfileInitial = () => {
    const email = getUserEmail();

    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return "U"; // Default fallback
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userEmail");
    // Redirect to home or refresh page if needed
    window.location.href = "/";
  };

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

  // Handle dropdown clicks
  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      const dropdown = document.getElementById("profile-dropdown");
      const profileButton = document.getElementById("profile-button");

      if (
        dropdown &&
        profileButton &&
        !dropdown.contains(event.target) &&
        !profileButton.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutsideDropdown);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
  }, [dropdownOpen]);

  return (
    <header className="bg-[#008080] text-white fixed w-full z-20">
      <div className="w-full max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center">
            <img
              src={logo || "/placeholder.svg"}
              className="w-16 h-auto"
              alt="Gibi Info Logo"
            />
            <span className="text-3xl font-bold">Gibi Info</span>
          </div>
        </Link>

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
            {["Home", "About Us", "Featured"].map((item) => (
              <Link
                to={`/#${item.toLowerCase().replace(" ", "")}`}
                className="block py-3 px-8 text-lg hover:bg-[#007070] transition duration-200 rounded lg:rounded-none"
                key={item}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            {/* Exit Exam Link */}
            <Link
              to="/exit-exam"
              className="block py-3 px-8 text-lg hover:bg-[#007070] transition duration-200 rounded lg:rounded-none"
              onClick={() => setMenuOpen(false)}
            >
              Exit Exam
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-exams"
                className="block py-3 px-8 text-lg hover:bg-[#007070] transition duration-200 rounded lg:rounded-none"
                onClick={() => setMenuOpen(false)}
              >
                My Exams
              </Link>
            )}
          </div>

          {/* Mobile User Profile Menu - Only shown when menu is open and authenticated */}
          {isAuthenticated && (
            <div className="lg:hidden bg-[#007070] py-2 px-6 w-full mt-2">
              <div className="flex items-center py-3 border-b border-[#006060]">
                <div className="w-8 h-8 rounded-full bg-white text-[#008080] flex items-center justify-center font-bold mr-3">
                  {getProfileInitial()}
                </div>
                <span className="text-white">{getUserEmail() || "User"}</span>
              </div>
              <Link
                to="/my-exams"
                className="flex items-center py-3 text-white hover:bg-[#006060] px-2 rounded"
                onClick={() => setMenuOpen(false)}
              >
                <FaBook className="mr-3" />
                My Exams
              </Link>
              <Link
                to="/profile"
                className="flex items-center py-3 text-white hover:bg-[#006060] px-2 rounded"
                onClick={() => setMenuOpen(false)}
              >
                <FaUser className="mr-3" />
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center w-full py-3 text-white hover:bg-[#006060] px-2 rounded"
              >
                <FaSignOutAlt className="mr-3" />
                Sign Out
              </button>
            </div>
          )}
        </nav>

        {/* Desktop Download Button */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => window.open("https://t.me/enterance_exam", "_blank")}
            className="bg-transparent border border-white text-white px-4 py-2 rounded-md"
          >
            Download
          </button>

          {/* Desktop User Profile - Only shown when authenticated */}
          {isAuthenticated && (
            <div className="relative">
              <div
                id="profile-button"
                onClick={handleProfileClick}
                className="w-10 h-10 rounded-full bg-white text-[#008080] flex items-center justify-center font-bold cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {getProfileInitial()}
              </div>

              {/* Dropdown menu - using state instead of CSS hover */}
              {dropdownOpen && (
                <div
                  id="profile-dropdown"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                >
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {getUserEmail() || "User"}
                  </div>
                  <Link
                    to="/my-exams"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaBook className="mr-2 text-gray-500" />
                    My Exams
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaUserCircle className="mr-2 text-gray-500" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

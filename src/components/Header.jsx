"use client";

import { useEffect, useRef, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setToken } from "./ExitExam/data/slice/authSlice";
import {
  FaUser,
  FaSignOutAlt,
  FaBook,
  FaPhone,
  FaTimes,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { signInWithGoogle } from "../../firebase";
import { useCreateUserMutation } from "./ExitExam/data/api/userApi";

// Toast component
const Toast = ({ message, type = "error", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md">
      <div
        className={`flex items-center p-4 mb-4 rounded-lg shadow-lg ${
          type === "error"
            ? "bg-red-50 text-red-800"
            : "bg-green-50 text-green-800"
        }`}
      >
        <div
          className={`flex-shrink-0 ${
            type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {type === "error" ? (
            <FaExclamationCircle size={20} />
          ) : (
            <FaCheckCircle size={20} />
          )}
        </div>
        <div className="ml-3 text-sm font-medium">{message}</div>
        <button
          type="button"
          onClick={onClose}
          className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 ${
            type === "error"
              ? "bg-red-100 text-red-500 hover:bg-red-200"
              : "bg-green-100 text-green-500 hover:bg-green-200"
          }`}
        >
          <span className="sr-only">Close</span>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

const Header = ({ menuOpen, setMenuOpen }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sign up modal states
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [createUser] = useCreateUserMutation();

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });

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
    if (email && email.length > 0) {
      return email.charAt(0).toUpperCase();
    }
    return "U"; // Default fallback if email exists but is empty
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
  }, [menuOpen, setMenuOpen]);

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

  // Open sign up modal
  const handleOpenSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setPhoneNumber("");
    setPhoneError("");
  };

  // Close sign up modal
  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  // Validate phone number
  const validatePhoneNumber = (number) => {
    // Basic validation - adjust as needed for your requirements
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(number);
  };

  // Handle Google login with phone number
  const handleGoogleLoginWithPhone = async (phoneNum) => {
    try {
      setIsProcessing(true);
      const user = await signInWithGoogle();
      const { email } = user;

      // Store email in localStorage for profile display
      localStorage.setItem("userEmail", email);

      // Register user with API
      const response = await createUser({
        email,
        phoneNumber: phoneNum,
      }).unwrap();

      // Check if registration was successful
      if (!response.success) {
        // Show error toast
        setToast({
          show: true,
          message:
            response.message ||
            "This phone number is already registered with different email address!",
          type: "error",
        });

        setIsProcessing(false);
        handleCloseSignUpModal();
        return;
      }

      // Store token in Redux using the existing slice pattern
      dispatch(setToken(response));

      // Close modal after successful login
      handleCloseSignUpModal();

      // Show success toast
      setToast({
        show: true,
        message: "Successfully signed in!",
        type: "success",
      });
    } catch (error) {
      console.error("Registration failed:", error);

      // Check if the error contains a response with a message
      if (error.data && !error.data.success) {
        setToast({
          show: true,
          message:
            error.data.message || "Registration failed. Please try again.",
          type: "error",
        });
      } else {
        setToast({
          show: true,
          message: "Registration failed. Please try again.",
          type: "error",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle phone number submission and immediately trigger Google sign-in
  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    setPhoneError("");
    // Immediately trigger Google sign-in with the provided phone number
    handleGoogleLoginWithPhone(phoneNumber);
  };

  return (
    <header className="bg-[#008080] text-white fixed w-full z-20">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <div className="flex items-center">
            <img
              src={logo || "/placeholder.svg"}
              className="w-10 h-auto sm:w-16"
              alt="Gibi Info Logo"
            />
            <span className="text-xl sm:text-3xl font-bold ml-1 sm:ml-2">
              Gibi Info
            </span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>

        {/* Navigation Menu */}
        <nav
          ref={menuRef}
          className={`absolute lg:static bg-[#008080] lg:bg-transparent w-full lg:w-auto top-[60px] sm:top-[70px] left-0 lg:flex flex-col lg:flex-row items-center transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          } shadow-lg lg:shadow-none`}
        >
          <div className="lg:flex lg:space-x-1 xl:space-x-6 text-center lg:text-left py-4 lg:py-0 w-full lg:w-auto">
            {["Home", "About Us", "Featured"].map((item) => (
              <Link
                to={`/#${item.toLowerCase().replace(" ", "")}`}
                className="block py-2 lg:py-0 px-4 lg:px-2 xl:px-4 text-base lg:text-sm xl:text-base hover:bg-[#007070] lg:hover:bg-transparent lg:hover:text-gray-200 transition duration-200 whitespace-nowrap"
                key={item}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            {/* Exit Exam Link with blinking animation */}
            <Link
              to="/exit-exam"
              className="block py-2 lg:py-0 px-4 lg:px-2 xl:px-4 text-base lg:text-sm xl:text-base hover:bg-[#007070] lg:hover:bg-transparent lg:hover:text-gray-200 transition duration-200 relative whitespace-nowrap font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Exit Exam
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-exams"
                className="block py-2 lg:py-0 px-4 lg:px-2 xl:px-4 text-base lg:text-sm xl:text-base hover:bg-[#007070] lg:hover:bg-transparent lg:hover:text-gray-200 transition duration-200 whitespace-nowrap"
                onClick={() => setMenuOpen(false)}
              >
                My Exams
              </Link>
            )}
          </div>

          {/* Mobile User Profile Menu - Only shown when menu is open */}
          <div className="lg:hidden bg-[#007070] py-2 px-6 w-full mt-2">
            {isAuthenticated && getUserEmail() ? (
              <>
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
              </>
            ) : (
              <button
                onClick={() => {
                  handleOpenSignUpModal();
                  setMenuOpen(false);
                }}
                className="flex items-center w-full py-3 text-white hover:bg-[#006060] px-2 rounded justify-center"
              >
                <FaUser className="mr-3" />
                Sign Up / Sign In
              </button>
            )}
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 flex-shrink-0">
          {!isAuthenticated ? (
            <button
              onClick={handleOpenSignUpModal}
              className="bg-white text-[#008080] px-3 xl:px-4 py-1.5 xl:py-2 rounded-md hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
            >
              Sign Up / Sign In
            </button>
          ) : getUserEmail() ? (
            <div className="relative">
              <div
                id="profile-button"
                onClick={handleProfileClick}
                className="w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-white text-[#008080] flex items-center justify-center font-bold cursor-pointer hover:bg-gray-100 transition-colors"
              >
                {getProfileInitial()}
              </div>

              {/* Dropdown menu - using state instead of CSS hover */}
              {dropdownOpen && (
                <div
                  id="profile-dropdown"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                >
                  <div className="px-4 py-2 text-sm text-gray-700 border-b truncate">
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
          ) : (
            <button
              onClick={handleOpenSignUpModal}
              className="bg-white text-[#008080] px-3 xl:px-4 py-1.5 xl:py-2 rounded-md hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
            >
              Sign Up / Sign In
            </button>
          )}

          <Link
            to="/exit-exam"
            className="bg-transparent border border-white text-white px-3 xl:px-4 py-1.5 xl:py-2 rounded-md hover:bg-[#007070] transition-colors text-sm whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Sign Up Modal - Only Phone Number Step */}
      {isSignUpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#008080] text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-semibold">
                Sign Up / Sign In
              </h3>
              <button
                onClick={handleCloseSignUpModal}
                className="text-white hover:text-gray-200"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body - Only Phone Number Step */}
            <div className="p-4 sm:p-6">
              <form onSubmit={handlePhoneSubmit}>
                <div className="mb-6">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">
                    Enter Your Phone Number
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Please enter your phone number to continue with the sign up
                    process.
                  </p>

                  <div className="mt-4">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+251 91 234 5678"
                        className="pl-10 w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                        required
                      />
                    </div>
                    {phoneError && (
                      <p className="mt-2 text-sm text-red-600">{phoneError}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseSignUpModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#008080] text-white rounded-md hover:bg-[#007070] transition-colors flex items-center"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full text-center h-4 w-4 border-b-2 border-white mr-2"></div>
                      </>
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

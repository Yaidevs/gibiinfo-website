"use client";

import { useEffect, useRef, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import logo from "../assets/logo.png";
import googleImg from "../assets/google.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setToken } from "./ExitExam/data/slice/authSlice";
import {
  FaUser,
  FaSignOutAlt,
  FaBook,
  FaUserCircle,
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
  const [signUpStep, setSignUpStep] = useState(1); // 1: Phone, 2: Google Auth
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

  // Open sign up modal
  const handleOpenSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setSignUpStep(1);
    setPhoneNumber("");
    setPhoneError("");
  };

  // Close sign up modal
  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
    setSignUpStep(1);
  };

  // Validate phone number
  const validatePhoneNumber = (number) => {
    // Basic validation - adjust as needed for your requirements
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(number);
  };

  // Handle phone number submission
  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    setPhoneError("");
    setSignUpStep(2); // Move to Google auth step
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      setIsProcessing(true);
      const user = await signInWithGoogle();
      const { email } = user;

      // Store email in localStorage for profile display
      localStorage.setItem("userEmail", email);

      // Register user with API
      const response = await createUser({ email, phoneNumber }).unwrap();

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
        // Reset to phone number step
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

  return (
    <header className="bg-[#008080] text-white fixed w-full z-20">
      {toast.show && (
        <Toast
          message="This phone number is already registered with different email address!"
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

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

          {/* Mobile User Profile Menu - Only shown when menu is open */}
          <div className="lg:hidden bg-[#007070] py-2 px-6 w-full mt-2">
            {isAuthenticated ? (
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
        <div className="hidden lg:flex items-center space-x-4">
          {!isAuthenticated ? (
            <button
              onClick={handleOpenSignUpModal}
              className="bg-white text-[#008080] px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Sign Up / Sign In
            </button>
          ) : (
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

          <button
            onClick={() => window.open("https://t.me/enterance_exam", "_blank")}
            className="bg-transparent border border-white text-white px-4 py-2 rounded-md hover:bg-[#007070] transition-colors"
          >
            Download
          </button>
        </div>
      </div>

      {/* Sign Up Modal */}
      {isSignUpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#008080] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {signUpStep === 1 ? "Sign Up / Sign In" : "Connect with Google"}
              </h3>
              <button
                onClick={handleCloseSignUpModal}
                className="text-white hover:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Step 1: Phone Number */}
              {signUpStep === 1 && (
                <form onSubmit={handlePhoneSubmit}>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Enter Your Phone Number
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Please enter your phone number to continue with the sign
                      up process.
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
                        <p className="mt-2 text-sm text-red-600">
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCloseSignUpModal}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#008080] text-white rounded-md hover:bg-[#007070] transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Google Authentication */}
              {signUpStep === 2 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Sign in with Google
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Please sign in with your Google account to complete the
                    process.
                  </p>

                  <div className="flex justify-center mb-6">
                    <button
                      onClick={handleGoogleLogin}
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-3"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          <img
                            src={googleImg || "/placeholder.svg"}
                            className="w-5 h-5 mr-2"
                            alt="Google logo"
                          />
                          Sign in with Google
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-sm text-gray-500 mb-4">
                    <p>Phone number: {phoneNumber}</p>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setSignUpStep(1)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                      disabled={isProcessing}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseSignUpModal}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

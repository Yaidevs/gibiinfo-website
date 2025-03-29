"use client"

import { useEffect, useRef, useState } from "react"
import { MdMenu, MdClose } from "react-icons/md"
import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "./ExitExam/data/slice/authSlice"

const Header = ({ menuOpen, setMenuOpen }) => {
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Get user email from localStorage if available
  const getUserEmail = () => {
    try {
      const userEmail = localStorage.getItem("userEmail")
      return userEmail || null
    } catch (error) {
      console.error("Error getting user email:", error)
      return null
    }
  }

  // Get first letter of email for profile circle
  const getProfileInitial = () => {
    const email = getUserEmail()
    
    if (email) {
      return email.charAt(0).toUpperCase()
    }
    return "U" // Default fallback
  }

  // Handle logout
  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("userEmail")
    // Redirect to home or refresh page if needed
    window.location.href = "/"
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  // Handle dropdown clicks
  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      const dropdown = document.getElementById("profile-dropdown")
      const profileButton = document.getElementById("profile-button")

      if (dropdown && profileButton && !dropdown.contains(event.target) && !profileButton.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutsideDropdown)
    } else {
      document.removeEventListener("mousedown", handleClickOutsideDropdown)
    }

    return () => document.removeEventListener("mousedown", handleClickOutsideDropdown)
  }, [dropdownOpen])

  return (
    <header className="bg-[#008080] text-white fixed w-full z-20">
      <div className="w-full max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center">
            <img src={logo || "/placeholder.svg"} className="w-16 h-auto" alt="Gibi Info Logo" />
            <span className="text-3xl font-bold">Gibi Info</span>
          </div>
        </Link>
        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
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
              <Link
                to={`/#${item.toLowerCase().replace(" ", "")}`}
                className="block py-3 px-8 text-lg hover:bg-[#007070] transition duration-200 rounded lg:rounded-none"
                key={item}
              >
                {item}
              </Link>
            ))}
            {/* Exit Exam Link */}
            <Link
              to="/exit-exam"
              className="block py-3 px-8 text-lg hover:bg-[#007070] transition duration-200 rounded lg:rounded-none"
            >
              Exit Exam
            </Link>
          </div>
        </nav>

        {/* Desktop Buttons and User Profile */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => window.open("https://t.me/enterance_exam", "_blank")}
            className="bg-transparent border border-white text-white px-4 py-2 rounded-md"
          >
            Download
          </button>

          {/* User Profile Circle - Only shown when authenticated */}
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
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">{getUserEmail() || "User"}</div>
                  <Link
                    to="/my-exams"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Exams
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile User Profile - Only shown when authenticated */}
        {isAuthenticated && (
          <div className="lg:hidden flex items-center">
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-full bg-white text-[#008080] flex items-center justify-center font-bold cursor-pointer"
            >
              {getProfileInitial()}
            </div>
          </div>
        )}
      </div>

      {/* Mobile User Profile Menu - Only shown when menu is open and authenticated */}
      {menuOpen && isAuthenticated && (
        <div className="lg:hidden bg-[#007070] py-2 px-6">
          <div className="text-white py-2 border-b border-[#006060]">{getUserEmail() || "User"}</div>
          <Link to="/my-exams" className="block py-2 text-white">
            My Exams
          </Link>
          <Link to="/profile" className="block py-2 text-white">
            Profile
          </Link>
          <button onClick={handleLogout} className="block w-full text-left py-2 text-white">
            Sign Out
          </button>
        </div>
      )}
    </header>
  )
}

export default Header


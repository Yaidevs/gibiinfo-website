"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaGraduationCap, FaTimes, FaArrowRight } from "react-icons/fa"

const FeaturePromotion = ({ onVisibilityChange }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(true)

  // Check if the user has dismissed the promotion before
  useEffect(() => {
    const hasSeenPromo = localStorage.getItem("hasSeenExitExamPromo")
    if (hasSeenPromo) {
      setIsVisible(false)
      onVisibilityChange(false)
    } else {
      // Add animation class after component mounts
      setIsAnimating(true)
      onVisibilityChange(true)
    }
  }, [onVisibilityChange])

  const handleDismiss = () => {
    setIsAnimating(false)
    // Wait for exit animation to complete
    setTimeout(() => {
      setIsVisible(false)
      onVisibilityChange(false)
      // Store in localStorage so it doesn't show again
      localStorage.setItem("hasSeenExitExamPromo", "true")
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 transition-all duration-300 z-30 ${
        isAnimating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-2 sm:mb-0">
          <div className="bg-white p-2 rounded-full mr-3">
            <FaGraduationCap className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="font-bold text-lg">New Feature: Practice Exit Exams!</h3>
            <p className="text-blue-100 text-sm">Prepare for your exams with our new practice mode</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/departments"
            className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-md font-medium text-sm flex items-center"
          >
            Try Now <FaArrowRight className="ml-2" />
          </Link>
          <button onClick={handleDismiss} className="text-white hover:text-blue-200 p-1" aria-label="Dismiss promotion">
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeaturePromotion


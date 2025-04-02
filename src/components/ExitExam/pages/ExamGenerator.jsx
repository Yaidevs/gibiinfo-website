"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useGetExitExamQuestionsQuery } from "../data/api/dataApi"
import { useValidateTokenQuery } from "../data/api/userApi"
import { FaExclamationTriangle, FaLock } from "react-icons/fa"

export default function ExamGenerator() {
  const { id } = useParams()
  const { data: exam } = useGetExitExamQuestionsQuery(id)
  const { data: tokenValidation, isLoading: validationLoading } = useValidateTokenQuery()
  console.log('token Valid',tokenValidation)

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    numQuestions: 20,
    timeLimit: 30,
  })
  const [validationError, setValidationError] = useState(false)

  useEffect(() => {
    if (tokenValidation && tokenValidation.success === false) {
      setValidationError(true)
    }
  }, [tokenValidation])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: Number.parseInt(value),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check token validation before proceeding
    if (tokenValidation && tokenValidation.success === false) {
      setValidationError(true)
      return
    }

    setLoading(true)

    // Simulate loading
    setTimeout(() => {
      setLoading(false)
      navigate(`/exam/${id}`, {
        state: {
          numQuestions: formData.numQuestions,
          timeLimit: formData.timeLimit,
        },
      })
    }, 1500)
  }

  // If token validation failed, show error message
  if (validationError) {
    return (
      <div className="bg-gray-50 min-h-screen pt-[80px] py-12">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md md:max-w-2xl mt-[44px] mx-auto overflow-hidden">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <FaLock className="text-red-500 text-3xl" />
              </div>
            </div>
            <h1 className="text-2xl text-gray-900 font-bold">Authentication Required</h1>
            <p className="text-gray-600 mt-2">Your session has expired or you don't have access to this exam.</p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg mb-6 flex items-start">
            <FaExclamationTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
            <p className="text-red-700 text-sm">Please sign in again or purchase this exam package to continue.</p>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 text-center"
            >
              Back to Home
            </Link>
            <Link
              to="/departments"
              className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 text-center"
            >
              Browse Exams
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Show loading state while validating token
  if (validationLoading) {
    return (
      <div className="bg-gray-50 min-h-screen pt-[80px] py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating your access...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-[80px] py-12">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md md:max-w-2xl mt-[44px] mx-auto overflow-hidden">
        <div className="text-center mb-8">
          <h1 className="text-2xl text-gray-900 font-bold">Generate Exit Exam</h1>
          <p className="text-gray-600 text-sm mt-2">Enter the number of questions and time limit you want</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="numQuestions" className="text-gray-700 text-sm block font-medium mb-1">
              Number of Questions
            </label>
            <input
              type="range"
              id="numQuestions"
              name="numQuestions"
              min="10"
              max="100"
              step="5"
              value={formData.numQuestions}
              onChange={handleChange}
              className="bg-gray-200 h-2 rounded-lg w-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-gray-600 text-xs mt-1">
              <span>10</span>
              <span>{formData.numQuestions} questions</span>
              <span>100</span>
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="timeLimit" className="text-gray-700 text-sm block font-medium mb-1">
              Time Limit (minutes)
            </label>
            <input
              type="range"
              id="timeLimit"
              name="timeLimit"
              min="15"
              max="120"
              step="15"
              value={formData.timeLimit}
              onChange={handleChange}
              className="bg-gray-200 h-2 rounded-lg w-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-gray-600 text-xs mt-1">
              <span>15 min</span>
              <span>{formData.timeLimit} minutes</span>
              <span>120 min</span>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#008080] ${
              loading ? "opacity-75 cursor-not-allowed" : "hover:bg-[#006666]"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="h-5 text-white w-5 -ml-1 animate-spin mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating Exam...
              </>
            ) : (
              "Start Exam"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}


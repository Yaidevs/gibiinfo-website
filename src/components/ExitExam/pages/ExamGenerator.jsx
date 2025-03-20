"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function ExamGenerator() {
  const { department } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    numQuestions: 20,
    timeLimit: 2,
  })

  const departmentNames = {
    accounting: "Accounting",
    management: "Management",
    marketing: "Marketing",
    economics: "Economics",
    finance: "Finance",
    "information-systems": "Information Systems",
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: Number.parseInt(value),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate loading
    setTimeout(() => {
      setLoading(false)
      navigate(`/exam/${department}`, {
        state: {
          numQuestions: formData.numQuestions,
          timeLimit: formData.timeLimit,
        },
      })
    }, 1500)
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-[80px] py-12">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md md:max-w-2xl mt-[44px] mx-auto overflow-hidden">
        <div className="text-center mb-8">
          <h1 className="text-2xl text-gray-900 font-bold">Generate {departmentNames[department]} Exit Exam</h1>
          <p className="text-gray-600 text-sm mt-2">Customize your exam settings below</p>
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
              max="50"
              step="5"
              value={formData.numQuestions}
              onChange={handleChange}
              className="bg-gray-200 h-2 rounded-lg w-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-gray-600 text-xs mt-1">
              <span>10</span>
              <span>{formData.numQuestions} questions</span>
              <span>50</span>
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

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-blue-800 font-medium mb-2">Exam Summary</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>Department: {departmentNames[department]}</li>
              <li>Number of Questions: {formData.numQuestions}</li>
              <li>Time Limit: {formData.timeLimit} minutes</li>
              <li>Question Types: Multiple Choice</li>
            </ul>
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#008080] ${
              loading ? "opacity-75 cursor-not-allowed" : ""
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


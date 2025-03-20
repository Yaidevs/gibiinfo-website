"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { accountingQuestions } from "../data/accountingQuestions"
import { managementQuestions } from "../data/managementQuestions"
import { marketingQuestions } from "../data/marketingQuestions"
import { economicsQuestions } from "../data/economicsQuestions"
import { financeQuestions } from "../data/financeQuestions"
import { Flag } from "lucide-react"

export default function ExamInterface() {
  const { department } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  // Get exam settings from location state or use defaults
  const numQuestions = location.state?.numQuestions || 20
  const timeLimit = location.state?.timeLimit || 1

  // Get the appropriate question set based on department
  const getQuestionsByDepartment = () => {
    switch (department) {
      case "accounting":
        return accountingQuestions
      case "management":
        return managementQuestions
      case "marketing":
        return marketingQuestions
      case "economics":
        return economicsQuestions
      case "finance":
        return financeQuestions
      default:
        return accountingQuestions
    }
  }

  // Select random questions from the department's question pool
  const selectRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const allQuestions = getQuestionsByDepartment()
  const [examQuestions] = useState(() => selectRandomQuestions(allQuestions, numQuestions))
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) // Start at question 5 to match image
  const [answers, setAnswers] = useState(Array(examQuestions.length).fill(null))
  const [flaggedQuestions, setFlaggedQuestions] = useState(Array(examQuestions.length).fill(false))
  const [flaggedTimestamps, setFlaggedTimestamps] = useState(Array(examQuestions.length).fill(null))
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 3600) // Convert hours to seconds
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [showResultsPopup, setShowResultsPopup] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const [incorrectQuestions, setIncorrectQuestions] = useState([])

  const timerRef = useRef(null)

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!examSubmitted) {
        e.preventDefault()
        e.returnValue = "" // Standard for most browsers
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [examSubmitted])

  // Handle timer
  useEffect(() => {
    if (timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining])

  // Function to format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  // Format timestamp for flagged questions
  const formatFlagTime = (timestamp) => {
    if (!timestamp) return ""
    const date = new Date(timestamp)
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
  }

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  // Toggle flagged status for current question
  const toggleFlagQuestion = () => {
    const newFlagged = [...flaggedQuestions]
    const newTimestamps = [...flaggedTimestamps]

    // Toggle flag status
    newFlagged[currentQuestionIndex] = !newFlagged[currentQuestionIndex]

    // Update timestamp if flagged, or clear if unflagged
    if (newFlagged[currentQuestionIndex]) {
      newTimestamps[currentQuestionIndex] = Date.now()
    } else {
      newTimestamps[currentQuestionIndex] = null
    }

    setFlaggedQuestions(newFlagged)
    setFlaggedTimestamps(newTimestamps)
  }

  // Navigate to previous question
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // Navigate to next question
  const goToNext = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  // Navigate to specific question
  const goToQuestion = (index) => {
    if (index >= 0 && index < examQuestions.length) {
      setCurrentQuestionIndex(index)
    }
  }

  // Clear current answer
  const clearAnswer = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = null
    setAnswers(newAnswers)
  }

  // Calculate score and identify incorrect questions
  const calculateResults = () => {
    let correct = 0
    const incorrect = []

    examQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++
      } else {
        incorrect.push(index)
      }
    })

    return {
      correct,
      total: examQuestions.length,
      percentage: Math.round((correct / examQuestions.length) * 100),
      incorrectIndices: incorrect,
    }
  }

  // Submit exam
  const handleSubmitExam = () => {
    clearInterval(timerRef.current)
    setExamSubmitted(true)

    const results = calculateResults()
    setIncorrectQuestions(results.incorrectIndices)
    setShowResultsPopup(true)
  }

  // Check if all questions are answered
  const allQuestionsAnswered = answers.every((answer) => answer !== null)

  // Enter review mode
  const enterReviewMode = () => {
    setShowResultsPopup(false)
    setReviewMode(true)

    // Go to the first incorrect question if there are any
    if (incorrectQuestions.length > 0) {
      setCurrentQuestionIndex(incorrectQuestions[0])
    }
  }

  // Current question data
  const currentQuestion = examQuestions[currentQuestionIndex]

  // Results popup
  const ResultsPopup = () => {
    const results = calculateResults()

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Exam Results</h2>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-800 mb-2">{results.percentage}%</div>
              <p className="text-lg text-blue-700">
                You answered {results.correct} out of {results.total} questions correctly
              </p>
            </div>
          </div>

          {results.incorrectIndices.length > 0 ? (
            <div className="mb-6">
              <p className="font-medium mb-2">You missed the following questions:</p>
              <div className="grid grid-cols-6 gap-1">
                {results.incorrectIndices.map((index) => (
                  <div key={index} className="bg-red-100 text-red-800 text-center p-1 rounded">
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-green-600 font-medium mb-6 text-center">
              Perfect score! You answered all questions correctly.
            </p>
          )}

          <div className="flex justify-between">
            <button onClick={enterReviewMode} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Review Questions
            </button>
            <button
              onClick={() => navigate("/departments")}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Take Another Exam
            </button>
          </div>
        </div>
      </div>
    )
  }

  // If in review mode after submission
  if (examSubmitted && reviewMode) {
    const isIncorrect = incorrectQuestions.includes(currentQuestionIndex)
    const correctAnswerIndex = currentQuestion.correctAnswer

    return (
      <div className="bg-white min-h-screen pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="p-4 bg-[#008080] text-white mt-2">
            <h1 className="text-xl font-bold">Review Mode - Question {currentQuestionIndex + 1}</h1>
            <p>Reviewing questions you missed. Learn from your mistakes!</p>
          </div>

          <div className="flex flex-col md:flex-row mt-24 min-h-screen">
            {/* Main Exam Area */}
            <div className="flex-grow">
              <div className="flex">
                {/* Question Number */}
                <div className="w-48 h-[140px] bg-gray-200 p-4 mr-2">
                  <div className="text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-600">
                      Question {currentQuestionIndex + 1}/{examQuestions.length}
                    </h2>
                    {isIncorrect && <div className="mt-2 text-red-600 font-medium">You missed this question</div>}
                  </div>
                </div>

                {/* Question Content */}
                <div className="flex-grow p-6 bg-blue-50">
                  <p className="text-gray-800 mb-6 text-lg">{currentQuestion.question}</p>

                  <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-start">
                        <input
                          type="radio"
                          id={`option-${index}`}
                          name="answer"
                          className="mt-1 mr-2"
                          checked={answers[currentQuestionIndex] === index}
                          disabled
                        />
                        <label
                          htmlFor={`option-${index}`}
                          className={`${
                            index === correctAnswerIndex
                              ? "text-green-700 font-medium"
                              : answers[currentQuestionIndex] === index && index !== correctAnswerIndex
                                ? "text-red-700 line-through"
                                : "text-gray-700"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}. {option}
                          {index === correctAnswerIndex && " ✓ (Correct Answer)"}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 className="font-medium text-yellow-800 mb-2">Explanation:</h3>
                    <p className="text-yellow-800">
                      The correct answer is {String.fromCharCode(65 + correctAnswerIndex)}.{" "}
                      {currentQuestion.options[correctAnswerIndex]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={goToPrevious}
                  className="w-32 py-3 bg-indigo-700 text-white hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                <button
                  onClick={() => navigate("/departments")}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Finish Review
                </button>
                <button
                  onClick={goToNext}
                  className="w-32 py-3 bg-indigo-700 text-white hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentQuestionIndex === examQuestions.length - 1}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Exam Navigation */}
            <div className="w-full md:w-80 bg-gray-200 p-4 ml-2 max-h-[500px]">
              <div className="mb-2">
                <h3 className="text-center font-medium text-gray-700">Question Navigation</h3>
              </div>

              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: examQuestions.length }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToQuestion(i)}
                    className={`h-8 w-full flex items-center justify-center text-center border border-gray-300 ${
                      currentQuestionIndex === i
                        ? "bg-gray-500 text-white"
                        : incorrectQuestions.includes(i)
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pt-32">
      {showResultsPopup && <ResultsPopup />}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Main Exam Area */}
          <div className="flex-grow">
            {/* Timer */}
            <div className="flex justify-center py-2">
              <div className="inline-flex items-center px-3 py-1 border border-red-500 rounded">
                <span className="mr-2">⏱️</span>
                <span>Time left {formatTime(timeRemaining)} sec</span>
              </div>
            </div>

            <div className="flex">
              {/* Question Number */}
              <div className="w-48 h-[120px] bg-gray-200 p-4 mr-2">
                <div className="text-gray-700">
                  <h2 className="text-2xl font-bold text-gray-600">
                    Question {currentQuestionIndex + 1}/{examQuestions.length}
                  </h2>
                  <button onClick={toggleFlagQuestion} className="mt-2 text-blue-600 hover:underline block">
                    {flaggedQuestions[currentQuestionIndex] ? "Unflag Question" : "Flag Question"}
                  </button>
                </div>
              </div>

              {/* Question Content */}
              <div className="flex-grow p-6 bg-[#D9F1F1]">
                <p className="text-gray-800 mb-6 text-lg">{currentQuestion.question}</p>

                <div className="space-y-4 mt-8">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-start">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="answer"
                        className="mt-1 mr-2"
                        checked={answers[currentQuestionIndex] === index}
                        onChange={() => handleAnswerSelect(index)}
                      />
                      <label htmlFor={`option-${index}`} className="text-gray-700">
                        {String.fromCharCode(65 + index)}. {option}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <button onClick={clearAnswer} className="px-4 py-2 text-gray-600 hover:text-gray-900">
                    Clear Choice
                  </button>

                  {allQuestionsAnswered && (
                    <button
                      onClick={handleSubmitExam}
                      className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Submit Exam
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={goToPrevious}
                className="w-32 py-3 bg-indigo-700 text-white hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={goToNext}
                className="w-32 py-3 bg-indigo-700 text-white hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentQuestionIndex === examQuestions.length - 1}
              >
                Next
              </button>
            </div>
          </div>

          {/* Exam Navigation */}
          <div className="w-full md:w-80 bg-[#E7E5E5] p-4 ml-2">
            <div className="mb-2">
              <h3 className="text-center font-medium text-gray-700">Exam Navigation</h3>
            </div>

            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: examQuestions.length }, (_, i) => (
                <div key={i} className="relative">
                  <button
                    onClick={() => goToQuestion(i)}
                    className={`h-16 w-full flex items-center justify-center text-center border border-gray-300 ${
                      currentQuestionIndex === i
                        ? "bg-gray-500 text-white"
                        : answers[i] !== null
                          ? "bg-green-100 text-green-800"
                          : flaggedQuestions[i]
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {i + 1}
                  </button>

                  {/* Flag badge with timestamp */}
                  {flaggedQuestions[i] && (
                    <div className="absolute top-0 right-0 flex items-center justify-center bg-red-600 text-white text-xs py-1">
                      <Flag className="h-3 w-5 mr-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


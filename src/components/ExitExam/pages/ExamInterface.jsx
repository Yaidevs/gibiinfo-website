"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useGetExitExamQuestionsQuery } from "../data/api/dataApi"
import { Flag } from "lucide-react"

export default function ExamInterface() {
  const { id } = useParams() // Get exam ID from URL params
  const navigate = useNavigate()
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1)

  // Get values from location state or use defaults
  const [questionsPerPage, setQuestionsPerPage] = useState(location.state?.numQuestions || 20)

  // Set time limit from location state (in minutes) or use default
  const timeLimit = location.state?.timeLimit || 90 // Default 90 minutes if not provided

  // Fetch questions from API
  const {
    data: examData,
    isLoading,
    isError,
  } = useGetExitExamQuestionsQuery({
    id,
    page: currentPage,
    limit: questionsPerPage,
  })

  const [examQuestions, setExamQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [flaggedQuestions, setFlaggedQuestions] = useState([])
  const [flaggedTimestamps, setFlaggedTimestamps] = useState([])
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60) // Convert minutes to seconds
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [showResultsPopup, setShowResultsPopup] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const [incorrectQuestions, setIncorrectQuestions] = useState([])

  const timerRef = useRef(null)

  // Initialize exam questions when data is loaded
  useEffect(() => {
    if (examData?.data?.questions && examData.data.questions.length > 0) {
      // Use all questions from the API
      const questions = examData.data.questions
      setExamQuestions(questions)

      // Initialize answers, flagged questions, and timestamps arrays
      setAnswers(Array(questions.length).fill(null))
      setFlaggedQuestions(Array(questions.length).fill(false))
      setFlaggedTimestamps(Array(questions.length).fill(null))
    }
  }, [examData])

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
    if (timeRemaining <= 0) {
      // Auto-submit when time runs out
      handleSubmitExam()
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1)
    }, 1000)

    timerRef.current = timer

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
      // Check if the selected answer matches the correct answer
      // The API provides the correct answer as "option1", "option2", etc.
      const correctOptionIndex = Number.parseInt(question.answer.replace("option", "")) - 1

      if (answers[index] === correctOptionIndex) {
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

  // Get options array from current question
  const getOptionsFromQuestion = (question) => {
    if (!question) return []
    return [question.option1, question.option2, question.option3, question.option4]
  }

  // Get correct answer index (0-based) from current question
  const getCorrectAnswerIndex = (question) => {
    if (!question) return 0
    return Number.parseInt(question.answer.replace("option", "")) - 1
  }

  // Current question data
  const currentQuestion = examQuestions[currentQuestionIndex]
  const options = currentQuestion ? getOptionsFromQuestion(currentQuestion) : []
  const correctAnswerIndex = currentQuestion ? getCorrectAnswerIndex(currentQuestion) : 0

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

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white min-h-screen pt-32 flex justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Loading Exam Questions...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
        </div>
      </div>
    )
  }

  // Error state
  if (isError || !examData) {
    return (
      <div className="bg-white min-h-screen pt-32 flex justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Exam</h2>
          <p className="text-gray-700 mb-6">There was a problem loading the exam questions. Please try again later.</p>
          <button
            onClick={() => navigate("/departments")}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Return to Departments
          </button>
        </div>
      </div>
    )
  }

  // If no questions are available
  if (examQuestions.length === 0) {
    return (
      <div className="bg-white min-h-screen pt-32 flex justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No Questions Available</h2>
          <p className="text-gray-700 mb-6">This exam doesn't have any questions yet. Please try another exam.</p>
          <button
            onClick={() => navigate("/departments")}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Return to Departments
          </button>
        </div>
      </div>
    )
  }

  // If in review mode after submission
  if (examSubmitted && reviewMode) {
    const isIncorrect = incorrectQuestions.includes(currentQuestionIndex)

    return (
      <div className="bg-white min-h-screen pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="p-4 bg-[#008080] text-white mt-2">
            <h1 className="text-xl font-bold">Review Mode - Question {currentQuestionIndex + 1}</h1>
            <p>Reviewing questions you missed. Learn from your mistakes!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr,300px] gap-4 mt-24">
            {/* Main Exam Area */}
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row">
                {/* Question Number */}
                <div className="w-full md:w-48 h-auto md:h-[140px] bg-gray-200 p-4 mb-4 md:mb-0 md:mr-2">
                  <div className="text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-600">
                      Question {currentQuestionIndex + 1}/{examQuestions.length}
                    </h2>
                    {isIncorrect && <div className="mt-2 text-red-600 font-medium">You missed this question</div>}
                  </div>
                </div>

                {/* Question Content */}
                <div className="flex-grow p-6 bg-blue-50">
                  <p className="text-gray-800 mb-6 text-lg">
                    <span className="font-bold">{currentQuestionIndex + 1}. </span>
                    {currentQuestion.questionText}
                  </p>

                  <div className="space-y-4">
                    {options.map((option, index) => (
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
                      {currentQuestion.explanation ||
                        `The correct answer is ${String.fromCharCode(
                          65 + correctAnswerIndex,
                        )}. ${options[correctAnswerIndex]}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-4">
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

            {/* Exam Navigation - Fixed width and height */}
            <div className="w-full md:w-[300px] h-[400px] bg-gray-200 p-4 mt-4 md:mt-0 self-start">
              <div className="mb-2">
                <h3 className="text-center font-medium text-gray-700">Question Navigation</h3>
              </div>

              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: examQuestions.length }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToQuestion(i)}
                    className={`h-6 w-6 flex items-center justify-center text-center text-xs border border-gray-300 ${
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
        {/* Timer */}
        <div className="flex justify-center py-2">
          <div className="inline-flex items-center px-3 py-1 border border-red-500 rounded">
            <span className="mr-2">⏱️</span>
            <span>Time left {formatTime(timeRemaining)}</span>
          </div>
        </div>

        {/* Main content using grid with fixed dimensions for navigation */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,300px] gap-4">
          {/* Main Exam Area */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row">
              {/* Question Number */}
              <div className="w-full md:w-48 h-auto md:h-[140px] bg-gray-200 p-4 mb-4 md:mb-0 md:mr-2">
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
                <p className="text-gray-800 mb-6 text-lg">
                  <span className="font-bold">{currentQuestionIndex + 1}. </span>
                  {currentQuestion.questionText}
                </p>

                <div className="space-y-4 mt-8">
                  {options.map((option, index) => (
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
            <div className="flex justify-between mt-4">
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

          {/* Exam Navigation - Fixed width and height */}
          <div className="w-full md:w-[300px] h-[400px] bg-[#E7E5E5] p-4 mt-4 md:mt-0 self-start">
            <div className="mb-2">
              <h3 className="text-center font-medium text-gray-700">Exam Navigation</h3>
            </div>

            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: examQuestions.length }, (_, i) => (
                <div key={i} className="relative">
                  <button
                    onClick={() => goToQuestion(i)}
                    className={`h-6 w-6 flex items-center justify-center text-center text-xs border border-gray-300 ${
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

                  {/* Flag badge - simplified */}
                  {flaggedQuestions[i] && (
                    <div className="absolute -top-1 right-0 flex items-center justify-center text-white text-xs py-1">
                      <Flag className="h-3 text-red-500 w-3 mr-1" />
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


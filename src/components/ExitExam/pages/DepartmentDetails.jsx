"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
  FaGraduationCap,
  FaBook,
  FaUnlock,
  FaChalkboardTeacher,
  FaRegClock,
  FaPlayCircle,
  FaShoppingCart,
  FaShieldAlt,
  FaTimes,
  FaPhone,
  FaUniversity,
  FaCreditCard,
  FaArrowRight,
  FaListAlt,
  FaBoxOpen,
  FaMoneyBillWave,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa"
import {
  useGetDepartmentByIdQuery,
  useGetExitExamByDepartmentQuery,
  usePurchaseExamMutation,
  useGetOnlinePaymentUrlMutation,
  useGetExitExamInfoQuery,
} from "../data/api/dataApi"
import { signInWithGoogle } from "../../../../firebase"
import { useCreateUserMutation } from "../data/api/userApi"
import { setToken } from "../data/slice/authSlice"
import { useDispatch, useSelector } from "react-redux"

// Toast component
const Toast = ({ message, type = "error", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md">
      <div
        className={`flex items-center p-4 mb-4 rounded-lg shadow-lg ${
          type === "error" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"
        }`}
      >
        <div className={`flex-shrink-0 ${type === "error" ? "text-red-500" : "text-green-500"}`}>
          {type === "error" ? <FaExclamationCircle size={20} /> : <FaCheckCircle size={20} />}
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
  )
}

const DepartmentDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("additional")
  const { data: departmentDetail, isLoading: deptLoading } = useGetDepartmentByIdQuery(id)
  const { data: departmentExams, isLoading: examsLoading } = useGetExitExamByDepartmentQuery(id)

  // Get user Id from localStorage if available
  const getUserId = () => {
    try {
      const userId = localStorage.getItem("userId")
      return userId || null
    } catch (error) {
      // console.error("Error getting user Id:", error)
      return null
    }
  }
  const userId = getUserId()

  // State to store exam IDs and their corresponding info
  const [selectedExamId, setSelectedExamId] = useState(null)
  const { data: examInfo, isLoading: examInfoLoading } = useGetExitExamInfoQuery(id)
  // console.log('EXAM IN PACKAGE',examInfo)

  // State to store all exam info
  const [examsWithInfo, setExamsWithInfo] = useState([])
  const [selectedPackage, setSelectedPackage] = useState(null)

  const [purchaseExam] = usePurchaseExamMutation()
  const [createUser] = useCreateUserMutation()
  const [getOnlinePaymentUrl] = useGetOnlinePaymentUrlMutation()

  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  })

  // Purchase modal states
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [purchaseStep, setPurchaseStep] = useState(1) // 1: Phone, 3: Payment Method
  const [isProcessing, setIsProcessing] = useState(false)
  const [purchaseComplete, setPurchaseComplete] = useState(false)
  const [userRegistered, setUserRegistered] = useState(false)
  const [userData, setUserData] = useState(null)

  // Fetch exam info for each exam when departmentExams changes
  useEffect(() => {
    if (departmentExams?.data && departmentExams.data.length > 0) {
      // Use real exam data from the API
      setExamsWithInfo(departmentExams.data)
    }
  }, [departmentExams])

  // Handle purchase button click for a package
  const handlePurchaseClick = (packageData) => {
    setSelectedPackage(packageData)

    // If user is already authenticated, go directly to payment selection
    if (isAuthenticated) {
      setIsPurchaseModalOpen(true)
      setPurchaseStep(3)

      // Get email from localStorage
      const email = localStorage.getItem("userEmail")

      setUserData({
        email,
        phoneNumber: "",
        user: user,
      })
    } else {
      // Otherwise start from the beginning
      setIsPurchaseModalOpen(true)
      setPurchaseStep(1)
      setPhoneNumber("")
      setPhoneError("")
    }

    setPurchaseComplete(false)
    setUserRegistered(false)
  }

  // Close the purchase modal
  const handleCloseModal = () => {
    setIsPurchaseModalOpen(false)
    setSelectedPackage(null)
    setPurchaseStep(1)
    setUserRegistered(false)
  }

  // Validate phone number
  const validatePhoneNumber = (number) => {
    // Basic validation - adjust as needed for your requirements
    const phoneRegex = /^\+?[0-9]{10,15}$/
    return phoneRegex.test(number)
  }

  // Handle Google login with phone number
  const handleGoogleLoginWithPhone = async (phoneNum) => {
    try {
      setIsProcessing(true)
      const user = await signInWithGoogle()
      const { email } = user

      // Store email in localStorage for profile display
      localStorage.setItem("userEmail", email)

      // Register user with API
      const response = await createUser({ email, phoneNumber: phoneNum }).unwrap()

      // Check if registration was successful
      if (!response.success) {
        // Show error toast
        setToast({
          show: true,
          message: response.message || "This phone number is already registered with different email address!",
          type: "error",
        })

        setIsProcessing(false)
        handleCloseModal()
        return
      }

      // Store token in Redux using the existing slice pattern
      dispatch(setToken(response))

      // Store user data for later use
      setUserData({
        email,
        phoneNumber: phoneNum,
        userId: userId,
      })

      // Ensure we move to payment method selection
      setUserRegistered(true)

      // Force a small delay to ensure state updates properly
      setTimeout(() => {
        setPurchaseStep(3)
      }, 100)
    } catch (error) {
      // console.error("Registration failed:", error)

      // Show error toast
      setToast({
        show: true,
        message: "Registration failed. Please try again.",
        type: "error",
      })

      handleCloseModal()
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle phone number submission and immediately trigger Google sign-in
  const handlePhoneSubmit = (e) => {
    e.preventDefault()

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError("Please enter a valid phone number")
      return
    }

    setPhoneError("")
    // Immediately trigger Google sign-in with the provided phone number
    handleGoogleLoginWithPhone(phoneNumber)
  }

  // Handle bank transfer selection
  const handleBankTransfer = () => {
    // Get the first exam ID from the package's exitExam array
    const firstExam = selectedPackage?.exitExam?.[0] || null
    const firstExamId = firstExam?._id || null

    // Navigate to bank information page with package details
    navigate("/bank-information", {
      state: {
        packageId: selectedPackage?._id,
        examId: firstExamId, // Pass the first exam ID from the package
        examTitle: selectedPackage?.title,
        price: selectedPackage?.price,
        userId: userId, // Using userId directly
        departmentId: id,
      },
    })
    setIsPurchaseModalOpen(false)
  }

  // Handle online payment selection
  const handleOnlinePayment = async () => {
    try {
      setIsProcessing(true)

      // Request online payment checkout URL from API
      const response = await getOnlinePaymentUrl({
        paymentType: "Online",
        package: selectedPackage?._id,
        type: "Semister",
      }).unwrap()

      // Redirect to payment gateway if URL is available
      if (response && response?.data?.data?.checkout_url) {
        window.location.href = response?.data?.data?.checkout_url
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (error) {
      // console.error("Failed to get payment URL:", error)
      setToast({
        show: true,
        message: "Failed to initiate online payment. Please try again or use bank transfer.",
        type: "error",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Format price to display with 2 decimal places
  const formatPrice = (price) => {
    if (!price) return "N/A"
    return typeof price === "number" ? price.toFixed(2) : price
  }

  if (deptLoading || examInfoLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[100px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-[120px] pb-16">
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Department header with hero section */}
        <div className="relative rounded-xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-teal-600 opacity-90"></div>
          <div className="relative z-10 px-8 py-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{departmentDetail?.data.name || "Department"}</h1>
            <p className="text-xl max-w-3xl opacity-90 mb-6">
              {departmentDetail?.data.description ||
                "This department offers comprehensive education and training to prepare students for successful careers."}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                <FaGraduationCap className="mr-2" />
                <span>Comprehensive Curriculum</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                <FaChalkboardTeacher className="mr-2" />
                <span>Expert Faculty</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                <FaBook className="mr-2" />
                <span>Industry-Relevant Skills</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Exams Section - FIRST */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sample Exams</h2>

          {examsWithInfo.length > 0 && examsWithInfo.filter((exam) => exam.isSample).length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examsWithInfo
                .filter((exam) => exam.isSample)
                .map((exam) => (
                  <div
                    key={exam._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 border-teal-500 hover:translate-y-[-5px]"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{exam.title}</h3>
                        <div className="bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                          <FaUnlock className="mr-1 h-3 w-3" />
                          <span>Free Sample</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">
                        {exam.description || "Sample assessment to test your knowledge."}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-6">
                        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center">
                          <FaRegClock className="mr-1 h-3 w-3" />
                          {exam.timeLimit || 120} mins
                        </div>
                        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center">
                          <FaBook className="mr-1 h-3 w-3" />
                          {exam.questionCount || 50} questions
                        </div>
                      </div>

                      <Link
                        to={`/generate-exam/${exam._id}`}
                        className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                      >
                        <FaPlayCircle className="mr-2" />
                        Start Sample Exam
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <FaBook className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Sample Exams Available</h3>
              <p className="text-gray-600">There are currently no sample exams available for this department.</p>
            </div>
          )}
        </div>

        {/* Exam Packages Section - SECOND */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Exam Packages</h2>

          {examInfo?.data ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-teal-600 hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{examInfo.data.title}</h3>
                  <div className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center">
                    <FaBoxOpen className="mr-1.5 h-3.5 w-3.5" />
                    <span>Premium Package</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{examInfo.data.description}</p>

                {/* Package details */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <FaListAlt className="mr-2 text-teal-600" />
                    Exams :
                  </h4>

                  {examInfo.data.exitExam && examInfo.data.exitExam.length > 0 ? (
                    <ul className="space-y-4 mb-4">
                      {examInfo.data.exitExam.map((exam, index) => (
                        <li key={exam._id} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-teal-600 text-xs font-medium">{index + 1}</span>
                          </div>
                          <div>
                            <span className="text-gray-700 font-medium">{exam.title}</span>
                            <p className="text-gray-600 text-sm mt-1">{exam.description || ""}</p>
                            <div className="flex space-x-2 mt-2">
                              <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600 flex items-center">
                                <FaRegClock className="mr-1 h-2.5 w-2.5" />
                                {exam.timeLimit || 120} mins
                              </span>
                              <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600 flex items-center">
                                <FaBook className="mr-1 h-2.5 w-2.5" />
                                {exam.questions ? exam.questions.length : 100} questions
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic mb-4">No exams specified in this package.</p>
                  )}

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="flex items-center">
                      <FaMoneyBillWave className="text-green-600 mr-2" />
                      <span className="font-bold text-lg text-gray-900">{formatPrice(examInfo.data.price)} ETB</span>
                    </div>

                    <button
                      onClick={() => handlePurchaseClick(examInfo.data)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                    >
                      <FaShoppingCart className="mr-2" />
                      Purchase Package
                    </button>
                  </div>
                </div>

                {/* Additional features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaGraduationCap className="text-blue-600 h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-800">Comprehensive Coverage</h5>
                      <p className="text-sm text-blue-600">Complete preparation for your exit exams</p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <FaShieldAlt className="text-green-600 h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-medium text-green-800">Valid</h5>
                      <p className="text-sm text-green-600">Full access to all included exams</p>
                    </div>
                  </div>

                  <div className="bg-teal-50 p-3 rounded-lg flex items-start">
                    <div className="bg-teal-100 p-2 rounded-full mr-3">
                      <FaChalkboardTeacher className="text-teal-600 h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-medium text-teal-800">Expert Explanations</h5>
                      <p className="text-sm text-teal-600">Detailed AI-powered explanations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <FaBook className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Exam Packages Available</h3>
              <p className="text-gray-600 mb-6">There are currently no exam packages available for this department.</p>
            </div>
          )}
        </div>

        {/* Navigation tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("additional")}
              className={`${
                activeTab === "additional"
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Additional Information
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`${
                activeTab === "curriculum"
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Curriculum
            </button>
          </nav>
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {/* Additional Information Tab - with courses */}
          {activeTab === "additional" && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Department Courses</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <p>No course available for now. Coming Soon...</p>
              </div>
            </div>
          )}

          {/* Curriculum Tab */}
          {activeTab === "curriculum" && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Curriculum</h2>
              <div className="space-y-8">
                {departmentDetail?.data?.yearlySubjects ? (
                  departmentDetail.data.yearlySubjects.map((yearData, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <h3 className="text-xl font-semibold text-teal-700 mb-4">{yearData.year}</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {yearData.subjects.map((subject, subIndex) => (
                          <div key={subIndex} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                                <span className="text-teal-600 font-semibold">{subIndex + 1}</span>
                              </div>
                              <div className="ml-4">
                                <h4 className="text-lg font-medium text-gray-900">{subject}</h4>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FaBook className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Curriculum Data Available</h3>
                    <p className="text-gray-600">
                      The curriculum information for this department is currently being updated.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Purchase Modal */}
      {isPurchaseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-teal-600 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {purchaseComplete ? "Purchase Complete" : "Purchase Exam Package"}
              </h3>
              <button onClick={handleCloseModal} className="text-white hover:text-teal-100">
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {purchaseComplete ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Thank You for Your Purchase!</h4>
                  <p className="text-gray-600 mb-6">
                    You now have access to {selectedPackage?.title}. You can access your exams from your dashboard.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Link
                      to="/my-exams"
                      className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                    >
                      Go to My Exams
                    </Link>
                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Step 1: Phone Number */}
                  {purchaseStep === 1 && (
                    <form onSubmit={handlePhoneSubmit}>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Enter Your Phone Number</h4>
                        <p className="text-gray-600 mb-4">
                          Please enter your phone number to continue with the purchase of{" "}
                          <span className="font-medium">{selectedPackage?.title}</span>.
                        </p>

                        <div className="mt-4">
                          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
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
                              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                              required
                            />
                          </div>
                          {phoneError && <p className="mt-2 text-sm text-red-600">{phoneError}</p>}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                          disabled={isProcessing}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Processing...
                            </>
                          ) : (
                            "Continue"
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 3: Payment Method Selection */}
                  {purchaseStep === 3 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h4>
                      <p className="text-gray-600 mb-6">
                        Choose how you would like to pay for {selectedPackage?.title}.
                      </p>

                      <div className="space-y-4 mb-6">
                        {/* Bank Transfer Option */}
                        <div
                          onClick={handleBankTransfer}
                          className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-full">
                              <FaUniversity className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <h5 className="font-medium text-gray-900">Bank Transfer</h5>
                              <p className="text-sm text-gray-500">Pay via bank deposit or transfer</p>
                            </div>
                          </div>
                          <FaArrowRight className="h-4 w-4 text-gray-400" />
                        </div>

                        {/* Online Payment Option */}
                        <div
                          onClick={handleOnlinePayment}
                          className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-full">
                              <FaCreditCard className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                              <h5 className="font-medium text-gray-900">Online Payment</h5>
                              <p className="text-sm text-gray-500">Pay securely Online</p>
                            </div>
                          </div>
                          <FaArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                          disabled={isProcessing}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DepartmentDetails


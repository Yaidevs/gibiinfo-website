"use client";

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaBook,
  FaLock,
  FaUnlock,
  FaChalkboardTeacher,
  FaRegClock,
  FaPlayCircle,
  FaShoppingCart,
  FaCode,
  FaDatabase,
  FaServer,
  FaLaptopCode,
  FaMobileAlt,
  FaNetworkWired,
  FaShieldAlt,
  FaCloudUploadAlt,
  FaTimes,
  FaPhone,
  FaUniversity,
  FaCreditCard,
  FaArrowRight,
  FaTag,
  FaCheckCircle,
} from "react-icons/fa";
import {
  useGetDepartmentByIdQuery,
  useGetExitExamByDepartmentQuery,
  usePurchaseExamMutation,
  useGetOnlinePaymentUrlMutation,
  useGetExitExamInfoQuery,
} from "../data/api/dataApi";
import { signInWithGoogle } from "../../../../firebase";
import googleImg from "../../../assets/google.png";
import { useCreateUserMutation } from "../data/api/userApi";
import { setToken } from "../data/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

const DepartmentDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("additional");
  const { data: departmentDetail, isLoading: deptLoading } =
    useGetDepartmentByIdQuery(id);
  const { data: departmentExams, isLoading: examsLoading } =
    useGetExitExamByDepartmentQuery(id);

  // Get user Id from localStorage if available
  const getUserId = () => {
    try {
      const userId = localStorage.getItem("userId");
      return userId || null;
    } catch (error) {
      console.error("Error getting user Id:", error);
      return null;
    }
  };
  const userId = getUserId();
  console.log("User IDDDDDDDDD", userId);

  // State to store exam IDs and their corresponding info
  const [selectedExamId, setSelectedExamId] = useState(null);
  const { data: examInfo, isLoading: examInfoLoading } =
    useGetExitExamInfoQuery(selectedExamId, {
      skip: !selectedExamId,
    });

  console.log("eXAM INFOOO", examInfo?.data);

  // State to store all exam info
  const [examsWithInfo, setExamsWithInfo] = useState([]);

  const [purchaseExam] = usePurchaseExamMutation();
  const [createUser] = useCreateUserMutation();
  const [getOnlinePaymentUrl] = useGetOnlinePaymentUrlMutation();

  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Purchase modal states
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [purchaseStep, setPurchaseStep] = useState(1); // 1: Phone, 2: Google Auth, 3: Payment Method
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [userData, setUserData] = useState(null);

  // Static courses data
  const staticCourses = [
    {
      id: 1,
      title: "Introduction to Programming",
      description:
        "Learn the fundamentals of programming with Python and JavaScript",
      icon: <FaCode className="h-6 w-6 text-teal-500" />,
      level: "Beginner",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      description:
        "Master essential data structures and algorithm design techniques",
      icon: <FaDatabase className="h-6 w-6 text-teal-500" />,
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Web Development",
      description:
        "Build responsive websites using HTML, CSS, and modern JavaScript frameworks",
      icon: <FaLaptopCode className="h-6 w-6 text-teal-500" />,
      level: "Intermediate",
    },
    {
      id: 4,
      title: "Database Systems",
      description:
        "Design and implement efficient database solutions with SQL and NoSQL",
      icon: <FaDatabase className="h-6 w-6 text-teal-500" />,
      level: "Intermediate",
    },
    {
      id: 5,
      title: "Mobile App Development",
      description:
        "Create cross-platform mobile applications using React Native",
      icon: <FaMobileAlt className="h-6 w-6 text-teal-500" />,
      level: "Advanced",
    },
    {
      id: 6,
      title: "Backend Development",
      description: "Build scalable server-side applications and RESTful APIs",
      icon: <FaServer className="h-6 w-6 text-teal-500" />,
      level: "Advanced",
    },
    {
      id: 7,
      title: "Computer Networks",
      description:
        "Understand networking principles, protocols, and architecture",
      icon: <FaNetworkWired className="h-6 w-6 text-teal-500" />,
      level: "Intermediate",
    },
    {
      id: 8,
      title: "Cybersecurity",
      description:
        "Learn to identify vulnerabilities and implement security measures",
      icon: <FaShieldAlt className="h-6 w-6 text-teal-500" />,
      level: "Advanced",
    },
    {
      id: 9,
      title: "Cloud Computing",
      description: "Deploy and manage applications in cloud environments",
      icon: <FaCloudUploadAlt className="h-6 w-6 text-teal-500" />,
      level: "Advanced",
    },
  ];

  // Sample exams if none are available from API
  const sampleExams = [
    {
      _id: "sample1",
      title: "Introduction to Programming",
      description:
        "Test your knowledge of programming fundamentals with this sample exam.",
      isSample: true,
      questionCount: 25,
      timeLimit: 30,
    },
    {
      _id: "sample2",
      title: "Data Structures Basics",
      description:
        "A sample assessment covering fundamental data structures concepts.",
      isSample: true,
      questionCount: 15,
      timeLimit: 20,
    },
    {
      _id: "premium1",
      title: "Advanced Algorithms",
      description:
        "Comprehensive assessment of advanced algorithmic concepts and problem-solving.",
      isSample: false,
      price: "$19.99",
      questionCount: 40,
      timeLimit: 60,
    },
    {
      _id: "premium2",
      title: "Full Stack Development",
      description:
        "Test your knowledge of both frontend and backend development technologies.",
      isSample: false,
      price: "$24.99",
      questionCount: 50,
      timeLimit: 75,
    },
  ];

  // State for exams
  const [allExams, setAllExams] = useState([]);

  // Fetch exam info for each exam when departmentExams changes
  useEffect(() => {
    if (departmentExams?.data && departmentExams.data.length > 0) {
      // Use real exam data from the API
      setAllExams(departmentExams.data);

      // Create an array to store exams with their info
      const fetchExamInfo = async () => {
        const examsWithInfoData = await Promise.all(
          departmentExams.data.map(async (exam) => {
            try {
              // Fetch exam info for each exam
              setSelectedExamId(exam._id);
              // We'll update the exams with info when examInfo changes
              return exam;
            } catch (error) {
              console.error(`Error fetching info for exam ${exam._id}:`, error);
              return exam;
            }
          })
        );

        setExamsWithInfo(examsWithInfoData);
      };

      fetchExamInfo();
    } else {
      // Use sample data if no API data is available
      // setAllExams(sampleExams);
      // setExamsWithInfo(sampleExams);
    }
  }, [departmentExams]);

  // Update exams with info when examInfo changes
  useEffect(() => {
    if (examInfo && selectedExamId) {
      setExamsWithInfo((prevExams) =>
        prevExams.map((exam) =>
          exam._id === selectedExamId ? { ...exam, info: examInfo.data } : exam
        )
      );
    }
  }, [examInfo, selectedExamId]);

  // Handle purchase button click
  const handlePurchaseClick = (exam) => {
    setSelectedExam(exam);

    // If user is already authenticated, go directly to payment selection
    if (isAuthenticated) {
      setIsPurchaseModalOpen(true);
      setPurchaseStep(3);

      // Get email from localStorage
      const email = localStorage.getItem("userEmail");

      setUserData({
        email,
        phoneNumber: "",
        user: user, // This will be replaced with actual user ID from API if needed
      });
    } else {
      // Otherwise start from the beginning
      setIsPurchaseModalOpen(true);
      setPurchaseStep(1);
      setPhoneNumber("");
      setPhoneError("");
    }

    setPurchaseComplete(false);
    setUserRegistered(false);
  };

  // Close the purchase modal
  const handleCloseModal = () => {
    setIsPurchaseModalOpen(false);
    setSelectedExam(null);
    setPurchaseStep(1);
    setUserRegistered(false);
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
    setPurchaseStep(2); // Move to Google auth step
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      setIsProcessing(true);
      const user = await signInWithGoogle();
      console.log("User", user.providerData);
      console.log("USERRRRRRRRR", user);
      const { email } = user;
      console.log("Email", email);
      console.log("Phone number", phoneNumber);

      // Store email in localStorage for profile display
      localStorage.setItem("userEmail", email);

      // Register user with API
      const register = await createUser({ email, phoneNumber }).unwrap();
      console.log("Registering ...", register);

      // Store token in Redux using the existing slice pattern
      dispatch(setToken(register));

      // Store user data for later use
      setUserData({
        email,
        phoneNumber,
        userId: userId,
      });

      // Ensure we move to payment method selection
      console.log("Moving to payment selection step");
      setUserRegistered(true);

      // Force a small delay to ensure state updates properly
      setTimeout(() => {
        setPurchaseStep(3);
      }, 100);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Failed to register. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle bank transfer selection
  const handleBankTransfer = () => {
    // Navigate to bank information page with exam details
    navigate("/bank-information", {
      state: {
        packageId: examInfo?.data._id,
        examId: selectedExam?._id,
        examTitle: selectedExam?.title,
        price: examInfo?.data.price,
        user: userId,
        departmentId: id,
      },
    });
    setIsPurchaseModalOpen(false);
  };

  // Handle online payment selection
  const handleOnlinePayment = async () => {
    console.log("Hello");
    try {
      setIsProcessing(true);

      // Request online payment checkout URL from API
      const response = await getOnlinePaymentUrl({
        paymentType: "Online",
        package: examInfo?.data._id,
        type: "Semister",
      }).unwrap();
      console.log("RRRRRRRR", response);
      // Redirect to payment gateway
      // if (response.checkoutUrl) {
      //   window.location.href = response.checkoutUrl;
      // } else {
      //   throw new Error("No checkout URL received");
      // }
    } catch (error) {
      console.error("Failed to get payment URL:", error);
      alert(
        "Failed to initiate online payment. Please try again or use bank transfer."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper function to get difficulty badge
  const getDifficultyBadge = (exam) => {
    const difficulty = exam.info?.difficulty || "medium";

    switch (difficulty.toLowerCase()) {
      case "easy":
        return (
          <div className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
            <FaTag className="mr-1 h-3 w-3" />
            <span>Easy</span>
          </div>
        );
      case "hard":
        return (
          <div className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
            <FaTag className="mr-1 h-3 w-3" />
            <span>Hard</span>
          </div>
        );
      default:
        return (
          <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
            <FaTag className="mr-1 h-3 w-3" />
            <span>Medium</span>
          </div>
        );
    }
  };

  if (deptLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[100px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-[120px] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Department header with hero section */}
        <div className="relative rounded-xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-teal-600 opacity-90"></div>
          <div className="relative z-10 px-8 py-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {departmentDetail?.data.name || "Department"}
            </h1>
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

        {/* Exit Exams Section - FIRST */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Exams</h2>

          {examsWithInfo.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examsWithInfo.map((exam) => (
                <div
                  key={exam._id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 ${
                    exam.isSample ? "border-teal-500" : "border-purple-600"
                  } hover:translate-y-[-5px]`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {exam.title}
                      </h3>
                      <div
                        className={`${
                          exam.isSample
                            ? "bg-teal-100 text-teal-800"
                            : "bg-purple-100 text-purple-800"
                        } text-xs font-semibold px-2.5 py-1 rounded-full flex items-center`}
                      >
                        {exam.isSample ? (
                          <>
                            <FaUnlock className="mr-1 h-3 w-3" />
                            <span>Unlocked</span>
                          </>
                        ) : (
                          <>
                            <FaLock className="mr-1 h-3 w-3" />
                            <span>Premium</span>
                          </>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {examInfo?.data.description ||
                        "Comprehensive assessment of your knowledge and skills."}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center">
                        <FaRegClock className="mr-1 h-3 w-3" />
                        {exam.timeLimit || exam.info?.timeLimit || 120} mins
                      </div>
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center">
                        <FaBook className="mr-1 h-3 w-3" />
                        {exam.questionCount ||
                          exam.info?.questionCount ||
                          100}{" "}
                        questions
                      </div>
                    </div>

                    {exam.isSample ? (
                      <Link
                        to={`/generate-exam/${exam._id}`}
                        className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                      >
                        <FaPlayCircle className="mr-2" />
                        Start Exam
                      </Link>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-center font-medium text-purple-800 mb-2">
                          {`${examInfo?.data.price} ETB` ||
                            `${examInfo?.data.price} ETB` ||
                            "200 ETB"}
                        </div>
                        <button
                          onClick={() => handlePurchaseClick(exam)}
                          className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                        >
                          <FaShoppingCart className="mr-2" />
                          Purchase Exam
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Coming Soon ...</p>
          )}
        </div>

        {/* Navigation tabs - SECOND */}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Department Courses
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <p>No course available for now . Coming Soon ...</p>
              </div>
            </div>
          )}

          {/* Curriculum Tab */}
          {activeTab === "curriculum" && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Curriculum
              </h2>
              <div className="space-y-8">
                {departmentDetail?.data?.yearlySubjects ? (
                  departmentDetail.data.yearlySubjects.map(
                    (yearData, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                      >
                        <h3 className="text-xl font-semibold text-teal-700 mb-4">
                          {yearData.year}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {yearData.subjects.map((subject, subIndex) => (
                            <div
                              key={subIndex}
                              className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                                  <span className="text-teal-600 font-semibold">
                                    {subIndex + 1}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <h4 className="text-lg font-medium text-gray-900">
                                    {subject}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="text-center py-8">
                    <FaBook className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Curriculum Data Available
                    </h3>
                    <p className="text-gray-600">
                      The curriculum information for this department is
                      currently being updated.
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
            <div className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {purchaseComplete ? "Purchase Complete" : "Purchase Exam"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-purple-100"
              >
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Thank You for Your Purchase!
                  </h4>
                  <p className="text-gray-600 mb-6">
                    You now have access to {selectedExam?.title}. You can start
                    the exam immediately or access it later from your dashboard.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Link
                      to={`/generate-exam/${selectedExam?._id}`}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Start Exam Now
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
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                          Enter Your Phone Number
                        </h4>
                        <p className="text-gray-600 mb-4">
                          Please provide your phone number to continue with the
                          purchase of{" "}
                          <span className="font-medium">
                            {selectedExam?.title}
                          </span>
                          .
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
                              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                          onClick={handleCloseModal}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        >
                          Continue
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 2: Google Authentication */}
                  {purchaseStep === 2 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Sign in with Google
                      </h4>
                      <p className="text-gray-600 mb-6">
                        Please sign in with your Google account to continue your
                        purchase.
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
                        <p>Exam: {selectedExam?.title}</p>
                        <p>Price: {selectedExam?.price || "200 ETB"}</p>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setPurchaseStep(1)}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                          disabled={isProcessing}
                        >
                          Back
                        </button>
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

                  {/* Step 3: Payment Method Selection */}
                  {purchaseStep === 3 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Select Payment Method
                      </h4>
                      <p className="text-gray-600 mb-6">
                        Choose how you would like to pay for{" "}
                        {selectedExam?.title}.
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
                              <h5 className="font-medium text-gray-900">
                                Bank Transfer
                              </h5>
                              <p className="text-sm text-gray-500">
                                Pay via bank deposit or transfer
                              </p>
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
                              <h5 className="font-medium text-gray-900">
                                Online Payment
                              </h5>
                              <p className="text-sm text-gray-500">
                                Pay securely Online
                              </p>
                            </div>
                          </div>
                          <FaArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        {!isAuthenticated && (
                          <button
                            type="button"
                            onClick={() => setPurchaseStep(2)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                            disabled={isProcessing}
                          >
                            Back
                          </button>
                        )}
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
  );
};

export default DepartmentDetails;

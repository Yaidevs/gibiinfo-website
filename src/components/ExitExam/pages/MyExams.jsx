"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlayCircle,
  FaHistory,
  FaCalendarAlt,
  FaRegClock,
  FaBook,
  FaSearch,
  FaFilter,
  FaBuilding,
  FaChartBar,
  FaGraduationCap,
  FaTag,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const MyExams = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [purchasedExams, setPurchasedExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [departments, setDepartments] = useState([]);

  // Mock data for purchased exams - replace with API call
  const mockPurchasedExams = [
    {
      _id: "exam1",
      title: "Computer Science Exam 1",
      description:
        "Comprehensive assessment covering programming fundamentals, data structures, and algorithms.",
      department: "Computer Science",
      departmentId: "dept1",
      difficulty: "easy",
      purchaseDate: "2023-10-15",
      expiryDate: "2024-10-15",
      status: "active",
      progress: 0,
      questionCount: 40,
      timeLimit: 60,
      lastAttempt: null,
    },
    {
      _id: "exam2",
      title: "Computer Science Exam 2",
      description:
        "Advanced assessment covering system design, architecture, and complex algorithms.",
      department: "Computer Science",
      departmentId: "dept1",
      difficulty: "hard",
      purchaseDate: "2023-09-20",
      expiryDate: "2024-09-20",
      status: "active",
      progress: 75,
      questionCount: 50,
      timeLimit: 90,
      lastAttempt: "2023-10-01",
    },
  ];

  // Extract unique departments from exams
  useEffect(() => {
    if (purchasedExams.length > 0) {
      const uniqueDepartments = [
        ...new Set(purchasedExams.map((exam) => exam.department)),
      ];
      setDepartments(uniqueDepartments);
    }
  }, [purchasedExams]);

  // Fetch purchased exams
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    // Simulate API call
    const fetchPurchasedExams = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call
        // const response = await fetch('/api/user/purchased-exams', {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        // const data = await response.json()
        // setPurchasedExams(data)

        // Using mock data for now
        setTimeout(() => {
          setPurchasedExams(mockPurchasedExams);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching purchased exams:", error);
        setIsLoading(false);
      }
    };

    fetchPurchasedExams();
  }, [isAuthenticated, navigate]);

  // Filter exams based on search term, department and difficulty filters
  const filteredExams = purchasedExams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment === "all" || exam.department === filterDepartment;
    const matchesDifficulty =
      filterDifficulty === "all" || exam.difficulty === filterDifficulty;

    return matchesSearch && matchesDepartment && matchesDifficulty;
  });

  // Group exams by department
  const examsByDepartment = filteredExams.reduce((acc, exam) => {
    if (!acc[exam.department]) {
      acc[exam.department] = [];
    }
    acc[exam.department].push(exam);
    return acc;
  }, {});

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    return difficulty === "easy"
      ? "bg-green-100 text-green-800"
      : "bg-orange-100 text-orange-800";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-[120px] flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your exams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-[120px] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Exams</h1>
          <p className="mt-2 text-gray-600">
            Access and manage your purchased department exams
          </p>
        </div>

        {/* Search and Filter */}
        {/* <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Search exams by title or department..."
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center">
                <FaBuilding className="text-gray-500 mr-2" />
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <FaChartBar className="text-gray-500 mr-2" />
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
        </div> */}

        {/* Exams by Department */}
        {Object.keys(examsByDepartment).length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaBook className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No exams found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ||
              filterDepartment !== "all" ||
              filterDifficulty !== "all"
                ? "No exams match your search criteria. Try adjusting your filters."
                : "You haven't purchased any exams yet."}
            </p>
            <Link
              to="/departments"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
            >
              Browse Available Exams
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(examsByDepartment).map(([department, exams]) => (
              <div
                key={department}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-teal-800 to-teal-600 px-6 py-4">
                  <div className="flex items-center">
                    <FaGraduationCap className="h-6 w-6 text-white mr-3" />
                    <h2 className="text-xl font-bold text-white">
                      {department}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exams.map((exam) => (
                      <div
                        key={exam._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 border-teal-500 hover:translate-y-[-5px]"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900">
                              {exam.title}
                            </h3>
                            {/* <div
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center
                              ${
                                exam.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : exam.progress > 0
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {exam.status === "completed"
                                ? "Completed"
                                : exam.progress > 0
                                ? "In Progress"
                                : "Not Started"}
                            </div> */}
                          </div>

                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {exam.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <div
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center ${getDifficultyColor(
                                exam.difficulty
                              )}`}
                            >
                              <FaTag className="mr-1 h-3 w-3" />
                              {exam.difficulty === "easy" ? "Easy" : "Hard"}
                            </div>

                            <div className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700 flex items-center">
                              <FaRegClock className="mr-1 h-3 w-3" />
                              {exam.timeLimit} mins
                            </div>

                            <div className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700 flex items-center">
                              <FaBook className="mr-1 h-3 w-3" />
                              {exam.questionCount} questions
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <FaCalendarAlt className="mr-1 h-3 w-3" />
                              <span>
                                Purchased: {formatDate(exam.purchaseDate)}
                              </span>
                            </div>
                            {/* {exam.lastAttempt && (
                              <div className="flex items-center text-sm text-gray-600">
                                <FaHistory className="mr-1 h-3 w-3" />
                                <span>
                                  Last attempt: {formatDate(exam.lastAttempt)}
                                </span>
                              </div>
                            )} */}
                          </div>

                          {/* Progress bar */}
                          {/* <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">
                                {exam.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  exam.status === "completed"
                                    ? "bg-green-500"
                                    : "bg-teal-500"
                                }`}
                                style={{ width: `${exam.progress}%` }}
                              ></div>
                            </div>
                          </div> */}

                          {exam.status === "completed" ? (
                            <div className="space-y-3">
                              <div className="text-center font-medium text-green-800 mb-2">
                                Score: {exam.score || "N/A"}%
                              </div>
                              <Link
                                to={`/exam-results/${exam._id}`}
                                className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                              >
                                View Results
                              </Link>
                            </div>
                          ) : (
                            <Link
                              to={`/generate-exam/${exam._id}`}
                              className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                            >
                              <FaPlayCircle className="mr-2" />
                              {exam.progress > 0
                                ? "Continue Exam"
                                : "Continue Exam"}
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyExams;

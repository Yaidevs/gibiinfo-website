"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlayCircle,
  FaCalendarAlt,
  FaRegClock,
  FaBook,
  FaSearch,
  FaBuilding,
  FaChartBar,
  FaGraduationCap,
  FaBoxOpen,
  FaListAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetMyExitExamsQuery } from "../data/api/dataApi";

const MyExams = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [departments, setDepartments] = useState([]);

  // Fetch exam packages data
  const { data: myExamsData, isLoading, error } = useGetMyExitExamsQuery();

  // Extract unique departments from exam packages
  useEffect(() => {
    if (myExamsData?.data && myExamsData.data.length > 0) {
      const uniqueDepartments = [
        ...new Set(myExamsData.data.map((pkg) => pkg.title.split(" ")[0])),
      ];
      setDepartments(uniqueDepartments);
    }
  }, [myExamsData]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Filter packages based on search term and department filter
  const filteredPackages =
    myExamsData?.data?.filter((pkg) => {
      const matchesSearch =
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pkg.description &&
          pkg.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDepartment =
        filterDepartment === "all" || pkg.title.includes(filterDepartment);

      return matchesSearch && matchesDepartment;
    }) || [];

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Count total questions in an exam
  const countQuestions = (exam) => {
    return exam.questions ? exam.questions.length : 0;
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

  if (error) {
    return (
      <div className="min-h-screen pt-[120px] flex justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Error Loading Exams
          </h2>
          <p className="text-gray-600 mb-6">
            There was a problem loading your exams. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Retry
          </button>
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
            Access and manage your purchased exam packages
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
                placeholder="Search exam packages..."
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
            </div>
          </div>
        </div> */}

        {/* Exam Packages */}
        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaBook className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No exam packages found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterDepartment !== "all"
                ? "No exam packages match your search criteria. Try adjusting your filters."
                : "You haven't purchased any exam packages yet."}
            </p>
            <Link
              to="/departments"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
            >
              Browse Available Exams
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-teal-800 to-teal-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaBoxOpen className="h-6 w-6 text-white mr-3" />
                      <h2 className="text-xl font-bold text-white">
                        {pkg.title} Package
                      </h2>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                      Purchased: {formatDate(pkg.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 mb-6">{pkg.description}</p>

                  {/* Included Exams */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaListAlt className="mr-2 text-teal-600" />
                      Included Exams:
                    </h3>

                    {pkg.exitExam && pkg.exitExam.length > 0 ? (
                      <div className="space-y-6">
                        {pkg.exitExam.map((exam) => (
                          <div
                            key={exam._id}
                            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="p-5">
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="text-lg font-semibold text-gray-900">
                                  {exam.title}
                                </h4>
                                <div className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                                  <FaCheckCircle className="mr-1 h-3 w-3" />
                                  <span>Active</span>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-4">
                                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center">
                                  <FaRegClock className="mr-1 h-3 w-3" />
                                  {exam.timeLimit || 120} mins
                                </div>
                                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center">
                                  <FaBook className="mr-1 h-3 w-3" />
                                  {countQuestions(exam)} questions
                                </div>
                                <div className="bg-purple-100 px-3 py-1 rounded-full text-sm text-teal-700 flex items-center">
                                  <FaGraduationCap className="mr-1 h-3 w-3" />
                                  Exit Exam
                                </div>
                              </div>

                              <Link
                                to={`/generate-exam/${exam._id}`}
                                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                              >
                                <FaPlayCircle className="mr-2" />
                                Start Exam
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">
                        No exams available in this package.
                      </p>
                    )}
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

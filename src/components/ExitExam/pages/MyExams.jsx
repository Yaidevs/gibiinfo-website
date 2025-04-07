"use client";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlayCircle,
  FaCalendarAlt,
  FaRegClock,
  FaBook,
  FaChartBar,
  FaGraduationCap,
  FaBoxOpen,
  FaListAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useGetMyExitExamsQuery } from "../data/api/dataApi";
import { logout } from "../data/slice/authSlice";


const MyExams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: myExamsData, isLoading, error } = useGetMyExitExamsQuery();
  // console.log('EXAMS DATA ...',myExamsData)

  const packages = myExamsData?.data || [];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userEmail");
    // Redirect to home or refresh page if needed
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-[120px] flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          {/* <p className="text-gray-600">Loading your exams...</p> */}
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
            onClick={() => {
              handleLogout();
            }}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Logout and Retry please.
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

        {packages.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaBook className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No exam packages found
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't purchased any exam packages yet.
            </p>
            <p className="text-gray-600 mb-6">
              If you purchased and not approved yet ; Contact us : +251948952757
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
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-teal-600"
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

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaListAlt className="mr-2 text-teal-600" />
                      Included Exams:
                    </h3>

                    {pkg.exitExam && pkg.exitExam.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pkg.exitExam.map((exam, index) => {
                          const examId =
                            typeof exam === "string" ? exam : exam._id;

                          return (
                            <div
                              key={index}
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
                                    120 mins
                                  </div>
                                  <div className="bg-teal-100 px-3 py-1 rounded-full text-sm text-teal-700 flex items-center">
                                    <FaGraduationCap className="mr-1 h-3 w-3" />
                                    {pkg.title}
                                  </div>
                                </div>

                                <Link
                                  to={`/generate-exam/${examId}`}
                                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                                >
                                  <FaPlayCircle className="mr-2" />
                                  Start Exam
                                </Link>
                              </div>
                            </div>
                          );
                        })}
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

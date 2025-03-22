"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
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
  FaCloudUploadAlt
} from "react-icons/fa"
import {
  useGetDepartmentByIdQuery,
  useGetExitExamByDepartmentQuery
} from "../data/api/dataApi"

const DepartmentDetails = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("additional")
  const { data: departmentDetail, isLoading: deptLoading } = useGetDepartmentByIdQuery(id)
  const { data: departmentExams, isLoading: examsLoading } = useGetExitExamByDepartmentQuery(id)
  console.log('Dep Ex...',departmentExams)
  
  // Static courses data
  const staticCourses = [
    {
      id: 1,
      title: "Introduction to Programming",
      description: "Learn the fundamentals of programming with Python and JavaScript",
      icon: <FaCode className="h-6 w-6 text-teal-500" />,
      level: "Beginner"
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      description: "Master essential data structures and algorithm design techniques",
      icon: <FaDatabase className="h-6 w-6 text-teal-500" />,
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Web Development",
      description: "Build responsive websites using HTML, CSS, and modern JavaScript frameworks",
      icon: <FaLaptopCode className="h-6 w-6 text-teal-500" />,
      level: "Intermediate"
    },
    {
      id: 4,
      title: "Database Systems",
      description: "Design and implement efficient database solutions with SQL and NoSQL",
      icon: <FaDatabase className="h-6 w-6 text-teal-500" />,
      level: "Intermediate"
    },
    {
      id: 5,
      title: "Mobile App Development",
      description: "Create cross-platform mobile applications using React Native",
      icon: <FaMobileAlt className="h-6 w-6 text-teal-500" />,
      level: "Advanced"
    },
    {
      id: 6,
      title: "Backend Development",
      description: "Build scalable server-side applications and RESTful APIs",
      icon: <FaServer className="h-6 w-6 text-teal-500" />,
      level: "Advanced"
    },
    {
      id: 7,
      title: "Computer Networks",
      description: "Understand networking principles, protocols, and architecture",
      icon: <FaNetworkWired className="h-6 w-6 text-teal-500" />,
      level: "Intermediate"
    },
    {
      id: 8,
      title: "Cybersecurity",
      description: "Learn to identify vulnerabilities and implement security measures",
      icon: <FaShieldAlt className="h-6 w-6 text-teal-500" />,
      level: "Advanced"
    },
    {
      id: 9,
      title: "Cloud Computing",
      description: "Deploy and manage applications in cloud environments",
      icon: <FaCloudUploadAlt className="h-6 w-6 text-teal-500" />,
      level: "Advanced"
    }
  ]
  
  // Sample exams if none are available from API
  const sampleExams = [
    {
      _id: "sample1",
      title: "Introduction to Programming",
      description: "Test your knowledge of programming fundamentals with this sample exam.",
      isSample: true,
      questionCount: 25,
      timeLimit: 30
    },
    {
      _id: "sample2",
      title: "Data Structures Basics",
      description: "A sample assessment covering fundamental data structures concepts.",
      isSample: true,
      questionCount: 15,
      timeLimit: 20
    },
    {
      _id: "premium1",
      title: "Advanced Algorithms",
      description: "Comprehensive assessment of advanced algorithmic concepts and problem-solving.",
      isSample: false,
      price: "$19.99",
      questionCount: 40,
      timeLimit: 60
    },
    {
      _id: "premium2",
      title: "Full Stack Development",
      description: "Test your knowledge of both frontend and backend development technologies.",
      isSample: false,
      price: "$24.99",
      questionCount: 50,
      timeLimit: 75
    }
  ]

  // State for exams
  const [allExams, setAllExams] = useState([])

  useEffect(() => {
    if (departmentExams?.data && departmentExams.data.length > 0) {
      // Use real exam data from the API
      setAllExams(departmentExams.data)
    } else {
      // Use sample data if no API data is available
      setAllExams(sampleExams)
    }
  }, [departmentExams])

  if (deptLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[100px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          {/* <p className="text-gray-600">Loading ...</p> */}
        </div>
      </div>
    )
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Exit Exams</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allExams.map((exam) => (
              <div
                key={exam._id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 ${
                  exam.isSample ? "border-teal-500" : "border-purple-600"
                } hover:translate-y-[-5px]`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{exam.title}</h3>
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
                    {exam.description || "Comprehensive assessment of your knowledge and skills."}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center">
                      <FaRegClock className="mr-1 h-3 w-3" />
                      {exam.timeLimit || 60} mins
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center">
                      <FaBook className="mr-1 h-3 w-3" />
                      {exam.questionCount || 50} questions
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
                        {exam.price || "$19.99"}
                      </div>
                      <button
                        onClick={() => alert("Buy It ...")}
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
                {staticCourses.map((course) => (
                  <div 
                    key={course.id} 
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border-l-4 border-teal-500"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        {course.icon}
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            course.level === "Beginner" 
                              ? "bg-green-100 text-green-800" 
                              : course.level === "Intermediate"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                          }`}>
                            {course.level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{course.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About the Department</h3>
                <p className="text-gray-600 mb-4">
                  {departmentDetail?.data.description || 
                    "This department is committed to providing students with a comprehensive education that combines theoretical knowledge with practical skills. Our curriculum is designed to prepare students for successful careers in the field."}
                </p>
                <p className="text-gray-600">
                  Students will learn from experienced faculty members who are experts in their respective fields. The department offers state-of-the-art facilities and resources to support student learning and research.
                </p>
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
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Curriculum Data Available</h3>
                    <p className="text-gray-600">The curriculum information for this department is currently being updated.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DepartmentDetails

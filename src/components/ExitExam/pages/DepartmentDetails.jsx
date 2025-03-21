"use client";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaLock,
  FaLockOpen,
  FaArrowLeft,
  FaGraduationCap,
  FaBook,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  useGetDepartmentByIdQuery,
  useGetExitExamByDepartmentQuery,
} from "../data/api/dataApi";

// Static data for department details
const departmentData = {
  dept1: {
    id: "dept1",
    name: "Computer Science",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description:
      "The Department of Computer Science offers a comprehensive curriculum covering programming, algorithms, artificial intelligence, and software engineering.",
    yearlySubjects: [
      {
        year: "First Year",
        subjects: [
          "Introduction to Programming",
          "Discrete Mathematics",
          "Computer Organization",
          "Calculus for Computer Science",
        ],
      },
      {
        year: "Second Year",
        subjects: [
          "Data Structures and Algorithms",
          "Object-Oriented Programming",
          "Database Systems",
          "Computer Networks",
        ],
      },
      {
        year: "Third Year",
        subjects: [
          "Operating Systems",
          "Software Engineering",
          "Web Development",
          "Artificial Intelligence",
        ],
      },
      {
        year: "Fourth Year",
        subjects: [
          "Machine Learning",
          "Cloud Computing",
          "Cybersecurity",
          "Capstone Project",
        ],
      },
    ],
    exitExams: [
      {
        id: "exam1",
        title: "Exam 1",
        description:
          "Test your knowledge of fundamental programming concepts and syntax.",
        isFree: true,
        questionCount: 50,
        duration: "60 minutes",
        difficulty: "Beginner",
      },
      {
        id: "exam2",
        title: "Exam 2",
        description:
          "Challenge yourself with questions on various data structures and algorithm design.",
        isFree: true,
        questionCount: 40,
        duration: "90 minutes",
        difficulty: "Intermediate",
      },
      {
        id: "exam3",
        title: "Exam 3",
        description:
          "Test your knowledge of complex database concepts, SQL, and database design.",
        isFree: false,
        price: "150 ETB",
        questionCount: 60,
        duration: "120 minutes",
        difficulty: "Advanced",
      },
      {
        id: "exam4",
        title: "Exam 4",
        description:
          "Comprehensive exam covering software development lifecycle and best practices.",
        isFree: false,
        price: "200 ETB",
        questionCount: 75,
        duration: "150 minutes",
        difficulty: "Advanced",
      },
    ],
  },
  dept2: {
    id: "dept2",
    name: "Electrical Engineering",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description:
      "The Department of Electrical Engineering provides education in circuit design, power systems, electronics, and control systems.",
    yearlySubjects: [
      {
        year: "First Year",
        subjects: [
          "Introduction to Electrical Engineering",
          "Engineering Mathematics",
          "Physics for Engineers",
          "Circuit Theory",
        ],
      },
      {
        year: "Second Year",
        subjects: [
          "Digital Electronics",
          "Signals and Systems",
          "Electromagnetic Theory",
          "Electronic Devices",
        ],
      },
      {
        year: "Third Year",
        subjects: [
          "Power Systems",
          "Control Systems",
          "Communication Systems",
          "Microprocessors",
        ],
      },
      {
        year: "Fourth Year",
        subjects: [
          "VLSI Design",
          "Power Electronics",
          "Renewable Energy Systems",
          "Capstone Project",
        ],
      },
    ],
    exitExams: [
      {
        id: "exam1",
        title: "Basic Circuit Analysis",
        description:
          "Test your knowledge of fundamental circuit analysis techniques.",
        isFree: true,
        questionCount: 45,
        duration: "60 minutes",
        difficulty: "Beginner",
      },
      {
        id: "exam2",
        title: "Digital Electronics",
        description:
          "Comprehensive exam on digital logic, circuits, and systems.",
        isFree: true,
        questionCount: 50,
        duration: "75 minutes",
        difficulty: "Intermediate",
      },
      {
        id: "exam3",
        title: "Power Systems Analysis",
        description:
          "Advanced exam covering power generation, transmission, and distribution.",
        isFree: false,
        price: "180 ETB",
        questionCount: 65,
        duration: "120 minutes",
        difficulty: "Advanced",
      },
      {
        id: "exam4",
        title: "Control Systems Engineering",
        description: "In-depth assessment of control theory and applications.",
        isFree: false,
        price: "220 ETB",
        questionCount: 70,
        duration: "135 minutes",
        difficulty: "Advanced",
      },
    ],
  },
  dept3: {
    id: "dept3",
    name: "Mechanical Engineering",
    image:
      "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description:
      "The Department of Mechanical Engineering focuses on design, manufacturing, thermodynamics, and materials science.",
    yearlySubjects: [
      {
        year: "First Year",
        subjects: [
          "Engineering Mechanics",
          "Engineering Drawing",
          "Materials Science",
          "Mathematics for Engineers",
        ],
      },
      {
        year: "Second Year",
        subjects: [
          "Thermodynamics",
          "Fluid Mechanics",
          "Manufacturing Processes",
          "Kinematics of Machinery",
        ],
      },
      {
        year: "Third Year",
        subjects: [
          "Heat Transfer",
          "Machine Design",
          "Dynamics of Machinery",
          "Industrial Engineering",
        ],
      },
      {
        year: "Fourth Year",
        subjects: [
          "Refrigeration and Air Conditioning",
          "Automobile Engineering",
          "Robotics",
          "Capstone Project",
        ],
      },
    ],
    exitExams: [
      {
        id: "exam1",
        title: "Engineering Mechanics",
        description:
          "Test your understanding of statics and dynamics principles.",
        isFree: true,
        questionCount: 40,
        duration: "60 minutes",
        difficulty: "Beginner",
      },
      {
        id: "exam2",
        title: "Thermodynamics",
        description:
          "Comprehensive assessment of thermodynamic laws and applications.",
        isFree: true,
        questionCount: 45,
        duration: "75 minutes",
        difficulty: "Intermediate",
      },
      {
        id: "exam3",
        title: "Advanced Machine Design",
        description:
          "In-depth exam on machine elements, design principles, and analysis.",
        isFree: false,
        price: "20 ETB",
        questionCount: 60,
        duration: "120 minutes",
        difficulty: "Advanced",
      },
      {
        id: "exam4",
        title: "Manufacturing Technology",
        description:
          "Comprehensive assessment of modern manufacturing processes and systems.",
        isFree: false,
        price: "250 ETB",
        questionCount: 70,
        duration: "150 minutes",
        difficulty: "Advanced",
      },
    ],
  },
};

const DepartmentDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const { data: departmentDetail } = useGetDepartmentByIdQuery(id);
  console.log("Depa...", departmentDetail?.data.name);
  const { data: departmentexitexam } = useGetExitExamByDepartmentQuery(id);
  console.log("DAAW", departmentexitexam?.data);

  // Get department data based on ID from URL
  const department = departmentData[id] || departmentData.dept1;

  return (
    <div className="bg-gray-50 min-h-screen pt-[180px] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        {/* <Link to="/" className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6">
          <FaArrowLeft className="mr-2" />
          Back to Departments
        </Link> */}

        {/* Department header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-64 w-full object-cover md:w-64"
                src={department.image || "/placeholder.svg"}
                alt={department.name}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-teal-600 font-semibold">
                Department
              </div>
              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                {departmentDetail?.data.name}
              </h1>
              <p className="mt-4 text-gray-600">
                {departmentDetail?.data.name}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview"
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
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
            <button
              onClick={() => setActiveTab("exitExams")}
              className={`${
                activeTab === "exitExams"
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Exit Exams
            </button>
          </nav>
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Department Overview
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    About the Department
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The {departmentDetail?.data.name} department is committed to
                    providing students with a comprehensive education that
                    combines theoretical knowledge with practical skills. Our
                    curriculum is designed to prepare students for successful
                    careers in the field.
                  </p>
                  <p className="text-gray-600">
                    Students will learn from experienced faculty members who are
                    experts in their respective fields. The department offers
                    state-of-the-art facilities and resources to support student
                    learning and research.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-teal-500">
                        <FaGraduationCap className="h-5 w-5" />
                      </span>
                      <span className="ml-3 text-gray-600">
                        Comprehensive curriculum covering all essential topics
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-teal-500">
                        <FaBook className="h-5 w-5" />
                      </span>
                      <span className="ml-3 text-gray-600">
                        Hands-on learning experiences and practical projects
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-teal-500">
                        <FaCalendarAlt className="h-5 w-5" />
                      </span>
                      <span className="ml-3 text-gray-600">
                        Regular workshops, seminars, and guest lectures
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Curriculum Tab */}
          {activeTab === "curriculum" && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Curriculum
              </h2>
              {/* <div className="space-y-8">
                {department.yearlySubjects.map((yearData, index) => (
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
                          className="bg-gray-50 p-4 rounded-lg"
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
                ))}
              </div> */}
            </div>
          )}

          {/* Exit Exams Tab */}
          {activeTab === "exitExams" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Exit Exams
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {departmentexitexam?.data.map((exam) => (
                  <div
                    key={exam._id}
                    className={`relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {exam.title}
                      </h3>

                      <Link
                        to={`/generate-exam/${exam._id}`}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
                      >
                        Start Exam
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;

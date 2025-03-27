"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaCheck,
  FaHistory,
  FaPlayCircle,
  FaShieldAlt,
  FaGraduationCap,
  FaUniversity,
  FaCamera,
} from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../data/slice/authSlice"

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")

  // User profile state
  const [userProfile, setUserProfile] = useState({
    email: "",
    phoneNumber: "",
    name: "",
    department: "",
    university: "",
    studentId: "",
  })

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedProfile, setEditedProfile] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  // Activity history
  const [activityHistory, setActivityHistory] = useState([])

  // File input ref
  const fileInputRef = useRef(null)
  const [profileImage, setProfileImage] = useState(null)

  // Mock activity history data
  const mockActivityHistory = [
    {
      id: 1,
      type: "exam_purchase",
      title: "Purchased Computer Science Exam 1",
      date: "2023-10-15T14:30:00Z",
      details: { examId: "exam1", amount: "200 ETB", paymentMethod: "Bank Transfer" },
    },
    {
      id: 2,
      type: "exam_started",
      title: "Started Computer Science Exam 1",
      date: "2023-10-20T09:15:00Z",
      details: { examId: "exam1" },
    },
    {
      id: 3,
      type: "exam_completed",
      title: "Completed Computer Science Exam 1",
      date: "2023-10-20T11:45:00Z",
      details: { examId: "exam1", score: 85 },
    },
    {
      id: 4,
      type: "exam_purchase",
      title: "Purchased Information Technology Exam 2",
      date: "2023-11-05T08:20:00Z",
      details: { examId: "exam4", amount: "250 ETB", paymentMethod: "Online Payment" },
    },
    {
      id: 5,
      type: "profile_updated",
      title: "Profile Information Updated",
      date: "2023-09-05T11:30:00Z",
      details: { fields: ["phoneNumber", "department"] },
    },
  ]

  // Fetch user profile
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate("/")
      return
    }

    // Simulate API call to get user profile
    const fetchUserProfile = async () => {
      setIsLoading(true)
      try {
        // Replace with actual API call
        // const response = await fetch('/api/user/profile', {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        // const data = await response.json()
        // setUserProfile(data)
        // if (data.profileImage) {
        //   setProfileImage(data.profileImage)
        // }

        // Using mock data for now
        setTimeout(() => {
          const email = localStorage.getItem("userEmail") || "user@example.com"
          setUserProfile({
            email,
            phoneNumber: "+251 91 234 5678",
            name: "John Doe",
            department: "Computer Science",
            university: "Addis Ababa University",
            studentId: "CS/2015/042",
          })
          setActivityHistory(mockActivityHistory)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching user profile:", error)
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [isAuthenticated, navigate])

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditMode) {
      // Cancel edit mode
      setIsEditMode(false)
    } else {
      // Enter edit mode
      setEditedProfile({ ...userProfile })
      setIsEditMode(true)
    }
  }

  // Handle profile field changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle profile save
  const handleProfileSave = async () => {
    setIsSaving(true)
    try {
      // Replace with actual API call
      // const formData = new FormData()
      // Object.keys(editedProfile).forEach(key => {
      //   formData.append(key, editedProfile[key])
      // })
      // if (profileImageFile) {
      //   formData.append('profileImage', profileImageFile)
      // }
      // await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      //   body: formData
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update profile state
      setUserProfile(editedProfile)
      setIsEditMode(false)

      // Add to activity history
      const updatedFields = Object.keys(editedProfile).filter((key) => editedProfile[key] !== userProfile[key])

      if (updatedFields.length > 0) {
        const newActivity = {
          id: Date.now(),
          type: "profile_updated",
          title: "Profile Information Updated",
          date: new Date().toISOString(),
          details: { fields: updatedFields },
        }

        setActivityHistory((prev) => [newActivity, ...prev])
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("Failed to save profile changes. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle profile picture change
  const handleProfilePictureClick = () => {
    fileInputRef.current.click()
  }

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)

      // In a real implementation, you would store the file to upload to the server
      // setProfileImageFile(file)
    }
  }

  // Handle logout
  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get activity icon based on type
  const getActivityIcon = (type) => {
    switch (type) {
      case "exam_purchase":
        return <FaShieldAlt className="text-purple-500" />
      case "exam_started":
        return <FaPlayCircle className="text-blue-500" />
      case "exam_completed":
        return <FaCheck className="text-green-500" />
      case "account_login":
        return <FaUser className="text-gray-500" />
      case "profile_updated":
        return <FaEdit className="text-teal-500" />
      default:
        return <FaHistory className="text-gray-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-[120px] flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-[120px] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-teal-800 to-teal-600 px-6 py-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              {/* Profile Picture */}
              <div
                className="relative w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6 cursor-pointer group"
                onClick={handleProfilePictureClick}
              >
                {profileImage ? (
                  <img
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-teal-600 text-4xl font-bold">
                    {userProfile.name
                      ? userProfile.name.charAt(0).toUpperCase()
                      : userProfile.email.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaCamera className="text-white text-xl" />
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">{userProfile.name || userProfile.email}</h2>
                <div className="flex items-center mt-1">
                  <FaGraduationCap className="mr-2" />
                  <span>{userProfile.department}</span>
                </div>
                <div className="flex items-center mt-1">
                  <FaUniversity className="mr-2" />
                  <span>{userProfile.university}</span>
                </div>
                <div className="flex items-center mt-1">
                  <FaEnvelope className="mr-2" />
                  <span>{userProfile.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("profile")}
                className={`${
                  activeTab === "profile"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`${
                  activeTab === "activity"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Activity History
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Information Tab */}
            {activeTab === "profile" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                  <button
                    onClick={handleEditToggle}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      isEditMode
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        : "bg-teal-600 text-white hover:bg-teal-700"
                    }`}
                  >
                    {isEditMode ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                <div className="space-y-6">
                  {isEditMode ? (
                    // Edit Form
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={editedProfile.name || ""}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={editedProfile.email}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                          />
                          <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                        </div>

                        <div>
                          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={editedProfile.phoneNumber || ""}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                            Student ID
                          </label>
                          <input
                            type="text"
                            id="studentId"
                            name="studentId"
                            value={editedProfile.studentId || ""}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                          </label>
                          <input
                            type="text"
                            id="department"
                            name="department"
                            value={editedProfile.department || ""}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                            University/Institution
                          </label>
                          <input
                            type="text"
                            id="university"
                            name="university"
                            value={editedProfile.university || ""}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handleProfileSave}
                          disabled={isSaving}
                          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center"
                        >
                          {isSaving ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <FaCheck className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    // Display Profile
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                        <p className="mt-1 text-gray-900">{userProfile.name || "Not provided"}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                        <p className="mt-1 text-gray-900">{userProfile.email}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                        <p className="mt-1 text-gray-900">{userProfile.phoneNumber || "Not provided"}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Student ID</h4>
                        <p className="mt-1 text-gray-900">{userProfile.studentId || "Not provided"}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Department</h4>
                        <p className="mt-1 text-gray-900">{userProfile.department || "Not provided"}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">University/Institution</h4>
                        <p className="mt-1 text-gray-900">{userProfile.university || "Not provided"}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-900">Account Actions</h4>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Account Activity</h3>
                  <p className="text-gray-600 text-sm">Recent activity on your account</p>
                </div>

                <div className="space-y-6">
                  {activityHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <FaHistory className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
                      <p className="text-gray-600">Your account activity will appear here</p>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <ul className="-mb-8">
                        {activityHistory.map((activity, activityIdx) => (
                          <li key={activity.id}>
                            <div className="relative pb-8">
                              {activityIdx !== activityHistory.length - 1 ? (
                                <span
                                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div className="relative flex items-start space-x-3">
                                <div className="relative">
                                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    {getActivityIcon(activity.type)}
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                                    <p className="mt-0.5 text-sm text-gray-500">{formatDate(activity.date)}</p>
                                  </div>
                                  <div className="mt-2 text-sm text-gray-700">
                                    {activity.type === "exam_purchase" && (
                                      <p>
                                        Payment of {activity.details.amount} via {activity.details.paymentMethod}
                                      </p>
                                    )}
                                    {activity.type === "exam_completed" && <p>Score: {activity.details.score}%</p>}
                                    {activity.type === "profile_updated" && (
                                      <p>Updated: {activity.details.fields.join(", ")}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile


"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { FaUniversity, FaCopy, FaCheck, FaUpload, FaFileImage } from "react-icons/fa"
import { useVerifyBankTransferMutation } from "../data/api/dataApi"

const BankInformation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Get exam details from location state
  const { examId, examTitle, price, userId } = location.state || {}

  // State for receipt upload
  const [receiptFile, setReceiptFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState("")

  // Bank account details (static for now)
  const bankAccounts = [
    {
      bank: "Commercial Bank of Ethiopia",
      accountName: "Barnabas T.",
      accountNumber: "1000123456789",
    },
    {
      bank: "Dashen Bank",
      accountName: "Barnabas T.",
      accountNumber: "0987654321",
    },
  ]

  // Copy to clipboard functionality
  const [copied, setCopied] = useState(null)

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setReceiptFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!receiptFile) {
      setError("Please upload a receipt image")
      return
    }

    if (!transactionId.trim()) {
      setError("Please enter the transaction ID or reference number")
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      // Create form data for file upload
      const formData = new FormData()
      formData.append("receipt", receiptFile)
      formData.append("transactionId", transactionId)
      formData.append("examId", examId)
      formData.append("userId", userId)

      // Submit verification request

      setSubmitSuccess(true)

      // Redirect to success page or exam page after a delay
      setTimeout(() => {
        navigate(`/generate-exam/${examId}`)
      }, 3000)
    } catch (error) {
      console.error("Verification failed:", error)
      setError("Failed to verify your payment. Please try again or contact support.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // If no exam details are available, redirect to departments
  useEffect(() => {
    if (!examId || !examTitle) {
      navigate("/departments")
    }
  }, [examId, examTitle, navigate])

  return (
    <div className="bg-gray-50 min-h-screen pt-[120px] pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 text-white px-6 py-4">
            <h1 className="text-xl font-semibold">Bank Transfer Information</h1>
          </div>

          {submitSuccess ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Verification Submitted!</h2>
              <p className="text-gray-600 mb-6">
                We've received your payment verification. Your access to the exam will be activated once the payment is
                confirmed.
              </p>
              <p className="text-gray-600 mb-6">You'll be redirected to the exam page in a moment...</p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            </div>
          ) : (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Purchase Details</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Exam:</span>
                    <span className="font-medium">{examTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount to Pay:</span>
                    <span className="font-medium text-purple-700">{price || "200 ETB"}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Bank Account Details</h2>
                <div className="space-y-4">
                  {bankAccounts.map((account, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <FaUniversity className="h-5 w-5 text-purple-600 mr-2" />
                        <h3 className="font-medium text-gray-900">{account.bank}</h3>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Account Name:</span>
                          <span>{account.accountName}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Account Number:</span>
                          <div className="flex items-center">
                            <span className="mr-2 font-mono">{account.accountNumber}</span>
                            <button
                              onClick={() => copyToClipboard(account.accountNumber, `account-${index}`)}
                              className="text-purple-600 hover:text-purple-800"
                              title="Copy to clipboard"
                            >
                              {copied === `account-${index}` ? (
                                <FaCheck className="h-4 w-4" />
                              ) : (
                                <FaCopy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Branch:</span>
                          <span>{account.branch}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Verify Your Payment</h2>
                <p className="text-gray-600 mb-4">
                  After making the bank transfer, please upload a screenshot or photo of your receipt and provide the
                  transaction ID to verify your payment.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">
                      Transaction ID / Reference Number
                    </label>
                    <input
                      type="text"
                      id="transactionId"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter the transaction ID or reference number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Screen Shoot</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {previewUrl ? (
                        <div className="space-y-3">
                          <img
                            src={previewUrl || "/placeholder.svg"}
                            alt="Receipt preview"
                            className="max-h-48 mx-auto object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setReceiptFile(null)
                              setPreviewUrl("")
                            }}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove image
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <FaFileImage className="h-12 w-12 text-gray-400 mx-auto" />
                          <div className="text-sm text-gray-600">
                            <label
                              htmlFor="receipt-upload"
                              className="relative cursor-pointer text-purple-600 hover:text-purple-800"
                            >
                              <span>Upload a file</span>
                              <input
                                id="receipt-upload"
                                name="receipt"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                              />
                            </label>
                            <p>or drag and drop</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {error && <div className="text-red-600 text-sm p-2 bg-red-50 rounded-md">{error}</div>}

                  <div className="flex justify-between pt-4">
                    <Link
                      to={`/departments/${location.state?.departmentId || ""}`}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaUpload className="mr-2 h-4 w-4" />
                          Submit Verification
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BankInformation


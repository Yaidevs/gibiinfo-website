"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { FaUniversity, FaCopy, FaCheck, FaUpload, FaFileImage, FaExclamationTriangle } from "react-icons/fa"
import { useGetBankAccountsQuery, useSubscribeManualPaymentMutation } from "../data/api/dataApi"

const BankInformation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Get exam details from location state
  const { examId, examTitle, price, userId, departmentId ,packageId} = location.state || {}
  console.log('EEEEEEEEEEE',examId ,examTitle,price,userId,departmentId,packageId)

  // Fetch banks from API
  const { data: banksData, isLoading: isBanksLoading, error: banksError } = useGetBankAccountsQuery()
  const [subscribeManual] = useSubscribeManualPaymentMutation()

  // State for receipt upload and form
  const [receiptFile, setReceiptFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [selectedBankId, setSelectedBankId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState("")

  // Convert receipt to base64 for API
  const [receiptBase64, setReceiptBase64] = useState("")

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

      // Convert to base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setReceiptBase64(base64String.split(",")[1]) // Remove data:image/jpeg;base64, part
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle bank selection
  const handleBankChange = (e) => {
    const bankId = e.target.value
    console.log("Selected bank ID:", bankId)
    setSelectedBankId(bankId)
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

    // Log the selectedBankId to debug
    console.log("Submitting with bank ID:", selectedBankId)

    if (!selectedBankId || selectedBankId === "") {
      setError("Please select a bank")
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      // Prepare data according to API requirements
      const paymentData = {
        paymentType: "manual",
        package: packageId, // Using examId as the package identifier
        type: "Semister", // Default value as specified
        profImage: receiptBase64, // Base64 encoded image
        manualTransactionId: transactionId,
        bankId: selectedBankId,
        user:userId
      }

      console.log("Submitting payment data:", paymentData)

      // Submit payment verification request
      const response = await subscribeManual(paymentData).unwrap()
      console.log("Payment verification response:", response)

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

  // Set first bank as default when data loads
  useEffect(() => {
    if (banksData?.data?.length > 0 && !selectedBankId) {
      console.log("Setting default bank ID:", banksData.data[0]._id)
      setSelectedBankId(banksData.data[0]._id.toString())
    }
  }, [banksData, selectedBankId])

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
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">package :</span>
                    <span className="font-medium">{packageId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount to Pay:</span>
                    <span className="font-medium text-purple-700">{price} ETB</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Bank Account Details</h2>

                {isBanksLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading bank accounts...</p>
                  </div>
                ) : banksError ? (
                  <div className="bg-red-50 p-4 rounded-lg text-red-700 flex items-center">
                    <FaExclamationTriangle className="h-5 w-5 mr-2" />
                    <p>Failed to load bank accounts. Please try again later.</p>
                  </div>
                ) : banksData?.data?.length === 0 ? (
                  <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700">
                    <p>No bank accounts available. Please contact support.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {banksData?.data?.map((bank) => (
                      <div
                        key={bank._id}
                        className={`border rounded-lg p-4 transition-colors ${
                          selectedBankId === bank._id ? "border-purple-500 bg-purple-50" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start">
                          <input
                            type="radio"
                            id={`bank-${bank._id}`}
                            name="bank"
                            value={bank._id.toString()}
                            checked={selectedBankId === bank._id.toString()}
                            onChange={handleBankChange}
                            className="mt-1 mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <FaUniversity className="h-5 w-5 text-purple-600 mr-2" />
                              <h3 className="font-medium text-gray-900">{bank.bankName}</h3>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Account Name:</span>
                                <span>{bank.accountHolderName}</span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Account Number:</span>
                                <div className="flex items-center">
                                  <span className="mr-2 font-mono">{bank.accountNumber}</span>
                                  <button
                                    type="button"
                                    onClick={() => copyToClipboard(bank.accountNumber, `account-${bank._id}`)}
                                    className="text-purple-600 hover:text-purple-800"
                                    title="Copy to clipboard"
                                  >
                                    {copied === `account-${bank._id}` ? (
                                      <FaCheck className="h-4 w-4" />
                                    ) : (
                                      <FaCopy className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              {bank.branch && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Branch:</span>
                                  <span>{bank.branch}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Screenshot</label>
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
                              setReceiptBase64("")
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
                      to={`/departments/${departmentId || ""}`}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting || !selectedBankId}
                      className={`px-6 py-2 ${
                        isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                      } text-white rounded-md transition-colors flex items-center`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaUpload className="mr-2 h-4 w-4" />
                          Submit
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


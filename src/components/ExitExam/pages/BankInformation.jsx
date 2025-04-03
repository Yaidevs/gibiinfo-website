"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import {
  FaUniversity,
  FaCopy,
  FaCheck,
  FaUpload,
  FaFileImage,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaReceipt,
  FaArrowLeft,
} from "react-icons/fa"
import { useGetBankAccountsQuery, useSubscribeManualPaymentMutation } from "../data/api/dataApi"
import { storage } from "../../../../firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"

// Bank logos mapping - you can replace these with actual bank logos
const bankLogos = {
  "Commercial Bank of Ethiopia": "/placeholder.svg?height=60&width=60",
  "Dashen Bank": "/placeholder.svg?height=60&width=60",
  "Awash Bank": "/placeholder.svg?height=60&width=60",
  "Abyssinia Bank": "/placeholder.svg?height=60&width=60",
  "Wegagen Bank": "/placeholder.svg?height=60&width=60",
  Telebirr: "/placeholder.svg?height=60&width=60",
  // Add more banks as needed
}

// Default logo for banks not in the mapping
const defaultBankLogo = "/placeholder.svg?height=60&width=60"

const BankInformation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Get exam details from location state
  const { examTitle, price, userId, departmentId, packageId } = location.state || {}

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
      // Create a preview URL for the selected image
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Clean up the object URL when component unmounts or when the file changes
      return () => URL.revokeObjectURL(objectUrl)
    }
  }

  // Handle bank selection
  const handleBankChange = (bankId) => {
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

    if (!selectedBankId || selectedBankId === "") {
      setError("Please select a bank")
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      // Upload image to Firebase Storage
      const imageRef = ref(storage, `Receipt-images/${receiptFile.name + v4()}`)
      await uploadBytes(imageRef, receiptFile)
      const imageUrl = await getDownloadURL(imageRef)

      // Prepare data according to API requirements
      const paymentData = {
        paymentType: "Manual",
        package: packageId, // Using packageId as the package identifier
        type: "Semister", // Default value as specified
        profImage: imageUrl, // Firebase image URL instead of base64
        manualTransactionId: transactionId,
        bankId: selectedBankId,
      }

      // Submit payment verification request
      const response = await subscribeManual(paymentData).unwrap()
      // console.log("Payment verification response:", response)

      setSubmitSuccess(true)

      // Redirect to success page or exam page after a delay
      // setTimeout(() => {
      //   navigate(`/my-exams`)
      // }, 10000)
    } catch (error) {
      // console.error("Verification failed:", error)
      setError("Failed to verify your payment. Please try again or contact support.")
    } finally {
      // setIsSubmitting(false)
    }
  }

  // If no exam details are available, redirect to departments
  useEffect(() => {
    if (!packageId || !examTitle) {
      navigate("/departments")
    }
  }, [packageId, examTitle, navigate])

  // Set first bank as default when data loads
  useEffect(() => {
    if (banksData?.data?.length > 0 && !selectedBankId) {
      setSelectedBankId(banksData.data[0]._id.toString())
    }
  }, [banksData, selectedBankId])

  // Get selected bank details
  const selectedBank = banksData?.data?.find((bank) => bank._id.toString() === selectedBankId)

  return (
    <div className="bg-gray-50 min-h-screen pt-[120px] pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-800 to-teal-600 opacity-90 text-white px-6 py-4">
            <h1 className="text-xl font-semibold">Bank Transfer Information</h1>
          </div>

          {submitSuccess ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Verification Submitted!</h2>
              <p className="text-gray-600 mb-6 w-100 text-center">
                We've received your payment verification. Your access to the exam package will be activated once the
                payment is confirmed and then you can access it in your my exams pages. Wait 5 minutes please.
              </p>
              <p className="text-gray-600 mb-6">If your package is not released contact us : +251948952757</p>
              {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div> */}
            </div>
          ) : (
            <div className="p-6">
              {/* Two-column layout for desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left column: Purchase details and bank selection */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                      <FaMoneyBillWave className="mr-2 text-teal-600" />
                      Purchase Details
                    </h2>
                    <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Package:</span>
                        <span className="font-medium">{examTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount to Pay:</span>
                        <span className="font-medium text-teal-600">{price} ETB</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FaUniversity className="mr-2 text-teal-600" />
                      Select Bank Account
                    </h2>

                    {isBanksLoading ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-2"></div>
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {banksData?.data?.map((bank) => (
                          <div
                            key={bank._id}
                            onClick={() => handleBankChange(bank._id.toString())}
                            className={`border rounded-lg p-3 transition-all cursor-pointer hover:shadow-md ${
                              selectedBankId === bank._id.toString()
                                ? "border-teal-500 bg-teal-50 ring-2 ring-teal-200"
                                : "border-gray-200 hover:border-teal-200"
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <div className="w-12 h-12 mb-2 flex items-center justify-center">
                                <img
                                  src={bank.logo}
                                  alt={bank.bankName}
                                  className="max-w-full max-h-full object-contain"
                                />
                              </div>
                              <h3 className="font-medium text-gray-900 text-sm">{bank.bankName}</h3>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected Bank Details */}
                  {selectedBank && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                        <FaUniversity className="text-teal-600 mr-2" />
                        {selectedBank.bankName} Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Account Name:</span>
                          <span className="font-medium">{selectedBank.accountHolderName}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Account Number:</span>
                          <div className="flex items-center">
                            <span className="font-mono font-medium">{selectedBank.accountNumber}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                copyToClipboard(selectedBank.accountNumber, `account-${selectedBank._id}`)
                              }}
                              className="ml-2 text-teal-600 hover:text-teal-800"
                              title="Copy to clipboard"
                            >
                              {copied === `account-${selectedBank._id}` ? (
                                <FaCheck className="h-4 w-4" />
                              ) : (
                                <FaCopy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {selectedBank.branch && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Branch:</span>
                            <span>{selectedBank.branch}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right column: Payment verification form */}
                <div className="border-t pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FaReceipt className="mr-2 text-teal-600" />
                    Verify Your Payment
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter the transaction ID or reference number"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Screenshot</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
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
                                className="relative cursor-pointer text-teal-600 hover:text-teal-800"
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
                      <button
                        type="submit"
                        disabled={isSubmitting || !selectedBankId}
                        className={`px-6 py-2 ${
                          isSubmitting || !selectedBankId
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-teal-600 hover:bg-teal-700"
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BankInformation


export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">ExitExam</h2>
            <p className="text-gray-300">Prepare for your future with confidence</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="hover:text-blue-400">
              About Us
            </a>
            <a href="#" className="hover:text-blue-400">
              Contact
            </a>
            <a href="#" className="hover:text-blue-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} ExitExam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


import { Link } from "react-router-dom"
import ui from "../../../assets/exit-exam-ui.png"

export default function ExitExamHome() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-[#008080] py-16 sm:py-24 md:py-32 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-24">
          <div className="md:w-2/3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
              Prepare for your exit exams with confidence
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-3xl">
              Our platform helps students practice and prepare for their exit examinations with realistic questions and
              timed tests.
            </p>
            <div className="mt-6 sm:mt-8 md:mt-10">
              <Link
                to="/departments"
                className="inline-block bg-white text-gray-600 px-5 sm:px-8 py-2 sm:py-3 rounded-md font-medium text-base sm:text-lg hover:bg-gray-100 transition-colors"
              >
                Start Testing Yourself
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 md:text-4xl">
            How to Use the Exit Exam Platform
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Follow these simple steps to start practicing for your exit exams
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 text-[#008080] rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              1
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Select Your Department</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Choose your department from the dropdown menu to access subject-specific questions.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 text-[#008080] rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              2
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Generate Your Exam</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Set your preferences for the number of questions and time limit to generate a customized exam.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md sm:col-span-2 md:col-span-1 sm:mx-auto md:mx-0 sm:max-w-md md:max-w-none">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 text-[#008080] rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              3
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Take the Exam</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Answer the questions within the time limit, navigate between questions, and review your answers.
            </p>
          </div>
        </div>

        <div className="mt-10 sm:mt-16 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Exam Interface Guide</h3>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <img src={ui || "/placeholder.svg"} alt="Exam Interface Example" className="w-full rounded-md" />
            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
              <div>
                <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Question Navigation</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Use the numbered buttons on the right to jump to any question. Questions you've answered will be
                  highlighted.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Timer</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Keep track of your remaining time at the top of the screen. The exam will automatically submit when
                  time runs out.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Flag Questions</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Use the "Flag Question" button to mark questions you want to review later.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Navigation Buttons</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Use the "Previous" and "Next" buttons to move between questions sequentially.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#008080] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold">Ready to test your knowledge?</h2>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl">
            Start practicing now to improve your chances of success.
          </p>
          <div className="mt-4 sm:mt-8">
            <Link
              to="/departments"
              className="inline-block bg-white text-gray-600 px-5 sm:px-8 py-2 sm:py-3 rounded-md font-medium text-base sm:text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


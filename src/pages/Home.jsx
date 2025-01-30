import { Link } from 'react-router-dom';
import { FaStar, FaDownload, FaUsers, FaApple, FaGooglePlay, FaQuoteLeft } from 'react-icons/fa';
import app from "../assets/screenshot.png"


export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">Learn, Practice, Excel</h1>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8">Master your subjects with GibiInfo's comprehensive practice questions and detailed explanations.</p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
                <a href="#" className="flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
                  <FaApple className="text-2xl" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
                  <FaGooglePlay className="text-2xl" />
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://img.freepik.com/free-vector/online-learning-isometric-concept_1284-17947.jpg" 
                alt="Student learning"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">100K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600">Practice Questions</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm sm:col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose GibiInfo?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="https://img.freepik.com/free-vector/quiz-neon-sign_1262-19629.jpg" 
                alt="Practice Questions"
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Extensive Question Bank</h3>
              <p className="text-gray-600 text-sm sm:text-base">Access thousands of practice questions across various subjects.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="https://img.freepik.com/free-vector/explanation-concept-illustration_114360-2991.jpg" 
                alt="Detailed Explanations"
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Detailed Explanations</h3>
              <p className="text-gray-600 text-sm sm:text-base">Learn from comprehensive explanations for every question.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow sm:col-span-2 md:col-span-1">
              <img 
                src="https://img.freepik.com/free-vector/progress-overview-concept-illustration_114360-5650.jpg" 
                alt="Progress Tracking"
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm sm:text-base">Monitor your improvement with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="bg-gray-50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">App Screenshots</h2>
          <div className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide">
            {[1, 2, 3, 4,5,6,8].map((index) => (
              <div key={index} className="flex-none w-60 sm:w-72">
                <img
                  src={app}
                  alt={`App Screenshot ${index}`}
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "High School Student",
                image: "https://randomuser.me/api/portraits/women/1.jpg",
                content: "GibiInfo helped me improve my grades significantly. The practice questions are exactly what I needed!"
              },
              {
                name: "Michael Chen",
                role: "College Student",
                image: "https://randomuser.me/api/portraits/men/2.jpg",
                content: "The detailed explanations for each question helped me understand complex topics better."
              },
              {
                name: "Emily Brown",
                role: "Teacher",
                image: "https://randomuser.me/api/portraits/women/3.jpg",
                content: "I recommend GibiInfo to all my students. It's an excellent learning resource!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg relative">
                <div className="absolute top-0 left-0 transform -translate-y-1/2 translate-x-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <div className="pt-8">
                  <FaQuoteLeft className="text-primary/20 text-4xl absolute top-8 right-6" />
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-sm sm:text-base" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">{testimonial.content}</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Learning?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8">Download GibiInfo now and join thousands of successful students!</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#" className="flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
              <FaApple className="text-2xl" />
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </a>
            <a href="#" className="flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
              <FaGooglePlay className="text-2xl" />
              <div className="text-left">
                <div className="text-xs">GET IT ON</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
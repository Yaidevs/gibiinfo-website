import React, { useState } from "react";
import img1 from "./assets/image 5.png";
import img2 from "./assets/image 6.png";
import {
  FaLinkedin,
  FaFacebookSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { MdMenu } from "react-icons/md";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-[#008080] text-white fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-4xl font-bold">Gibi Info</h1>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white font-bold focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MdMenu size={30}/>
          </button>

          {/* Nav Links */}
          <nav
            className={`absolute lg:static bg-[#211D1A] lg:bg-transparent w-full lg:w-auto top-[60px] left-0 lg:flex ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <div className="lg:flex lg:space-x-6 text-center lg:text-left py-4 lg:py-0">
              <a href="#" className="block py-2 px-6 ">
                Home
              </a>
              <a href="#" className="block py-2 px-6 ">
                About Us
              </a>
              <a href="#" className="block py-2 px-6 ">
                Featured
              </a>
              <a href="#" className="block py-2 px-6 ">
                Testimonial
              </a>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex space-x-4">
            <button className="bg-transparent border border-white text-white px-4 py-2 rounded-md">
              Download
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#008080] py-32 min-h-screen pt-[160px]">
        <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 text-center lg:text-left">
          <div className="lg:w-1/2">
            <h1 className="text-3xl text-white sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              Learn, Practice and Excel
            </h1>
            <p className="text-white mt-4">
              Master your subjects with GibiInfo's comprehensive practice
              questions and detailed explanations.
            </p>
            <button className="mt-6 bg-white text-[#008080] px-6 py-3 rounded-md">
              Download
            </button>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
            <img
              src={img1}
              alt="Mobile UI 1"
              className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Below Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            Access thousands of practice questions
          </h2>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            across various subjects.
          </h2>
          <p className="text-gray-600 mt-4 break-words max-w-md mx-auto">
            Gibi Info is an that empower students to achieve academic excellence
            through innovative learning solutions.
          </p>
          <div className="mt-12 flex justify-center gap-16">
            <button className="bg-black text-white px-3 py-3 rounded-md">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />
            </button>
            <button className="bg-black text-white px-3 py-3 rounded-md">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />
            </button>
          </div>
          <div className="mt-16 flex justify-center">
            <img
              src={img2}
              alt="Profile Builder"
              className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#008080]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            Why Choose GibiInfo?
          </h2>
          <p className="text-gray-300 mt-4">
            Master your subjects with GibiInfo's comprehensive practice
            questions and detailed explanations.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Extensive Question Bank",
              "Detailed Explanations",
              "Progress Tracking",
              "Dark Mode Theme",
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-orange-500">{feature}</h3>
                <p className="text-gray-600 mt-2">
                  Access thousands of practice questions across various
                  subjects.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
          {/* Left - Image */}
          <div className="lg:w-1/2 relative">
            <img
              src="https://img.freepik.com/free-photo/front-view-young-male-student-wearing-black-mask-with-backpack-holding-files-using-his-phone-blue-background_140725-41202.jpg?uid=R120137908&ga=GA1.1.552436040.1735197856&semt=ais_hybrid"
              alt="Cameron Williamson"
              className="rounded-lg w-full max-w-sm lg:max-w-md"
            />
          </div>

          {/* Right - Testimonial Content */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-10">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-700 leading-tight">
              What do they think about our App?
            </h2>

            <p className="mt-4 text-gray-400 text-lg font-semibold">
              Caalaa Bulcha
            </p>
            <p className="text-gray-500">High school Student</p>

            {/* Testimonial Box */}
            <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md mt-6 max-w-lg">
              <p>
                GibiInfo helped me improve my grades significantly. The practice
                questions are exactly what I needed!
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-6 mt-6">
              <button className="bg-[#40A0A0] p-3 rounded text-white ">
                ◀
              </button>
              <button className="bg-[#40A0A0] p-3 rounded text-white ">
                ▶
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-start">
          {/* Left Section */}
          <div className="mb-6 lg:mb-0">
            <h2 className="text-xl font-bold">Gibi Info</h2>
            <p className="text-gray-400 mt-2">
              Over 8,912,000 Satisfied with our appearance
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="bg-white text-black p-2 rounded">
                <FaFacebookSquare />
              </a>
              <a href="#" className="bg-white text-black p-2 rounded">
                <FaInstagramSquare />
              </a>
              <a href="#" className="bg-white text-black p-2 rounded">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Middle Sections */}
          <div className="flex space-x-12">
            <div>
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="mt-2 space-y-1 text-gray-400">
                <li>
                  <a href="#">Knowledgebase</a>
                </li>
                <li>
                  <a href="#">Online Doc</a>
                </li>
                <li>
                  <a href="#">Redundant</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">About us</h3>
              <ul className="mt-2 space-y-1 text-gray-400">
                <li>
                  <a href="#">Knowledgebase</a>
                </li>
                <li>
                  <a href="#">Online Doc</a>
                </li>
                <li>
                  <a href="#">Redundant</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <h3 className="text-lg font-semibold">Subscribe to Newsletter</h3>
            <p className="text-gray-400 mt-2">
              What are you waiting for? Subscribe and follow our progress!
            </p>
            <div className="flex mt-4">
              <input
                type="email"
                placeholder="email@example.com"
                className="p-2 rounded-l bg-white text-black w-64"
              />
              <button className="bg-[#40A0A0] px-4 py-2 rounded-r text-white">
                Subscribe now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-gray-500 mt-8">
          &copy; Copyright 2025 <span>Gibi</span>
          <span>info</span>.com
        </div>
      </footer>
    </div>
  );
}

export default App;

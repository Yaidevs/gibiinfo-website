import React, { useState } from "react";
import img1 from "./assets/image 5.png";
import img2 from "./assets/image 6.png";

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
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
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
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#008080] py-32 min-h-screen pt-[160px]">
        <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 text-center lg:text-left">
          <div className="lg:w-1/2">
            <h1 className="text-3xl text-white sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              Learn, Practice, Excel
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
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            We shall never deny a guest, even the
          </h2>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            most ridiculous request
          </h2>
          <p className="text-gray-600 mt-4 break-words max-w-md mx-auto">
            KerjaRodi.com is an application for job seekers and workers who
            prioritize user comfort and the quality of services provided by our
            team.
          </p>
          <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-md">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />
            </button>
            <button className="bg-black text-white px-6 py-3 rounded-md">
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            We provide <span className="text-orange-500">excellent</span>{" "}
            features from us
          </h2>
          <p className="text-gray-600 mt-4">
            We shall never deny a guest, even the most ridiculous request. We
            provide excellent features from us.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Job Search", "Worker Search", "Message", "Dark Mode Theme"].map(
              (feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-bold text-orange-500">
                    {feature}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    KerjaRodi.com is an application for job seekers and workers
                    who prioritize user comfort and the quality of services.
                  </p>
                </div>
              )
            )}
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
            <h2 className="text-3xl lg:text-5xl font-bold text-black leading-tight">
              What do they think about our App?
            </h2>

            <p className="mt-4 text-gray-400 text-lg font-semibold">
              Cameron Williamson
            </p>
            <p className="text-gray-500">Founder Gojek Corp.</p>

            {/* Testimonial Box */}
            <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md mt-6 max-w-lg">
              <p>
                Kerjarodi.com is an application for job seekers and workers who
                prioritize user comfort and the quality of services provided by
                our team.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-3 mt-6">
              <button className="bg-orange-500 p-3 rounded text-white hover:bg-orange-600">
                ◀
              </button>
              <button className="bg-orange-500 p-3 rounded text-white hover:bg-orange-600">
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
            <h2 className="text-xl font-bold">
              <span className="text-orange-500">Kerja</span>
              <span className="text-blue-500">Rodi</span>.com
            </h2>
            <p className="text-gray-400 mt-2">
              Over 8,912,000 Satisfied with our appearance
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="bg-white text-black p-2 rounded">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="bg-white text-black p-2 rounded">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="bg-white text-black p-2 rounded">
                <i className="fab fa-linkedin"></i>
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
              <button className="bg-orange-500 px-4 py-2 rounded-r text-white">
                Subscribe now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-gray-500 mt-8">
          &copy; Copyright 2022 <span className="text-orange-500">Kerja</span>
          <span className="text-blue-500">Rodi</span>.com
        </div>
      </footer>
    </div>
  );
}

export default App;

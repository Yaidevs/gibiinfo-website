import React, { useState } from "react";
import img1 from "./assets/image 5.png";
import img2 from "./assets/image 6.png";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-[#008080] text-white">
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
              <a href="#home" className="block py-2 px-6 hover:text-orange-500">
                Home
              </a>
              <a
                href="#about"
                className="block py-2 px-6 hover:text-orange-500"
              >
                About Us
              </a>
              <a
                href="#features"
                className="block py-2 px-6 hover:text-orange-500"
              >
                Featured
              </a>
              <a
                href="#testimonials"
                className="block py-2 px-6 hover:text-orange-500"
              >
                Testimonial
              </a>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex space-x-4">
            <button className="bg-transparent border border-white text-white px-4 py-2 rounded-md">
              Sign In
            </button>
            {/* <button className="text-[#008080] px-4 py-2 rounded-md bg-white">
              Sign Up
            </button> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#008080] py-16">
        <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 text-center lg:text-left">
          <div className="lg:w-1/2">
            <h1 className="text-3xl text-white sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              Learn, Practice, Excel
            </h1>
            {/* <h2 className="text-3xl lg:text-5xl font-bold text-white">
              Easy to find a <span className="text-orange-500">Job</span> and{" "}
              <span className="text-blue-500">Worker</span> with Us
            </h2> */}
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
              className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto shadow-lg rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Below Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            We shall <span className="text-orange-500">never deny</span> a
            guest, even the{" "}
            <span className="text-blue-500">most ridiculous request</span>
          </h2>
          <p className="text-gray-600 mt-4">
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
              className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-lg shadow-lg"
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

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-lg font-bold">KerjaRodi.com</h2>
          <p className="text-gray-400 mt-2">
            Over 812,000 Satisfied with our appearance
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <a href="#" className="text-gray-400">
              Facebook
            </a>
            <a href="#" className="text-gray-400">
              Twitter
            </a>
            <a href="#" className="text-gray-400">
              Instagram
            </a>
          </div>
          <p className="text-gray-500 mt-4">
            © Copyright 2022 KerjaRodi.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

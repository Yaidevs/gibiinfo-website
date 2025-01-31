import React, { useEffect, useState } from "react";
import img1 from "./assets/image 5.png";
import img2 from "./assets/image 6.png";
import test1 from "./assets/image (3).png";
import test2 from "./assets/image (2).png";

import {
  FaLinkedin,
  FaFacebookSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { MdMenu } from "react-icons/md";
const testimonials = [
  {
    name: "Caalaa Bulcha",
    role: "High School Student",
    image: test1,
    quote:
      "GibiInfo helped me improve my grades significantly. The practice questions are exactly what I needed!",
  },
  {
    name: "Abebe B.",
    role: "College Student",
    image: test2,
    quote:
      "This app is a game changer! It made learning so much easier and fun. Highly recommend it to all students!",
  },
  {
    name: "Yonas D.",
    role: "University Graduate",
    image:
      "https://img.freepik.com/premium-photo/african-american-student-glasses-with-books_8119-2344.jpg?uid=R120137908&ga=GA1.1.552436040.1735197856&semt=ais_hybrid",
    quote:
      "Thanks to GibiInfo, I was able to pass my exams with flying colors! The detailed explanations were super helpful.",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-slide testimonials every 5 seconds with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setFade(false); // Start fade-out effect
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setFade(true); // Fade-in effect
    }, 300);
  };

  const prevTestimonial = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setFade(true);
    }, 300);
  };
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
            <MdMenu size={30} />
          </button>

          {/* Nav Links */}
          <nav
            className={`absolute lg:static bg-[#008080] lg:bg-transparent w-full lg:w-auto top-[60px] left-0 lg:flex ${
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
      {/* Hero Section */}
      <section className="bg-[#008080] py-32 pt-[160px]">
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
          <div className="lg:w-1/2 mt-8 lg:mt-0 flex flex-col items-center">
            <img
              src={img1}
              alt="Mobile UI 1"
              className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-lg"
            />

            {/* Embedded Frame - Visible on Small Screens, Hidden on Large Screens */}
            <iframe
              className="block lg:hidden w-full max-w-xs md:max-w-sm h-56 mt-24 rounded-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="How to Use the App"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
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
                <h3 className="text-lg font-bold text-[#40A0A0]">{feature}</h3>
                <p className="text-gray-600 mt-2">
                  Access thousands of practice questions across various
                  subjects.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 relative">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
          {/* Image Section */}
          <div className="lg:w-1/2 relative flex justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={testimonials[index].image}
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="rounded-lg w-full max-w-sm lg:max-w-md shadow-lg"
                initial={{ opacity: 0, scale: 0.9, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 50 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
          </div>

          {/* Testimonial Content */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-10">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-700 leading-tight">
              What Students Say About Our App?
            </h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <p className="mt-4 text-gray-400 text-lg font-semibold">
                  {testimonials[index].name}
                </p>
                <p className="text-gray-500">{testimonials[index].role}</p>

                <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md mt-6 max-w-lg mx-auto lg:mx-0">
                  <p>{testimonials[index].quote}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex space-x-6 mt-6 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="bg-[#40A0A0] p-3 rounded text-white shadow-md"
              >
                ◀
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="bg-[#40A0A0] p-3 rounded text-white shadow-md"
              >
                ▶
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left - Brand & Social Media */}
          <div>
            <h2 className="text-3xl font-bold text-[#40A0A0]">Gibi Info</h2>
            <p className="text-gray-400 mt-4">
              Over <span className="text-white font-semibold">2,000</span>{" "}
              satisfied users worldwide.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="bg-[#008080] text-white p-3 rounded-full hover:bg-[#40A0A0] hover:text-white transition"
              >
                <FaFacebookSquare size={20} />
              </a>
              <a
                href="#"
                className="bg-[#008080] text-white p-3 rounded-full hover:bg-[#40A0A0] hover:text-white transition"
              >
                <FaInstagramSquare size={20} />
              </a>
              <a
                href="#"
                className="bg-[#008080] text-white p-3 rounded-full hover:bg-[#40A0A0] hover:text-white transition"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Middle - Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-[#40A0A0]">
                Resources
              </h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    AI Powered
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    More Explanations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#40A0A0]">Company</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right - Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-[#40A0A0]">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 mt-2">
              Stay updated with the latest news and exclusive offers!
            </p>
            <div className="flex mt-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 w-2/3 rounded-l bg-gray-800 text-white outline-none border border-gray-700 focus:border-[#40A0A0] transition"
              />
              <button className="bg-[#40A0A0] px-6 py-3 rounded-r text-white hover:bg-[#2E7D7D] transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Gibi Info. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;

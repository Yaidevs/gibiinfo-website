import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import test1 from "../assets/image (3).png";
import test2 from "../assets/image (2).png";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";

function Testimonials() {
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

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => nextTestimonial(), 5000);
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
    <section className="bg-white py-16 relative">
      <div
        id="testimonial"
        className="container mx-auto px-6 flex flex-col items-center"
      >
        <h2 className="text-2xl lg:text-4xl p-2 font-bold text-gray-700 leading-tight mb-6">
          What Students Say About Our App?
        </h2>
        <div className="flex p-4 flex-col lg:flex-row items-center gap-10">
          {/* Image Section */}
          <div className="lg:w-1/2 relative flex justify-center mb-6 lg:mb-0">
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
          <div className="lg:w-1/2">
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
                <GrCaretPrevious />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="bg-[#40A0A0] p-3 rounded text-white shadow-md"
              >
                <GrCaretNext />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import test1 from "../assets/image (3).png";
import test2 from "../assets/image (2).png";


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
    setFade(false);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setFade(true);
    }, 300);
  };

  return (
    <section id="testimonials" className="bg-white py-16 relative">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
        <div className="lg:w-1/2 relative flex justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={testimonials[index].image}
              src={testimonials[index].image}
              className="rounded-lg w-full max-w-sm lg:max-w-md shadow-lg"
              initial={{ opacity: 0, scale: 0.9, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 50 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

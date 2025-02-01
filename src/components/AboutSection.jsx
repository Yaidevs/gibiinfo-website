import React from "react";
import img2 from "../assets/image 6.png";

const AboutSection = () => {
  return (
    <section className="bg-white py-16">
      <div id="aboutus" className="container mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
          Access thousands of practice questions across various subjects.
        </h2>
        <p className="text-gray-600 mt-4 break-words max-w-md mx-auto">
          Gibi Info empowers students to achieve academic excellence through innovative learning solutions.
        </p>
        <div className="mt-12 flex justify-center gap-16">
          <button className="bg-black text-white px-3 py-3 rounded-md">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
          </button>
        </div>
        <div className="mt-16 flex justify-center">
          <img src={img2} alt="Profile Builder" className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
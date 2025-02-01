import React from "react";
import img1 from "../assets/image 5.png";

const HeroSection = () => {
  return (
    <section id="hero" className="bg-[#008080] py-32 pt-[160px]">
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
  );
};

export default HeroSection;

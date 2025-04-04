import React from "react";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-[#008080]">
      <div id="featured" className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white">Why Choose GibiInfo?</h2>
        <p className="text-gray-300 mt-4">
          Master your subjects with GibiInfo's comprehensive practice questions and detailed explanations.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-[#40A0A0]">Extensive Question Bank</h3>
            <p className="text-gray-600 mt-2">
              Access thousands of practice questions across various subjects.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-[#40A0A0]">Detailed Explanations</h3>
            <p className="text-gray-600 mt-2">
              Get in-depth explanations for every question to enhance your understanding.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-[#40A0A0]">Progress Tracking</h3>
            <p className="text-gray-600 mt-2">
              Monitor your improvement and focus on areas that need more practice.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-[#40A0A0]">Dark Mode Theme</h3>
            <p className="text-gray-600 mt-2">
              Enjoy a comfortable studying experience with dark mode support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

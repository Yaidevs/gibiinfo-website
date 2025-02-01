import React from "react";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-[#008080]">
      <div id="features" className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white">Why Choose GibiInfo?</h2>
        <p className="text-gray-300 mt-4">
          Master your subjects with GibiInfo's comprehensive practice questions and detailed explanations.
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
                Access thousands of practice questions across various subjects.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
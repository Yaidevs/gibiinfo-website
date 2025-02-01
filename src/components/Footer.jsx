import React from "react";
import { FaLinkedin, FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-4xl font-semibold">Gibi Info</h3>
          <p className="text-gray-400 mt-4">
            Over <span className="text-white font-semibold">2,000</span> satisfied users worldwide.
          </p>
          <div className="flex space-x-4 mt-6">
            {[FaFacebookSquare, FaInstagramSquare, FaLinkedin].map((Icon, index) => (
              <a href="#" key={index} className="bg-[#008080] text-white p-3 rounded-full hover:bg-[#40A0A0] hover:text-white transition">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-[#40A0A0]">Resources</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              {["AI Powered", "More Explanations", "Support"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#40A0A0]">Company</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              {["About Us", "Features", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#40A0A0]">Subscribe to Our Newsletter</h3>
          <p className="text-gray-400 mt-2">Stay updated with the latest news and exclusive offers!</p>
          <div className="flex mt-6">
            <input type="email" placeholder="Enter your email" className="p-3 w-2/3 rounded-l bg-gray-800 text-white outline-none border border-gray-700 focus:border-[#40A0A0] transition" />
            <button className="bg-[#40A0A0] px-6 py-3 rounded-r text-white hover:bg-[#2E7D7D] transition">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Gibi Info. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
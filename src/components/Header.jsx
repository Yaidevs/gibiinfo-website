import React from "react";
import { MdMenu } from "react-icons/md";
import logo from '../assets/logo.png'

const Header = ({ menuOpen, setMenuOpen }) => {
  return (
    <header className="bg-[#008080] text-white fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="logo flex justify-center items-center">
          <img src={logo} className="w-20" alt="Gibi Info Logo" />
          <span className="inline text-4xl font-bold">Gibi Info</span>
        </div>
        <button
          className="lg:hidden text-white font-bold focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MdMenu size={30} />
        </button>
        <nav className={`absolute lg:static bg-[#008080] lg:bg-transparent w-full lg:w-auto top-[60px] left-0 lg:flex ${menuOpen ? "block" : "hidden"}`}>
          <div className="lg:flex lg:space-x-6 text-center lg:text-left py-4 lg:py-0">
            {["Home", "About Us", "Featured", "Testimonial"].map((item) => (
              <a href={`#${item.toLowerCase().replace(" ", "")}`} className="block py-2 px-6" key={item}>
                {item}
              </a>
            ))}
          </div>
        </nav>
        <div className="hidden lg:flex space-x-4">
          <button className="bg-transparent border border-white text-white px-4 py-2 rounded-md">Download</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
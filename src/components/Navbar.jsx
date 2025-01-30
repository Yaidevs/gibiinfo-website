import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">GibiInfo</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
              Contact
            </Link>
            <a href="#" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
              Download App
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
              Home
            </Link>
            <Link to="/about" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
              About Us
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
              Contact
            </Link>
            <a href="#" className="block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 text-center">
              Download App
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
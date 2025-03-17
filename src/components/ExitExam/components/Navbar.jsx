"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const departments = [
  { id: "accounting", name: "Accounting" },
  { id: "management", name: "Management" },
  { id: "marketing", name: "Marketing" },
  { id: "economics", name: "Economics" },
  { id: "finance", name: "Finance" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#008080] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold">ExitExam</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium "
                  >
                    Departments <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        {departments.map((dept) => (
                          <Link
                            key={dept.id}
                            to={`/departments/${dept.id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {dept.name}
                          </Link>
                        ))}
                        <Link
                          to="/departments"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium"
                          onClick={() => setDropdownOpen(false)}
                        >
                          View All Departments
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  to="/departments"
                  className="px-3 py-2 rounded-md text-sm font-medium "
                >
                  Test Yourself
                </Link>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white  focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white "
          >
            Departments
          </button>
          {dropdownOpen && (
            <div className="pl-4 space-y-1">
              {departments.map((dept) => (
                <Link
                  key={dept.id}
                  to={`/departments/${dept.id}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white "
                  onClick={() => {
                    setDropdownOpen(false);
                    setIsOpen(false);
                  }}
                >
                  {dept.name}
                </Link>
              ))}
              <Link
                to="/departments"
                className="block px-3 py-2 rounded-md text-base font-medium text-white "
                onClick={() => {
                  setDropdownOpen(false);
                  setIsOpen(false);
                }}
              >
                View All Departments
              </Link>
            </div>
          )}
          <Link
            to="/departments"
            className="block px-3 py-2 rounded-md text-base font-medium text-white "
            onClick={() => setIsOpen(false)}
          >
            Test Yourself
          </Link>
        </div>
      </div>
    </nav>
  );
}

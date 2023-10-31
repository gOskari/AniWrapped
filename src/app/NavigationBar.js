"use client";

import { useState } from "react";
import Link from "next/link";
import { FiHome, FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary-color md:h-screen md:w-20 flex flex-col justify-center">
      {/* Hamburger button for mobile */}
      <div className="bg-primary-color fixed bottom-4 right-4 z-20 p-4 md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={24} className="text-secondary-color hover:text-bg-color" />
        </button>
      </div>

      {/* Dropdown menu for mobile */}
      <div
        className={`bg-primary-color fixed bottom-16 right-4 p-4 flex flex-col justify-center shadow-lg transform origin-bottom transition-transform duration-100 ease-in-out overflow-y-hidden ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} md:hidden`}
      >
        {/* Container for menu items with consistent gap */}
        <div
          className="flex flex-col gap-4"
          style={{
            transition: "opacity 0.2s",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "all" : "none",
          }}
        >
          <Link
            href="/"
            className="text-2xl text-secondary-color hover:text-bg-color"
          >
            <FiHome size={24} />
          </Link>
          {/* You can add more menu items here */}
        </div>
      </div>

      {/* PC Navbar */}
      <div className="hidden md:flex flex-col items-center md:h-screen md:pt-10 md:w-20">
        <Link
          href="/"
          className="text-2xl text-secondary-color hover:text-bg-color"
        >
          <FiHome size={24} />
        </Link>
        {/* Add your other PC menu links here */}
      </div>
    </nav>
  );
};

export default Navbar;

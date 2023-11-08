"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiHome, FiMenu } from "react-icons/fi";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary-color md:h-screen md:w-20 flex flex-col justify-center">
      {/* Hamburger button for mobile */}
      <div className="bg-primary-color fixed bottom-4 right-4 z-20 p-4 md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FiMenu
            size={24}
            className="text-secondary-color hover:text-bg-color"
          />
        </button>
      </div>
      {/* Dropdown menu for mobile */}
      <div
        className={`bg-primary-color fixed bottom-16 right-4 p-4 flex flex-col justify-center shadow-lg transform origin-bottom`}
        style={{
          transition: "opacity 0.2s",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
        }}
      >
        {/* Container for menu items with consistent gap */}
        <div
          className="flex flex-col"
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
          <ThemeSwitch />
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
        {/* Theme switch */}
        <ThemeSwitch />
        {/* Add your other PC menu links here */}
      </div>
    </nav>
  );
};

export default Navbar;

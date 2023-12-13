"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiHome, FiMenu } from "react-icons/fi";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  //navi enemmä integroituna siihe bodyy

  return (
    <nav className="flex flex-col justify-center md:h-screen md:w-20">
      {/* Hamburger button for mobile */}
      <div className="z-50 align-center fixed bottom-16 right-6 flex h-16 w-16 items-center rounded-lg bg-bg-color shadow-lg md:hidden">
        <button
          className="flex h-20 w-20 items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiMenu
            size={34}
            className="text-secondary-color hover:text-bg-color"
          />
        </button>
      </div>
      {/* Dropdown menu for mobile */}
      <div
        className={`fixed  bottom-32 right-6 flex origin-bottom transform flex-col justify-center bg-bg-color rounded-lg shadow-lg`}
        style={{
          transition: "opacity 0.2s",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
        }}
      >
        {/* Container for menu items with consistent gap */}
        <div
          className="flex w-16 flex-col items-center justify-center gap-2 bg-bg-secondary rounded-lg pb-3 pt-3"
          style={{
            transition: "opacity 0.2s",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "all" : "none",
          }}
        >
          <Link
            href="/"
            className="tb-4 flex items-center justify-center text-2xl text-secondary-color hover:text-bg-color"
          >
            <FiHome size={34} />
          </Link>
          <div className="flex items-center justify-center text-2xl text-secondary-color hover:text-bg-color">
            <ThemeSwitch size={34} />
          </div>
        </div>
      </div>

      {/* PC Navbar */}
      <div className="hidden flex-col items-center md:flex md:h-screen md:w-20 md:pt-10">
        <Link
          href="/"
          className="text-2xl text-secondary-color hover:text-bg-color"
        >
          <FiHome size={24} />
        </Link>
        {/* Theme switch */}
        <div className="text-2xl text-secondary-color hover:text-bg-color">
          <ThemeSwitch size={24} />
        </div>
        {/* Add your other PC menu links here */}
      </div>
    </nav>
  );
};

export default Navbar;

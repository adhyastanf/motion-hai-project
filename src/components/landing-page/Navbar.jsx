"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import profilepic from "../assets/profilepic.png";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Portofolio", path: "/portofolio" },
  { title: "Contact Us", path: "/contact-us" },
];

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);
  const closeNav = () => setNavOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 25 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 25 } },
  };

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#4D6499] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo using profile picture */}
        <Link href="/" className="flex items-center">
          <Image
            src={profilepic}
            alt="Logo"
            width={50} // Adjust the width as needed
            height={50} // Adjust the height as needed
            className="rounded-full" // Adjust styling if needed
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10 text-white/80">
          {navLinks.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className="relative group hover:text-white transition-colors"
            >
              {link.title}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#B55527] rounded transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Icon */}
        <div
          className="md:hidden p-2 border border-white/60 text-white/80 rounded z-50"
          onClick={toggleNav}
        >
          {navOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </div>

        {/* Mobile Nav */}
        <motion.div
          initial={false}
          animate={navOpen ? "open" : "closed"}
          variants={menuVariants}
          className="md:hidden fixed top-0 left-0 w-full h-full bg-[#172233] flex flex-col items-center justify-center space-y-8 text-white text-2xl font-semibold z-40"
        >
          {navLinks.map((link, index) => (
            <Link href={link.path} key={index} onClick={closeNav}>
              {link.title}
            </Link>
          ))}
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;

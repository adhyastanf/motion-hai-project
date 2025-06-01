"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import profilepic from "../assets/profilepic.png";
import footerlogo from "../assets/footer.png";

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
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 25 } },
    closed: { opacity: 0, x: "-100%", transition: { type: "spring", stiffness: 25 } },
  };

  return (
    <header
      className={`w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "md:bg-black/10 md:backdrop-blur-md md:shadow-lg" : "md:bg-transparent"
      } ${navOpen ? "relative" : "md:fixed"}`} // Static on mobile
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={profilepic}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
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
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-3/4 bg-[#3B495C] rounded origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-1/2 bg-[#CAD5E0] rounded origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleNav}
          className="md:hidden p-2 border border-white/60 text-white/80 rounded z-50"
          aria-label="Toggle Navigation"
        >
          {navOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <motion.div
          initial={false}
          animate={navOpen ? "open" : "closed"}
          variants={menuVariants}
          className={`md:hidden fixed top-0 left-0 w-full h-full 
            bg-white/10 backdrop-blur-xl 
            flex flex-col items-center justify-center space-y-10 
            text-white text-xl font-semibold z-40 px-6`}
        >
          {/* Corner Logo */}
          <div className="absolute top-4 left-4">
            <Image
              src={footerlogo}
              alt="Footer Logo"
              width={40}
              height={40}
              className="rounded"
            />
          </div>

          {/* Nav Links */}
          {navLinks.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              onClick={closeNav}
              className="hover:text-[#B55527] transition duration-200"
            >
              {link.title}
            </Link>
          ))}
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;

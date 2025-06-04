"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { motion, AnimatePresence } from "framer-motion"

// Import your images (adjust path if needed)
import nblogo from "../assets/nblogo.png"


const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Portfolio", path: "/portofolio" },
  { title: "Contact Us", path: "/contact-us" },
]

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleNav = () => setNavOpen(!navOpen)
  const closeNav = () => setNavOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [navOpen])

  // Slide in from right animation for mobile menu
  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      <header
        className={`w-full top-0 z-50 transition-all duration-300 
          ${scrolled ? "bg-black/10 backdrop-blur-md shadow-lg" : "bg-transparent"} 
          fixed
        `}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={nblogo}
              alt="Logo"
              width={100}
              height={50}
              className=""
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-10 text-white/80">
            {navLinks.map((link, index) => (
              <Link href={link.path} key={index} className="relative group hover:text-white transition-colors">
                {link.title}
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-3/4 bg-[#3B495C] rounded origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                <span className="absolute left-0 -bottom-1 h-[2px] w-1/2 bg-[#CAD5E0] rounded origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleNav}
            className="md:hidden p-2 border border-white/60 text-white/80 rounded z-[60] relative"
            aria-label="Toggle Navigation"
          >
            {navOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {navOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="md:hidden fixed inset-0 bg-black/30 z-[55]" // lowered opacity here
              onClick={closeNav}
            />

            {/* Menu Panel */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden fixed top-0 right-0 w-full h-full 
                bg-white/10 backdrop-blur-xl  // lowered opacity here
                flex flex-col items-center justify-center space-y-10 
                text-white-800 text-xl font-semibold z-[56] px-6"
            >

              {/* Close Button */}
              <button
                onClick={closeNav}
                className="absolute top-4 right-4 p-2 text-white-800 hover:text-gray-600 transition-colors"
                aria-label="Close Navigation"
              >
                <AiOutlineClose size={24} />
              </button>

              {/* Nav Links */}
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 + 0.2 },
                  }}
                >
                  <Link
                    href={link.path}
                    onClick={closeNav}
                    className="hover:text-[#B55527] transition duration-200 block py-2"
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

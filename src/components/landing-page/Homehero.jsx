"use client";
import React from "react";
import { motion } from "framer-motion";

const Homehero = () => {
  const scrollToAbouthome = () => {
    const aboutSection = document.getElementById("abouthome");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* YouTube video background */}
      <div className="absolute inset-0 z-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none
                     sm:w-[120vw] sm:h-[120vh] sm:-translate-x-[10vw] sm:-translate-y-[10vh] sm:scale-110"
          src="https://www.youtube.com/embed/cDSnrS4SeuE?autoplay=1&mute=1&loop=1&controls=0&playlist=cDSnrS4SeuE&modestbranding=1&showinfo=0&rel=0"
          title="Background Video"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

      {/* Foreground content */}
      <div className="relative z-20 flex items-center justify-center h-full text-white text-center px-4 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mt-12 md:mt-0 w-full max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Welcome to Hai Motion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl"
          >
            Luxury Experiences, Redefined
          </motion.p>
        </div>
      </div>

      {/* Scroll Down Button */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center justify-center">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
          {/* Rotating circular text */}
          <svg
            viewBox="0 0 100 100"
            className="absolute w-full h-full animate-spin-slow"
          >
            <defs>
              <path
                id="circlePath"
                d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
              />
            </defs>
            <text fill="#ffffff" fontSize="12" fontWeight="bold">
              <textPath href="#circlePath">
                SCROLL DOWN • SCROLL DOWN •
              </textPath>
            </text>
          </svg>

          {/* Center arrow button */}
          <button
            onClick={scrollToAbouthome}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#7098C0] flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <div className="w-3 h-3 border-b-2 border-r-2 border-[#603111] rotate-45"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Homehero;

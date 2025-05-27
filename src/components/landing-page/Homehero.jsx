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
          className="absolute top-0 left-0 w-[120vw] h-[120vh] -translate-x-[10vw] -translate-y-[10vh] scale-110 pointer-events-none object-cover"
          src="https://www.youtube.com/embed/cDSnrS4SeuE?autoplay=1&mute=1&loop=1&controls=0&playlist=cDSnrS4SeuE&modestbranding=1&showinfo=0&rel=0"
          title="Background Video"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

      {/* Foreground content */}
      <div className="relative z-20 flex items-center justify-center h-full text-white text-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Welcome to Hai Motion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-lg md:text-xl"
          >
            Luxury Experiences, Redefined
          </motion.p>
        </div>
      </div>

      {/* Scroll Down Button (Circular with rotating text) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Rotating circular text */}
          <svg
            viewBox="0 0 100 100"
            className="absolute w-full h-full"
            style={{
              animation: "spinText 10s linear infinite",
            }}
          >
            <defs>
              <path
                id="circlePath"
                d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
              />
            </defs>
            <text fill="#ffffff" fontSize="13" fontWeight="bold">
              <textPath href="#circlePath">
                SCROLL DOWN • SCROLL DOWN •
              </textPath>
            </text>
          </svg>

          {/* Center orange button */}
          <button
            onClick={scrollToAbouthome}
            className="w-12 h-12 rounded-full bg-[#7098C0] flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <div className="w-3 h-3 border-b-2 border-r-2 border-[#603111] rotate-45"></div>
          </button>
        </div>
      </div>

      {/* Inline animation keyframes */}
      <style jsx>{`
        @keyframes spinText {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Homehero;

"use client";
import React from "react";
import { motion } from "framer-motion";

const Homehero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* YouTube video background */}
      <div className="absolute inset-0 z-0">
        <iframe
          className="w-full h-full pointer-events-none"
          src="https://www.youtube.com/embed/cDSnrS4SeuE?autoplay=1&mute=1&loop=1&controls=0&playlist=cDSnrS4SeuE&modestbranding=1&showinfo=0&rel=0"
          title="Background Video"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

      {/* Foreground content with animation */}
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
    </section>
  );
};

export default Homehero;
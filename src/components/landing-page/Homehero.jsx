"use client";
import React from "react";

const Homehero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* YouTube video background */}
      <div className="absolute inset-0 z-0">
        <iframe
          className="w-full h-full pointer-events-none"
          src="https://www.youtube.com/embed/cDSnrS4SeuE?autoplay=1&mute=1&loop=1&controls=0&playlist=cDSnrS4SeuE&modestbranding=1&showinfo=0&rel=0"
          title="Background Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />

      {/* Foreground content */}
      <div className="relative z-20 flex items-center justify-center h-full text-white text-center px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to Hai Motion</h1>
          <p className="mt-4 text-lg md:text-xl">Luxury Experiences, Redefined</p>
        </div>
      </div>
    </section>
  );
};

export default Homehero;

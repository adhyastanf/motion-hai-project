"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import footer from "../assets/footer.png"; // Adjust path if needed
import aboutLogo from "../assets/aboutlogo.webp"; // Correct logo path

const Abouthome = () => {
  return (
    <div className="relative bg-gradient-to-r from-[#7098C0] via-black to-[#603111] py-24 px-8 overflow-hidden"
    id="abouthome"
    >

    {/* Gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-t from-transparent to-black pointer-events-none"></div>

      {/* Background Decorative Icons */}
      <div className="absolute top-32 left-10 w-44 h-44 opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image src={footer} alt="Background Icon" fill className="object-contain blur-sm" />
      </div>
      <div className="absolute bottom-10 right-10 w-40 h-40 opacity-10 animate-spin-slower pointer-events-none z-0 scale-x-[-1] scale-y-[-1]">
        <Image src={footer} alt="Background Icon" fill className="object-contain blur-sm" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-7xl pt-60 pb-44 mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-6xl font-bold text-[#B55527] mb-6">
            About <span className="text-[#ccc]">Us</span>
          </h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-xl">
            We’re a group of passionate young people photographers,videographers,
            designers, editors and programmer working together to create beautiful master pieces
          </p>
        </motion.div>

        {/* Right Logo Image */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={aboutLogo}
            alt="Skata Logo"
            width={400}
            height={200}
            className="object-contain w-full max-w-sm drop-shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Abouthome;

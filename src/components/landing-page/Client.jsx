"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import footer from "../assets/footer.png"; // Adjust path as needed

import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaJsSquare,
  FaApple,
  FaGoogle,
  FaAmazon,
  FaMicrosoft,
} from "react-icons/fa";

const clientLogos = [
  { icon: FaApple, label: "Apple", hoverTextColor: "group-hover:text-[#a2aaad]" },
  { icon: FaGoogle, label: "Google", hoverTextColor: "group-hover:text-[#4285F4]" },
  { icon: FaAmazon, label: "Amazon", hoverTextColor: "group-hover:text-[#ff9900]" },
  { icon: FaMicrosoft, label: "Microsoft", hoverTextColor: "group-hover:text-[#00a4ef]" },
];

const techStack = [
  { icon: FaHtml5, label: "HTML", hoverTextColor: "group-hover:text-[#e34c26]" },
  { icon: FaCss3Alt, label: "CSS", hoverTextColor: "group-hover:text-[#264de4]" },
  { icon: FaReact, label: "React", hoverTextColor: "group-hover:text-[#61dafb]" },
  { icon: FaJsSquare, label: "JavaScript", hoverTextColor: "group-hover:text-[#f0db4f]" },
];

const Client = () => {
  return (
    <div className="bg-gradient-to-r from-[#7098C0] via-black to-[#603111] pb-32 text-white relative overflow-hidden">
      
      {/* Spinning Background Icons, similar to About */}
      <div className="absolute top-[100px] left-[20px] w-[200px] h-[200px] opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm"
        />
      </div>
      <div className="absolute bottom-[100px] right-[20px] w-[200px] h-[200px] opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm scale-x-[-1] scale-y-[-1]"
        />
      </div>

      <div className="w-[400px] md:min-w-[1100px] mx-auto p-8 text-center z-10">

        {/* OUR CLIENT SECTION */}
        <motion.h2
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl font-bold mb-8 relative z-10"
        >
          Our <span className="text-[#B55527]">Client</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 pt-8 gap-6 mb-20 relative z-10">
          {clientLogos.map((client, index) => {
            const Icon = client.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 75 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0 }}
                whileHover={{ scale: 1.05 }}
                className="group h-[160px] w-[160px] md:h-[220px] md:w-[220px] flex flex-col justify-between 
                  items-center bg-white/10 p-4 rounded-xl cursor-pointer 
                  transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                <div className={`transition-colors duration-300 ${client.hoverTextColor}`}>
                  <Icon size={140} />
                </div>
                <p className="mt-2">{client.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* IN ASSOCIATE WITH SECTION */}
        <motion.h2
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl font-bold mb-8 relative z-10"
        >
          In <span className="text-[#7098C0]">Associate </span>with
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 pt-8 gap-6 relative z-10">
          {techStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 75 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0 }}
                whileHover={{ scale: 1.05 }}
                className="group h-[160px] w-[160px] md:h-[220px] md:w-[220px] flex flex-col justify-between 
                  items-center bg-white/10 p-4 rounded-xl cursor-pointer 
                  transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                <div className={`transition-colors duration-300 ${tech.hoverTextColor}`}>
                  <Icon size={140} />
                </div>
                <p className="mt-2">{tech.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Black overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black pointer-events-none z-10"></div>
    </div>
  );
};

export default Client;

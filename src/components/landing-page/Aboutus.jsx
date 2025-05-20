"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import photo1 from "../assets/photo1.webp";
import photo2 from "../assets/photo2.webp";
import photo3 from "../assets/photo3.webp";
import photo4 from "../assets/photo4.webp";

const About = () => {
  const router = useRouter();

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-0" id="about">

      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-center mt-12"
      >
        <h1 className="text-white text-6xl w-[900px] mx-auto font-semibold p-4 mb-8">
          YOUR <span className="text-orange-400">EXCELLENCE</span> IS OUR TOP{" "}
          <span className="text-orange-400">PRIORITY</span>
        </h1>
      </motion.div>

      {/* 2x2 Photo Collage with custom fade-in order */}
      <div className="grid grid-cols-2 gap-1 w-full max-w-[900px] mx-auto mb-12">
        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full aspect-square"
        >
          <Image src={photo1} alt="Collage 1" className="w-full h-full object-cover" />
        </motion.div>

        {/* Top Right */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full aspect-square"
        >
          <Image src={photo2} alt="Collage 2" className="w-full h-full object-cover" />
        </motion.div>

        {/* Bottom Left */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full aspect-square"
        >
          <Image src={photo3} alt="Collage 3" className="w-full h-full object-cover" />
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full aspect-square"
        >
          <Image src={photo4} alt="Collage 4" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* What We Do Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-40 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-white"
        >
          <h1 className="text-5xl font-bold mb-4">WHAT WE DO ?</h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Hai Motion is a Production House based in Jakarta-Tangerang, Indonesia. 
            Our vision is to deliver more than expected in producing high-quality contents, 
            we focus on attention to details.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {[
            { label: "DESIGN", percent: 85 },
            { label: "BRANDING", percent: 60 },
            { label: "ADVERTISING", percent: 67 },
            { label: "COPYWRITING", percent: 93 },
          ].map((item) => (
            <div key={item.label} className="text-white">
              <div className="flex justify-between mb-1">
                <span className="font-semibold">{item.label}</span>
                <span className="font-semibold">{item.percent}%</span>
              </div>
              <div className="w-full bg-white/20 h-1 rounded">
                <div
                  className="bg-orange-400 h-1 rounded"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Click for More Button (Optional) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex justify-center mt-8"
      >
        {/* You can add a button here if needed */}
      </motion.div>
    </div>
  );
};

export default About;

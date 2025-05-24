"use client";
import Image from "next/image";
import { motion } from "framer-motion";

import img1 from "../assets/halodoc.png";       // plant
import img2 from "../assets/lolica.png";        // bottle
import img3 from "../assets/pemkotambon.png";   // laptop
import img4 from "../assets/momfest.png";       // phone standing

const projects = [
  { title: "Plant", src: img1 },
  { title: "Bottle", src: img2 },
  { title: "Laptop", src: img3 },
  { title: "Phone Standing", src: img4 },
];

const Portfolio = () => {
  return (
    <div
      className="text-white bg-gradient-to-r from-[#7098C0] via-black to-[#603111] relative overflow-hidden py-12"
      id="portfolio"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-center"
      >
        <h1 className="text-white text-6xl w-[320px] mx-auto font-semibold my-12">
          Selected <span className="text-orange-400">Projects</span>
        </h1>
      </motion.div>

      {/* Custom Grid Layout with 4 Images */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 grid-rows-2 gap-4 auto-rows-[200px]">
        {/* Image 1: Top-left */}
        <motion.div
          className="col-span-1 row-span-1 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0 }}
        >
          <Image src={projects[0].src} alt={projects[0].title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Image 2: Top-middle */}
        <motion.div
          className="col-span-1 row-span-1 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Image src={projects[1].src} alt={projects[1].title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Image 4: Tall phone image */}
        <motion.div
          className="col-span-1 row-span-2 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image src={projects[3].src} alt={projects[3].title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Image 3: Laptop - bottom row spanning 2 cols */}
        <motion.div
          className="col-span-2 row-span-1 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Image src={projects[2].src} alt={projects[2].title} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import halodoc from "../assets/halodoc.png";
import lolica from "../assets/lolica.png";
import momfest from "../assets/momfest.png";
import pemkotambon from "../assets/pemkotambon.png";
import sharp from "../assets/sharp.png";
import sms from "../assets/sms.jpg";

const projects = [
  { title: "Halodoc Project", src: halodoc },
  { title: "Lolica Project", src: lolica },
  { title: "Mom Fest Project", src: momfest },
  { title: "Pemkot Ambon Project", src: pemkotambon },
  { title: "Sharp Project", src: sharp },
  { title: "SMS Project", src: sms },
];

const Portfolio = () => {
  const router = useRouter();

  return (
    <div
      className="text-white bg-gradient-to-r from-[#7098C0] via-black to-[#603111]  relative overflow-hidden"
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

      {/* Grid Images */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="rounded-lg overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Image
              src={project.src}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex justify-center mt-16"
      >
        <button
          onClick={() => router.push("/portofolio")}
          className="bg-orange-600 text-white px-6 py-3 text-xl rounded-lg font-semibold hover:bg-orange-500 hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Click for More
        </button>
      </motion.div>
    </div>
  );
};

export default Portfolio;

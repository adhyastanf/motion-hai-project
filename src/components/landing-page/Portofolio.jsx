"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import halodoc from "../assets/halodoc.png";
import lolica from "../assets/lolica.png";
import momfest from "../assets/momfest.png";
import sharp from "../assets/sharp.png";
import footer from "../assets/footer.png"; // Spinning background icon

const projects = [
  { title: "Plant Style", src: halodoc },
  { title: "Bottle Style", src: lolica },
  { title: "Laptop Style", src: momfest },
  { title: "Phone Style", src: sharp },
];

const Portfolio = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/portofolio");
  };

  return (
    <div
      className="text-white bg-gradient-to-r from-[#7098C0] via-black to-[#603111] pb-12 relative overflow-hidden"
      id="portfolio"
    >
      {/* Spinning Background Icons */}
      <div className="absolute top-24 left-10 w-44 h-44 opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm"
        />
      </div>
      <div className="absolute bottom-10 right-10 w-40 h-40 opacity-10 animate-spin-slower pointer-events-none z-0 scale-x-[-1] scale-y-[-1]">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm"
        />
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl md:text-6xl font-semibold text-center mt-8 px-4 relative z-10"
      >
        Our <span className="text-[#B55527]">Portofolio</span>
      </motion.h1>

      {/* Responsive Grid */}
      <div
        className="max-w-6xl mx-auto px-4 mt-12 grid gap-4
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-5
        auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px] relative z-10"
      >
        {projects.map((project, index) => {
          const isFirst = index === 0;
          const isLast = index === 3;
          const colSpan = isFirst || isLast ? "lg:col-span-2" : "lg:col-span-3";

          return (
            <motion.div
              key={index}
              className={`${colSpan} lg:row-span-1 overflow-hidden shadow-md cursor-pointer`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={handleRedirect}
            >
              <Image
                src={project.src}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex justify-center mt-16 px-4 relative z-10"
      >
        <button
          onClick={handleRedirect}
          className="bg-[#B55527] text-white px-6 py-3 text-lg sm:text-xl rounded-lg font-semibold hover:bg-[#a96334] transform transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Click for More
        </button>
      </motion.div>
    </div>
  );
};

export default Portfolio;

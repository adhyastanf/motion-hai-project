"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import halodoc from "../assets/halodoc.png";
import lolica from "../assets/lolica.png";
import momfest from "../assets/momfest.png";
import pemkotambon from "../assets/pemkotambon.png";
import sharp from "../assets/sharp.png";
import sms from "../assets/sms.jpg";
import { useState } from "react";

const projects = [
  {
    title: "Halodoc Project",
    src: halodoc,
    description: "A modern, responsive design showcasing creative UI.",
  },
  {
    title: "Lolica Project",
    src: lolica,
    description: "A product landing page focused on accessibility and speed.",
  },
  {
    title: "Mom Fest Project",
    src: momfest,
    description: "An interactive portfolio with smooth animations.",
  },
  {
    title: "Pemkot Ambon Project",
    src: pemkotambon,
    description: "An interactive portfolio with smooth animations.",
  },
  {
    title: "Sharp Project",
    src: sharp,
    description: "An interactive portfolio with smooth animations.",
  },
  {
    title: "Summarecon Serpong Project",
    src: sms,
    description: "An interactive portfolio with smooth animations.",
  },
];

const Portfoliopage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div
      className="text-white bg-gradient-to-b from-black via-[#381a5f] to-black py-18"
      id="portfolio"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-center"
      >
        <h1 className="text-white text-6xl w-[320px] mx-auto font-semibold my-12">
          Motion <span className="text-orange-400">Projects</span>
        </h1>
      </motion.div>

      {/* Projects */}
      <div className="px-6 md:px-0 max-w-[1000px] mx-auto mt-40 space-y-36">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center gap-12`}
          >
            {/* Project Title */}
            <div
              className={`text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] w-full md:w-1/2 text-center ${
                index % 2 === 1 ? "md:text-right" : "md:text- left"
              }`}
            >
              {project.title}
            </div>

            {/* Project Image */}
            <div
              className="cursor-pointer w-full md:w-1/2 flex justify-center"
              onClick={() => setSelectedProject(project)}
            >
              <Image
                src={project.src}
                alt={project.title}
                className="h-[350px] w-[500px] object-cover border rounded border-gray-700 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 flex bg-black/70 justify-center items-center z-50"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#1a1a1a] p-8 rounded-2xl max-w-5xl w-[90%] max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white text-3xl font-semibold mb-4 text-center">
              {selectedProject.title}
            </h2>
            <Image
              src={selectedProject.src}
              alt={selectedProject.title}
              className="w-full h-[500px] object-contain rounded-lg"
            />
            <p className="text-gray-300 mt-6 text-lg text-center">
              {selectedProject.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfoliopage;

"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Images
import halodoc from "../assets/halodoc.png";
import lolica from "../assets/lolica.png";
import momfest from "../assets/momfest.png";
import pemkotambon from "../assets/pemkotambon.png";
import footer from "../assets/footer.png"; // Spinning icon import

// Card Data with titles split into two lines manually
const cards = [
  {
    title: "Social Media\nManagement",
    description:
      "We help manage and grow your brand’s online presence across platforms with tailored content and strategic posting.",
    img: halodoc,
  },
  {
    title: "Video\nProduction",
    description:
      "From scripting to editing, we produce cinematic and impactful videos tailored to your vision and brand identity.",
    img: lolica,
  },
  {
    title: "Motion\nGraphics",
    description:
      "We create engaging animations and explainer videos that bring your ideas to life with dynamic visuals.",
    img: momfest,
  },
  {
    title: "Event\nCoverage",
    description:
      "Capture every important moment of your events with our full coverage services—from candid shots to highlights.",
    img: pemkotambon,
  },
];

const About = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div
      className="bg-gradient-to-r from-[#7098C0] via-black to-[#603111] pb-12 text-white relative overflow-hidden"
      id="about"
    >
      {/* Spinning Background Icons */}
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

      {/* TOP GRADIENT OVERLAY */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-t from-transparent to-black pointer-events-none"></div>

      {/* Section Title */}
      <motion.h1
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-6xl font-semibold text-center mt-8 pt-16 pb-20"
      >
        What We <span className="text-orange-400">Do</span>
      </motion.h1>

      {/* Grid and Lines */}
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Cross Divider */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30 z-0"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/30 z-0"></div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="cursor-pointer"
              onClick={() => setSelectedCard(card)}
            >
              {/* Left column: title above, right-aligned */}
              {index % 2 === 0 && (
                <div className="pb-2 px-2 text-xl md:text-2xl font-bold whitespace-pre-line text-white text-right text-glow">
                  {card.title}
                </div>
              )}

              <div className="w-full h-[300px] relative">
                <Image
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right column: title below, left-aligned */}
              {index % 2 !== 0 && (
                <div className="pt-2 px-2 text-xl md:text-2xl font-bold whitespace-pre-line text-white text-left text-glow">
                  {card.title}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-[#1a1a1a] p-8 rounded-2xl max-w-3xl w-[90%] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl text-white font-semibold text-center mb-6 whitespace-pre-line">
              {selectedCard.title}
            </h2>
            <Image
              src={selectedCard.img}
              alt={selectedCard.title}
              className="w-full h-[300px] object-cover rounded-lg border border-gray-700 mb-6"
            />
            <p className="text-gray-300 text-lg text-center">
              {selectedCard.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;

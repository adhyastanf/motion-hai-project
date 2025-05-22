"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import book from "../assets/book.png";
import pc from "../assets/pc.png";
import card from "../assets/card.png";
import screw from "../assets/icon1.png";
import lighting from "../assets/icon2.png"

const About = () => {
  const router = useRouter();

  const cards = [
    {
      img: book,
      title: "Event & Birthdays",
      text:
        "We capture and record important memories on your truly special day—let us know if there's a special moment on it, and we’ll make it beautiful to remember.",
      delay: 0.3,
    },
    {
      img: screw,
      title: "Creative Services",
      text:
        "We offer strategic communications created by creativity and in thoughtful ways. We will work with you to reach your audiences and brand story across digital, videos, photos and many more.",
      delay: 0.4,
    },
    {
      img: card,
      title: "Wedding & Pre-Wed",
      text:
        "We experienced and have been involved a lot on wedding days, we understand your needs yet we follow your suggestion. Once in a lifetime, surely we’ll be giving our best for your most special day.",
      delay: 0.5,
    },
    {
      img: lighting,
      title: "Live Stream",
      text:
        "Need a team to help make your brand/event/product streaming live in front of clients? We are here willing to help you organize it all.",
      delay: 0.6,
    },
    {
      img: pc,
      title: "Photo Product",
      text:
        "Extra effort in creating such a promising product? We’re here to do it for you, taking photos or videos, we are in!",
      delay: 0.7,
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-0" id="about">
      
      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-center mt-12"
      >
        <h1 className="text-white text-6xl w-[320px] mx-auto font-semibold p-4 mb-8">
          About <span className="text-orange-400">Us</span>
        </h1>
      </motion.div>

      {/* Single-column long cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {cards.map(({ img, title, text, delay }, idx) => {
          const reverseIcon = idx % 2 === 1; // if you want to keep icon placement logic, but might want to simplify for grid
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 75 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay }}
              className="max-w-[450px] min-h-[420px] relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-purple-700 to-orange-800 opacity-20 animate-gradient-xy" />
              <div className="flex flex-col items-center">
                {/* Icon on top */}
                <div className="mb-6">
                  <Image src={img} alt={title} className="h-[130px] w-auto" />
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-white text-left mb-4">{title}</h2>

                {/* Text */}
                <p className="text-lg text-white">{text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Click for More Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex justify-center mt-8 mb-16"
      >
        <button
          onClick={() => router.push("/about")}
          className="bg-orange-600 text-white px-6 py-3 text-xl rounded-lg font-semibold
                    hover:bg-orange-500 hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Click for More
        </button>
      </motion.div>
    </div>
  );
};

export default About;

"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import book from "../assets/book.png";
import pc from "../assets/pc.png";
import card from "../assets/card.png";
import finance from "../assets/finance.png";

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
      img: pc,
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
      img: finance,
      title: "Live Stream",
      text:
        "Need a team to help make your brand/event/product streaming live in front of clients? We are here willing to help you organize it all.",
      delay: 0.6,
    },
    {
      img: book,
      title: "Photo Product",
      text:
        "Extra effort in creating such a promising product? We’re here to do it for you, taking photos or videos, we are in!",
      delay: 0.7,
    },
  ];

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
        <h1 className="text-white text-6xl w-[320px] mx-auto font-semibold p-4 mb-8">
          About <span className="text-orange-400">Us</span>
        </h1>
      </motion.div>

      {/* Single-column long cards */}
      <div className="flex flex-col gap-6 items-center">
        {cards.map(({ img, title, text, delay }, idx) => {
          const reverseIcon = idx % 2 === 1; // place icon on right for 2nd & 4th card
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 75 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay }}
              className="w-full max-w-[900px] relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-purple-700 to-orange-800 opacity-20 animate-gradient-xy" />
              <div className="flex items-center p-6">
                {!reverseIcon && (
                  <div className="flex-shrink-0">
                    <Image src={img} alt={title} className="h-[130px] w-auto" />
                  </div>
                )}

                <div className={`flex-grow ${!reverseIcon ? "ml-6" : ""}`}>
                  <h2 className="text-2xl font-bold text-white">
                    {title}
                  </h2>
                  <p className="text-lg text-white mt-2">{text}</p>
                </div>

                {reverseIcon && (
                  <div className="flex-shrink-0 ml-6">
                    <Image src={img} alt={title} className="h-[130px] w-auto" />
                  </div>
                )}
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

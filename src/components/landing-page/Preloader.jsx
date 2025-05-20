"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import profilepic from "../assets/profilepic.png";

const brandName = "Hai Motion";
const fullText = "Lorem ipsum dolor sit amet.";

const Preloader = ({ onFinish }) => {
  const [visibleWords, setVisibleWords] = useState([]);
  const [finished, setFinished] = useState(false);

  const words = fullText.trim().split(" ");

  useEffect(() => {
    if (visibleWords.length < words.length) {
      const timer = setTimeout(() => {
        setVisibleWords((prev) => [...prev, words[prev.length]]);
      }, 300); // Typing speed
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setFinished(true);
        onFinish();
      }, 2000); // Delay before ending preloader
      return () => clearTimeout(timer);
    }
  }, [visibleWords, words, onFinish]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          className="fixed inset-0 bg-[#7098C0] z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1 }}
        >
          {/* Word-by-word typing animation */}
          <div className="text-white text-xl md:text-2xl font-light max-w-2xl px-8 text-center mb-6 min-h-[3rem] flex flex-wrap justify-center">
            {visibleWords.map((word, index) => (
              <motion.span
                key={index}
                className="mr-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Logo and brand */}
          <motion.div
            className="bg-[#40608d] rounded-md flex items-center justify-center overflow-hidden"
            initial={{ width: 150, height: 150 }}
            animate={{
              width: 500,
              height: 150,
              transition: { delay: 0.3, duration: 1 },
            }}
          >
            <motion.div
              className="flex items-center gap-4 pl-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <Image
                src={profilepic}
                alt="Hai Motion Logo"
                width={64}
                height={64}
                className="object-contain"
              />
              <motion.h1
                className="text-white text-3xl font-bold tracking-wide whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7, duration: 0.8 }}
              >
                {brandName}
              </motion.h1>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import profilepic from "../assets/profilepic.png";
import footer from "../assets/footer.png";
import { usePreloader } from "../context/PreloaderContext";

const brandName = "Hai Motion";
const fullText = "Lorem ipsum dolor sit amet.";

const Preloader = () => {
  const [visibleWords, setVisibleWords] = useState([]);
  const { showPreloader, finishPreloader } = usePreloader();
  const words = fullText.trim().split(" ");

  const controls = useAnimation();
  const boxControls = useAnimation();
  const currentIndexRef = useRef(0);
  const intervalRef = useRef(null);

  const revealWords = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      currentIndexRef.current++;
      setVisibleWords(words.slice(0, currentIndexRef.current));

      if (currentIndexRef.current >= words.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        // Wait 3 seconds then finish preloader
        setTimeout(() => finishPreloader(), 3000);

        // Trigger box widen animation once text done
        boxControls.start("widen");
      }
    }, 300);
  };

  const pauseReveal = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!showPreloader) return;

    currentIndexRef.current = visibleWords.length || 0;
    controls.start("visible");

    if (currentIndexRef.current < words.length) {
      revealWords();
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseReveal();
        controls.stop();
      } else {
        controls.start("visible");
        if (currentIndexRef.current < words.length) {
          revealWords();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      pauseReveal();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [showPreloader, words, finishPreloader, controls]);

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Box animation variants with widened state
  const boxVariants = {
    initial: { width: 150, height: 150 },
    widen: {
      width: 600,
      height: 150,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.8 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { delay: 1.7, duration: 0.8 } },
  };

  // Reduced spinner icons positions
  const spinnerPositions = [
    { top: "15%", left: "15%", size: 100, duration: 40 },
    { top: "75%", left: "20%", size: 110, duration: 50 },
    { top: "30%", left: "80%", size: 90, duration: 45 },
  ];

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial="hidden"
          animate={controls}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1 }}
          variants={{ hidden: {}, visible: {} }}
          style={{
            background: `linear-gradient(
              135deg,
              rgba(112, 152, 192, 0.6),
              rgba(0, 0, 0, 0.85),
              rgba(96, 49, 17, 0.8)
            )`,
          }}
        >
          {/* Background */}
          <div className="absolute inset-0 z-0 bg-black/25">
            {/* Center spinner */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
              style={{ width: 250, height: 250 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              <Image
                src={footer}
                alt="Center spinning background icon"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Reduced number of spinning icons */}
            {spinnerPositions.map(({ top, left, size, duration }, i) => (
              <motion.div
                key={i}
                className="absolute opacity-10"
                style={{
                  top,
                  left,
                  width: size,
                  height: size,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration, ease: "linear" }}
              >
                <Image
                  src={footer}
                  alt={`Spinning icon background ${i}`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            ))}
          </div>

          {/* Main content */}
          <motion.div className="relative z-10 flex flex-col items-center justify-center px-8">
            <div className="text-white text-xl md:text-2xl font-light max-w-2xl text-center mb-6 min-h-[3rem] flex flex-wrap justify-center items-center gap-x-2 gap-y-2">
              {visibleWords.map((word, index) => (
                <motion.span
                  key={index}
                  className="mr-2"
                  variants={wordVariants}
                  initial="hidden"
                  animate={controls}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="rounded-md overflow-hidden shadow-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #40608d, #b55527)" }}
              variants={boxVariants}
              initial="initial"
              animate={boxControls}
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-2"
                variants={contentVariants}
                initial="hidden"
                animate={controls}
              >
                <Image
                  src={profilepic}
                  alt="Hai Motion Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
                <motion.h1
                  className="text-white text-3xl font-bold tracking-wide text-center"
                  variants={titleVariants}
                  initial="hidden"
                  animate={controls}
                >
                  {brandName}
                </motion.h1>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import profilepic from "../assets/profilepic.png";
import footer from "../assets/footer.png";
import { usePreloader } from "../context/PreloaderContext";

const brandName = "Hai Motion";
const fullText = "Create With Purpose";

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
      setVisibleWords(words.slice(0, currentIndexRef.current + 1));
      currentIndexRef.current++;

      if (currentIndexRef.current >= words.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        // Wait and then finish preloader
        setTimeout(() => finishPreloader(), 3000);
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
  }, [showPreloader]);

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const boxVariants = {
    initial: { width: 150, height: 150 },
    widen: {
      width: "50%",
      transition: { duration: 2, ease: "easeInOut" },
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
          {/* Background icons */}
          <div className="absolute inset-0 z-0 bg-black/25">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
              style={{ width: 250, height: 250 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              <Image
                src={footer}
                alt="Center spinning icon"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

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
                  alt={`Spinning icon ${i}`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            ))}
          </div>

          {/* Foreground content */}
          <motion.div className="relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
            <div className="text-white text-xl sm:text-3xl md:text-4xl font-light text-center mb-6 flex flex-wrap justify-center gap-2 min-h-[3rem]">
              {visibleWords.map((word, index) => (
                <motion.span
                  key={word + index}
                  className={`${
                    ["Create", "Purpose"].includes(word)
                      ? "font-bold"
                      : "font-light"
                  }`}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="rounded-md overflow-hidden shadow-lg flex items-center justify-center h-[150px] w-[200px] sm:w-[280px] md:w-[320px] lg:w-[360px] transition-all duration-700"
              style={{
                background: "linear-gradient(135deg, #40608d, #b55527)",
              }}
              variants={boxVariants}
              initial="initial"
              animate={boxControls}
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-2 px-4"
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
                  className="text-white text-2xl sm:text-3xl md:text-3xl font-bold tracking-wide text-center"
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

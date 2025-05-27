"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsHeadphones, BsBook } from "react-icons/bs";
import Image from "next/image";
import footer from "../assets/footer.png"; // Adjust path if needed

const questions = [
  "What is Nuron? How does it work?",
  "How can I get the customer support?",
  "Can I get update regularly and for how long do I get updates?",
  "Can I change any Elements as I like?",
  "Can I build a complete project with this template?",
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const leftColRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (leftColRef.current) {
        setCardHeight(leftColRef.current.clientHeight);
      }
    }, 100); // Wait for layout to settle

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#7098C0] via-black to-[#603111] py-32 text-white relative overflow-hidden">
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

      {/* Main Title */}
      <motion.h1
        className="text-6xl font-bold text-center text-[#603111] mb-16 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        F<span className="text-white">a</span>
        <span className="text-[#7098C0]">q</span>
      </motion.h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 relative z-10">
        {/* Left Side - FAQs */}
        <div ref={leftColRef} className="col-span-2 flex flex-col gap-4">
          <h2 className="text-4xl font-bold mb-4">
            Have a <span className="text-[#7098C0]">Question?</span>
          </h2>
          {questions.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer p-6 rounded-xl border backdrop-blur-sm bg-white/10 border-white/20 shadow-md transition-all ${
                activeIndex === index ? "border-white/40" : "hover:bg-white/5"
              }`}
            >
              <h3 className="text-lg font-semibold text-white">{q}</h3>
              {activeIndex === index && (
                <p className="mt-2 text-sm text-white/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  euismod, nisl vel tincidunt lacinia, nunc est gravida justo.
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Right Side - Two Stacked Cards */}
        <div className="flex flex-col gap-6" style={{ height: cardHeight || "auto" }}>
          {/* Card 1: Online Documentation */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md text-white flex flex-col justify-between"
            style={{
              height: cardHeight ? cardHeight / 2 - 12 : "auto",
              boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)",
            }}
          >
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2 text-[#7098C0]">
                <BsBook className="text-[#7098C0]" />
                Online Documentation
              </h3>
              <p className="text-base text-white/70 mt-2">Well organized and up to date</p>
            </div>
            <Link
              href="/about"
              className="w-[175px] px-4 py-2 text-sm font-medium bg-[#7098C0] hover:bg-[#5a7fa6] rounded transition"
            >
              Online Documentation
            </Link>
          </motion.div>

          {/* Card 2: Dedicated Support */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md text-white flex flex-col justify-between"
            style={{
              height: cardHeight ? cardHeight / 2 - 12 : "auto",
              boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)",
            }}
          >
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2 text-[#B55527]">
                <BsHeadphones className="text-[#B55527]" />
                Dedicated Support
              </h3>
              <p className="text-base text-white/70 mt-2">
                Need support? Submit a ticket. We’ll be happy to assist you.
              </p>
            </div>
            <div>
              <Link
                href="/contact-us"
                className="mt-4 px-4 py-2 text-sm font-medium bg-[#B55527] hover:bg-[#9e461f] rounded transition"
              >
                Get Support
              </Link>
              <p className="text-sm text-white/50 mt-2 leading-relaxed">
                Support Time: Monday – Friday
                <br />
                Response Time: Maximum 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Faq;

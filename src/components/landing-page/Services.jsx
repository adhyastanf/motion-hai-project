"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFilm,
  FaClipboard,
  FaCamera,
  FaGlasses,
  FaUser,
  FaClock,
  FaSync,
  FaMicrophone,
  FaLightbulb,
  FaUsers,
} from "react-icons/fa";
import Image from "next/image";
import footer from "../assets/footer.png"; // adjust path if necessary

const videoPackages = [
  {
    title: "VIDEO PRODUCT",
    subtitle: "Rate Card Video Production",
    price: "8JT",
    features: [
      { text: "Story Line", icon: <FaFilm /> },
      { text: "Story Board", icon: <FaClipboard /> },
      { text: "Sony A7S", icon: <FaCamera /> },
      { text: "Lensa", icon: <FaGlasses /> },
      { text: "1 Videographer", icon: <FaUser /> },
      { text: "7 hrs Shooting", icon: <FaClock /> },
      { text: "Revisi Offline 1x", icon: <FaSync /> },
      { text: "Revisi Online 1x", icon: <FaSync /> },
    ],
  },
  {
    title: "DOCUMENTATION",
    subtitle: "Rate Card Video Production",
    price: "11JT",
    features: [
      { text: "Story Line", icon: <FaFilm /> },
      { text: "Story Board", icon: <FaClipboard /> },
      { text: "Sony A7S", icon: <FaCamera /> },
      { text: "Lensa", icon: <FaGlasses /> },
      { text: "1 Videographer", icon: <FaUser /> },
      { text: "1 Soundman", icon: <FaMicrophone /> },
      { text: "7 hrs Shooting", icon: <FaClock /> },
      { text: "Revisi Offline 2x", icon: <FaSync /> },
      { text: "Revisi Online 1x", icon: <FaSync /> },
    ],
  },
  {
    title: "SOCIAL MEDIA VIDEO",
    subtitle: "Rate Card Video Production",
    price: "13JT",
    features: [
      { text: "Story Line", icon: <FaFilm /> },
      { text: "Story Board", icon: <FaClipboard /> },
      { text: "Lumix S1H", icon: <FaCamera /> },
      { text: "Lensa", icon: <FaGlasses /> },
      { text: "AS Easy Rig", icon: <FaCamera /> },
      { text: "1 Videographer", icon: <FaUser /> },
      { text: "1 Lightman", icon: <FaLightbulb /> },
      { text: "1 Soundman", icon: <FaMicrophone /> },
      { text: "10 hrs Shooting", icon: <FaClock /> },
    ],
  },
  {
    title: "DIGITAL COMMERCIAL",
    subtitle: "Rate Card Video Production",
    price: "15JT",
    note: "Start From",
    features: [
      { text: "Story Line", icon: <FaFilm /> },
      { text: "Story Board", icon: <FaClipboard /> },
      { text: "Lumix S1H", icon: <FaCamera /> },
      { text: "Sony A7S", icon: <FaCamera /> },
      { text: "Lensa", icon: <FaGlasses /> },
      { text: "AS Easy Rig", icon: <FaCamera /> },
      { text: "2 Videographer", icon: <FaUsers /> },
      { text: "1 Lightman", icon: <FaLightbulb /> },
      { text: "1 Soundman", icon: <FaMicrophone /> },
    ],
  },
];

const Services = () => {
  return (
    <div className="text-white bg-gradient-to-r from-[#7098C0] via-black to-[#603111] pt-12 pb-12 relative overflow-hidden">
      {/* Spinning Background Icons */}
      <div className="absolute top-[100px] left-[20px] w-[150px] h-[150px] opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm"
        />
      </div>
      <div className="absolute bottom-[100px] right-[20px] w-[150px] h-[150px] opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm scale-x-[-1] scale-y-[-1]"
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl md:text-6xl font-bold mb-16"
        >
          Our <span className="text-[#7098C0]">Pricing</span>
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {videoPackages.map((pkg, index) => {
            const bgColor =
              index % 2 === 0 ? "bg-[#7098C0]/20" : "bg-[#603111]/20";
            const titleColor = index % 2 === 0 ? "#7098C0" : "#B55527";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className={`${bgColor} backdrop-blur-xl rounded-2xl shadow-xl p-6 flex flex-col justify-between border border-white/20`}
              >
                <div className="text-center mb-4">
                  <h3
                    className="text-xl font-bold uppercase"
                    style={{ color: titleColor }}
                  >
                    {pkg.title}
                  </h3>
                  <p className="text-sm text-gray-200">{pkg.subtitle}</p>
                </div>

                <div className="text-center text-white mb-6">
                  <span className="text-xl">Rp.</span>{" "}
                  <span className="text-5xl font-bold">{pkg.price}</span>
                  {pkg.note && (
                    <div className="text-sm mt-2 text-gray-300">{pkg.note}</div>
                  )}
                </div>

                <ul className="space-y-4">
                  {pkg.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-100"
                    >
                      <span className="text-lg text-orange-400">
                        {feature.icon}
                      </span>
                      <p className="text-base">{feature.text}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center text-white border border-white/20"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            INTERESTED TO WORK AND COOPERATE WITH US?
          </h2>
          <Link href="/contact-us">
            <button className="bg-orange-400 hover:bg-orange-500 transition px-6 py-3 rounded-lg text-lg font-semibold mt-2">
              Contact Us
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;

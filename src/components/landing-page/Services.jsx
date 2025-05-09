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

const videoPackages = [
  {
    title: "VIDEO PRODUCT",
    subtitle: "Rate Card Video Production",
    price: "Rp. 8JT",
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
    price: "Rp. 11JT",
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
    price: "Rp. 13JT",
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
    price: "Rp. 15JT",
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
    <div className="text-white bg-gradient-to-b from-black via-[#381a5f] to-black py-32">
      <div className="max-w-[1700px] mx-auto px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-12"
        >
          <p className="text-white text-6xl w-[320px] mx-auto font-semibold p-4 mb-4">
            Our <span className="text-orange-400">Services</span>
          </p>
        </motion.h1>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 justify-center">
          {videoPackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 75 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              className="bg-[#f3f4f6] text-black rounded-xl overflow-hidden shadow-lg flex flex-col justify-between mb-8 w-full max-w-[450px]"
              style={{ minHeight: "700px", maxWidth: "500px" }}
            >
              {/* Title */}
              <div className="bg-[#ff7b00] text-white p-6 text-center">
                <h3 className="text-xl font-bold uppercase">{pkg.title}</h3>
                <p className="text-base mt-1">{pkg.subtitle}</p>
              </div>

              {/* Pricing */}
              <div className="bg-[#e5e7eb] text-[#1f2937] text-center p-6">
                <span className="text-xl font-medium">Rp.</span>{" "}
                <span className="text-5xl font-extrabold align-middle">
                  {pkg.price.replace("Rp. ", "")}
                </span>
                {pkg.note && (
                  <div className="text-sm mt-2 text-gray-500">{pkg.note}</div>
                )}
              </div>

              {/* Features */}
              <div className="px-8 pb-8 flex-grow bg-[#e5e7eb]">
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="py-1">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-[#1f2937] text-lg">
                          {feature.icon}
                        </span>
                        <p className="text-[#1f2937] text-base">{feature.text}</p>
                      </div>
                      {i < pkg.features.length - 1 && (
                        <hr className="mt-3 border-gray-300 w-full" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-16 bg-white text-black rounded-lg p-8 flex flex-col md:flex-row items-center md:justify-between"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
            INTERESTED TO WORK AND COOPERATE WITH US? CONTACT US!
          </h1>
          <Link href="/contact-us" passHref>
            <button className="bg-orange-400 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-orange-500 transition-all">
              Contact Us
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;

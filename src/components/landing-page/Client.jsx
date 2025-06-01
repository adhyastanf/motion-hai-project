"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import footer from "../assets/footer.png";

// Association images
import Cukonghood from "../assets/CukongHood.png";
import Societee from "../assets/SocieTee.png";

// Client images
import BBKSDA from "../assets/BBKSDA.png";
import BO from "../assets/BO.png";
import CP from "../assets/CP.png";
import CU from "../assets/CU.png";
import FC from "../assets/FC.png";
import GNC from "../assets/GNC.png";
import GA from "../assets/GA.png";
import HLOGO from "../assets/HLOGO.png";
import HH from "../assets/HH.png";
import LLOGO from "../assets/LLOGO.png";
import MO from "../assets/MO.png";
import MF from "../assets/MF.png";
import MOM from "../assets/MOM.png";
import MP from "../assets/MP.png";
import NCCG from "../assets/NCCG.png";
import PNC from "../assets/PNC.png";
import PAN from "../assets/PAN.png";
import PKA from "../assets/PKA.png";
import PCE from "../assets/PCE.png";
import PP from "../assets/PP.png";
import SHO from "../assets/SHO.png";
import SHA from "../assets/SHA.png";
import SMS from "../assets/SMS.png";
import TNGHS from "../assets/TNGHS.png";
import TWAGP from "../assets/TWAGP.png";
import TWAP from "../assets/TWAP.png";
import TT from "../assets/TT.png";
import TR from "../assets/TR.png";

const Client = () => {
  return (
    <div className="bg-gradient-to-r from-[#7098C0] via-black to-[#603111] pb-32 text-white relative overflow-hidden">
      {/* Spinning Background Icons */}
      <div className="absolute top-[50px] left-[100px] w-[250px] h-[250px] opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image src={footer} alt="Spinning Icon" fill className="object-contain blur-sm" />
      </div>
      <div className="absolute top-[500px] right-[20px] w-[200px] h-[200px] opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image src={footer} alt="Spinning Icon" fill className="object-contain blur-sm" />
      </div>
      <div className="absolute bottom-[600px] left-[20px] w-[200px] h-[200px] opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm scale-x-[-1] scale-y-[-1]"
        />
      </div>
      <div className="absolute bottom-[100px] right-[20px] w-[300px] h-[300px] opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm scale-x-[-1] scale-y-[-1]"
        />
      </div>

      <div className="w-full max-w-[1300px] mx-auto px-4 md:px-8 text-center z-10">


        {/* ASSOCIATION SECTION */}
        <motion.h2
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold mb-8 relative z-10"
        >
          In <span className="text-[#7098C0]">Associate </span>with
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6 pt-8 relative z-10">
          {[Cukonghood, Societee].map((imgSrc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 75 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-white/20 bg-white/10"
              style={{ width: "180px", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Image
                src={imgSrc}
                alt={`Association ${index + 1}`}
                width={120}
                height={120}
                className="object-contain transition-all duration-300 filter grayscale group-hover:grayscale-0"
              />
            </motion.div>
          ))}
        </div>

        {/* CLIENT LOGOS SECTION */}
        <motion.h2
          initial={{ opacity: 0, y: 75 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold mb-8 mt-20 relative z-10"
        >
          Our <span className="text-[#B55527]">Clients</span>
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6 pt-8 relative z-10">
          {[
            BBKSDA, BO, CP, CU, FC, GNC, GA, HLOGO, HH, LLOGO, MO, MF, MOM, MP,
            NCCG, PNC, PAN, PKA, PCE, PP, SHO, SHA, SMS, TNGHS, TWAGP, TWAP, TT, TR
          ].map((imgSrc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 75 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.02 * index }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-white/20 bg-white/10"
              style={{ width: "180px", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Image
                src={imgSrc}
                alt={`Client ${index + 1}`}
                width={120}
                height={120}
                className="object-contain transition-all duration-300 filter grayscale group-hover:grayscale-0"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Black overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black pointer-events-none z-10"></div>
    </div>
  );
};

export default Client;

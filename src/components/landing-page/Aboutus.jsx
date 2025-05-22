"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card } from "@/components/ui/card";

import Autoplay from "embla-carousel-autoplay";

import messi from "../assets/messi.png";
import ronaldo from "../assets/ronaldo.png";

const images = [
  {
    src: messi,
    alt: "Lionel Messi",
    caption:
      "Lionel Messi is an Argentine professional footballer widely regarded as one of the greatest players of all time.",
  },
  {
    src: ronaldo,
    alt: "Cristiano Ronaldo",
    caption:
      "Cristiano Ronaldo is a Portuguese professional footballer known for his athleticism, leadership.",
  },
];

const Aboutus = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #91A5BB, #CAD5E0, #000000)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "3rem 1rem",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-center max-w-[900px] text-white text-6xl font-semibold p-12 -mt-16 -mb-4"
      >
        YOUR <span className="text-[#4D6499]">EXCELLENCE</span> IS OUR TOP{" "}
        <span className="text-[#4D6499]">PRIORITY</span>
      </motion.h1>

      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
          }),
        ]}
        className="relative w-full max-w-[900px] mb-8 rounded-xl"
        // You can add onSlideChange to sync current if supported
      >
        <CarouselContent>
          {images.map(({ src, alt, caption }, index) => (
            <CarouselItem
              key={alt}
              className="flex justify-center relative"
              aria-hidden={current !== index}
            >
              <Card className="w-full mx-12 rounded-xl overflow-hidden bg-transparent shadow-none border-none relative">
                {/* Background big text */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-0 w-full -translate-y-1/2
                             text-6xl md:text-8xl font-extrabold text-white uppercase
                             opacity-30 pointer-events-none whitespace-pre-line text-center
                             leading-tight select-none border-none"
                  style={{
                    userSelect: "none",
                    whiteSpace: "pre-line",
                    wordBreak: "break-word",
                  }}
                >
                  {alt.split(" ").join("\n")}
                </span>

                <div className="flex justify-center items-center w-full h-[400px] md:h-[550px] relative z-10">
                  <Image
                    src={src}
                    alt={alt}
                    width={500}
                    height={500}
                    className="object-contain mx-auto"
                    priority
                  />
                </div>

                <div className="text-white text-center mt-4 relative z-10">
                  <h2 className="text-4xl md:text-6xl font-extrabold">{alt}</h2>
                  <p className="text-lg max-w-[600px] mx-auto mt-2 text-white/90">
                    {caption}
                  </p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-black bg-opacity-70 text-black rounded-full w-12 h-12 flex items-center justify-center
            hover:bg-opacity-90 hover:scale-110 hover:shadow-lg hover:shadow-white/50 hover:text-black transition duration-300 z-30 cursor-pointer select-none border-none"
          aria-label="Previous"
        >
          <ChevronLeft className="w-40 h-40" />
        </CarouselPrevious>

        <CarouselNext
          className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-black bg-opacity-70 text-black rounded-full w-12 h-12 flex items-center justify-center
            hover:bg-opacity-90 hover:scale-110 hover:shadow-lg hover:shadow-white/50 hover:text-black transition duration-300 z-30 cursor-pointer select-none border-none"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </CarouselNext>
      </Carousel>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-[900px] mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-md"
        style={{ boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">WHAT WE DO ?</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Hai Motion is a Production House based in Jakarta-Tangerang,
              Indonesia. Our vision is to deliver more than expected in
              producing high-quality contents, we focus on attention to details.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { label: "DESIGN", percent: 85 },
              { label: "BRANDING", percent: 60 },
              { label: "ADVERTISING", percent: 67 },
              { label: "COPYWRITING", percent: 93 },
            ].map((item) => (
              <div key={item.label} className="text-white">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">{item.label}</span>
                  <span className="font-semibold">{item.percent}%</span>
                </div>
                <div
                  className="w-full bg-white/30 h-4 rounded-full overflow-hidden"
                  style={{
                    boxShadow: "inset 0 0 8px rgba(255,255,255,0.3)",
                  }}
                >
                  <div
                    className="bg-black h-4 rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Aboutus;

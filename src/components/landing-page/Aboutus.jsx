"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { Card } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import messi from "../assets/messi.png";
import ronaldo from "../assets/ronaldo.png";
import footer from "../assets/footer.png";

const teamMembers = [
  {
    name: "Georgio Gabriel",
    role: "Chief Executive Officer",
    images: [messi, ronaldo],
  },
  {
    name: "Dimar Abiyya",
    role: "Chief Technology Officer",
    images: [messi, ronaldo],
  },
  {
    name: "Meliada Dina",
    role: "Social Media Specialist",
    images: [messi, ronaldo],
  },
  {
    name: "Bellanty Virginia",
    role: "Personal Assistant",
    images: [messi, ronaldo],
  },
  {
    name: "Eroz Kamal",
    role: "Graphic Designer",
    images: [messi, ronaldo],
  },
];

const Aboutus = () => {
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Spinners */}
      <div className="absolute top-[250px] left-[120px] w-[200px] h-[200px] opacity-10 animate-[spin_20s_linear_infinite] z-0 pointer-events-none">
        <Image
          src={footer}
          alt="Top Left Spinner"
          fill
          className="object-contain blur-sm"
        />
      </div>

      <div className="absolute bottom-[200px] right-[80px] w-[350px] h-[350px] opacity-10 animate-[spin_20s_linear_infinite] z-0 pointer-events-none">
        <Image
          src={footer}
          alt="Bottom Right Spinner"
          fill
          className="object-contain blur-sm scale-x-[-1] scale-y-[-1]"
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-center max-w-[900px] text-white text-6xl font-semibold p-12 -mt-16 -mb-18"
      >
        MEET OUR <span className="text-[#4D6499]">TEAM</span> OF{" "}
        <span className="text-[#4D6499]">EXCELLENCE</span>
      </motion.h1>

      {/* Custom 2-3 Layout */}
      <div className="flex flex-col items-center gap-10 z-10 w-full">
        {/* First row - 2 cards */}
        <div className="flex justify-center gap-8 flex-wrap">
          {teamMembers.slice(0, 2).map(({ name, role, images }) => (
            <motion.div
              key={name}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="w-[420px] rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-md">
                <Carousel
                  plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
                  className="w-full"
                >
                  <CarouselContent>
                    {images.map((imgSrc, idx) => (
                      <CarouselItem key={idx} className="flex justify-center">
                        <Image
                          src={imgSrc}
                          alt={`${name} photo ${idx + 1}`}
                          width={250}
                          height={250}
                          className="object-contain rounded-lg my-4"
                          priority
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="text-white text-center mt-6 relative z-10 px-4 pb-8">
                  <h2 className="text-4xl font-extrabold">{name}</h2>
                  <p className="text-lg mt-2 text-white/90">{role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Second row - 3 cards */}
        <div className="flex justify-center gap-8 flex-wrap">
          {teamMembers.slice(2).map(({ name, role, images }) => (
            <motion.div
              key={name}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="w-[420px] rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-md">
                <Carousel
                  plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
                  className="w-full"
                >
                  <CarouselContent>
                    {images.map((imgSrc, idx) => (
                      <CarouselItem key={idx} className="flex justify-center">
                        <Image
                          src={imgSrc}
                          alt={`${name} photo ${idx + 1}`}
                          width={250}
                          height={250}
                          className="object-contain rounded-lg my-4"
                          priority
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="text-white text-center mt-6 relative z-10 px-4 pb-8">
                  <h2 className="text-4xl font-extrabold">{name}</h2>
                  <p className="text-lg mt-2 text-white/90">{role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* What We Do Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-[900px] mx-auto mt-16 p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-md"
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
                <div className="w-full bg-white/30 h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-black h-4 rounded-full"
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

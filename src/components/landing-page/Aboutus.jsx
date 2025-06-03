"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { Card } from "@/components/ui/card";
import messi from "../assets/messi.png";
import ronaldo from "../assets/ronaldo.png";
import footer from "../assets/footer.png";

const teamMembers = [
  {
    name: "Gabriel Georgio",
    role: "Chief Executive Officer (CEO)",
    description: "Pemimpin utama yang mengarahkan visi, strategi, dan ekspansi perusahaan.",
    images: [messi, ronaldo],
  },
  {
    name: "Michael Anugerah",
    role: "Chief Legal & Compliance Officer (CLO)",
    description: "Mengawasi seluruh aspek legalitas dan kepatuhan operasional perusahaan.",
    images: [messi, ronaldo],
  },
  {
    name: "Zenia Yolanda",
    role: "Chief Financial Officer (CFO)",
    description: "Bertanggung jawab atas perencanaan keuangan, pengelolaan anggaran, dan pelaporan keuangan perusahaan.",
    images: [messi, ronaldo],
  },
  {
    name: "Dimar Abiyya",
    role: "Chief Technology Officer (CTO)",
    description: "Mengelola sistem teknologi, pengembangan web, dan infrastruktur digital.",
    images: [messi, ronaldo],
  },
  {
    name: "Bellanty Virginia",
    role: "Personal Assistant",
    description: "Mendukung operasional harian CEO serta menjembatani komunikasi dan koordinasi internal.",
    images: [messi, ronaldo],
  },
  {
    name: "Dileando Gamaliel",
    role: "IT & Web and Systems Developer",
    description: "Membangun dan memelihara situs web serta sistem digital internal.",
    images: [messi, ronaldo],
  },
  {
    name: "Amsal Yonas",
    role: "Creative Director",
    description: "Mengarahkan keseluruhan arah visual dan ide kreatif.",
    images: [messi, ronaldo],
  },
  {
    name: "Meliada Dina",
    role: "Social Media Specialist",
    description: "Mengelola konten, jadwal, dan strategi media sosial untuk klien dan internal.",
    images: [messi, ronaldo],
  },
  {
    name: "Eroz Kamal",
    role: "Graphic Designer",
    description: "Bertanggung jawab atas seluruh desain visual seperti branding, konten sosial media, dan kebutuhan promosi.",
    images: [messi, ronaldo],
  },
];

const Aboutus = () => {
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (!swiper) return;

    const applySlideStyles = () => {
      swiper.slides.forEach((slide) => {
        slide.style.transition = "all 0.5s ease-in-out";
        slide.style.filter = "grayscale(100%) blur(10px)";
        slide.style.opacity = "0.3";
        slide.style.zIndex = "0";
        slide.style.transform = "scale(0.8)";
      });

      const activeIndex = swiper.activeIndex;
      const total = swiper.slides.length;

      const setStyle = (index, style) => {
        const slide = swiper.slides[index];
        if (slide) Object.assign(slide.style, style);
      };

      setStyle(activeIndex, {
        filter: "grayscale(0%) blur(0)",
        opacity: "1",
        zIndex: "10",
        transform: "scale(1)",
      });

      const prevIndex = (activeIndex - 1 + total) % total;
      const nextIndex = (activeIndex + 1) % total;
      [prevIndex, nextIndex].forEach((i) =>
        setStyle(i, {
          filter: "grayscale(100%) blur(0)",
          opacity: "0.6",
          zIndex: "5",
          transform: "scale(0.9)",
        })
      );

      const prev2Index = (activeIndex - 2 + total) % total;
      const next2Index = (activeIndex + 2) % total;
      [prev2Index, next2Index].forEach((i) =>
        setStyle(i, {
          filter: "grayscale(100%) blur(2px)",
          opacity: "0.4",
          zIndex: "1",
          transform: "scale(0.85)",
        })
      );
    };

    applySlideStyles();
    swiper.on("slideChange", applySlideStyles);
    return () => swiper.off("slideChange", applySlideStyles);
  }, [swiper]);

  return (
    <div className="bg-gradient-to-b from-[#91A5BB] via-[#CAD5E0] to-black min-h-screen flex flex-col px-4 md:px-8 pt-16 relative overflow-visible">
      {/* Spinners */}
      <div className="absolute top-[250px] left-[70px] w-[100px] h-[100px] md:w-[200px] md:h-[200px] opacity-10 animate-spin-slower z-0 pointer-events-none">
        <Image src={footer} alt="Top Left Spinner" fill className="object-contain blur-sm" />
      </div>
      <div className="absolute bottom-[100px] left-[30px] w-[250px] h-[250px] md:w-[350px] md:h-[350px] opacity-10 animate-spin-slower z-0 pointer-events-none scale-x-[-1] scale-y-[-1]">
        <Image src={footer} alt="Bottom Right Spinner" fill className="object-contain blur-sm" />
      </div>
      <div className="absolute top-[700px] right-[120px] w-[150px] h-[150px] md:w-[250px] md:h-[250px] opacity-10 animate-spin-slower z-0 pointer-events-none scale-x-[-1] scale-y-[-1]">
        <Image src={footer} alt="Bottom Right Spinner" fill className="object-contain blur-sm" />
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-12"
      >
        MEET OUR <span className="text-[#4D6499]">TEAM</span>
      </motion.h1>

      {/* CEO */}
      <motion.div
        className="flex justify-center mb-12"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <TeamCard {...teamMembers[0]} />
      </motion.div>

      {/* Mid Managers */}
      <div className="flex justify-center gap-6 flex-wrap mb-12">
        {teamMembers.slice(1, 4).map((member, idx) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.15 }}
          >
            <TeamCard {...member} />
          </motion.div>
        ))}
      </div>

      {/* Swiper */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          onSwiper={setSwiper}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          navigation
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 30 },
            768: { slidesPerView: 3, spaceBetween: 40 },
            1024: { slidesPerView: 4, spaceBetween: 60 },
            1280: { slidesPerView: 5, spaceBetween: 80 },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 250,
            modifier: 2.5,
            slideShadows: false,
          }}
          style={{ paddingBottom: "6rem", paddingTop: "2rem" }}
          className="mx-auto max-w-[1600px]"
        >
          {teamMembers.slice(4).map((member) => (
            <SwiperSlide
              key={member.name}
              style={{
                width: "100%",
                maxWidth: "380px",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TeamCard {...member} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

const TeamCard = ({ name, role, images }) => {
  const [firstName, ...lastNameParts] = name.split(" ");
  const lastName = lastNameParts.join(" ");

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="relative w-[320px] sm:w-[360px] md:w-[400px] group text-center"
    >
      <Card className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-md relative">
        <div className="relative flex justify-center items-center py-6">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-40 font-extrabold uppercase leading-tight text-5xl whitespace-pre-line text-center z-0 pointer-events-none"
            style={{ maxWidth: "300px", lineHeight: 1.1 }}
          >
            {firstName}
            <br />
            {lastName}
          </div>

          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            loop
            slidesPerView={1}
            style={{ width: 300, height: 300 }}
            className="relative z-10 overflow-hidden"
          >
            {images.map((imgSrc, idx) => (
              <SwiperSlide
                key={idx}
                className="flex justify-center items-center"
              >
                <Image
                  src={imgSrc}
                  alt={`${name} photo ${idx + 1}`}
                  width={300}
                  height={300}
                  className="object-cover"
                  quality={100}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="p-4 relative z-20  text-white">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-white font-semibold">{role}</p>
        </div>

        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-10" />
      </Card>
    </motion.div>
  );
};

export default Aboutus;

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import footer from "../assets/footer.png";

const projects = [
  {
    title: "HALODOC - Rumah Sakit Terapung 2021",
    src: require("../assets/halodoc.png"),
    videoId: "UPKm3q24C-w",
    description:
      "Sebuah perjalanan kemanusiaan di Pulau Bawean...",
  },
  {
    title: "LOLICA - Colorful Fashion Commercial 2019",
    src: require("../assets/lolica.png"),
    videoId: "6rrxsneWCkM",
    description:
      "LOLICA mempercayakan kami untuk merancang video iklan...",
  },
  {
    title: "MOMFEST - Mothers on Mission Festival 2021",
    src: require("../assets/momfest.png"),
    videoId: "tyoASAvKEMU",
    description:
      "Siaran langsung penuh makna untuk para ibu...",
  },
  {
    title: "PEMKOT AMBON - Hari Kesaktian Pancasila 2020",
    src: require("../assets/pemkotambon.png"),
    description:
      "Merayakan nilai kebangsaan lewat layar...",
  },
  {
    title: "SHARP - Social Experiment Documentation 2021",
    src: require("../assets/sharp.png"),
    videoId: "qgsEQXtAeyg",
    description:
      "Berbagi kebahagiaan, menjangkau yang terlupakan...",
  },
  {
    title: "SUMMARECON SERPONG - Annual Awards Documentation 2020",
    src: require("../assets/sms.jpg"),
    videoId: "T0DHUnyVsMY",
    description:
      "Prestasi dalam kemegahan...",
  },
];

export default function Portfoliopage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const selectedProject = selectedIndex !== null ? projects[selectedIndex] : null;

  useEffect(() => {
    if (!swiperInstance) return;

    const updateSlidesStyle = () => {
      swiperInstance.slides.forEach((slideEl) => {
        slideEl.style.filter = "grayscale(100%)";
        slideEl.style.opacity = "0.2";
        slideEl.style.transform = "scale(0.8)";
        slideEl.style.transition = "all 0.4s ease";
        slideEl.style.zIndex = "0";
      });

      const total = swiperInstance.slides.length;
      const activeIndex = swiperInstance.activeIndex;
      const activeSlide = swiperInstance.slides[activeIndex];

      if (activeSlide) {
        activeSlide.style.filter = "none";
        activeSlide.style.opacity = "1";
        activeSlide.style.transform = "scale(1)";
        activeSlide.style.zIndex = "10";
      }

      const highlightIndexes = [
        (activeIndex - 1 + total) % total,
        (activeIndex - 2 + total) % total,
        (activeIndex + 1) % total,
        (activeIndex + 2) % total,
      ];

      highlightIndexes.forEach((i, idx) => {
        const slide = swiperInstance.slides[i];
        if (slide) {
          slide.style.opacity = idx === 0 || idx === 2 ? "0.5" : "0.35";
          slide.style.transform = idx === 0 || idx === 2 ? "scale(0.9)" : "scale(0.85)";
          slide.style.zIndex = "5";
        }
      });
    };

    updateSlidesStyle();
    swiperInstance.on("slideChange", updateSlidesStyle);

    return () => {
      swiperInstance.off("slideChange", updateSlidesStyle);
    };
  }, [swiperInstance]);

  return (
    <div
      className="text-white pt-20 pb-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(to right, #603111, #000000, #7098C0)",
      }}
    >
      {/* Background decorations */}
      <div className="absolute top-[100px] left-[50px] w-[150px] h-[150px] opacity-10 animate-spin-slow z-10">
        <Image src={footer} alt="Spinner" fill className="object-contain blur-sm" />
      </div>
      <div className="absolute bottom-[100px] right-[50px] w-[200px] h-[200px] opacity-10 animate-spin-slow z-10">
        <Image
          src={footer}
          alt="Spinner Flipped"
          fill
          className="object-contain blur-sm scale-x-[-1] scale-y-[-1]"
        />
      </div>

      {/* Section Title */}
      <div className="relative z-20 text-center">
        <h1 className="text-5xl font-bold mb-12">
          Motion <span className="text-orange-500">Projects</span>
        </h1>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[EffectCoverflow, Navigation]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView="auto"
        navigation
        onSwiper={setSwiperInstance}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 2,
          slideShadows: false,
        }}
        className="max-w-6xl mx-auto relative z-20"
      >
        {projects.map((project, index) => (
          <SwiperSlide
            key={index}
            style={{ width: "500px", cursor: "pointer", borderRadius: "1rem" }}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={project.src}
              alt={project.title}
              width={500}
              height={350}
              className="rounded-xl object-cover"
              draggable={false}
              unoptimized
            />
            <p className="text-center mt-4 font-semibold text-lg">{project.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal Viewer */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              className="bg-zinc-900 text-white p-6 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-2xl relative"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">{selectedProject.title}</h2>

              {selectedProject.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedProject.videoId}?autoplay=1&rel=0`}
                  className="w-full aspect-video rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedProject.title}
                />
              ) : (
                <Image
                  src={selectedProject.src}
                  alt={selectedProject.title}
                  className="w-full max-h-[500px] object-contain rounded-lg"
                  unoptimized
                />
              )}

              <p className="mt-4 text-center text-gray-300 text-lg">
                {selectedProject.description || "No description available."}
              </p>

              {/* Prev/Next Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  className="text-orange-400 hover:text-orange-300"
                  onClick={() => {
                    const newIndex = (selectedIndex - 1 + projects.length) % projects.length;
                    setSelectedIndex(newIndex);
                    swiperInstance?.slideToLoop(newIndex);
                  }}
                >
                  Previous
                </button>
                <button
                  className="text-blue-400 hover:text-blue-300"
                  onClick={() => {
                    const newIndex = (selectedIndex + 1) % projects.length;
                    setSelectedIndex(newIndex);
                    swiperInstance?.slideToLoop(newIndex);
                  }}
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom fade effect */}
      <div
        className="w-full h-20 absolute bottom-0 left-0 z-30 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      />

      {/* Custom styles */}
      <style jsx global>{`
        .swiper-button-prev {
          color: #f97316;
          transition: color 0.3s;
        }
        .swiper-button-next {
          color: #60a5fa;
          transition: color 0.3s;
        }
        .swiper-button-prev:hover {
          color: #fb923c;
        }
        .swiper-button-next:hover {
          color: #3b82f6;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const projects = [
  {
    title: "Halodoc Project",
    src: require("../assets/halodoc.png"),
    videoId: "UPKm3q24C-w",
  },
  {
    title: "Lolica Project",
    src: require("../assets/lolica.png"),
    videoId: "6rrxsneWCkM",
  },
  {
    title: "Mom Fest Project",
    src: require("../assets/momfest.png"),
    videoId: "tyoASAvKEMU",
  },
  {
    title: "Pemkot Ambon Project",
    src: require("../assets/pemkotambon.png"),
  },
  {
    title: "Sharp Project",
    src: require("../assets/sharp.png"),
    videoId: "qgsEQXtAeyg",
  },
  {
    title: "Summarecon Serpong Project",
    src: require("../assets/sms.jpg"),
    videoId: "T0DHUnyVsMY",
  },
];

export default function Portfoliopage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (!swiperInstance) return;

    const updateSlidesStyle = () => {
      swiperInstance.slides.forEach((slideEl) => {
        slideEl.style.filter = "grayscale(100%)";
        slideEl.style.opacity = "0.3";
        slideEl.style.transition =
          "filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease";
        slideEl.style.zIndex = "0";
        slideEl.style.transform = "scale(0.85)";
      });

      const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
      if (activeSlide) {
        activeSlide.style.filter = "grayscale(0%)";
        activeSlide.style.opacity = "1";
        activeSlide.style.zIndex = "10";
        activeSlide.style.transform = "scale(1)";
      }

      const total = swiperInstance.slides.length;
      const leftIndex = (swiperInstance.activeIndex - 1 + total) % total;
      const rightIndex = (swiperInstance.activeIndex + 1) % total;

      const leftSlide = swiperInstance.slides[leftIndex];
      if (leftSlide) {
        leftSlide.style.filter = "grayscale(100%)";
        leftSlide.style.opacity = "0.4";
        leftSlide.style.zIndex = "5";
        leftSlide.style.transform = "scale(0.9)";
      }

      const rightSlide = swiperInstance.slides[rightIndex];
      if (rightSlide) {
        rightSlide.style.filter = "grayscale(100%)";
        rightSlide.style.opacity = "0.4";
        rightSlide.style.zIndex = "5";
        rightSlide.style.transform = "scale(0.9)";
      }
    };

    updateSlidesStyle();
    swiperInstance.on("slideChange", updateSlidesStyle);

    return () => {
      if (swiperInstance) swiperInstance.off("slideChange", updateSlidesStyle);
    };
  }, [swiperInstance]);

  return (
    <div
      className="text-black pt-20 min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(to right, #a84b2f, #000000, #285c8d)",
      }}
    >
      <h1 className="text-white text-6xl w-[320px] mx-auto font-semibold mb-16 text-center">
        Motion <span className="text-orange-600">Projects</span>
      </h1>

      <Swiper
        modules={[EffectCoverflow, Navigation]}
        onSwiper={setSwiperInstance}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        pagination={false}
        navigation={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 400,
          modifier: 3.5,
          slideShadows: false,
        }}
        style={{ paddingBottom: "4rem" }}
        className="max-w-6xl mx-auto custom-swiper"
      >
        {projects.map((project, idx) => (
          <SwiperSlide
            key={idx}
            style={{
              width: "500px",
              borderRadius: "1rem",
              cursor: "pointer",
            }}
            onClick={() => setSelectedProject(project)}
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
            <p className="text-center mt-4 font-semibold text-lg text-white">
              {project.title}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedProject && (
        <div
          className="fixed inset-0 flex bg-black/70 justify-center items-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-black p-6 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white text-3xl font-semibold mb-4 text-center">
              {selectedProject.title}
            </h2>

            {selectedProject.videoId ? (
              <iframe
                className="w-full aspect-video rounded-lg"
                src={`https://www.youtube.com/embed/${selectedProject.videoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <Image
                src={selectedProject.src}
                alt={selectedProject.title}
                className="w-full max-h-[500px] object-contain mx-auto rounded-lg border border-gray-300"
                unoptimized
              />
            )}

            <p className="text-gray-300 mt-6 text-lg text-center">
              This is a placeholder description. Add your project copy here.
            </p>
          </div>
        </div>
      )}

      {/* Transisi ke footer */}
      <div
        className="w-full h-20"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000000 100%)",
        }}
      />

      {/* Custom Swiper Arrow Colors */}
      <style jsx global>{`
        .swiper-button-prev {
          color: #f97316; /* orange */
        }

        .swiper-button-next {
          color: #3b82f6; /* blue */
        }

        .swiper-button-prev,
        .swiper-button-next {
          transition: color 0.3s ease;
        }

        .swiper-button-prev:hover {
          color: #fb923c; /* lighter orange on hover */
        }

        .swiper-button-next:hover {
          color: #60a5fa; /* lighter blue on hover */
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 24px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

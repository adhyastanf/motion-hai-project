"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import footer from "../assets/footer.png"; // Background spinner image

const projects = [
  {
    title: "HALODOC - Rumah Sakit Terapung 2021",
    src: require("../assets/halodoc.png"),
    videoId: "UPKm3q24C-w",
    description:
      "Sebuah perjalanan kemanusiaan di Pulau Bawean. Kami dipercaya Halodoc untuk mendokumentasikan inisiatif sosial berupa Rumah Sakit Terapung menggunakan kapal Penisi tradisional yang menjangkau wilayah terpencil tanpa akses kesehatan. Melalui video dokumentasi ini, kami menyampaikan pesan kuat tentang harapan dan dedikasi pelayanan medis.",
  },
  {
    title: "LOLICA - Colorful Fashion Commercial 2019",
    src: require("../assets/lolica.png"),
    videoId: "6rrxsneWCkM",
    description:
      "LOLICA mempercayakan kami untuk merancang video iklan penuh warna yang menampilkan keunikan fashion wanita dengan sentuhan trend Korea. Kami merasakan ekspresi diri dan gaya hidup muda dengan konsep visual yang segar dan menarik. ",
  },
  {
    title: "MOMFEST - Mothers on Mission Festival 2021",
    src: require("../assets/momfest.png"),
    videoId: "tyoASAvKEMU",
    description:
      "Siaran langsung penuh makna untuk para ibu. Dalam event seminar ini, kami menangani produksi live Stream profesional. Menghadirkan koneksi yang intim dan nyata antara pembicara dan para peserta, baik secara luring maupun daring.",
  },
  {
    title: "PEMKOT AMBON - Hari Kesaktian Pancasila 2020",
    src: require("../assets/pemkotambon.png"),
    description:
      "Merayakan nilai kebangsaan lewat layar. Kami mendokumentasikan dan menyiarkan secara langsung peringatan Hari Kesaktian Pancasila bersama pemerintah Kota Ambon. Suatu kehormatan bagi kami untuk menjadi bagian dari peristiwa istimewa yang penuh makna.",
  },
  {
    title: "SHARP - Social Experiment Documentation 2021",
    src: require("../assets/sharp.png"),
    videoId: "qgsEQXtAeyg",
    description:
      "Berbagi kebahagiaan, menjangkau yang terlupakan. Sharp mempercayakan kami untuk mengabadikan momen spesial dalam aksi sosial mereka bersama anak - anak panti asuhan. Video dokumentasi ini menangkap kehangatan interaksi, kebahagiaan, dan kepedulian dalam sebuah kisah yang menginspirasi.",
  },
  {
    title: "SUMMARECON SERPONG - Annual Awards Documentation 2020",
    src: require("../assets/sms.jpg"),
    videoId: "T0DHUnyVsMY",
    description:
      "Prestasi dalam kemegahan. Kami memproduksi dokumentasi resmi acara penghargaan tahunan Summarecon Serpong di Royal Ballroom, The Springs Club. Menghadirkan kesan elegan dan profesional dalam setiap frame yang kami rekam.",
  },
];

export default function Portfoliopage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (!swiperInstance) return;

    const updateSlidesStyle = () => {
      swiperInstance.slides.forEach((slideEl) => {
        slideEl.style.filter = "grayscale(100%) blur(10px)";
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
        zIndex: 0,
        position: "relative",
      }}
    >
      {/* Background spinners */}
      <div className="absolute top-[100px] left-[50px] w-[150px] h-[150px] opacity-10 animate-spin-slow pointer-events-none z-10">
        <Image
          src={footer}
          alt="Background spinner"
          fill
          className="object-contain blur-sm"
          unoptimized
        />
      </div>
      <div className="absolute bottom-[100px] right-[50px] w-[200px] h-[200px] opacity-10 animate-spin-slow pointer-events-none z-10">
        <Image
          src={footer}
          alt="Background spinner flipped"
          fill
          className="object-contain blur-sm scale-x-[-1] scale-y-[-1]"
          unoptimized
        />
      </div>

      {/* Main content */}
      <div className="relative z-20">
        <h1 className="text-white text-6xl w-[320px] mx-auto font-semibold mb-16 text-center">
          Our <span className="text-orange-600">Portofolio</span>
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

              {selectedProject.description && (
                <p className="text-gray-300 mt-6 text-lg text-center whitespace-pre-line">
                  {selectedProject.description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom fade overlay */}
      <div
        className="w-full pointer-events-none"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
          zIndex: 30,
        }}
      />

      {/* Swiper button styles and spinner animation */}
      <style jsx global>{`
        .swiper-button-prev {
          color: #f97316;
        }
        .swiper-button-next {
          color: #3b82f6;
        }
        .swiper-button-prev:hover {
          color: #fb923c;
        }
        .swiper-button-next:hover {
          color: #60a5fa;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 24px;
          font-weight: bold;
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

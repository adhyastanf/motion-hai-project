"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Images
import halodoc from "../assets/halodoc.png";
import lolica from "../assets/lolica.png";
import momfest from "../assets/momfest.png";
import pemkotambon from "../assets/pemkotambon.png";
import footer from "../assets/footer.png";

// Cards data
const cards = [
  {
    title: "Sosial Media\nManagement",
    description:
      "Kami bantu kelola akun sosial mediamu secara menyeluruh—dari strategi konten, desain visual, hingga interaksi dengan audiens. Fokus pada bisnismu, biarkan kami yang urus engagement!",
    img: halodoc,
  },
  {
    title: "Company\nProfile",
    description:
      "Tampilkan citra profesional perusahaan lewat company profile yang informatif dan menarik—baik dalam bentuk digital maupun cetak. Biar klien langsung yakin sejak halaman pertama.",
    img: lolica,
  },
  {
    title: "Logo\nDesigner",
    description:
      "Desain logo eksklusif dan penuh makna yang mencerminkan karakter bisnismu. Unik, timeless, dan siap membangun kesan pertama yang tak terlupakan.",
    img: momfest,
  },
  {
    title: "Creative\nService",
    description:
      "Dari desain grafis, video, animasi, hingga ilustrasi—tim kreatif kami siap mewujudkan ide-ide visual yang memukau. Kreativitas tanpa batas untuk brand yang standout.",
    img: pemkotambon,
  },
  {
    title: "Digital\nMarketing",
    description:
      "Kami bantu tingkatkan visibilitas dan penjualan dengan iklan digital, SEO, email marketing, dan strategi kampanye lainnya. Data-driven, hasil maksimal.",
    img: halodoc,
  },
  {
    title: "Website\nDevelopment",
    description:
      "Kami buatkan website yang tak hanya menarik secara visual, tapi juga cepat, mobile-friendly, dan teroptimasi SEO. Tampil maksimal di dunia digital mulai dari sini!",
    img: lolica,
  },
];

const About = () => {
  const cardPairs = [];
  for (let i = 0; i < cards.length; i += 2) {
    cardPairs.push(cards.slice(i, i + 2));
  }

  return (
    <div
      className="bg-gradient-to-r from-[#7098C0] via-black to-[#603111] text-white relative overflow-hidden"
      id="about"
    >
      {/* Background spinning icons */}
      <div className="absolute top-[100px] left-[20px] w-[200px] h-[200px] opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image src={footer} alt="Spinning Icon" fill className="object-contain blur-sm" />
      </div>
      <div className="absolute bottom-[100px] right-[20px] w-[200px] h-[200px] opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm scale-x-[-1] scale-y-[-1]"
        />
      </div>
      <div className="absolute top-[600px] right-[20px] w-[200px] h-[200px] opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image src={footer} alt="Spinning Icon" fill className="object-contain blur-sm" />
      </div>
      <div className="absolute top-[1000px] left-[20px] w-[200px] h-[200px] opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm scale-x-[-1] scale-y-[-1]"
        />
      </div>

      {/* Section title */}
      <motion.h1
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl md:text-6xl font-semibold text-center mt-10 pt-16 pb-20 px-4"
      >
        Our <span className="text-[#7098C0]">Services</span>
      </motion.h1>

      {/* Cards */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10">
        {/* Vertical line */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/30 z-0"></div>

        {cardPairs.map((pair, pairIndex) => (
          <div key={pairIndex}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 relative z-10">
              {pair.map((card, index) => {
                const isRight = index === 1;
                const wordCount = card.title.replace("\n", " ").split(" ").length;
                const titleClass =
                  wordCount > 2 ? "whitespace-pre-line break-words" : "whitespace-nowrap";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group cursor-pointer flex flex-col font-sans text-white"
                  >
                    {/* Title on top for right card */}
                    {isRight && (
                      <div
                        className={`mb-3 text-left px-1 text-base sm:text-lg md:text-xl font-semibold leading-tight ${titleClass}`}
                      >
                        {card.title}
                      </div>
                    )}

                    {/* Image with overlay description */}
                    <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] overflow-hidden">
                      <Image
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover transition duration-300 group-hover:opacity-20"
                      />
                      <div className="absolute inset-0 flex items-center justify-center px-4 text-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <p className="text-xs sm:text-sm md:text-base">{card.description}</p>
                      </div>
                    </div>

                    {/* Title below for left card */}
                    {!isRight && (
                      <div
                        className={`mt-3 text-right px-1 text-base sm:text-lg md:text-xl font-semibold leading-tight ${titleClass}`}
                      >
                        {card.title}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Divider */}
            {pairIndex < cardPairs.length - 1 && (
              <div className="h-px bg-white/20 my-6 sm:my-10 mx-auto w-full" />
            )}
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-12 mb-16 pt-4 px-4">
        <Link href="/about" legacyBehavior>
          <a
            className="px-6 sm:px-8 py-3 text-lg sm:text-xl text-white font-semibold rounded-md bg-[#7098C0] hover:bg-[#5f7b9b] transition-colors duration-300"
            aria-label="Go to About page"
          >
            Click For More
          </a>
        </Link>
      </div>
    </div>
  );
};

export default About;

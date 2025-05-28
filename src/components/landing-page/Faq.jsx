"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsHeadphones, BsBook } from "react-icons/bs";
import Image from "next/image";
import footer from "../assets/footer.png"; // adjust the path as needed

const faqData = [
  {
    question: "Apa itu creative agency?",
    answer:
      "Creative agency adalah perusahaan yang menyediakan layanan kreatif untuk membantu brand atau bisnis membangun identitas visual, strategi pemasaran, serta menciptakan konten yang menarik dan efektif. Layanannya bisa mencakup branding, desain grafis, pembuatan konten digital, kampanye iklan, hingga manajemen media sosial.",
  },
  {
    question: "Apa saja layanan yang ditawarkan oleh creative agency Anda?",
    answer: `Kami menawarkan layanan lengkap, mulai dari:
- Branding dan rebranding
- Desain grafis (logo, kemasan, materi promosi)
- Social media management
- Pembuatan konten (foto, video, copywriting)
- Strategi pemasaran digital
- Kampanye iklan (online & offline)
Jika Anda memiliki kebutuhan khusus, kami siap menyesuaikan solusi terbaik untuk bisnis Anda.`,
  },
  {
    question: "Apa bedanya creative agency dengan digital marketing agency?",
    answer:
      "Creative agency lebih fokus pada aspek visual dan kreatif—mulai dari konsep ide hingga eksekusi visual. Sementara digital marketing agency biasanya lebih menekankan pada analisis data, optimasi iklan, dan strategi pemasaran berbasis performa. Namun, banyak agency (termasuk kami) yang menggabungkan keduanya untuk hasil yang lebih menyeluruh.",
  },
  {
    question: "Apakah saya perlu memiliki brand guideline sebelum bekerja sama dengan agency?",
    answer:
      "Tidak wajib. Jika Anda belum memiliki brand guideline, kami bisa membantu membuatkannya sebagai bagian dari proses awal kerja sama. Justru di situlah peran kami—membantu membentuk fondasi branding yang kuat untuk bisnis Anda.",
  },
  {
    question: "Bagaimana proses kerja sama dengan creative agency?",
    answer: `Proses kami biasanya melalui beberapa tahap:
1. Konsultasi awal – memahami kebutuhan dan tujuan Anda.
2. Penyusunan proposal – berisi rencana kerja, timeline, dan estimasi biaya.
3. Produksi – pembuatan konten, desain, atau kampanye sesuai brief.
4. Revisi & finalisasi – kami pastikan hasil akhir sesuai ekspektasi.
5. Delivery & evaluasi – kami serahkan hasil akhir dan melakukan evaluasi bersama.`,
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const leftColRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (leftColRef.current) {
        setCardHeight(leftColRef.current.clientHeight);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#7098C0] via-black to-[#603111] pb-12 text-white relative overflow-hidden">
      {/* Spinning Background Icons */}
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

      {/* Main Title */}
      <motion.h1
        className="text-6xl font-bold text-center text-white mb-16 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Faq
      </motion.h1>

      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-8 relative z-10">
        {/* Left Side - FAQs */}
        <div ref={leftColRef} className="col-span-2 flex flex-col gap-4">
          <h2 className="text-4xl font-bold mb-4">
            Have a <span className="text-[#7098C0]">Question?</span>
          </h2>
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer p-6 rounded-xl border backdrop-blur-sm bg-white/10 border-white/20 shadow-md transition-all ${
                activeIndex === index ? "border-white/40" : "hover:bg-white/5"
              }`}
            >
              <h3 className="text-xl font-bold text-white">{item.question}</h3>
              {activeIndex === index && (
                <p className="mt-3 text-base font-medium text-white/80 whitespace-pre-line">{item.answer}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Right Side - Cards */}
        <div className="flex flex-col gap-6" style={{ height: cardHeight || "auto" }}>
          {/* Card 1: Online Documentation */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md text-white flex flex-col justify-between"
            style={{
              height: cardHeight ? cardHeight / 2 - 12 : "auto",
              boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <BsBook className="text-4xl text-[#7098C0] mb-2" />
              <h3 className="text-2xl font-bold text-[#7098C0]">Online Documentation</h3>
              <p className="text-lg font-medium text-white/70 mt-2">Well organized and up to date</p>
            </div>
            <Link
              href="/about"
              className="w-[175px] mx-auto mt-4 px-4 py-2 text-sm font-medium bg-[#7098C0] hover:bg-[#5a7fa6] rounded transition"
            >
              Online Documentation
            </Link>
          </motion.div>

          {/* Card 2: Dedicated Support */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md text-white flex flex-col justify-between"
            style={{
              height: cardHeight ? cardHeight / 2 - 12 : "auto",
              boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <BsHeadphones className="text-4xl text-[#B55527] mb-2" />
              <h3 className="text-2xl font-bold text-[#B55527]">Dedicated Support</h3>
              <p className="text-lg font-medium text-white/70 mt-2">
                Need support? Submit a ticket. We’ll be happy to assist you.
              </p>
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/contact-us"
                className="px-4 py-2 text-sm font-medium bg-[#B55527] hover:bg-[#9e461f] rounded transition"
              >
                Get Support
              </Link>
              <p className="text-sm text-white/50 mt-2 leading-relaxed">
                Support Time: Monday – Friday
                <br />
                Response Time: Maximum 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Faq;

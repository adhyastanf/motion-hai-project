"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import footer from "../assets/footer.png"; // Make sure the path is correct

const Companyprofile = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/portofolio");
  };

  return (
    <div
      className="text-white bg-gradient-to-r from-[#7098C0] via-black to-[#603111] pt-16 relative overflow-hidden"
      id="companyprofile"
    >
      {/* Background Decorative Spinning Icon */}
      <div className="absolute top-20 left-10 w-40 h-40 opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm"
        />
      </div>
      <div className="absolute bottom-20 right-10 w-60 h-60 opacity-10 animate-spin-slower pointer-events-none z-0">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm"
        />
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl md:text-6xl font-semibold pb-8 text-center mt-12 px-4 relative z-10"
      >
        Company <span className="text-[#B55527]">Profile</span>
      </motion.h1>

      {/* Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-5xl mx-auto mt-12 rounded-lg overflow-hidden shadow-lg aspect-video z-10"
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/cDSnrS4SeuE?si=GfKU1IGJVJ1SfkY6"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex justify-center mt-16 px-4 z-10 relative"
      >
        <button
          onClick={handleRedirect}
          className="bg-[#B55527] text-white px-6 py-3 text-lg sm:text-xl rounded-lg font-semibold hover:bg-[#a96334] transform transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Watch More
        </button>
      </motion.div>
    </div>
  );
};

export default Companyprofile;

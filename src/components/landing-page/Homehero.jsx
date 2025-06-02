"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Homehero = () => {
  const scrollToAbouthome = () => {
    const aboutSection = document.getElementById("abouthome")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      const windowRatio = window.innerWidth / window.innerHeight
      const videoRatio = 16 / 9

      if (windowRatio > videoRatio) {
        // Wider screen — scale to fill height (no black bars top/bottom)
        setScale(windowRatio / videoRatio)
      } else {
        // Taller screen — scale to fill width (no black bars left/right)
        setScale(videoRatio / windowRatio)
      }
    }

    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden" id="home">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="w-full h-full relative overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 w-full h-full"
            style={{
              transform: `translate(-50%, -50%) scale(${scale})`,
              transformOrigin: "center center",
              pointerEvents: "none",
            }}
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/cDSnrS4SeuE?autoplay=1&mute=1&loop=1&controls=0&playlist=cDSnrS4SeuE&modestbranding=1&showinfo=0&rel=0"
              title="Background Video"
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{
                display: "block",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

      {/* Konten Utama */}
      <div className="relative z-20 flex items-center justify-center h-full text-white text-center px-4">
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.3 }}
        >
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-bold" transition={{ duration: 0.8 }}>
            Welcome to Hai Motion
          </motion.h1>
          <motion.p className="mt-4 text-lg sm:text-xl md:text-2xl" transition={{ duration: 0.8 }}>
            Luxury Experiences, Redefined
          </motion.p>
        </motion.div>
      </div>

      {/* Tombol Scroll dengan teks melingkar berputar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* SVG Teks Melingkar */}
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "linear" }}
          >
            <defs>
              <path id="circlePath" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
            </defs>
            <text fill="white" fontSize="9" fontWeight="bold" letterSpacing="2px">
              <textPath href="#circlePath" startOffset="0%">
                SCROLL DOWN • SCROLL DOWN • SCROLL DOWN •
              </textPath>
            </text>
          </motion.svg>

          {/* Tombol Biru */}
          <button
            onClick={scrollToAbouthome}
            className="w-12 h-12 bg-[#7098C0] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 z-10"
          >
            <div className="w-3 h-3 border-b-2 border-r-2 border-[#603111] rotate-45" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Homehero

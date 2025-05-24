"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import halodoc from "../assets/halodoc.png"
import lolica from "../assets/lolica.png"
import momfest from "../assets/momfest.png"
import pemkotambon from "../assets/pemkotambon.png"
import sharp from "../assets/sharp.png"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const projects = [
  { title: "Halodoc Project", src: halodoc },
  { title: "Lolica Project", src: lolica },
  { title: "Mom Fest Project", src: momfest },
  { title: "Pemkot Ambon Project", src: pemkotambon },
  { title: "Sharp Project", src: sharp },
]

const Portfolio = () => {
  const router = useRouter()

  return (
    <div className="text-white bg-gradient-to-b from-black to-[#381a5f] py-20" id="portfolio">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-center"
      >
        <h1 className="text-white text-6xl w-[320px] mx-auto font-semibold my-12">
          Selected <span className="text-orange-400">Projects</span>
        </h1>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="max-w-7xl mx-auto mt-12"
      >
        <div className="relative">
          <Carousel className="w-full">
            <CarouselPrevious />
            <CarouselNext />
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-4 flex flex-col items-center gap-4">
                    <div className="overflow-hidden rounded-xl shadow-lg border border-gray-700 transition-all duration-500 ease-in-out transform hover:scale-105">
                      <Image
                        src={project.src}
                        alt={project.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center text-white">
                      {project.title}
                    </h3>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </motion.div>

      {/* Button to Full Portfolio */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex justify-center mt-16"
      >
        <button
          onClick={() => router.push("/portofolio")}
          className="bg-orange-600 text-white px-6 py-3 text-xl rounded-lg font-semibold hover:bg-orange-500 hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Click for More
        </button>
      </motion.div>
    </div>
  )
}

export default Portfolio
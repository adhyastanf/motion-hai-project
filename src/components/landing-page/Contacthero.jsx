"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const Contacthero = () => {
    return (
        <div className="relative h-screen w-full bg-black text-white overflow-hidden">
            {/* TODO: Tambahkan background image di sini menggunakan CSS background-image atau absolute positioning */}
            {/* Contoh:
                <div className="absolute inset-0 z-0 bg-[url('/your-image.jpg')] bg-cover bg-center opacity-40"></div>
            */}

            <div className="relative z-10 flex flex-col justify-center items-start h-full px-10 md:px-20">
                {/* Heading */}
                <div className="mb-6">
                    <h1 className="text-5xl md:text-7xl font-light leading-tight">
                        We Are<br />
                        <span className="font-bold">Designed</span><br />
                        To Design
                    </h1>
                    <p className="text-sm text-gray-400 mt-4 max-w-md">
                        Share your objective to us, we’ll figure out the most effective and efficient result for you
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4 mt-4">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-6 py-3 rounded-full transition">
                        What We Do
                    </button>
                    <button className="border border-white text-white text-sm px-6 py-3 rounded-full transition hover:bg-white hover:text-black">
                        View Works
                    </button>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex flex-col items-center text-xs tracking-widest">
                    <span className="mb-2">SCROLL DOWN</span>
                    <div className="w-10 h-10 rounded-full border-2 border-orange-500 flex items-center justify-center animate-bounce">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacthero;

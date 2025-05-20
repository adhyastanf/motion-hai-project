"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import profilepic from "../assets/profilepic.png";
import footer from "../assets/footer.png"; // Import spinning icon

const Abouthero = () => {
    return (
        <section className="relative bg-[#4D6499] text-white py-24 px-6 md:px-20 overflow-hidden">
            {/* Decorative Geometric Background Shape */}
            <div className="absolute w-[400px] h-[400px] bg-[#172233] rounded-full top-[-100px] left-[-100px] opacity-30 blur-3xl"></div>
            <div className="absolute w-[600px] h-[600px] bg-[#4D6499] rounded-full bottom-[-200px] right-[-200px] opacity-20 blur-2xl"></div>

            {/* Spinning Icon */}
            <div className="absolute bottom-[-50px] right-[-50px] w-[300px] h-[300px] opacity-10 animate-spin-slower z-0 pointer-events-none">
                <Image
                    src={footer}
                    alt="Spinning Icon"
                    fill
                    className="object-contain blur-sm"
                />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 relative">
                {/* Text Section */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                        <span className="text-[#7098C0]">Lorem</span>{" "}
                        <span className="text-white">Ipsum</span><br />
                        <span className="text-[#91A5BB]">Lorem</span>
                    </h1>

                    <p className="mt-6 text-[#91A5BB] text-lg max-w-lg">
                        Ipsum.
                    </p>
                </motion.div>

                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <Image
                        src={profilepic}
                        alt="Profile"
                        className="rounded-xl shadow-2xl w-full max-w-xs md:max-w-sm"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Abouthero;

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import profilepic from "../assets/profilepic.png";
import footer from "../assets/footer.png"; // Import spinning icon

const Abouthero = () => {
    return (
        <section className="relative text-white py-24 px-6 md:px-20 overflow-hidden"
        style={{
            background: "linear-gradient(180deg, #7098C0, #91A5BB)"
        }}
        >
            {/* Decorative Geometric Background Shape */}
            <div className="absolute w-[400px] h-[400px] bg-[#172233] rounded-full top-[-100px] left-[-100px] opacity-30 blur-3xl"></div>

            {/* Spinning Icon */}
            <div className="absolute bottom-[-0px] right-[-50px] w-[300px] h-[300px] opacity-10 animate-spin-slower z-0 pointer-events-none">
                <Image
                    src={footer}
                    alt="Spinning Icon"
                    fill
                    className="object-contain blur-sm"
                />
            </div>
            <div className="absolute top-[40px] left-[20px] w-[200px] h-[200px] opacity-10 animate-spin-slower z-90 pointer-events-none">
                <Image
                    src={footer}
                    alt="Spinning Icon"
                    fill
                    className="object-contain blur-sm scale-x-[-1] scale-y-[-1]"
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
                <span className="text-[#4D6499]">Create</span>{" "}
                <span className="text-white">with</span><br />
                <span className="text-[#000000]">purpose.</span>
                </h1>

                <p className="mt-6 text-[#FFFFFF] text-lg max-w-lg">
                Every line, every step — make it count.
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
                        className="w-full max-w-xs md:max-w-sm"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Abouthero;

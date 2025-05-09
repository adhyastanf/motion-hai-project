"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import cursor from "../assets/icon1.png";
import lighting from "../assets/icon2.png";
import profilepic from "../assets/profilepic.png";

const Hero = () => {
    return (
        <div className="py-24 relative overflow-clip bg-[linear-gradient(to_bottom,#000,#2B1942_35%,#8F5C55_60%,#DBAF6E_80%)]">
            <div className="absolute rounded-[50%] w-[3000px] h-[1300px] top-[550px] left-[50%] -translate-x-1/2
                        bg-[radial-gradient(closest-side,#000_80%,#2B1942)]">
            </div>

            <div className="relative">
                {/* Animated Text */}
                <motion.div
                    initial={{ opacity: 0, y: 75 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-8xl font-bold text-center"
                >
                    <h1 className="text-[#98B4CE]">Hai</h1>
                    <h1 className="text-[#FF4500]">Motion</h1>
                </motion.div>

                {/* Floating Icons with Fade-in Animation */}
                <motion.div
                    className="hidden md:block absolute left-[280px] top-[170px]"
                    drag
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Image src={cursor} height="170" width="170" alt="cursor" draggable="false" />
                </motion.div>

                <motion.div
                    className="hidden md:block absolute right-[220px] top-[20px]"
                    drag
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Image src={lighting} height="120" width="120" alt="message" draggable="false" />
                </motion.div>

                {/* Animated Profile Picture */}
                <motion.div
                    initial={{ opacity: 0, y: 75 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <div className="mt-20">
                    <Image src={profilepic} alt="profile picture" className="w-60 h-auto mx-auto" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;

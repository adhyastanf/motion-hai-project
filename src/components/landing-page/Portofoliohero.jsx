"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import profilepic from "../assets/profilepic.png";
import footer from "../assets/footer.png"; // Spinning icon

const Portofoliohero = () => {
    return (
        <section
            className="relative text-white py-24 px-6 md:px-20 overflow-hidden"
            style={{
                background:
                    "linear-gradient(to right, #603111, #000000, #7098C0)",
            }}
        >
            {/* Gradasi terang di bagian atas */}
            <div className="absolute top-0 left-0 w-full h-15 bg-gradient-to-b from-white/15 to-transparent pointer-events-none z-10"></div>

            {/* Background Gradients (subtle large circles for effect) */}
            <div className="absolute w-[400px] h-[400px] bg-[#092433] rounded-full top-[-100px] left-[-100px] opacity-30 blur-3xl"></div>

            {/* Spinning Icons */}
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

            {/* Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-20 relative">
                {/* Text Section */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                        <span className="text-[#7CB4E3]">Porto</span>
                        <span className="text-white">folio</span>
                        <br />
                        <span className="text-[#F6B042]">Kami</span>
                    </h1>

                    <p className="mt-6 text-[#FFFFFF] text-lg max-w-lg">
<<<<<<< HEAD
                        Setiap cerita yang kami produksi bukan sekadar proyek, melainkan karya yang menghubungkan brand dengan audiens lewat pesan yang kuat dan visual yang bermakna. Inilah beberapa momen berharga yang telah kami bantu wujudkan
=======
                    Setiap cerita yang kami produksi bukan sekadar proyek, melainkan karya yang menghubungkan brand dengan audiens lewat pesan yang kuat dan visual yang bermakna. Inilah beberapa momen berharga yang telah kami bantu wujudkan.
>>>>>>> 11fc0f0b2a3ea6de246784fc092b460d438ea451
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

export default Portofoliohero;

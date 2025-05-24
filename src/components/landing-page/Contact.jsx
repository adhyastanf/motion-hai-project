"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import footer from "../assets/footer.png"; // Spinning icon import

const Contact = () => {
    return (
        <div className="relative bg-[linear-gradient(to_bottom,_#B55527_0%,_#E0A53D_80%,_rgba(255,255,255,0.1)_90%,_black_100%)] px-6 md:px-0 text-white overflow-hidden">

            {/* Spinning Icon Background */}
            <div className="absolute bottom-[150px] left-[20px] w-[250px] h-[250px] opacity-10 animate-spin-slower pointer-events-none z-0">
                <Image
                    src={footer}
                    alt="Spinning Icon"
                    fill
                    className="object-contain blur-sm"
                />
            </div>
            <div className="absolute top-[350px] right-[20px] w-[200px] h-[200px] opacity-10 animate-spin-slower pointer-events-none z-0">
                <Image
                    src={footer}
                    alt="Spinning Icon"
                    fill
                    className="object-contain blur-sm scale-x-[-1] scale-y-[-1]"
                />
            </div>

            {/* Contact Info Section */}
            <div className="pt-8 px-6 md:px-0">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl pb-8 font-bold mb-8 text-black"
                    >
                        CONTACT <span className="text-[#E0A53D]">INFORMATION</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-md relative z-10"
                        style={{ boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)" }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                            {/* Phone */}
                            <div className="rounded-xl p-6 transition">
                                <div className="flex flex-col items-center gap-2 mb-4">
                                    <Phone size={28} />
                                    <h3 className="text-xl font-semibold">Call us</h3>
                                </div>
                                <p className="text-white/80">0896-2962-7075</p>
                                <p className="text-white/80">0882-3465-3278</p>
                            </div>

                            {/* Email */}
                            <div className="rounded-xl p-6 transition">
                                <div className="flex flex-col items-center gap-2 mb-4">
                                    <Mail size={28} />
                                    <h3 className="text-xl font-semibold">Email us</h3>
                                </div>
                                <p className="text-white/80">contact@haimotion.com</p>
                                <p className="text-white/80">info@haimotion.com</p>
                            </div>

                            {/* Address */}
                            <div className="rounded-xl p-6 transition">
                                <div className="flex flex-col items-center gap-2 mb-4">
                                    <MapPin size={28} />
                                    <h3 className="text-xl font-semibold">Office address</h3>
                                </div>
                                <p className="text-white/80">
                                    Jl. Rawa Jaya III RT 01/04 no. 14, Pd. Kopi, Kec. Duren Sawit,
                                    Jakarta Timur, DKI Jakarta 13460
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Let's Stay Connected Section */}
            <div className="py-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-[#B55527]">
                        CONTACT <span className="text-black">US</span>
                    </h2>
                    <p className="text-white/80 text-2xl mt-2 max-w-xl mx-auto">
                        Lorem ipsum.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
                    {/* Info Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="backdrop-blur-sm bg-white/10 border border-white/20 p-8 rounded-2xl shadow-md text-white relative z-10"
                        style={{ boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)" }}
                    >
                        <ul className="space-y-6">
                            <li>
                                <p className="text-white/70 text-sm">Email Address</p>
                                <p className="text-xl font-semibold text-white">contact@haimotion.com</p>
                            </li>
                            <li>
                                <p className="text-white/70 text-sm">Office Location</p>
                                <p className="text-lg font-semibold text-white">
                                    Jl. Rawa Jaya III RT 01/04 no. 14, Pd. Kopi, Kec. Duren Sawit, Jakarta Timur
                                </p>
                            </li>
                            <li>
                                <p className="text-white/70 text-sm">Phone Number</p>
                                <p className="text-xl font-semibold text-white">0896-2962-7075</p>
                            </li>
                            <li>
                                <p className="text-white/70 text-sm">Skype Email</p>
                                <p className="text-xl font-semibold text-white">example@yourmail.com</p>
                            </li>
                        </ul>
                        <div className="mt-8">
                            <p className="text-white/70 text-sm mb-2">Social Media</p>
                            <div className="flex space-x-4 text-white text-xl">
                                <FaYoutube className="hover:text-red-500 cursor-pointer" />
                                <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                                <FaFacebook className="hover:text-blue-500 cursor-pointer" />
                                <FaLinkedin className="hover:text-sky-500 cursor-pointer" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="backdrop-blur-sm bg-white/10 border border-white/20 p-8 rounded-2xl shadow-md text-white relative z-10"
                        style={{ boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)" }}
                    >
                        <form
                            className="space-y-6"
                            action="https://getform.io/f/axowljxb"
                            method="POST"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="w-full">
                                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter your full name"
                                        className="h-12 w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-4 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="you@example.com"
                                        className="h-12 w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-4 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="w-full">
                                    <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-1">
                                        Phone number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="e.g. 0896-xxxx-xxxx"
                                        className="h-12 w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-4 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        placeholder="What’s the message about?"
                                        className="h-12 w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-4 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={5}
                                    placeholder="Write your message here..."
                                    className="w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-4 pt-3 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-[#E0A53D] hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg text-lg w-full"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

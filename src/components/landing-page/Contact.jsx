"use client";
import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";
import phone from "../assets/phone.png";
import mail from "../assets/mail.png";

const Contact = () => {
    return (
        <div className="bg-black py-20 px-6" id="contact">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">

                {/* Contact Info - KIRI */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 text-white/70 p-8 rounded-xl flex flex-col justify-between"
                >
                    <div>
                        <h3 className="text-3xl font-semibold text-orange-400 mb-6">Contact Information</h3>

                        <ul className="space-y-6">
                            <li className="flex items-start space-x-4">
                                <Image src={mail} alt="mail" className="w-10 h-10" />
                                <div>
                                    <p className="text-sm">Email</p>
                                    <p className="text-lg font-medium break-words">contact@haimotion.com</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-4">
                                <Image src={phone} alt="phone" className="w-10 h-10" />
                                <div>
                                    <p className="text-sm">Phone</p>
                                    <p className="text-lg font-medium">089629627075</p>
                                </div>
                            </li>
                            <li className="space-y-1">
                                <p className="text-sm">Office Location</p>
                                <p className="text-lg font-medium">Jl. Rawa Jaya iii RT 01/04 no 14, Pd. Kopi, Kec. Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13460</p>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-8">
                        <p className="text-sm mb-2">Social Media</p>
                        <div className="flex space-x-4 text-white/80 text-2xl">
                            <FaYoutube className="hover:text-red-500 cursor-pointer" />
                            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
                            <FaLinkedin className="hover:text-sky-500 cursor-pointer" />
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form - KANAN */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/10 text-white/70 p-8 rounded-xl flex flex-col justify-between"
                >
                    <div>
                        <h2 className="text-3xl font-bold text-orange-400 mb-2">Let's Stay Connected</h2>
                        <p className="mb-6">Send us a message</p>

                        <form className="space-y-6" action="https://getform.io/f/axowljxb" method="POST">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full name"
                                    className="bg-black/70 text-white/80 border border-white/20 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    className="bg-black/70 text-white/80 border border-white/20 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone number"
                                    className="bg-black/70 text-white/80 border border-white/20 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    className="bg-black/70 text-white/80 border border-white/20 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                            </div>
                            <textarea
                                name="message"
                                placeholder="Message"
                                rows="5"
                                className="bg-black/70 text-white/80 border border-white/20 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-orange-700 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl w-full text-xl"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;

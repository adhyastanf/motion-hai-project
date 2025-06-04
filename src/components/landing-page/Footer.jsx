"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import footerLogo from "../assets/footer.png";

const Footer = () => {
    return (
        <footer className="bg-black text-white text-sm">
            {/* Top Grid Section */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] gap-10 border-b border-gray-700">

                {/* Logo & Company Info */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                        <Image
                            src={footerLogo}
                            alt="Hai Motion Logo"
                            className="w-10 h-auto"
                        />
                        <span className="text-xl font-bold">Hai Motion</span>
                    </div>
                    <p className="text-white/70 leading-relaxed text-justify">
                        Kami bukan hanya sekadar penyedia jasa kami adalah partner kreatif yang siap tumbuh bersama Anda. Setiap proyek kami kerjakan dengan penuh riset, ide segar, dan sentuhan profesional, demi hasil yang tidak hanya indah dipandang, tapi juga berdampak nyata.
                    </p>
                </div>

                {/* Hai Motion Pages (padding kiri responsif) */}
                <div className="flex flex-col h-full pl-0 sm:pl-6 md:pl-12">
                    <h4 className="text-white font-semibold mb-3">Hai Motion</h4>
                    <ul className="space-y-2 text-white/70">
                        <li><Link href="/" className="hover:text-white">Home</Link></li>
                        <li><Link href="/about" className="hover:text-white">About</Link></li>
                        <li><Link href="/portofolio" className="hover:text-white">Portofolio</Link></li>
                        <li><Link href="/contact-us" className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>

                {/* Our Services */}
                <div className="flex flex-col h-full">
                    <h4 className="text-white font-semibold mb-3">Our Services</h4>
                    <ul className="space-y-2 text-white/70">
                        <li>Video Product</li>
                        <li>Documentation</li>
                        <li>Social Media Video</li>
                        <li>Digital Commercial</li>
                    </ul>
                </div>

                {/* Support Info */}
                <div className="flex flex-col h-full">
                    <h4 className="text-white font-semibold mb-3">Customer Support</h4>
                    <p className="text-white/70 leading-relaxed">
                        Support Time: Monday – Friday <br />
                        Response Time: Maximum 24 hours
                    </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col h-full">
                    <h4 className="text-white font-semibold mb-3">Contact Us</h4>
                    <p className="text-white/70">
                        WhatsApp: 089629627075 <br />
                        Email: contact@haimotion.com
                    </p>
                    <br />
                    <h4 className="text-white font-semibold mb-3">Studio</h4>
                    <p className="text-white/70 leading-relaxed">
                        Jl. Rawa Jaya iii RT 01/04 no 14, Pd. Kopi, Kec. Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13460
                    </p>
                </div>
            </div>

            {/* Bottom Social Bar */}
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-white/50 text-xs">
                {/* Left Section: Logo + Copyright */}
                <div className="flex items-center space-x-3">
                    <Image
                        src={footerLogo}
                        alt="Hai Motion Logo"
                        className="w-6 h-auto"
                    />
                    <p className="pl-5">©2025 Hai Motion. All rights reserved.</p>
                </div>

                {/* Right Section: Social Icons */}
                <div className="flex space-x-4 mt-2 md:mt-0 text-white">
                    <a
                        href="https://www.youtube.com/@haimotion7962"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                    >
                        <FaYoutube size={18} />
                    </a>
                    <a
                        href="https://www.instagram.com/haimotion/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                    >
                        <FaInstagram size={18} />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/haimotion/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                    >
                        <FaLinkedin size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

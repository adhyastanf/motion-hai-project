import React from "react";
import Image from "next/image";
import { FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import footerLogo from "../assets/footer.png";

const Footer = () => {
    return (
        <footer className="bg-black text-white text-sm">
            {/* Top Grid Section */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 border-b border-gray-700">

                {/* Logo & Company Info */}
                <div className="col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                        <Image
                            src={footerLogo}
                            alt="Hai Motion Logo"
                            className="w-10 h-auto"
                        />
                        <span className="text-xl font-bold">Hai Motion</span>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                {/* Hai Motion Pages */}
                <div>
                    <h4 className="text-white font-semibold mb-3">Hai Motion</h4>
                    <ul className="space-y-2 text-white/70">
                        <li><a href="/" className="hover:text-white">Home</a></li>
                        <li><a href="/about" className="hover:text-white">About</a></li>
                        <li><a href="/portofolio" className="hover:text-white">Portofolio</a></li>
                        <li><a href="/contact-us" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Studio Address */}
                <div>
                    <h4 className="text-white font-semibold mb-3">Studio</h4>
                    <p className="text-white/70 leading-relaxed">
                        Jl. Rawa Jaya iii RT 01/04 no 14, Pd. Kopi, Kec. Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13460
                    </p>
                </div>

                {/* Career Section */}
                <div>
                    <h4 className="text-white font-semibold mb-3"> Our Services</h4>
                    <ul className="space-y-2 text-white/70">
                        <li>Video Product</li>
                        <li>Documentation</li>
                        <li>Social Media Video</li>
                        <li>Digital Commercial</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-white font-semibold mb-3">Contact Us</h4>
                    <p className="text-white/70">
                        WhatsApp: 089629627075 <br />
                        Email: contact@haimotion.com
                    </p>
                </div>
            </div>

            {/* Bottom Social Bar */}
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-white/50 text-xs">
                <p>©2025 Hai Motion. All rights reserved.</p>
                <div className="flex space-x-4 mt-2 md:mt-0 text-white">
                    <a href="https://www.youtube.com/@haimotion7962" target="_blank" className="hover:text-white">
                        <FaYoutube size={18} />
                    </a>
                    <a href="https://www.instagram.com/haimotion/" target="_blank" className="hover:text-white">
                        <FaInstagram size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

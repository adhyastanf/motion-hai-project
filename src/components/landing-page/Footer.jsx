import React from "react";
import Image from "next/image";
import { FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import footerLogo from "../assets/footer.png";

const Footer = () => {
    return (
        <div className="px-6 md:px-0 mt-12 text-white/70 py-8 max-w-[1000px] mx-auto border-t border-gray-700
                        pt-4 flex justify-between items-center">

            <div className="flex items-center gap-x-3">
                <Image
                    src={footerLogo}
                    alt="Hai Motion Logo"
                    className="w-10 h-auto"
                />
                <span className="text-2xl font-bold text-white">Hai Motion</span>
            </div>

            <div className="flex space-x-6 mt-4"> 
                <a href="https://www.youtube.com/@haimotion7962" target="_blank" className="hover:text-gray-300">
                    <FaYoutube size={24} />
                </a>
                <a href="https://www.instagram.com/haimotion/" target="_blank" className="hover:text-gray-300">
                    <FaInstagram size={24} />
                </a>
            </div>                   

        </div>
    );
};

export default Footer;

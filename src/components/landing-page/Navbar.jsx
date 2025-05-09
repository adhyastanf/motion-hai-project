"use client";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Portofolio", path: "/portofolio" },
    { title: "Contact Us", path: "/contact-us" },
];

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const toggleNav = () => setNav(!nav);
    const closeNav = () => setNav(false);

    const menuVariants = {
        open: { x: 0, transition: { stiffness: 20, damping: 15 } },
        closed: { x: "-100%", transition: { stiffness: 20, damping: 15 } },
    };

    return (
        <div className="text-white/70 pt-6">
            {/* Desktop Navbar */}
            <div className="hidden md:flex items-center px-4 py-2 mx-auto max-w-[500px]">
                <ul className="flex flex-row p-4 space-x-8">
                    {navLinks.map((link, index) => (
                        <Link href={link.path} key={index} className="relative group">
                            {/* <ScrollLink
                                to={link.path}
                                smooth={true}
                                duration={800}
                                offset={-70}
                                className="cursor-pointer hover:text-white transition"
                            > */}
                                {link.title}
                            {/* </ScrollLink> */}
                            
                            {/* Upper underline (Full width on hover) */}
                            <div className="absolute left-0 bottom-[-2px] w-0 h-1 bg-orange-400 rounded-full transition-all duration-300 ease-out group-hover:w-full"></div>
                            
                            {/* Lower underline (5/8 of the width on hover) */}
                            <div className="absolute left-0 bottom-[-6px] w-0 h-1 bg-orange-600 rounded-full transition-all duration-300 ease-out group-hover:w-2/3"></div>
                        </Link>
                    ))}
                </ul>
            </div>

            {/* Mobile Menu Icon */}
            <div onClick={toggleNav} className="md:hidden absolute top-5 right-5 border rounded text-white/70 border-white/70 p-2 z-50">
                {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
            </div>

            {/* Mobile Navbar */}
            <motion.div
                initial={false}
                animate={nav ? "open" : "closed"}
                variants={menuVariants}
                className="fixed left-0 top-0 w-full h-full bg-black/90 z-40 flex flex-col justify-center items-center"
            >
                <ul className="text-3xl font-semibold space-y-8">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <ScrollLink
                                to={link.path}
                                smooth={true}
                                duration={800}
                                offset={-70}
                                onClick={closeNav}
                                className="cursor-pointer hover:text-white transition"
                            >
                                {link.title}
                            </ScrollLink>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
};

export default Navbar;

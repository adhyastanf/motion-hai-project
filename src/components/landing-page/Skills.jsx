"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact, FaJsSquare } from "react-icons/fa";

const skillIcons = [
    { icon: <FaHtml5 size={140} />, label: "HTML" },
    { icon: <FaCss3Alt size={140} />, label: "CSS" },
    { icon: <FaReact size={140} />, label: "React" },
    { icon: <FaJsSquare size={140} />, label: "JavaScript" },
];

const Skills = () => {
    return (
        <div className="bg-[linear-gradient(to_top,#000,#381a5f_80%)] py-32">
            <div className="text-white w-[400px] md:min-w-[1100px] mx-auto p-8 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 75 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-6xl font-bold mb-4"
                >
                    Our Clients
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {skillIcons.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 75 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5}}
                            whileHover={{ scale: 1.1 }}
                            className="h-[160px] w-[160px] md:h-[220px] md:w-[220px] flex flex-col justify-between 
                                      items-center bg-white/10 p-4 rounded-xl cursor-pointer 
                                      transition-shadow hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                        >
                            {skill.icon}
                            <p className="mt-2">{skill.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;

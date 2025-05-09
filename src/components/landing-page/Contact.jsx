"use client";
import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import phone from "../assets/phone.png";
import mail from "../assets/mail.png";

const Contact = () => {
    return (
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row text-white/70 p-8
                        rounded-lg space-y-8 lg:space-y-0 lg:space-x-8" id="contact">

            {/* Contact Info Section */}
            <motion.div
                initial={{ opacity: 0, y: 75 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='flex justify-center items-center'
            >
                <ul className='space-y-4'>
                    <li className='flex items-center'>
                        <Image src={phone} alt="phone" className='h-[110px] w-auto mr-6'/>
                        <p className='text-xl'>62-XXX-XXXX-XXXX</p>
                    </li>
                    <li className='flex items-center'>
                        <Image src={mail} alt="mail" className='h-[110px] w-auto mr-6'/>
                        <p className='text-xl'>contact.haimotion@gmail.com</p>
                    </li>
                </ul>
            </motion.div>

            {/* Contact Form Section */}
            <motion.div
                initial={{ opacity: 0, y: 75 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='bg-white/10 p-6 rounded-xl w-full max-w-[550px] mx-auto flex flex-col items-center'
            >
                {/* Animated Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 75 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className='text-5xl font-bold text-orange-400 mb-4'
                >
                    Let's Connect
                </motion.h2>

                <p className='text-white/70 mb-6'>Send us a message</p>

                <form className='space-y-4' action="https://getform.io/f/axowljxb" method='POST'>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <input type="text" name="name" className='bg-black/70 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400'
                                placeholder='Name' />
                        <input type="text" name="phone" className='bg-black/70 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400'
                                placeholder='Whatsapp (phone)' />
                        <input type="text" name="email" className='bg-black/70 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400'
                                placeholder='Email' />
                        <input type="text" name="subject" className='bg-black/70 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400'
                                placeholder='Subject' />
                    </div>
                    <textarea className='bg-black/70 w-full rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400'
                                placeholder='Your Message' />
                    <button className='bg-orange-700 hover:bg-orange-500 text-white px-6 py-2 w-full font-semibold
                                        text-xl rounded-xl'>
                        Send Message
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Contact;

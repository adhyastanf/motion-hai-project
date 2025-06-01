"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import footer from "../assets/footer.png";

const Contact = () => {
  return (
    <div className="relative bg-[linear-gradient(to_bottom,_#B55527_0%,_#E0A53D_80%,_rgba(255,255,255,0.1)_90%,_black_100%)] px-4 sm:px-6 md:px-0 text-white overflow-hidden">

      {/* Spinning Icon Background */}
      <div className="absolute bottom-[150px] left-[10px] w-[180px] h-[180px] opacity-10 animate-spin-slower pointer-events-none z-0 sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px]">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm"
        />
      </div>
      <div className="absolute top-[350px] right-[10px] w-[150px] h-[150px] opacity-10 animate-spin-slower pointer-events-none z-0 sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px]">
        <Image
          src={footer}
          alt="Spinning Icon"
          fill
          className="object-contain blur-sm scale-x-[-1] scale-y-[-1]"
        />
      </div>

      {/* Contact Info Section */}
      <div className="pt-8 px-2 sm:px-6 md:px-0">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 text-black"
          >
            CONTACT <span className="text-[#E0A53D]">INFORMATION</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-md relative z-10"
            style={{ boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-white">
              {/* Phone */}
              <div className="rounded-xl p-4 sm:p-6 transition flex flex-col items-center">
                <Phone size={24} className="mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Call us</h3>
                <p className="text-white/80 text-sm sm:text-base">0896-2962-7075</p>
                <p className="text-white/80 text-sm sm:text-base">0882-3465-3278</p>
              </div>

              {/* Email */}
              <div className="rounded-xl p-4 sm:p-6 transition flex flex-col items-center">
                <Mail size={24} className="mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Email us</h3>
                <p className="text-white/80 text-sm sm:text-base">contact@haimotion.com</p>
                <p className="text-white/80 text-sm sm:text-base">info@haimotion.com</p>
              </div>

              {/* Address */}
              <div className="rounded-xl p-4 sm:p-6 transition flex flex-col items-center">
                <MapPin size={24} className="mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Office address</h3>
                <p className="text-white/80 text-sm sm:text-base max-w-xs sm:max-w-sm md:max-w-md">
                  Jl. Rawa Jaya III RT 01/04 no. 14, Pd. Kopi, Kec. Duren Sawit,
                  Jakarta Timur, DKI Jakarta 13460
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Let's Stay Connected Section */}
      <div className="py-16 px-4 sm:px-6 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 text-[#B55527]">
            CONTACT <span className="text-black">US</span>
          </h2>
          <p className="text-white/80 text-lg sm:text-xl max-w-lg mx-auto">
            Lorem ipsum.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 sm:p-8 rounded-2xl shadow-md text-white relative z-10"
            style={{ boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)" }}
          >
            <ul className="space-y-5 sm:space-y-6 text-left">
              <li>
                <p className="text-white/70 text-xs sm:text-sm">Email Address</p>
                <p className="text-lg sm:text-xl font-semibold text-white">contact@haimotion.com</p>
              </li>
              <li>
                <p className="text-white/70 text-xs sm:text-sm">Office Location</p>
                <p className="text-base sm:text-lg font-semibold text-white">
                  Jl. Rawa Jaya III RT 01/04 no. 14, Pd. Kopi, Kec. Duren Sawit, Jakarta Timur
                </p>
              </li>
              <li>
                <p className="text-white/70 text-xs sm:text-sm">Phone Number</p>
                <p className="text-lg sm:text-xl font-semibold text-white">0896-2962-7075</p>
              </li>
              <li>
                <p className="text-white/70 text-xs sm:text-sm">Skype Email</p>
                <p className="text-lg sm:text-xl font-semibold text-white">example@yourmail.com</p>
              </li>
            </ul>
            <div className="mt-6 sm:mt-8">
              <p className="text-white/70 text-xs sm:text-sm mb-2">Social Media</p>
              <div className="flex space-x-4 text-white text-lg sm:text-xl justify-start">
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
            className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 sm:p-8 rounded-2xl shadow-md text-white relative z-10"
            style={{ boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)" }}
          >
            <form
              className="space-y-5 sm:space-y-6"
              action="https://getform.io/f/axowljxb"
              method="POST"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white/70 mb-1"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    className="h-11 sm:h-12 w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-3 sm:px-4 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/70 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="johndoe@example.com"
                    className="h-11 sm:h-12 w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-3 sm:px-4 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-white/70 mb-1"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="e.g. 08xx-xxxx-xxxx"
                    className="h-11 sm:h-12 w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-3 sm:px-4 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-white/70 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="What’s the message about?"
                    className="h-11 sm:h-12 w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-3 sm:px-4 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white/70 mb-1"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Write your message here..."
                  className="w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-3 pt-2 sm:pt-3 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#E0A53D] hover:bg-[#603111] text-white font-semibold py-3 px-6 rounded-lg text-lg w-full"
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

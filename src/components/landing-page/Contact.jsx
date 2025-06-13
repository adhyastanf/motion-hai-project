"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import footer from "../assets/footer.png";

/**
 * Contact Section – fully responsive (mobile‑first)
 * -------------------------------------------------
 * – Mobile (≤640px): single‑column stack.
 * – Tablet (≥768px): two columns for map & form.
 * – Desktop (≥1024px): larger typography & comfortable spacings.
 */
const Contact = () => {
  return (
    <div
      className="relative bg-[linear-gradient(to_bottom,_#B55527_0%,_#E0A53D_80%,_black_100%)]
      text-white overflow-hidden px-4 sm:px-6 lg:px-0 py-10 sm:py-16"
    >
      {/* Decorative spinning icons */}
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

      {/* CONTACT INFORMATION – top cards */}
      <div className="pt-2 sm:pt-4">
        <div className="max-w-7xl mx-auto text-center w-full px-2 sm:px-6 lg:px-0">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-black"
          >
            CONTACT <span className="text-[#E0A53D]">INFORMATION</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-md relative z-10 max-w-full"
            style={{ boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 text-white">
              {/* Phone */}
              <div className="rounded-xl p-4 sm:p-6 flex flex-col items-center">
                <Phone size={24} className="mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Call us</h3>
                <p className="text-white/80 text-sm sm:text-base">0896‑2962‑7075</p>
                <p className="text-white/80 text-sm sm:text-base">0882‑3465‑3278</p>
              </div>

              {/* Email */}
              <div className="rounded-xl p-4 sm:p-6 flex flex-col items-center">
                <Mail size={24} className="mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Email us</h3>
                <p className="text-white/80 text-sm sm:text-base">contact@haimotion.com</p>
                <p className="text-white/80 text-sm sm:text-base">info@haimotion.com</p>
              </div>

              {/* Address */}
              <div className="rounded-xl p-4 sm:p-6 flex flex-col items-center">
                <MapPin size={24} className="mb-2 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Office address</h3>
                <p className="text-white/80 text-sm sm:text-base max-w-xs text-center">
                  Jl. Rawa Jaya III RT 01/04 No. 14, Pd. Kopi, Kec. Duren Sawit, Jakarta Timur, DKI Jakarta 13460
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* LET'S STAY CONNECTED – heading */}
      <div className="py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center mb-10 sm:mb-16 px-2 sm:px-6 lg:px-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-[#B55527]">
            CONTACT <span className="text-black">US</span>
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto">
            We’d love to hear from you. Reach out via the form or visit us in person.
          </p>
        </motion.div>

        {/* MAP & FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto w-full px-2 sm:px-6 lg:px-0">
          {/* Google Map Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 sm:p-8 rounded-2xl shadow-md text-white relative z-10 w-full"
            style={{ boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)" }}
          >
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Find Us Here
              </h3>
              <p className="text-sm sm:text-base text-white/70 mt-1">
                Visit our studio in East Jakarta.
              </p>
            </div>
            <div className="w-full h-72 sm:h-96 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.9349794156994!2d106.9157909!3d-6.2255241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f25e8b8cbf99%3A0x47c417b33d0a462f!2sHai%20Motion!5e0!3m2!1sen!2sid!4v1717500000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 w-full h-full max-w-full"
                title="Hai Motion Map"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 sm:p-8 rounded-2xl shadow-md text-white relative z-10 w-full"
            style={{ boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)" }}
          >
            <form
              className="space-y-6"
              action="https://getform.io/f/axowljxb"
              method="POST"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-white/70 mb-1"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    className="h-11 w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-3 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-white/70 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="johndoe@example.com"
                    className="h-11 w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-3 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-white/70 mb-1"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="08xx-xxxx-xxxx"
                    className="h-11 w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-3 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-white/70 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="What’s the message about?"
                    className="h-11 w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-3 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-white/70 mb-1"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Write your message here..."
                  className="w-full bg-white/20 placeholder:text-white/70 border border-white/30 rounded-lg px-3 pt-2 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#BE8C35]"
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

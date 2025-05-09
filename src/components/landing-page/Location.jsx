"use client";
import React from "react";
import { motion } from "framer-motion";

const Location = () => {
  return (
    <div className="text-white bg-gradient-to-b from-black via-[#381a5f] to-black py-32 px-6 md:px-0" id="location">
      <div className="max-w-[1200px] mx-auto text-center">

        {/* Animated Title */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-8"
        >
          Our <span className="text-orange-400">Location</span>
        </motion.h2>

        {/* Short Address Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-white/70 max-w-xl mx-auto mb-12"
        >
          Come visit us in <strong>Jakarta-Tangerang</strong>, Indonesia — where creativity meets execution. Our studio is easily accessible and always open for collaborations.
        </motion.p>

        {/* Google Map Embed */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-[900px] mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-lg"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.6880542715385!2d106.65365131605406!3d-6.229728697717387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fbbff3cefa89%3A0x3f354b8c8a5a8e9!2sJakarta-Tangerang!5e0!3m2!1sen!2sid!4v1714497718855!5m2!1sen!2sid"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default Location;

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Preloader from "@/components/landing-page/Preloader"; // Adjust if needed
import Abouthero from "@/components/landing-page/Abouthero";
import Aboutus from "@/components/landing-page/Aboutus";
import Services from "@/components/landing-page/Services";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Always render the main content */}
      <main>
        <Abouthero />
        <Aboutus />
        <Services />
      </main>

      {/* Preloader overlays the screen while loading */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Preloader onFinish={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

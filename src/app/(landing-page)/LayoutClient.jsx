"use client";

import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import Preloader from "@/components/landing-page/Preloader";
import PreloaderProvider, { usePreloader } from "@/components/context/PreloaderContext";

function Content({ children }) {
  const { showPreloader } = usePreloader();

  return (
    <div className="antialiased">
      {showPreloader ? (
        <Preloader />
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </div>
  );
}

export default function LandingContent({ children }) {
  return (
    <PreloaderProvider>
      <Content>{children}</Content>
    </PreloaderProvider>
  );
}

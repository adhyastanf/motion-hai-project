"use client";

// import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import Preloader from "@/components/landing-page/Preloader";
import PreloaderProvider, { usePreloader } from "@/components/context/PreloaderContext";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

function LandingContent({ children }) {
  const { showPreloader } = usePreloader();

  return (
    <div className={`antialiased`}>
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

export default function LandingLayout({ children }) {
  return (
    <PreloaderProvider>
      <LandingContent>{children} </LandingContent>
    </PreloaderProvider>
  );
}

"use client";
import { useState } from "react";
import Abouthero from "@/components/landing-page/Abouthero";
import Aboutus from "@/components/landing-page/Aboutus";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (

      <main>
        <Abouthero />
        <Aboutus />
      </main>
  );
}

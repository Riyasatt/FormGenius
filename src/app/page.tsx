'use client'

import Features from "@/components/custom/Features";
import Footer from "@/components/custom/Footer";
import Hero from "@/components/custom/Hero";
import HowItWorks from "@/components/custom/HowItWorks";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      
      <Hero />
      <HowItWorks />
      <Features />
      <Footer />
    </main>
  );
}

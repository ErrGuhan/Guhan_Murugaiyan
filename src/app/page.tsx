import Preloader from "@/components/sections/Preloader";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Expertise from "@/components/sections/Expertise";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      {/* Cinematic Split Curtain Preloader */}
      <Preloader />

      {/* Navigation Bar & Fullscreen Menu */}
      <Navbar />

      {/* Hero Section (Off-White Editorial) */}
      <Hero />

      {/* About Section (Obsidian Dark Transition) */}
      <About />

      {/* Expertise / Capabilities Accordion & Tech Toolkit */}
      <Expertise />

      {/* Featured Projects (Pinned Horizontal Scroll Showcase) */}
      <Projects />

      {/* Contact Section & Form */}
      <Contact />

      {/* Footer & Live Time Ticker */}
      <Footer />
    </main>
  );
}

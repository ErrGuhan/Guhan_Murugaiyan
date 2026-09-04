import Preloader from "@/components/sections/Preloader";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Expertise from "@/components/sections/Expertise";
import Projects from "@/components/sections/Projects";
import Credentials from "@/components/sections/Credentials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      {/* 1. Cinematic Gold Ring & Split Curtain Preloader (Video 00:00 - 00:14) */}
      <Preloader />

      {/* 2. Header & Fullscreen Navigation Overlay (Video 00:15 & 00:24) */}
      <Navbar />

      {/* 3. Hero Section with Wavy Hover Distortion (Video 00:15 - 00:39: Cream #F4F0E6) */}
      <Hero />

      {/* 4. About Section with Portrait & Manifesto (Video 00:40 - 00:58: Obsidian #090A0E) */}
      <About />

      {/* 5. Expertise with Interactive Floating Physics Tech Matrix (Video 00:59 - 01:14) */}
      <Expertise />

      {/* 6. Giant WORK Marquee Banner & Case Studies Showcase (Video 01:15 - 01:51) */}
      <Projects />

      {/* 7. Credentials & Experience / Education Timeline */}
      <Credentials />

      {/* 8. Contact Section with Direct Cards & Form (Video 01:52 - 01:57) */}
      <Contact />

      {/* 9. Footer with Cursive Logo & Back to Top */}
      <Footer />
    </main>
  );
}

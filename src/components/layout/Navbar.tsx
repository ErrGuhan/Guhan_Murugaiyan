"use client";

import { useState, useEffect } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowUpRight, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero is approx window.innerHeight. When scrolled past 85vh, switch to dark header theme
      const threshold = window.innerHeight * 0.85;
      setIsDarkSection(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "ABOUT", href: "#about" },
    { label: "EXPERTISE", href: "#expertise" },
    { label: "CREDENTIALS", href: "#credentials" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
          isDarkSection
            ? "bg-[#090a0e]/85 backdrop-blur-md border-b border-white/10 text-white shadow-2xl py-4"
            : "bg-transparent text-[#121316]"
        }`}
      >
        {/* Left: Cursive Signature Logo (Video 00:15) */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="group flex flex-col items-start leading-none select-none"
          >
            <span className="font-script text-3xl sm:text-4xl text-inherit group-hover:text-[#D4AF37] transition-colors">
              guhan
            </span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-0.5">
              ©2026 Guhan Murugaiyan
            </span>
          </a>
        </div>

        {/* Center: Monospace Navigation (Video 00:15) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative text-xs font-mono font-medium tracking-widest uppercase py-1 transition-colors group ${
                isDarkSection
                  ? "text-neutral-300 hover:text-[#E5C583]"
                  : "text-neutral-800 hover:text-black"
              }`}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: Rotating Badge, Location & Hamburger Button (Video 00:15) */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Rotating Circular Badge Button (Video 00:15) */}
          <div className="hidden lg:block">
            <MagneticButton href="#contact" strength={0.3}>
              <div className="relative w-16 h-16 flex items-center justify-center group cursor-pointer">
                <svg
                  className="w-full h-full spin-slow"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="navCirclePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                  />
                  <text className={`text-[8.5px] font-mono tracking-[0.24em] uppercase ${
                    isDarkSection ? "fill-neutral-300" : "fill-neutral-700"
                  }`}>
                    <textPath href="#navCirclePath" startOffset="0%">
                      LET&apos;S WORK TOGETHER • LET&apos;S TALK •
                    </textPath>
                  </text>
                </svg>
                <div className={`absolute w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${
                  isDarkSection
                    ? "bg-[#E5C583] text-black"
                    : "bg-[#121316] text-white"
                }`}>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </MagneticButton>
          </div>

          {/* Location Badge with Green Pulse Dot (Video 00:15) */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>BASED IN INDIA</span>
          </div>

          {/* Two-Bar Minimal Hamburger Button (Video 00:15 & 00:24) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`w-10 h-10 flex flex-col justify-center items-center gap-1.5 p-2 rounded-full border transition-colors ${
              isDarkSection
                ? "border-white/15 text-white hover:border-[#D4AF37]"
                : "border-black/15 text-black hover:border-[#D4AF37]"
            }`}
            aria-label="Open menu"
          >
            <span className={`w-5 h-[1.5px] transition-all ${isDarkSection ? "bg-white" : "bg-black"}`} />
            <span className={`w-5 h-[1.5px] transition-all ${isDarkSection ? "bg-white" : "bg-black"}`} />
          </button>
        </div>
      </header>

      {/* Full-Screen Navigation Overlay (Exact Match from Video 00:24) */}
      <div
        className={`fixed inset-0 bg-[#090a0e] text-white z-[99990] flex flex-col justify-between p-8 sm:p-14 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-full"
        }`}
      >
        {/* Overlay Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex flex-col items-start leading-none">
            <span className="font-script text-4xl text-[#E5C583]">guhan</span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-1">
              ©2026 GUHAN MURUGAIYAN
            </span>
          </div>

          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#E5C583] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Big Menu Links (Video 00:24) */}
        <div className="flex flex-col items-center justify-center flex-1 my-8 space-y-4">
          {[
            { label: "HOME", href: "#hero" },
            { label: "ABOUT", href: "#about" },
            { label: "EXPERTISE", href: "#expertise" },
            { label: "WORK", href: "#work" },
            { label: "CREDENTIALS", href: "#credentials" },
            { label: "CONTACT", href: "#contact" },
          ].map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-syne text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-neutral-300 hover:text-[#E5C583] hover:scale-105 transition-all duration-300"
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Overlay Footer Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs font-mono">
          <div>
            <span className="text-neutral-500 uppercase block mb-1">GET IN TOUCH</span>
            <a
              href="mailto:mguhan6383@gmail.com"
              className="text-[#E5C583] hover:underline"
            >
              mguhan6383@gmail.com
            </a>
          </div>

          <div>
            <span className="text-neutral-500 uppercase block mb-1">LOCATION</span>
            <p className="text-neutral-300">Vanur, Tamil Nadu, India</p>
          </div>

          <div>
            <span className="text-neutral-500 uppercase block mb-1">SOCIAL</span>
            <a
              href="https://www.linkedin.com/in/guhan-murugaiyan"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-300 hover:text-[#E5C583] transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

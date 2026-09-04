"use client";

import { useState, useEffect } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowUpRight, Download, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      const threshold = window.innerHeight * 0.85;
      setIsDarkSection(scrollY > threshold);
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
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
          isDarkSection
            ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#C9AF7C]/15 text-[#F0F0F0] shadow-2xl py-3.5"
            : isScrolled
            ? "bg-[#F1E8E0]/95 backdrop-blur-md border-b border-[#0C0C0C]/10 text-[#0C0C0C] shadow-sm py-3.5"
            : "bg-transparent text-[#0C0C0C] py-5"
        }`}
      >
        {/* Left: Cursive Monogram Logo & Copyright (Part 3) */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="group flex flex-col items-start leading-none select-none"
          >
            <span className="font-script text-3xl sm:text-4xl text-inherit group-hover:text-[#C9AF7C] transition-colors">
              guhan
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#7A7A7A] uppercase mt-0.5">
              ©2026 Guhan Murugaiyan
            </span>
          </a>
        </div>

        {/* Center: Nav Links with Expanding-Circle Hover (Part 3) */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`circle-hover-parent px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-widest uppercase transition-all duration-300 ${
                isDarkSection
                  ? "text-[#F0F0F0] hover:text-[#0A0A0A] [--circle-bg:#C9AF7C]"
                  : "text-[#0C0C0C] hover:text-[#F1E8E0] [--circle-bg:#0C0C0C]"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Resume CTA (Part 9: linking to /resume.pdf) */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download Guhan's Resume (PDF)"
            className={`circle-hover-parent ml-3 px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-all duration-300 ${
              isDarkSection
                ? "border-[#C9AF7C]/40 text-[#C9AF7C] hover:text-[#0A0A0A] [--circle-bg:#C9AF7C]"
                : "border-[#0C0C0C]/30 text-[#0C0C0C] hover:text-[#F1E8E0] [--circle-bg:#0C0C0C]"
            }`}
          >
            <Download className="w-3 h-3" />
            <span>RESUME</span>
          </a>
        </nav>

        {/* Right: Rotating Badge & Hamburger Button (Part 3 & 4) */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Rotating Circular Badge Button with fixed arrow inside */}
          <div className="hidden lg:block">
            <MagneticButton href="#contact" strength={0.25}>
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
                  <text
                    className={`text-[8.5px] font-mono tracking-[0.24em] uppercase ${
                      isDarkSection ? "fill-[#C9AF7C]" : "fill-[#0C0C0C]"
                    }`}
                  >
                    <textPath href="#navCirclePath" startOffset="0%">
                      LET&apos;S WORK TOGETHER • LET&apos;S TALK •
                    </textPath>
                  </text>
                </svg>
                <div
                  className={`absolute w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${
                    isDarkSection
                      ? "bg-[#C9AF7C] text-[#0A0A0A]"
                      : "bg-[#0C0C0C] text-[#F1E8E0]"
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </MagneticButton>
          </div>

          {/* Two-Bar Minimal Hamburger Button for Mobile (Part 3) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`w-10 h-10 flex flex-col justify-center items-center gap-1.5 p-2 rounded-full border transition-colors md:hidden ${
              isDarkSection
                ? "border-white/15 text-white hover:border-[#C9AF7C]"
                : "border-black/15 text-black hover:border-[#C9AF7C]"
            }`}
            aria-label="Open navigation menu"
          >
            <span
              className={`w-5 h-[1.5px] transition-all ${
                isDarkSection ? "bg-white" : "bg-[#0C0C0C]"
              }`}
            />
            <span
              className={`w-5 h-[1.5px] transition-all ${
                isDarkSection ? "bg-white" : "bg-[#0C0C0C]"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-Screen Navigation Overlay (Part 3) */}
      <div
        className={`fixed inset-0 bg-[#0A0A0A] text-[#F0F0F0] z-[99990] flex flex-col justify-between p-8 sm:p-14 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-full"
        }`}
      >
        {/* Overlay Top Header */}
        <div className="flex items-center justify-between border-b border-[#C9AF7C]/15 pb-6">
          <div className="flex flex-col items-start leading-none">
            <span className="font-script text-4xl text-[#C9AF7C]">guhan</span>
            <span className="text-[10px] font-mono tracking-widest text-[#7A7A7A] uppercase mt-1">
              ©2026 GUHAN MURUGAIYAN
            </span>
          </div>

          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C9AF7C] hover:text-[#C9AF7C] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Overlay Navigation Links */}
        <div className="flex flex-col items-center justify-center flex-1 my-8 space-y-4">
          {[
            { label: "WORK", href: "#work" },
            { label: "ABOUT", href: "#about" },
            { label: "EXPERTISE", href: "#expertise" },
            { label: "CREDENTIALS", href: "#credentials" },
            { label: "CONTACT", href: "#contact" },
          ].map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-neutral-300 hover:text-[#C9AF7C] hover:scale-105 transition-all duration-300"
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full border border-[#C9AF7C] text-xs font-mono font-semibold tracking-widest text-[#C9AF7C] hover:bg-[#C9AF7C] hover:text-black transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            DOWNLOAD RESUME
          </a>
        </div>

        {/* Overlay Footer Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#C9AF7C]/15 text-xs font-mono">
          <div>
            <span className="text-[#7A7A7A] uppercase block mb-1">GET IN TOUCH</span>
            <a
              href="mailto:mguhan6383@gmail.com"
              className="text-[#C9AF7C] hover:underline"
            >
              mguhan6383@gmail.com
            </a>
          </div>

          <div>
            <span className="text-[#7A7A7A] uppercase block mb-1">LOCATION</span>
            <p className="text-[#F0F0F0]">Vanur, Tamil Nadu, India</p>
          </div>

          <div>
            <span className="text-[#7A7A7A] uppercase block mb-1">CONNECT</span>
            <a
              href="https://www.linkedin.com/in/guhanmurugaiyan"
              target="_blank"
              rel="noreferrer"
              className="text-[#F0F0F0] hover:text-[#C9AF7C] transition-colors"
            >
              LinkedIn / guhanmurugaiyan ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

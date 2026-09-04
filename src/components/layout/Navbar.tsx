"use client";

import { useState, useEffect } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import LiquidGlass from "@/components/ui/LiquidGlass";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "ABOUT", href: "#about" },
    { label: "EXPERTISE", href: "#expertise" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "py-3 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        {/* Left: Brand Identity / Signature */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="group flex flex-col items-start leading-none font-syne font-extrabold tracking-tighter"
          >
            <span className="text-xl md:text-2xl tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-[#D4AF37] transition-colors">
              GUHAN M.
            </span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-0.5">
              CREATIVE ARCHITECT
            </span>
          </a>
        </div>

        {/* Center: Desktop Liquid Glass Dock Navigation */}
        <nav className="hidden md:flex items-center">
          <LiquidGlass
            shape="pill"
            tint="obsidian"
            refractionStrength={0.7}
            className="px-6 py-2 flex items-center gap-8 border border-white/15"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-xs font-mono font-medium tracking-widest text-neutral-300 hover:text-[#FFDF73] transition-colors uppercase group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </LiquidGlass>
        </nav>

        {/* Right: Action & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <MagneticButton href="#contact">
              <LiquidGlass
                shape="pill"
                tint="gold"
                refractionStrength={0.5}
                className="px-5 py-2 text-xs font-mono tracking-wider font-bold uppercase text-white hover:text-black hover:bg-[#D4AF37] transition-all flex items-center gap-1.5"
              >
                LET&apos;S TALK <ArrowUpRight className="w-3.5 h-3.5" />
              </LiquidGlass>
            </MagneticButton>
          </div>

          <MagneticButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <LiquidGlass
              shape="circle"
              tint="obsidian"
              className="w-11 h-11 flex items-center justify-center hover:border-[#D4AF37] transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-[#D4AF37]" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-200" />
              )}
            </LiquidGlass>
          </MagneticButton>
        </div>
      </header>

      {/* Fullscreen Overlay Menu (Reference Video 00:24) */}
      <div
        className={`fixed inset-0 bg-[#0A0A0A] text-white z-40 flex flex-col justify-between p-8 md:p-16 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-full"
        }`}
      >
        <div className="pt-20 flex flex-col items-center justify-center flex-1 space-y-4">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-center gap-4 text-4xl sm:text-6xl md:text-8xl font-syne font-extrabold tracking-tight hover:text-[#FFDF73] transition-all transform hover:scale-105"
            >
              <span className="text-xs sm:text-base font-mono text-[#D4AF37] tracking-widest opacity-60">
                0{idx + 1}
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 text-xs font-mono text-neutral-400">
          <div className="mb-2 sm:mb-0">
            BASED IN TAMIL NADU, INDIA · AVAILABLE GLOBALLY
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/ErrGuhan"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href="mailto:dev@campuscart.com"
              className="hover:text-white transition-colors"
            >
              EMAIL
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

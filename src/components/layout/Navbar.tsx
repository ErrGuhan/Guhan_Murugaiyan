"use client";

import { useState, useEffect } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import {
  ArrowUpRight,
  Download,
  X,
  Briefcase,
  User,
  Zap,
  Award,
  Mail,
} from "lucide-react";

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

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const [copied, setCopied] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("mguhan6383@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    {
      num: "01",
      label: "WORK",
      subtitle: "FEATURED CASE STUDIES",
      href: "#work",
      tag: "ARC 01",
      accent: "#FFE600",
      icon: Briefcase,
    },
    {
      num: "02",
      label: "ABOUT",
      subtitle: "CHARACTER ORIGIN & CREED",
      href: "#about",
      tag: "PROFILE",
      accent: "#00F0FF",
      icon: User,
    },
    {
      num: "03",
      label: "EXPERTISE",
      subtitle: "TECHNICAL SKILLS & ARSENAL",
      href: "#expertise",
      tag: "SKILLS",
      accent: "#FFE600",
      icon: Zap,
    },
    {
      num: "04",
      label: "CREDENTIALS",
      subtitle: "EXPERIENCE & ROADMAP",
      href: "#credentials",
      tag: "CAREER",
      accent: "#00F0FF",
      icon: Award,
    },
    {
      num: "05",
      label: "CONTACT",
      subtitle: "DISPATCH TERMINAL",
      href: "#contact",
      tag: "COMM",
      accent: "#FFE600",
      icon: Mail,
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-8 md:px-12 flex items-center justify-between transition-all duration-300 ${
          isDarkSection
            ? "bg-[#0B0B0F]/95 backdrop-blur-md border-b-[3px] border-black text-white py-3 shadow-[0_4px_0px_#000000]"
            : isScrolled
            ? "bg-[#FFFDF7]/95 backdrop-blur-md border-b-[3px] border-black text-black py-3 shadow-[0_4px_0px_#000000]"
            : "bg-transparent text-black py-5"
        }`}
      >
        {/* Left: Manga Title / Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="group flex items-center gap-2.5 select-none"
          >
            <div className="px-2.5 py-1 bg-[#FFE600] text-black border-[3px] border-black shadow-[3px_3px_0px_#000000] font-display font-black text-xl tracking-tight -rotate-2 group-hover:rotate-0 transition-transform">
              GUHAN
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-inherit">
                PORTFOLIO <span className="text-[#FFE600] drop-shadow-[1px_1px_0px_#000] font-black">⚡</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase mt-0.5">
                ARC &apos;26 // DEV
              </span>
            </div>
          </a>
        </div>

        {/* Center: Comic Capsule Nav Links */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3 bg-black/5 dark:bg-white/5 p-1.5 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_#000000] backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`comic-btn px-3.5 py-1.5 rounded-lg text-xs font-mono font-black tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                isDarkSection
                  ? "bg-[#1A1A24] text-white hover:bg-[#FFE600] hover:text-black"
                  : "bg-[#FFFDF7] text-black hover:bg-[#FFE600] hover:text-black"
              }`}
            >
              <span>{link.label}</span>
              <span className="text-[9px] opacity-70 font-semibold">{link.tag}</span>
            </a>
          ))}

          {/* Resume CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download Guhan's Resume (PDF)"
            className="comic-btn ml-1 px-3.5 py-1.5 rounded-lg bg-[#FFE600] text-black font-mono font-black text-xs tracking-wider uppercase flex items-center gap-1.5 hover:bg-[#00F0FF]"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>RESUME</span>
          </a>
        </nav>

        {/* Right: Manga Rotating Dial & Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Rotating Circular Manga Badge */}
          <div className="hidden lg:block">
            <MagneticButton href="#contact" strength={0.25}>
              <div className="relative w-14 h-14 flex items-center justify-center group cursor-pointer">
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
                    className={`text-[9px] font-mono font-black tracking-[0.22em] uppercase ${
                      isDarkSection ? "fill-[#FFE600]" : "fill-black"
                    }`}
                  >
                    <textPath href="#navCirclePath" startOffset="0%">
                      LET&apos;S WORK • LET&apos;S TALK • MISSION •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute w-7 h-7 rounded-full bg-[#FFE600] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </MagneticButton>
          </div>

          {/* Manga 2-Bar Comic Hamburger Button for Mobile */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="comic-btn w-10 h-10 flex flex-col justify-center items-center gap-1.5 p-2 rounded-xl bg-[#FFE600] text-black md:hidden"
            aria-label="Open navigation menu"
          >
            <span className="w-5 h-[2.5px] bg-black rounded-full" />
            <span className="w-5 h-[2.5px] bg-black rounded-full" />
          </button>
        </div>
      </header>

      {/* Full-Screen Manga Panel Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-[#0B0B0F] text-white z-[99990] flex flex-col justify-between p-5 sm:p-8 md:p-12 overflow-y-auto no-scrollbar transition-all duration-300 bg-halftone-dark select-none ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-full"
        }`}
      >
        {/* Overlay Top Header */}
        <div className="flex items-center justify-between border-b-[3px] border-black pb-4 max-w-md w-full mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="px-3 py-1 bg-[#FFE600] text-black border-[3px] border-black shadow-[3px_3px_0px_#000000] font-display font-black text-xl -rotate-2">
              GUHAN
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xs font-mono font-black tracking-widest text-[#FFE600] uppercase">
                // CHAPTER SELECT
              </span>
              <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase mt-0.5">
                PORTFOLIO &apos;26 DIRECTORY
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(false)}
            className="comic-btn px-3 py-1.5 rounded-xl bg-[#FF2A55] text-white border-[2.5px] border-black shadow-[3px_3px_0px_#000000] font-mono font-black text-xs flex items-center gap-1.5 hover:bg-[#FFE600] hover:text-black transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4 stroke-[3]" />
            <span>CLOSE</span>
          </button>
        </div>

        {/* Overlay Navigation Links: Comic Book Chapter Panels */}
        <div className="flex flex-col items-center justify-center flex-1 my-5 space-y-2.5 max-w-md w-full mx-auto">
          {navLinks.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="comic-card w-full p-3 sm:p-3.5 rounded-2xl bg-[#14141E] text-white border-[3px] border-black shadow-[4px_4px_0px_#000000] flex items-center justify-between group hover:bg-[#FFE600] hover:text-black transition-all active:translate-x-0.5 active:translate-y-0.5"
                style={{ transitionDelay: `${idx * 25}ms` }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Category Icon Badge */}
                  <div
                    className="w-10 h-10 rounded-xl border-[2px] border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: item.accent, color: "#000" }}
                  >
                    <IconComp className="w-5 h-5 stroke-[2.5]" />
                  </div>

                  {/* Title & Explanatory Subtitle */}
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs font-black text-[#FFE600] group-hover:text-black">
                        {item.num}
                      </span>
                      <span className="font-display font-black text-2xl tracking-tight uppercase leading-none">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-neutral-400 group-hover:text-black/80 font-bold uppercase mt-1 truncate">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                {/* Right: Tag & Action Arrow */}
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded bg-black/70 text-[#FFE600] group-hover:bg-black group-hover:text-[#FFE600] border border-black uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-white text-black border-[2px] border-black shadow-[1.5px_1.5px_0px_#000000] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
              </a>
            );
          })}

          {/* Download Resume Hero Action */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="comic-btn w-full mt-1.5 py-3.5 px-4 rounded-2xl bg-[#00F0FF] text-black font-mono font-black text-xs sm:text-sm tracking-wider uppercase border-[3px] border-black shadow-[4px_4px_0px_#000000] flex items-center justify-center gap-2 hover:bg-[#FFE600] transition-colors"
          >
            <Download className="w-4 h-4 stroke-[3]" />
            <span>DOWNLOAD RESUME (PDF)</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-black text-[#00F0FF] font-mono font-bold">
              2026 VER
            </span>
          </a>
        </div>

        {/* Overlay Footer Info Cards */}
        <div className="w-full max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t-[3px] border-black text-xs font-mono pb-8 sm:pb-4">
          {/* Quick Copy Email Card */}
          <div
            onClick={copyEmail}
            className="comic-card p-2.5 rounded-xl bg-[#14141E] border-[2.5px] border-black shadow-[3px_3px_0px_#000000] flex items-center justify-between cursor-pointer hover:border-[#FFE600] group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#FFE600] text-black border-[1.5px] border-black flex items-center justify-center flex-shrink-0">
                <Mail className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-[#FFE600] font-black uppercase block leading-none">
                  EMAIL DISPATCH
                </span>
                <span className="text-white text-[11px] font-bold truncate block mt-0.5">
                  mguhan6383@gmail.com
                </span>
              </div>
            </div>
            <span className="text-[9px] font-mono font-black px-2 py-1 rounded bg-white text-black border border-black flex-shrink-0 ml-1.5 group-hover:bg-[#FFE600]">
              {copied ? "COPIED!" : "COPY"}
            </span>
          </div>

          {/* Quick LinkedIn Connect */}
          <a
            href="https://www.linkedin.com/in/guhanmurugaiyan"
            target="_blank"
            rel="noreferrer"
            className="comic-card p-2.5 rounded-xl bg-[#14141E] border-[2.5px] border-black shadow-[3px_3px_0px_#000000] flex items-center justify-between hover:border-[#00F0FF] group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#00F0FF] text-black border-[1.5px] border-black flex items-center justify-center flex-shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-[#00F0FF] font-black uppercase block leading-none">
                  LINKEDIN PROFILE
                </span>
                <span className="text-white text-[11px] font-bold truncate block mt-0.5">
                  /in/guhanmurugaiyan
                </span>
              </div>
            </div>
            <span className="text-[9px] font-mono font-black px-2 py-1 rounded bg-[#00F0FF] text-black border border-black flex-shrink-0 ml-1.5 group-hover:bg-[#FFE600]">
              CONNECT
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

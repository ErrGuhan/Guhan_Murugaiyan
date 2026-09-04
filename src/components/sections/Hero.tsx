"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Staggered reveal for hero text elements
      gsap.from(".hero-fade", {
        y: 45,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.2,
      });


    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-32 pb-8 px-6 md:px-12 bg-[#F4F0E6] text-[#121316] overflow-hidden select-none"
    >
      {/* SVG Liquid Distortion Filter for Wavy Text Effect (Exact Match from Video 00:25 - 00:30) */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-wave-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035 0.08"
              numOctaves="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="8s"
                values="0.035 0.08; 0.065 0.12; 0.035 0.08"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" />
          </filter>
        </defs>
      </svg>

      {/* Top Meta Line (Video 00:15) */}
      <div className="w-full flex justify-between items-center hero-fade opacity-80 text-xs font-mono tracking-widest uppercase text-neutral-600">
        <span>PORTFOLIO &apos;26</span>
        <span className="hidden sm:inline-block">AI &amp; CREATIVE ENGINEERING</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          AVAILABLE FOR CONTRACTS
        </span>
      </div>

      {/* Main Massive Editorial Typography (Video 00:15 & 00:25) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-6 md:my-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
        <h1
          ref={headlineRef}
          className="font-syne font-black uppercase flex flex-col items-center text-[#121316] w-full"
        >
          {/* CREATIVE with Liquid Wavy Distortion on Hover (Video 00:25 - 00:30) */}
          <span
            className="hero-fade liquid-text text-[clamp(2.6rem,8.8vw,7.4rem)] leading-[0.88] tracking-tight cursor-default transition-all duration-300 hover:[filter:url(#liquid-wave-filter)]"
            data-cursor="pointer"
          >
            CREATIVE
          </span>

          {/* AI DEVELOPER (Video 00:15) */}
          <span className="hero-fade text-[clamp(2.1rem,7vw,5.8rem)] leading-[0.95] tracking-tight mt-2 text-neutral-900 font-extrabold">
            DEVELOPER
          </span>
        </h1>

        {/* Sub-Badges / Capability Pills (Video 00:15) */}
        <div className="hero-fade mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono tracking-widest uppercase text-neutral-700 font-semibold">
          <span className="hover:text-black transition-colors cursor-default">
            VISUALS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="hover:text-black transition-colors cursor-default">
            CODE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="hover:text-black transition-colors cursor-default">
            EXPERIENCE
          </span>
        </div>
      </div>

      {/* Bottom Row: Copyright, Animated Scroll Prompt & Location (Video 00:15) */}
      <div className="w-full flex items-end justify-between border-t border-neutral-900/15 pt-6 text-xs font-mono tracking-wider text-neutral-600">
        {/* Left */}
        <div className="hero-fade">
          <span className="font-semibold text-neutral-900">©2026 GUHAN</span>
          <span className="hidden md:inline-block ml-2 text-neutral-500">
            / ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Center: Scroll to Explore with Mouse Icon (Video 00:15) */}
        <div className="hero-fade flex flex-col items-center gap-2 cursor-pointer group">
          <a
            href="#about"
            className="flex flex-col items-center gap-1.5 group-hover:text-black transition-colors"
          >
            <span className="text-[11px] tracking-widest uppercase">
              SCROLL TO EXPLORE
            </span>
            <div className="w-4 h-6 rounded-full border border-neutral-800/40 flex justify-center pt-1 group-hover:border-[#D4AF37] transition-colors">
              <span className="w-1 h-1.5 rounded-full bg-neutral-800 group-hover:bg-[#D4AF37] animate-bounce" />
            </div>
          </a>
        </div>

        {/* Right */}
        <div className="hero-fade text-right">
          <span className="hidden sm:inline-block">BASED IN </span>
          <span className="font-semibold text-neutral-900">INDIA</span>
        </div>
      </div>
    </section>
  );
}

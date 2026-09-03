"use client";

import { useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Staggered reveal for headline and hero elements
      gsap.from(".hero-element-fade", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });

      // Parallax effect on scroll
      gsap.to(".hero-parallax-badge", {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-32 pb-8 px-6 md:px-12 bg-[#F5F2EB] text-[#111111] overflow-hidden"
    >
      {/* SVG Liquid Distortion Filter for Wavy Text Effect (Reference 00:25 - 00:30) */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.08"
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="10s"
                values="0.04 0.08; 0.07 0.12; 0.04 0.08"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" />
          </filter>
        </defs>
      </svg>

      {/* Top spacing */}
      <div className="w-full flex justify-between items-center hero-element-fade opacity-80 text-xs font-mono tracking-widest uppercase">
        <span className="text-neutral-600">PORTFOLIO &apos;26</span>
        <span className="hidden sm:inline-block text-neutral-600">
          AI & CREATIVE ENGINEERING
        </span>
        <span className="text-neutral-600">AVAILABLE FOR CONTRACTS</span>
      </div>

      {/* Main Dramatic Typography */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-8 md:my-14 select-none">
        <h1
          ref={headlineRef}
          className="font-syne font-black text-[16vw] leading-[0.82] tracking-tighter uppercase flex flex-col items-center"
        >
          {/* CREATIVE with hover liquid wavy effect */}
          <span
            className="hero-element-fade liquid-text cursor-default transition-all duration-300 hover:[filter:url(#liquid-filter)] hover:scale-[1.02]"
            data-cursor="pointer"
          >
            CREATIVE
          </span>

          {/* DEVELOPER */}
          <span className="hero-element-fade text-[14vw] tracking-tight mt-1 text-neutral-900 font-extrabold">
            DEVELOPER
          </span>
        </h1>

        {/* Sub-Badges / Specialties (Reference 00:15) */}
        <div className="hero-element-fade mt-6 md:mt-8 flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-mono tracking-widest uppercase text-neutral-700 font-semibold">
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

      {/* Floating Rotating Badge (Reference Video 00:15 - 00:35) */}
      <div className="absolute right-6 sm:right-12 md:right-16 top-1/2 -translate-y-1/2 hero-parallax-badge z-20 hidden sm:block">
        <MagneticButton href="#contact" strength={0.4}>
          <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center group cursor-pointer">
            {/* Spinning Circular Text SVG */}
            <svg
              className="w-full h-full spin-slow"
              viewBox="0 0 140 140"
            >
              <path
                id="circlePath"
                d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                fill="none"
              />
              <text className="text-[10.5px] font-mono tracking-[0.26em] uppercase fill-neutral-800">
                <textPath href="#circlePath" startOffset="0%">
                  · LET&apos;S WORK TOGETHER · LET&apos;S WORK TOGETHER
                </textPath>
              </text>
            </svg>

            {/* Center Arrow Circle */}
            <div className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full bg-neutral-900 text-white flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:scale-110 transition-all duration-300 shadow-md">
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </MagneticButton>
      </div>

      {/* Bottom Row Information & Scroll Indicator */}
      <div className="w-full flex items-end justify-between border-t border-neutral-900/15 pt-6 text-xs font-mono tracking-wider text-neutral-600">
        {/* Left */}
        <div className="hero-element-fade">
          <span className="font-semibold text-neutral-900">©2026 GUHAN</span>
          <span className="hidden md:inline-block ml-2 text-neutral-500">
            / ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Center: Animated Scroll Prompt */}
        <div className="hero-element-fade flex flex-col items-center gap-2 cursor-pointer group">
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
        <div className="hero-element-fade text-right">
          <span className="hidden sm:inline-block">BASED IN </span>
          <span className="font-semibold text-neutral-900">INDIA</span>
        </div>
      </div>
    </section>
  );
}

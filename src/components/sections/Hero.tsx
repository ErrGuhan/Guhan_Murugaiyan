"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const rafId = useRef<number | null>(null);

  useGSAP(
    () => {
      // 1. Kinetic squeeze reveal on display words (Part 4)
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        ".squeeze-word",
        {
          letterSpacing: "-0.14em",
          opacity: 0,
          scaleX: 0.85,
          y: 35,
        },
        {
          letterSpacing: "-0.03em",
          opacity: 1,
          scaleX: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.14,
          ease: "power4.out",
        }
      );

      // 2. Tagline, badges & exploration prompt staggered entrance
      tl.from(
        ".hero-stagger",
        {
          y: 25,
          opacity: 0,
          stagger: 0.09,
          duration: 0.85,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // 3. Smooth fade out of hero bottom prompt on scroll so it cleanly disappears before reaching nav
      gsap.to(".hero-bottom-row", {
        opacity: 0,
        y: -15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "8% top",
          end: "35% top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  // Dynamic Liquid Distortion Hover Effect (Part 4 signature interaction)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const headline = headlineRef.current;
    const disp = dispRef.current;
    const turb = turbRef.current;
    if (!headline || !disp || !turb) return;

    let targetScale = 0;
    let currentScale = 0;
    let baseFreqX = 0.03;
    let baseFreqY = 0.05;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = headline.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width;
      const normY = (e.clientY - rect.top) / rect.height;

      // Responsive turbulence modulation based on mouse position
      baseFreqX = 0.02 + normX * 0.03;
      baseFreqY = 0.04 + normY * 0.04;
      targetScale = 16;
    };

    const handleMouseEnter = () => {
      targetScale = 16;
    };

    const handleMouseLeave = () => {
      targetScale = 0;
    };

    const animateDistortion = () => {
      // Smooth interpolation for liquid elasticity
      currentScale += (targetScale - currentScale) * 0.12;
      disp.setAttribute("scale", currentScale.toFixed(2));
      turb.setAttribute(
        "baseFrequency",
        `${baseFreqX.toFixed(4)} ${baseFreqY.toFixed(4)}`
      );

      rafId.current = requestAnimationFrame(animateDistortion);
    };

    headline.addEventListener("mousemove", handleMouseMove, { passive: true });
    headline.addEventListener("mouseenter", handleMouseEnter);
    headline.addEventListener("mouseleave", handleMouseLeave);

    rafId.current = requestAnimationFrame(animateDistortion);

    return () => {
      headline.removeEventListener("mousemove", handleMouseMove);
      headline.removeEventListener("mouseenter", handleMouseEnter);
      headline.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-32 pb-8 px-6 md:px-12 bg-[#F1E8E0] text-[#0C0C0C] overflow-hidden select-none"
    >
      {/* Dynamic SVG Liquid Distortion Filter (Part 4) */}
      <svg
        className="absolute w-0 h-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <filter id="hero-liquid-wave" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.03 0.05"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Top Meta Line: Year, Track & Status Badge (Part 4 & 9) */}
      <div className="w-full flex justify-between items-center hero-stagger text-xs font-mono tracking-widest uppercase text-[#7A7A7A]">
        <span>PORTFOLIO &apos;26</span>
        <span className="hidden sm:inline-block font-semibold">
          AI &amp; CREATIVE ARCHITECTURE
        </span>
        {/* Status Badge per Part 9: "OPEN TO AI / DATA INTERNSHIPS" */}
        <span className="flex items-center gap-1.5 text-[#0C0C0C] font-semibold bg-[#0C0C0C]/5 px-3 py-1 rounded-full border border-[#0C0C0C]/10">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          OPEN TO AI / DATA INTERNSHIPS
        </span>
      </div>

      {/* Main Massive Editorial Typography with Liquid Wave Hover (Part 4) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-6 md:my-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
        <h1
          ref={headlineRef}
          className="font-display font-black uppercase flex flex-col items-center text-[#0C0C0C] w-full cursor-default [filter:url(#hero-liquid-wave)]"
          data-cursor="pointer"
        >
          {/* Word 1: CREATIVE */}
          <span className="squeeze-word text-[clamp(2.8rem,9.5vw,8.5rem)] leading-[0.88] tracking-tight">
            CREATIVE
          </span>

          {/* Word 2: DEVELOPER */}
          <span className="squeeze-word text-[clamp(2.4rem,8.2vw,7.2rem)] leading-[0.92] tracking-tight mt-1 sm:mt-2 text-[#0C0C0C]">
            DEVELOPER
          </span>
        </h1>

        {/* Tagline Row: Expanding Circle Hover Behind Each Word (Part 4) */}
        <div className="hero-stagger mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#0C0C0C] font-semibold">
          <span className="circle-hover-parent px-3.5 py-1.5 rounded-full hover:text-[#F1E8E0] [--circle-bg:#0C0C0C] cursor-default transition-colors">
            VISUALS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9AF7C]" />
          <span className="circle-hover-parent px-3.5 py-1.5 rounded-full hover:text-[#F1E8E0] [--circle-bg:#0C0C0C] cursor-default transition-colors">
            CODE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9AF7C]" />
          <span className="circle-hover-parent px-3.5 py-1.5 rounded-full hover:text-[#F1E8E0] [--circle-bg:#0C0C0C] cursor-default transition-colors">
            EXPERIENCE
          </span>
        </div>

        {/* Resume Quick CTA (Part 9) */}
        <div className="hero-stagger mt-6">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="circle-hover-parent px-5 py-2 rounded-full border border-[#0C0C0C]/25 text-xs font-mono font-bold tracking-widest uppercase text-[#0C0C0C] hover:text-[#F1E8E0] [--circle-bg:#0C0C0C] shadow-sm flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            DOWNLOAD RESUME (PDF)
          </a>
        </div>
      </div>

      {/* Bottom Row: Copyright, Animated Scroll Prompt & Location (Part 4) */}
      <div className="hero-bottom-row w-full flex items-end justify-between border-t border-[#0C0C0C]/12 pt-6 text-xs font-mono tracking-wider text-[#7A7A7A]">
        {/* Left */}
        <div className="hero-stagger">
          <span className="font-semibold text-[#0C0C0C]">©2026 GUHAN</span>
          <span className="hidden md:inline-block ml-2 text-[#7A7A7A]">
            / ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Center: Scroll to Explore with Mouse Icon (Part 4) */}
        <div className="hero-stagger flex flex-col items-center gap-2 cursor-pointer group">
          <a
            href="#about"
            className="flex flex-col items-center gap-1.5 group-hover:text-[#0C0C0C] transition-colors"
          >
            <span className="text-[11px] tracking-widest uppercase">
              SCROLL TO EXPLORE
            </span>
            <div className="w-4 h-6 rounded-full border border-[#0C0C0C]/35 flex justify-center pt-1 group-hover:border-[#C9AF7C] transition-colors">
              <span className="w-1 h-1.5 rounded-full bg-[#0C0C0C] group-hover:bg-[#C9AF7C] animate-bounce" />
            </div>
          </a>
        </div>

        {/* Right */}
        <div className="hero-stagger text-right">
          <span className="hidden sm:inline-block text-[#7A7A7A]">BASED IN </span>
          <span className="font-semibold text-[#0C0C0C]">INDIA</span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import LiquidGlass from "@/components/ui/LiquidGlass";
import FluidShaderCanvas from "@/components/canvas/FluidShaderCanvas";
import ArchitecturalKinetic3D from "@/components/canvas/ArchitecturalKinetic3D";
import { ArrowUpRight, Sparkles } from "lucide-react";
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
      className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-32 pb-8 px-6 md:px-12 bg-[#090909] text-white overflow-hidden"
    >
      {/* 3D Fluid ShaderGradient Mesh Backdrop */}
      <FluidShaderCanvas intensity="subtle" />

      {/* Interactive 3D Architectural Kinetic Sculpture (React Three Fiber) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40 lg:opacity-65">
        <ArchitecturalKinetic3D className="w-full h-full max-w-4xl" />
      </div>

      {/* SVG Liquid Distortion Filter for Wavy Text Effect */}
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

      {/* Top status bar with Liquid Glass Pill */}
      <div className="relative z-10 w-full flex justify-between items-center hero-element-fade text-xs font-mono tracking-widest uppercase">
        <span className="text-neutral-400">PORTFOLIO &apos;26</span>
        <div className="hidden sm:block">
          <LiquidGlass
            shape="pill"
            tint="gold"
            refractionStrength={0.4}
            className="px-4 py-1.5 inline-flex items-center gap-2 text-[#FFDF73] text-[11px]"
          >
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            AI ARCHITECT &amp; CREATIVE ENGINEER
          </LiquidGlass>
        </div>
        <span className="text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          AVAILABLE FOR CONTRACTS
        </span>
      </div>

      {/* Main Dramatic Typography */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-8 md:my-14 select-none">
        <h1
          ref={headlineRef}
          className="font-syne font-black text-[16vw] leading-[0.82] tracking-tighter uppercase flex flex-col items-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          {/* CREATIVE with hover liquid wavy effect */}
          <span
            className="hero-element-fade liquid-text cursor-default transition-all duration-300 hover:[filter:url(#liquid-filter)] hover:scale-[1.02] text-white"
            data-cursor="pointer"
          >
            CREATIVE
          </span>

          {/* DEVELOPER with Gold Gradient */}
          <span className="hero-element-fade text-[14vw] tracking-tight mt-1 text-gold-gradient font-extrabold">
            DEVELOPER
          </span>
        </h1>

        {/* Sub-Badges with Liquid Glass capsules */}
        <div className="hero-element-fade mt-6 md:mt-8 flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono tracking-widest uppercase">
          <LiquidGlass
            shape="pill"
            tint="obsidian"
            refractionStrength={0.5}
            className="px-4 py-1.5 text-neutral-300 hover:text-white transition-colors"
          >
            VISUALS
          </LiquidGlass>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <LiquidGlass
            shape="pill"
            tint="gold"
            refractionStrength={0.5}
            className="px-4 py-1.5 text-[#FFDF73] hover:text-white transition-colors"
          >
            3D &amp; SHADERS
          </LiquidGlass>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <LiquidGlass
            shape="pill"
            tint="obsidian"
            refractionStrength={0.5}
            className="px-4 py-1.5 text-neutral-300 hover:text-white transition-colors"
          >
            AUTONOMOUS AI
          </LiquidGlass>
        </div>
      </div>

      {/* Floating Rotating Badge with Liquid Glass Core */}
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
              <text className="text-[10px] font-mono tracking-[0.25em] uppercase fill-[#FFDF73]/80">
                <textPath href="#circlePath" startOffset="0%">
                  · LET&apos;S WORK TOGETHER · LET&apos;S WORK TOGETHER
                </textPath>
              </text>
            </svg>

            {/* Center Liquid Glass Arrow Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <LiquidGlass
                shape="circle"
                tint="gold"
                refractionStrength={0.8}
                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300"
              >
                <ArrowUpRight className="w-5 h-5 text-[#FFDF73] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </LiquidGlass>
            </div>
          </div>
        </MagneticButton>
      </div>

      {/* Bottom Row Information & Scroll Indicator */}
      <div className="relative z-10 w-full flex items-end justify-between border-t border-white/10 pt-6 text-xs font-mono tracking-wider text-neutral-400">
        {/* Left */}
        <div className="hero-element-fade">
          <span className="font-semibold text-white">©2026 GUHAN</span>
          <span className="hidden md:inline-block ml-2 text-neutral-500">
            / ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Center: Animated Scroll Prompt with Liquid Glass */}
        <div className="hero-element-fade flex flex-col items-center gap-2 cursor-pointer group">
          <a
            href="#about"
            className="flex flex-col items-center gap-1.5 group-hover:text-white transition-colors"
          >
            <span className="text-[11px] tracking-widest uppercase text-neutral-400 group-hover:text-[#FFDF73]">
              SCROLL TO EXPLORE
            </span>
            <LiquidGlass
              shape="pill"
              tint="obsidian"
              className="w-5 h-8 flex justify-center pt-1.5 border-white/20 group-hover:border-[#D4AF37]"
            >
              <span className="w-1 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
            </LiquidGlass>
          </a>
        </div>

        {/* Right */}
        <div className="hero-element-fade text-right">
          <span className="hidden sm:inline-block text-neutral-500">BASED IN </span>
          <span className="font-semibold text-white">INDIA</span>
        </div>
      </div>
    </section>
  );
}


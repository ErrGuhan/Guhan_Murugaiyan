"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Sparkles } from "lucide-react";
import { playSuccessChime, playHoverTick } from "@/lib/sound-effects";

const HeroReactorCanvas = dynamic(
  () => import("@/components/hero/HeroReactorCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center opacity-30">
        <div className="w-16 h-16 rounded-full border-[3px] border-black border-t-[#FFE600] animate-spin" />
      </div>
    ),
  }
);

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax for Halftone Sunburst/Background
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const bg = parallaxBgRef.current;
    if (!bg) return;

    const setX = gsap.quickTo(bg, "x", { duration: 0.5, ease: "power2.out" });
    const setY = gsap.quickTo(bg, "y", { duration: 0.5, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 28;
      const normY = (e.clientY / window.innerHeight - 0.5) * 28;
      setX(normX);
      setY(normY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(
    () => {
      // 1. Kinetic squeeze reveal on display words with comic impact
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        ".squeeze-word",
        {
          letterSpacing: "-0.12em",
          opacity: 0,
          scaleX: 0.88,
          scaleY: 1.15,
          y: 40,
        },
        {
          letterSpacing: "-0.03em",
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "elastic.out(1, 0.75)",
        }
      );

      // 2. Tagline, badges & exploration prompt staggered entrance
      tl.from(
        ".hero-stagger",
        {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // 3. Periodic idle glitch tick every 9 seconds
      const glitchInterval = setInterval(() => {
        gsap.fromTo(
          ".squeeze-word",
          { x: () => (Math.random() - 0.5) * 8 },
          { x: 0, duration: 0.08, repeat: 3, yoyo: true, ease: "rough" }
        );
      }, 9000);

      // 4. Smooth fade out of hero bottom prompt on scroll
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

      return () => clearInterval(glitchInterval);
    },
    { scope: containerRef }
  );

  const handleResumeClick = () => {
    playSuccessChime();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("achievement-unlocked", {
          detail: {
            title: "ACHIEVEMENT UNLOCKED!",
            description: "RESUME DOWNLOADED [+500 XP]",
            badge: "⚡ MISSION ASSET",
          },
        })
      );
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-32 pb-8 px-6 md:px-12 bg-[#FFFDF7] text-black overflow-hidden select-none"
    >
      {/* Parallax Halftone Background */}
      <div
        ref={parallaxBgRef}
        aria-hidden="true"
        className="absolute -inset-10 bg-halftone-light pointer-events-none opacity-80"
      />

      {/* Top Meta Line: Anime Arc, Track & Status Badge */}
      <div className="relative z-10 w-full flex flex-wrap justify-between items-center gap-3 hero-stagger text-xs font-mono font-bold tracking-wider uppercase">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-black text-[#FFE600] border-[2px] border-black shadow-[2px_2px_0px_#000000] rounded-md font-black">
            ARC &apos;26
          </span>
          <span className="text-neutral-800 font-bold">
            AI × CREATIVE ARCHITECTURE
          </span>
        </div>

        {/* Anime Level 99 Status Badge with 3px border and 4px shadow */}
        <div className="comic-card flex items-center gap-2 bg-[#FFE600] text-black px-3.5 py-1.5 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_#000000]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] border-[1.5px] border-black animate-pulse" />
          <span className="font-mono font-black text-xs tracking-wider">
            [ LVL 99 ] OPEN TO INTERNSHIPS
          </span>
        </div>
      </div>

      {/* Main Center Composition: Typography + 3D Reactor Core */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-4 sm:my-6 md:my-8 w-full max-w-6xl mx-auto px-2 sm:px-6">
        {/* Accent Tag Banner */}
        <div className="hero-stagger mb-2 inline-flex items-center gap-2 px-3.5 py-1 bg-white border-[3px] border-black shadow-[3px_3px_0px_#000000] rounded-lg -rotate-1">
          <Sparkles className="w-3.5 h-3.5 text-[#FFE600] fill-[#FFE600]" />
          <span className="font-mono font-black text-xs tracking-widest text-black uppercase">
            NEXT-GEN AUTONOMOUS SYSTEMS ARCHITECT
          </span>
        </div>

        {/* 3D WebGL Reactor Canvas */}
        <div className="hero-stagger -my-6 sm:-my-8 md:-my-10 z-20 flex justify-center drop-shadow-[6px_6px_0px_#000000]">
          <HeroReactorCanvas />
        </div>

        <h1
          ref={headlineRef}
          className="font-display font-black uppercase flex flex-col items-center text-black w-full cursor-default -mt-4 sm:-mt-6"
          data-cursor="pointer"
        >
          {/* Word 1: CREATIVE with Sliced Glitch Distortion */}
          <span
            data-text="CREATIVE"
            className="squeeze-word comic-glitch-text text-[clamp(4.2rem,14vw,11.5rem)] leading-[0.85] tracking-tight text-[#FFE600] drop-shadow-[5px_5px_0px_#000000] hover:scale-105 transition-transform duration-200"
          >
            CREATIVE
          </span>

          {/* Word 2: DEVELOPER with Sliced Glitch Distortion */}
          <span
            data-text="DEVELOPER"
            className="squeeze-word comic-glitch-text text-[clamp(3.6rem,12vw,10rem)] leading-[0.85] tracking-tight mt-1 sm:mt-2 text-white drop-shadow-[5px_5px_0px_#000000] hover:scale-105 transition-transform duration-200"
          >
            DEVELOPER
          </span>
        </h1>

        {/* Tagline Row: Comic Action Pills with 3px Borders & 4px Shadows */}
        <div className="hero-stagger mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm font-mono tracking-wider uppercase font-black">
          <div
            onMouseEnter={playHoverTick}
            className="comic-btn px-4 py-2 rounded-xl bg-white text-black border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:bg-[#FFE600] -rotate-1"
          >
            ⚡ VISUALS
          </div>
          <div
            onMouseEnter={playHoverTick}
            className="comic-btn px-4 py-2 rounded-xl bg-white text-black border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:bg-[#00F0FF] rotate-1"
          >
            ⚔️ CODE
          </div>
          <div
            onMouseEnter={playHoverTick}
            className="comic-btn px-4 py-2 rounded-xl bg-white text-black border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:bg-[#FF2A55] hover:text-white -rotate-1"
          >
            🚀 EXPERIENCE
          </div>
        </div>

        {/* Resume Quick CTA: Tactile Comic Button with Achievement Trigger */}
        <div className="hero-stagger mt-5 sm:mt-7">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleResumeClick}
            onMouseEnter={playHoverTick}
            className="comic-btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FFE600] text-black font-mono font-black text-xs sm:text-sm tracking-widest uppercase border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:bg-[#00F0FF]"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            DOWNLOAD RESUME (PDF)
          </a>
        </div>
      </div>

      {/* Bottom Row: Manga Footer Panel with 3px border top */}
      <div className="hero-bottom-row w-full flex items-end justify-between border-t-[3px] border-black pt-5 text-xs font-mono tracking-wider font-bold text-black">
        {/* Left */}
        <div className="hero-stagger flex items-center gap-2">
          <span className="px-2 py-0.5 bg-black text-white rounded text-[11px] font-black">
            ©2026
          </span>
          <span className="font-black">GUHAN MURUGAIYAN</span>
        </div>

        {/* Center: Scroll Prompt */}
        <div className="hero-stagger flex flex-col items-center gap-1.5 cursor-pointer group">
          <a
            href="#about"
            className="comic-btn flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000000] hover:bg-[#FFE600]"
          >
            <span className="text-[11px] font-mono font-black tracking-widest uppercase">
              SCROLL TO EXPLORE ↓
            </span>
          </a>
        </div>

        {/* Right */}
        <div className="hero-stagger text-right">
          <span className="px-2 py-0.5 bg-[#00F0FF] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] rounded text-[11px] font-black">
            BASE: INDIA
          </span>
        </div>
      </div>
    </section>
  );
}

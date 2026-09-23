"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Sparkles, ArrowDownRight, Send } from "lucide-react";
import { playHoverTick } from "@/lib/sound-effects";
import {
  triggerResumeDownload,
  RESUME_DOWNLOAD_URL,
  RESUME_FILENAME,
} from "@/lib/download-resume";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const [isScrollEngaged, setIsScrollEngaged] = useState(false);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile scroll & touch engagement detector
  useEffect(() => {
    const handleScrollOrTouch = () => {
      if (typeof window === "undefined" || window.innerWidth >= 768) return;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      if (rect.bottom > 50 && rect.top < window.innerHeight) {
        setIsScrollEngaged(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrollEngaged(false);
        }, 350);
      }
    };

    window.addEventListener("scroll", handleScrollOrTouch, { passive: true });
    window.addEventListener("touchmove", handleScrollOrTouch, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollOrTouch);
      window.removeEventListener("touchmove", handleScrollOrTouch);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Mouse Parallax for Halftone Sunburst/Background
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReducedMotion) return;

    const bg = parallaxBgRef.current;
    const container = containerRef.current;
    if (!bg || !container) return;

    const setX = gsap.quickTo(bg, "x", { duration: 0.5, ease: "power2.out" });
    const setY = gsap.quickTo(bg, "y", { duration: 0.5, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Only react when cursor is within the hero section
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 28;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 28;
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

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerResumeDownload({ source: "hero" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 px-4 sm:px-6 md:px-12 bg-[#FFFDF7] text-black overflow-hidden select-none"
    >
      {/* Parallax Halftone Background */}
      <div
        ref={parallaxBgRef}
        aria-hidden="true"
        className="absolute -inset-10 bg-halftone-light pointer-events-none opacity-80"
      />

      {/* Top Meta Line: Track & Status Badge */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-center sm:justify-between gap-2.5 sm:gap-3 hero-stagger text-xs font-mono font-bold tracking-wider uppercase">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-black text-[#FFE600] border-[2px] border-black shadow-[2px_2px_0px_#000000] rounded-md font-black text-[11px] sm:text-xs">
            PORTFOLIO &apos;26
          </span>
          <span className="text-neutral-800 font-bold text-[11px] sm:text-xs">
            AI & FULL-STACK ENGINEER
          </span>
        </div>

        {/* Status Badge */}
        <div className="comic-card flex items-center gap-2 bg-[#FFE600] text-black px-3 sm:px-3.5 py-1.5 rounded-xl border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] border-[1.5px] border-black animate-pulse flex-shrink-0" />
          <span className="font-mono font-black text-[10px] sm:text-xs tracking-wider">
            AVAILABLE FOR INTERNSHIPS & ROLES
          </span>
        </div>
      </div>

      {/* Main Center Composition: Clean Unobscured Typography & Workflow CTAs */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-4 sm:my-8 md:my-10 w-full max-w-5xl mx-auto px-1 sm:px-6">
        {/* Accent Tag Banner */}
        <div className="hero-stagger mb-2.5 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 bg-white border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] rounded-full -rotate-1">
          <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#FFE600] fill-[#FFE600] flex-shrink-0" />
          <span className="font-mono font-black text-[11px] sm:text-xs tracking-widest text-black uppercase">
            NEXT-GEN AUTONOMOUS SYSTEMS ARCHITECT
          </span>
        </div>

        <h1
          className="hero-creative-developer font-display font-black uppercase text-black w-full cursor-default my-1 sm:my-2"
          data-cursor="pointer"
        >
          {/* Word 1: CREATIVE */}
          <span
            onMouseEnter={() => {
              playHoverTick();
              setHoveredWord("creative");
            }}
            onMouseLeave={() => setHoveredWord(null)}
            className={cn(
              "squeeze-word comic-split-word text-[clamp(2.75rem,13.5vw,11.5rem)] leading-[0.86] tracking-tight group",
              (isScrollEngaged || hoveredWord === "creative") && "is-glitching"
            )}
            data-text="CREATIVE"
          >
            {/* Base 3D shadow & outer yellow rims */}
            <span
              aria-hidden="true"
              className="comic-word-underlay comic-word-underlay-creative"
            >
              CREATIVE
            </span>
            {/* Main Striped Fill: Cyan -> Black -> Yellow -> Black -> Coral */}
            <span className="comic-word-fill comic-fill-creative">
              CREATIVE
            </span>
            {/* Animated Glitch Slices */}
            <span aria-hidden="true" className="comic-word-slice slice-top comic-fill-creative">
              CREATIVE
            </span>
            <span aria-hidden="true" className="comic-word-slice slice-mid comic-fill-creative">
              CREATIVE
            </span>
            <span aria-hidden="true" className="comic-word-slice slice-bot comic-fill-creative">
              CREATIVE
            </span>
          </span>

          {/* Word 2: DEVELOPER */}
          <span
            onMouseEnter={() => {
              playHoverTick();
              setHoveredWord("developer");
            }}
            onMouseLeave={() => setHoveredWord(null)}
            className={cn(
              "squeeze-word comic-split-word text-[clamp(2.35rem,11.5vw,10rem)] leading-[0.86] tracking-tight mt-1 sm:mt-2 group",
              (isScrollEngaged || hoveredWord === "developer") && "is-glitching"
            )}
            data-text="DEVELOPER"
          >
            {/* Base 3D shadow & outer white/cyan rims */}
            <span
              aria-hidden="true"
              className="comic-word-underlay comic-word-underlay-developer"
            >
              DEVELOPER
            </span>
            {/* Main Striped Fill: Cyan -> Black -> White -> Black -> Coral */}
            <span className="comic-word-fill comic-fill-developer">
              DEVELOPER
            </span>
            {/* Animated Glitch Slices */}
            <span aria-hidden="true" className="comic-word-slice slice-top comic-fill-developer">
              DEVELOPER
            </span>
            <span aria-hidden="true" className="comic-word-slice slice-mid comic-fill-developer">
              DEVELOPER
            </span>
            <span aria-hidden="true" className="comic-word-slice slice-bot comic-fill-developer">
              DEVELOPER
            </span>
          </span>
        </h1>

        {/* Narrative Pitch Card */}
        <div className="hero-stagger my-3.5 sm:my-5 max-w-2xl px-4 sm:px-5 py-3 bg-white border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000] rounded-xl text-xs sm:text-sm font-mono text-neutral-800 leading-relaxed">
          <span className="text-black font-black uppercase">B.Tech CSE &apos;28</span> · Architecting Autonomous Multi-Agent Swarms, Resilient Java Backends & High-Performance Motion Experiences.
        </div>

        {/* Action Workflow CTAs */}
        <div className="hero-stagger mt-2 sm:mt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 w-full max-w-lg">
          <a
            href="#work"
            onMouseEnter={playHoverTick}
            className="comic-btn inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#FFE600] text-black font-mono font-black text-xs sm:text-sm tracking-wider uppercase border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000] hover:bg-[#00F0FF] min-h-[44px]"
          >
            <span>EXPLORE WORK</span>
            <ArrowDownRight className="w-4 h-4 stroke-[3]" />
          </a>

          <a
            href={RESUME_DOWNLOAD_URL}
            download={RESUME_FILENAME}
            onClick={handleResumeClick}
            onMouseEnter={playHoverTick}
            className="comic-btn inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white text-black font-mono font-black text-xs sm:text-sm tracking-wider uppercase border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000] hover:bg-[#FFE600] min-h-[44px]"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>RESUME (PDF)</span>
          </a>

          <a
            href="#contact"
            onMouseEnter={playHoverTick}
            className="comic-btn inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-[#13131A] text-white font-mono font-black text-xs sm:text-sm tracking-wider uppercase border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000] hover:bg-[#00E676] hover:text-black min-h-[44px]"
          >
            <span>CONTACT</span>
            <Send className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* Tech Stack Quick Pills */}
        <div className="hero-stagger mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs font-mono tracking-wider uppercase font-black">
          <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-white border-[2px] border-black shadow-[2px_2px_0px_#000000] text-black">
            ⚡ AGENTIC AI
          </span>
          <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-white border-[2px] border-black shadow-[2px_2px_0px_#000000] text-black">
            ☕ JAVA 21 & SPRING BOOT
          </span>
          <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-white border-[2px] border-black shadow-[2px_2px_0px_#000000] text-black">
            ⚛️ NEXT.JS & REACT
          </span>
          <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-white border-[2px] border-black shadow-[2px_2px_0px_#000000] text-black">
            ⚙️ SYSTEM ARCHITECTURE
          </span>
          <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-white border-[2px] border-black shadow-[2px_2px_0px_#000000] text-black">
            🗄️ POSTGRESQL & SUPABASE
          </span>
        </div>
      </div>

      {/* Bottom Row: Manga Footer Panel with 3px border top */}
      <div className="hero-bottom-row w-full flex flex-col sm:flex-row items-center justify-between border-t-[3px] border-black pt-4 sm:pt-5 gap-3 text-xs font-mono tracking-wider font-bold text-black">
        {/* Left: Copyright */}
        <div className="hero-stagger flex items-center gap-2 order-2 sm:order-1">
          <span className="px-2 py-0.5 bg-black text-white rounded text-[10px] sm:text-[11px] font-black">
            ©2026
          </span>
          <span className="font-black text-[11px] sm:text-xs">GUHAN MURUGAIYAN</span>
        </div>

        {/* Center: Scroll Prompt */}
        <div className="hero-stagger flex flex-col items-center gap-1.5 cursor-pointer group order-1 sm:order-2">
          <a
            href="#about"
            className="comic-btn flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000000] hover:bg-[#FFE600]"
          >
            <span className="text-[10px] sm:text-[11px] font-mono font-black tracking-widest uppercase">
              SCROLL TO EXPLORE ↓
            </span>
          </a>
        </div>

        {/* Right: Location */}
        <div className="hero-stagger text-center sm:text-right order-3">
          <span className="px-2 py-0.5 bg-[#00F0FF] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] rounded text-[10px] sm:text-[11px] font-black">
            BASE: INDIA
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  onComplete?: () => void;
}

const WELCOME_CHARS = "Welcome".split("");
const PORTFOLIO_CHARS = "Guhan's Portfolio".split("");

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const welcomeScreenRef = useRef<HTMLDivElement>(null);
  const portfolioScreenRef = useRef<HTMLDivElement>(null);
  const welcomeCharRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const portfolioCharRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const welcomeCaretRef = useRef<HTMLSpanElement>(null);
  const portfolioCaretRef = useRef<HTMLSpanElement>(null);
  const welcomeFlourishRef = useRef<SVGPathElement>(null);
  const portfolioFlourishRef = useRef<SVGPathElement>(null);
  const isRunning = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isRunning.current) return;
    isRunning.current = true;

    // 1. Always start from the top of the website on every refresh
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.body.classList.remove("curtains-open");
    sessionStorage.removeItem("guhan_preloader_seen");

    // Reduced motion accessibility check
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setIsDone(true);
        onComplete?.();
        ScrollTrigger.refresh();
      }, 0);
      return () => clearTimeout(timer);
    }

    // 2. Pre-calculate path lengths for underline flourishes
    if (welcomeFlourishRef.current) {
      const len = welcomeFlourishRef.current.getTotalLength();
      welcomeFlourishRef.current.style.strokeDasharray = `${len}`;
      welcomeFlourishRef.current.style.strokeDashoffset = `${len}`;
    }

    if (portfolioFlourishRef.current) {
      const len = portfolioFlourishRef.current.getTotalLength();
      portfolioFlourishRef.current.style.strokeDasharray = `${len}`;
      portfolioFlourishRef.current.style.strokeDashoffset = `${len}`;
    }

    const wChars = welcomeCharRefs.current.filter(Boolean);
    const pChars = portfolioCharRefs.current.filter(Boolean);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.add("curtains-open");

        setTimeout(() => {
          setIsDone(true);
          onComplete?.();

          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("resize"));
            ScrollTrigger.refresh();
          }
        }, 850);
      },
    });

    // --- PHASE 1: "WELCOME" CALLIGRAPHY TYPING/WRITING ANIMATION (2.2s) ---
    tl.set(welcomeCaretRef.current, { opacity: 1 })
      .to(wChars, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: 0.18,
        ease: "power2.out",
      })
      .to(welcomeCaretRef.current, { opacity: 0, duration: 0.2 }, "-=0.15")
      .to(
        welcomeFlourishRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      // Hold to enjoy the glowing finished word
      .to({}, { duration: 0.6 })
      // Fade & scale out Welcome screen
      .to(welcomeScreenRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.4,
        ease: "power2.in",
      })

      // --- PHASE 2: "GUHAN'S PORTFOLIO" CALLIGRAPHY TYPING/WRITING ANIMATION (2.4s) ---
      .set(portfolioScreenRef.current, {
        opacity: 1,
        scale: 0.98,
      })
      .set(portfolioCaretRef.current, { opacity: 1 })
      .to(pChars, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: 0.11,
        ease: "power2.out",
      })
      .to(portfolioCaretRef.current, { opacity: 0, duration: 0.2 }, "-=0.15")
      .to(
        portfolioFlourishRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.65,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      // Savor the completed gold signature
      .to({}, { duration: 0.7 })
      // Smooth fade & gentle scale out into hero
      .to(portfolioScreenRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.4,
        ease: "power2.in",
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      id="preloader-overlay"
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#0A0A0A] pointer-events-auto select-none"
    >
      {/* Curtain Panels for Split Reveal */}
      <div className="curtain curtain-top bg-[#0A0A0A]" />
      <div className="curtain curtain-bottom bg-[#0A0A0A]" />

      {/* Preloader Centered Content Container */}
      <div className="relative z-[100000] flex flex-col items-center justify-center w-full max-w-2xl sm:max-w-3xl md:max-w-4xl px-4 sm:px-6">
        {/* =======================================================================
            PHASE 1: CLEAN BOLD "WELCOME" (Pure Typography, Zero Stroke, Warm Glow)
           ======================================================================= */}
        <div
          ref={welcomeScreenRef}
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="font-script text-7xl sm:text-8xl md:text-9xl text-[#C9AF7C] italic tracking-wide flex items-baseline justify-center whitespace-nowrap drop-shadow-[0_0_25px_rgba(201,175,124,0.65)] [text-shadow:0_0_30px_rgba(201,175,124,0.6),0_0_60px_rgba(201,175,124,0.3)]">
            {WELCOME_CHARS.map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  welcomeCharRefs.current[i] = el;
                }}
                className="inline-block opacity-0 translate-y-2 scale-90 blur-sm will-change-transform"
              >
                {char}
              </span>
            ))}
            <span
              ref={welcomeCaretRef}
              className="inline-block w-1 sm:w-1.5 h-[0.75em] bg-[#FFF8E7] rounded-full ml-1.5 opacity-0 shadow-[0_0_15px_#C9AF7C,0_0_30px_#C9AF7C]"
            />
          </div>

          {/* Underline Flourish */}
          <svg
            className="w-full max-w-md sm:max-w-lg h-8 sm:h-10 mt-1 sm:mt-2 drop-shadow-[0_0_15px_rgba(201,175,124,0.6)]"
            viewBox="0 0 600 40"
          >
            <path
              ref={welcomeFlourishRef}
              d="M 120,20 C 240,34 380,30 480,18"
              fill="none"
              stroke="#C9AF7C"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* =======================================================================
            PHASE 2: CLEAN BOLD "GUHAN'S PORTFOLIO" (Zero Stroke, Warm Glow)
           ======================================================================= */}
        <div
          ref={portfolioScreenRef}
          className="absolute inset-0 flex flex-col items-center justify-center w-full opacity-0 pointer-events-none"
        >
          <div className="font-script text-5xl sm:text-7xl md:text-8xl text-[#C9AF7C] italic tracking-wide flex items-baseline justify-center whitespace-nowrap drop-shadow-[0_0_25px_rgba(201,175,124,0.65)] [text-shadow:0_0_30px_rgba(201,175,124,0.6),0_0_60px_rgba(201,175,124,0.3)]">
            {PORTFOLIO_CHARS.map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  portfolioCharRefs.current[i] = el;
                }}
                className="inline-block opacity-0 translate-y-2 scale-90 blur-sm will-change-transform"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <span
              ref={portfolioCaretRef}
              className="inline-block w-1 sm:w-1.5 h-[0.75em] bg-[#FFF8E7] rounded-full ml-1.5 opacity-0 shadow-[0_0_15px_#C9AF7C,0_0_30px_#C9AF7C]"
            />
          </div>

          {/* Underline Flourish */}
          <svg
            className="w-full max-w-lg sm:max-w-2xl h-8 sm:h-10 mt-1 sm:mt-2 drop-shadow-[0_0_15px_rgba(201,175,124,0.6)]"
            viewBox="0 0 700 40"
          >
            <path
              ref={portfolioFlourishRef}
              d="M 80,20 C 260,34 460,32 620,18"
              fill="none"
              stroke="#C9AF7C"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

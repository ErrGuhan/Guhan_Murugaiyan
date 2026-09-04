"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const welcomeScreenRef = useRef<HTMLDivElement>(null);
  const portfolioScreenRef = useRef<HTMLDivElement>(null);
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

    const welcomeChars = welcomeScreenRef.current?.querySelectorAll(".welcome-char");
    const portfolioChars = portfolioScreenRef.current?.querySelectorAll(".portfolio-char");

    // Reduced motion accessibility check
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (welcomeChars) gsap.set(welcomeChars, { clipPath: "none", opacity: 1 });
      if (portfolioChars) gsap.set(portfolioChars, { clipPath: "none", opacity: 1 });
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

    // =========================================================================
    // PHASE 1: "Welcome" Minimal Handwriting Flow (Apple Hello-Style)
    // Writes each letter sequentially from left to right with no glow
    // =========================================================================
    if (welcomeChars && welcomeChars.length) {
      tl.to(
        welcomeChars,
        {
          clipPath: "polygon(-30% -40%, 130% -40%, 115% 140%, -45% 140%)",
          opacity: 1,
          duration: 0.18,
          stagger: 0.11,
          ease: "power1.inOut",
        },
        "+=0.15"
      );
    }

    // Underline flourish sweeps smoothly underneath as last letter forms
    if (welcomeFlourishRef.current) {
      tl.to(
        welcomeFlourishRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: "power2.inOut",
        },
        "-=0.18"
      );
    }

    // Hold to appreciate the clean calligraphy
    tl.to({}, { duration: 0.65 });

    // Minimal dissolve & subtle scale out
    tl.to(welcomeScreenRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.35,
      ease: "power2.inOut",
    });

    // =========================================================================
    // PHASE 2: "Guhan's Portfolio" Minimal Handwriting Flow
    // Writes each letter sequentially from left to right with no glow
    // =========================================================================
    tl.set(portfolioScreenRef.current, {
      opacity: 1,
      scale: 0.99,
    });

    if (portfolioChars && portfolioChars.length) {
      tl.to(
        portfolioChars,
        {
          clipPath: "polygon(-30% -40%, 130% -40%, 115% 140%, -45% 140%)",
          opacity: 1,
          duration: 0.15,
          stagger: 0.075,
          ease: "power1.inOut",
        },
        "+=0.1"
      );
    }

    if (portfolioFlourishRef.current) {
      tl.to(
        portfolioFlourishRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.18"
      );
    }

    // Hold to appreciate the completed title
    tl.to({}, { duration: 0.7 });

    // Smooth dissolve into the hero curtain reveal
    tl.to(portfolioScreenRef.current, {
      opacity: 0,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.inOut",
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
            PHASE 1: "Welcome" (Minimalist Apple Hello-Style Letter Handwriting)
           ======================================================================= */}
        <div
          ref={welcomeScreenRef}
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="relative inline-block overflow-visible py-2">
            <h1
              className="font-script text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-[#C9AF7C] italic tracking-normal whitespace-nowrap px-4 py-1 select-none flex items-center justify-center"
            >
              {"Welcome".split("").map((char, index) => (
                <span
                  key={`welcome-${index}`}
                  className="welcome-char inline-block will-change-[clip-path,opacity]"
                  style={{
                    clipPath: "polygon(-30% -40%, -30% -40%, -45% 140%, -45% 140%)",
                    opacity: 0,
                  }}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          {/* Underline Flourish - Minimalist & Crisp */}
          <svg
            className="w-full max-w-sm sm:max-w-md h-6 sm:h-8 mt-1 overflow-visible"
            viewBox="0 0 600 40"
          >
            <path
              ref={welcomeFlourishRef}
              d="M 140,20 C 250,32 370,30 460,18"
              fill="none"
              stroke="#C9AF7C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* =======================================================================
            PHASE 2: "Guhan's Portfolio" (Minimalist Apple Hello-Style Letter Handwriting)
           ======================================================================= */}
        <div
          ref={portfolioScreenRef}
          className="absolute inset-0 flex flex-col items-center justify-center w-full opacity-0 pointer-events-none"
        >
          <div className="relative inline-block overflow-visible py-2">
            <h2
              className="font-script text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#C9AF7C] italic tracking-normal whitespace-nowrap px-4 py-1 select-none flex items-center justify-center"
            >
              {"Guhan's Portfolio".split("").map((char, index) =>
                char === " " ? (
                  <span key={`space-${index}`} className="inline-block w-[0.25em]">&nbsp;</span>
                ) : (
                  <span
                    key={`portfolio-${index}`}
                    className="portfolio-char inline-block will-change-[clip-path,opacity]"
                    style={{
                      clipPath: "polygon(-30% -40%, -30% -40%, -45% 140%, -45% 140%)",
                      opacity: 0,
                    }}
                  >
                    {char}
                  </span>
                )
              )}
            </h2>
          </div>

          {/* Underline Flourish - Minimalist & Crisp */}
          <svg
            className="w-full max-w-md sm:max-w-xl h-6 sm:h-8 mt-1 overflow-visible"
            viewBox="0 0 700 40"
          >
            <path
              ref={portfolioFlourishRef}
              d="M 100,20 C 270,32 450,30 600,18"
              fill="none"
              stroke="#C9AF7C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

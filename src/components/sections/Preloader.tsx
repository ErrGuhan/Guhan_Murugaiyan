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
  const welcomeTextWrapperRef = useRef<HTMLHeadingElement>(null);
  const portfolioTextWrapperRef = useRef<HTMLHeadingElement>(null);
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
      if (welcomeTextWrapperRef.current) {
        welcomeTextWrapperRef.current.style.clipPath = "none";
      }
      if (portfolioTextWrapperRef.current) {
        portfolioTextWrapperRef.current.style.clipPath = "none";
      }
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

    // --- PHASE 1: "WELCOME" LIQUID CALLIGRAPHY WRITING FLOW (NO TYPING, NO CURSOR) ---
    tl.fromTo(
      welcomeTextWrapperRef.current,
      {
        clipPath: "polygon(-10% -40%, -5% -40%, -15% 140%, -18% 140%)",
      },
      {
        clipPath: "polygon(-10% -40%, 118% -40%, 106% 140%, -18% 140%)",
        duration: 1.75,
        ease: "power1.inOut",
      }
    )
      .set(welcomeTextWrapperRef.current, { clipPath: "none" })
      .to(
        welcomeFlourishRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.65,
          ease: "power2.inOut",
        },
        "-=0.25"
      )
      // Hold to enjoy the glowing handwriting
      .to({}, { duration: 0.65 })
      // Smooth fade & scale out
      .to(welcomeScreenRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.4,
        ease: "power2.in",
      })

      // --- PHASE 2: "GUHAN'S PORTFOLIO" LIQUID CALLIGRAPHY WRITING FLOW (NO TYPING, NO CURSOR) ---
      .set(portfolioScreenRef.current, {
        opacity: 1,
        scale: 0.98,
      })
      .fromTo(
        portfolioTextWrapperRef.current,
        {
          clipPath: "polygon(-10% -40%, -5% -40%, -15% 140%, -18% 140%)",
        },
        {
          clipPath: "polygon(-10% -40%, 118% -40%, 106% 140%, -18% 140%)",
          duration: 1.95,
          ease: "power1.inOut",
        }
      )
      .set(portfolioTextWrapperRef.current, { clipPath: "none" })
      .to(
        portfolioFlourishRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: "power2.inOut",
        },
        "-=0.25"
      )
      // Hold to enjoy the signature
      .to({}, { duration: 0.7 })
      // Dissolve out into hero
      .to(portfolioScreenRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.45,
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
            PHASE 1: BOLD "WELCOME" (Continuous Liquid Writing Flow, Zero Cursor)
           ======================================================================= */}
        <div
          ref={welcomeScreenRef}
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="relative inline-block overflow-visible py-2">
            <h1
              ref={welcomeTextWrapperRef}
              className="font-script font-bold text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-[#C9AF7C] italic tracking-wide whitespace-nowrap drop-shadow-[0_0_30px_rgba(201,175,124,0.7)] [text-shadow:0_0_25px_rgba(201,175,124,0.65),0_0_55px_rgba(201,175,124,0.35)] px-6 py-1 select-none will-change-[clip-path]"
              style={{
                WebkitTextStroke: "0.8px #C9AF7C",
                clipPath: "polygon(-10% -40%, -5% -40%, -15% 140%, -18% 140%)",
              }}
            >
              Welcome
            </h1>
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
            PHASE 2: BOLD "GUHAN'S PORTFOLIO" (Continuous Liquid Writing Flow, Zero Cursor)
           ======================================================================= */}
        <div
          ref={portfolioScreenRef}
          className="absolute inset-0 flex flex-col items-center justify-center w-full opacity-0 pointer-events-none"
        >
          <div className="relative inline-block overflow-visible py-2">
            <h2
              ref={portfolioTextWrapperRef}
              className="font-script font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#C9AF7C] italic tracking-wide whitespace-nowrap drop-shadow-[0_0_30px_rgba(201,175,124,0.7)] [text-shadow:0_0_25px_rgba(201,175,124,0.65),0_0_55px_rgba(201,175,124,0.35)] px-6 py-1 select-none will-change-[clip-path]"
              style={{
                WebkitTextStroke: "0.8px #C9AF7C",
                clipPath: "polygon(-10% -40%, -5% -40%, -15% 140%, -18% 140%)",
              }}
            >
              Guhan&apos;s Portfolio
            </h2>
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

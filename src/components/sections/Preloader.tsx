"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const welcomeScreenRef = useRef<HTMLDivElement>(null);
  const portfolioScreenRef = useRef<HTMLDivElement>(null);
  const welcomeClipRectRef = useRef<SVGRectElement>(null);
  const portfolioClipRectRef = useRef<SVGRectElement>(null);
  const welcomePenRef = useRef<SVGCircleElement>(null);
  const portfolioPenRef = useRef<SVGCircleElement>(null);
  const welcomeUnderlineRef = useRef<SVGPathElement>(null);
  const portfolioUnderlineRef = useRef<SVGPathElement>(null);
  const isRunning = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isRunning.current) return;
    isRunning.current = true;

    // 1. Session persistence check & reduced motion check
    const hasSeen = sessionStorage.getItem("guhan_preloader_seen");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hasSeen === "true" || prefersReducedMotion) {
      const timer = setTimeout(() => {
        setIsDone(true);
        onComplete?.();
      }, 0);
      return () => clearTimeout(timer);
    }

    // 2. Pre-calculate path lengths for underline flourishes on mount
    if (welcomeUnderlineRef.current) {
      const len = welcomeUnderlineRef.current.getTotalLength();
      welcomeUnderlineRef.current.style.strokeDasharray = `${len}`;
      welcomeUnderlineRef.current.style.strokeDashoffset = `${len}`;
    }

    if (portfolioUnderlineRef.current) {
      const len = portfolioUnderlineRef.current.getTotalLength();
      portfolioUnderlineRef.current.style.strokeDasharray = `${len}`;
      portfolioUnderlineRef.current.style.strokeDashoffset = `${len}`;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("guhan_preloader_seen", "true");
        document.body.classList.add("curtains-open");

        setTimeout(() => {
          setIsDone(true);
          onComplete?.();
        }, 850);
      },
    });

    // --- PHASE 1: CRYSTAL-CLEAR BOLD "WELCOME" INTRO (1.8s) ---
    tl.fromTo(
      welcomeClipRectRef.current,
      { attr: { width: 0 } },
      {
        attr: { width: 720 },
        duration: 1.8,
        ease: "power2.inOut",
      }
    )
      // Calligraphy pen spark tracking the ink flow
      .fromTo(
        welcomePenRef.current,
        { attr: { cx: 40 }, opacity: 0 },
        {
          attr: { cx: 680 },
          opacity: 1,
          duration: 1.8,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(welcomePenRef.current, { opacity: 0, duration: 0.15 }, "-=0.15")
      // Underline flourish draw
      .to(
        welcomeUnderlineRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.2"
      )
      // Hold briefly
      .to({}, { duration: 0.35 })
      // Fade & scale out Welcome screen
      .to(welcomeScreenRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.35,
        ease: "power2.in",
      })

      // --- PHASE 2: BOLD ITALIC "GUHAN'S PORTFOLIO" TYPING MOTION (1.9s) ---
      .set(portfolioScreenRef.current, {
        opacity: 1,
        scale: 0.98,
      })
      .fromTo(
        portfolioClipRectRef.current,
        { attr: { width: 0 } },
        {
          attr: { width: 840 },
          duration: 1.9,
          ease: "power2.inOut",
        }
      )
      // Calligraphy pen spark tracking the portfolio ink flow
      .fromTo(
        portfolioPenRef.current,
        { attr: { cx: 40 }, opacity: 0 },
        {
          attr: { cx: 800 },
          opacity: 1,
          duration: 1.9,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(portfolioPenRef.current, { opacity: 0, duration: 0.15 }, "-=0.15")
      // Portfolio underline flourish draw
      .to(
        portfolioUnderlineRef.current,
        {
          strokeDashoffset: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.2"
      )
      // Hold to savor the completed signature
      .to({}, { duration: 0.5 })
      // Smooth fade & scale out into hero
      .to(portfolioScreenRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.35,
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
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#0A0A0A] pointer-events-auto"
    >
      {/* Curtain Panels for Split Reveal */}
      <div className="curtain curtain-top bg-[#0A0A0A]" />
      <div className="curtain curtain-bottom bg-[#0A0A0A]" />

      {/* Preloader Centered Content Container */}
      <div className="relative z-[100000] flex flex-col items-center justify-center select-none w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-4 sm:px-6">
        {/* =======================================================================
            PHASE 1: CRYSTAL-CLEAR BOLD "WELCOME" INTRO
           ======================================================================= */}
        <div
          ref={welcomeScreenRef}
          className="flex flex-col items-center justify-center w-full"
        >
          <svg
            viewBox="0 0 720 190"
            className="w-full drop-shadow-[0_0_35px_rgba(201,175,124,0.5)] overflow-visible"
          >
            <defs>
              <clipPath id="welcomeClip">
                <rect
                  ref={welcomeClipRectRef}
                  x="0"
                  y="0"
                  width="0"
                  height="190"
                />
              </clipPath>
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing Calligraphy Underlay */}
            <text
              x="50%"
              y="118"
              textAnchor="middle"
              clipPath="url(#welcomeClip)"
              className="font-script"
              fontSize="145"
              fontWeight="bold"
              fontStyle="italic"
              fill="#C9AF7C"
              stroke="#C9AF7C"
              strokeWidth="4"
              opacity="0.5"
              filter="url(#goldGlow)"
            >
              Welcome
            </text>

            {/* Crisp, Perfectly Legible Foreground Calligraphy */}
            <text
              x="50%"
              y="118"
              textAnchor="middle"
              clipPath="url(#welcomeClip)"
              className="font-script"
              fontSize="145"
              fontWeight="bold"
              fontStyle="italic"
              fill="#C9AF7C"
              stroke="#C9AF7C"
              strokeWidth="2.5"
              letterSpacing="0.04em"
            >
              Welcome
            </text>

            {/* Glowing Golden Fountain Pen Nib Spark */}
            <circle
              ref={welcomePenRef}
              cx="40"
              cy="95"
              r="4.5"
              fill="#FFF8E7"
              opacity="0"
              filter="url(#goldGlow)"
            />

            {/* Calligraphy Underline Flourish */}
            <path
              ref={welcomeUnderlineRef}
              d="M 160,148 C 290,166 430,162 560,144"
              fill="none"
              stroke="#C9AF7C"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* =======================================================================
            PHASE 2: CRYSTAL-CLEAR BOLD ITALIC "GUHAN'S PORTFOLIO" TYPING MOTION
           ======================================================================= */}
        <div
          ref={portfolioScreenRef}
          className="absolute inset-0 flex flex-col items-center justify-center w-full opacity-0 pointer-events-none"
        >
          <svg
            viewBox="0 0 840 190"
            className="w-full drop-shadow-[0_0_35px_rgba(201,175,124,0.5)] overflow-visible"
          >
            <defs>
              <clipPath id="portfolioClip">
                <rect
                  ref={portfolioClipRectRef}
                  x="0"
                  y="0"
                  width="0"
                  height="190"
                />
              </clipPath>
            </defs>

            {/* Glowing Underlay */}
            <text
              x="50%"
              y="120"
              textAnchor="middle"
              clipPath="url(#portfolioClip)"
              className="font-script"
              fontSize="115"
              fontWeight="bold"
              fontStyle="italic"
              fill="#C9AF7C"
              stroke="#C9AF7C"
              strokeWidth="3.5"
              opacity="0.5"
              filter="url(#goldGlow)"
            >
              Guhan&apos;s Portfolio
            </text>

            {/* Crisp, Perfectly Legible Bold Italic Calligraphy */}
            <text
              x="50%"
              y="120"
              textAnchor="middle"
              clipPath="url(#portfolioClip)"
              className="font-script"
              fontSize="115"
              fontWeight="bold"
              fontStyle="italic"
              fill="#C9AF7C"
              stroke="#C9AF7C"
              strokeWidth="2.2"
              letterSpacing="0.04em"
            >
              Guhan&apos;s Portfolio
            </text>

            {/* Glowing Golden Fountain Pen Nib Spark */}
            <circle
              ref={portfolioPenRef}
              cx="40"
              cy="95"
              r="4.5"
              fill="#FFF8E7"
              opacity="0"
              filter="url(#goldGlow)"
            />

            {/* Calligraphy Underline Flourish */}
            <path
              ref={portfolioUnderlineRef}
              d="M 120,150 C 330,172 530,168 720,146"
              fill="none"
              stroke="#C9AF7C"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

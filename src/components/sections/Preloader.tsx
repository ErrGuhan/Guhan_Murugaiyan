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
  const upperCurtainsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lowerCurtainsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isRunning = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isRunning.current) return;
    isRunning.current = true;

    // Start from the top on page reload
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    sessionStorage.removeItem("guhan_preloader_seen");

    const welcomeLetters = welcomeScreenRef.current?.querySelectorAll(".welcome-letter");
    const portfolioLetters = portfolioScreenRef.current?.querySelectorAll(".portfolio-letter");

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

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        onComplete?.();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("resize"));
          ScrollTrigger.refresh();
        }
      },
    });

    // =========================================================================
    // PHASE 1: "Welcome" - Bold Apple "Hello" Style Handwriting
    // Letters write sequentially one at a time from left to right with no glow
    // =========================================================================
    if (welcomeLetters && welcomeLetters.length) {
      tl.to(
        welcomeLetters,
        {
          clipPath: "polygon(-40% -60%, 200% -60%, 180% 160%, -60% 160%)",
          opacity: 1,
          duration: 0.18,
          stagger: 0.09,
          ease: "power1.inOut",
        },
        "+=0.1"
      );
      // Immediately remove clipPath once revealed to prevent any glyph clipping or damaged loops
      tl.set(welcomeLetters, { clipPath: "none" });
    }

    // Brief hold to appreciate the completed word
    tl.to({}, { duration: 0.55 });

    // Clean dissolve out of "Welcome"
    tl.to(welcomeScreenRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.25,
      ease: "power2.inOut",
    });

    // =========================================================================
    // PHASE 2: "Guhan's Portfolio" - Bold Apple "Hello" Style Handwriting
    // Letters write sequentially one at a time from left to right
    // =========================================================================
    tl.set(portfolioScreenRef.current, {
      opacity: 1,
      scale: 0.99,
    });

    if (portfolioLetters && portfolioLetters.length) {
      tl.to(
        portfolioLetters,
        {
          clipPath: "polygon(-40% -60%, 200% -60%, 180% 160%, -60% 160%)",
          opacity: 1,
          duration: 0.15,
          stagger: 0.065,
          ease: "power1.inOut",
        },
        "+=0.08"
      );
      // Immediately remove clipPath once revealed
      tl.set(portfolioLetters, { clipPath: "none" });
    }

    // Brief hold to admire
    tl.to({}, { duration: 0.6 });

    // Quick text dissolve immediately before the curtain opens
    tl.to(portfolioScreenRef.current, {
      opacity: 0,
      scale: 1.02,
      duration: 0.2,
      ease: "power2.in",
    });

    // =========================================================================
    // PHASE 3: 12-Piece Split Curtain Lifting Sequence
    // Upper 6 panels lift UP, Lower 6 panels drop DOWN in a center-out wave
    // =========================================================================
    // Sequence order: center columns (2 & 3) first, then adjacent (1 & 4), then outer (0 & 5)
    const columnOrder = [2, 3, 1, 4, 0, 5];
    const columnDelays: Record<number, number> = {
      2: 0,
      3: 0,
      1: 0.08,
      4: 0.08,
      0: 0.16,
      5: 0.16,
    };

    columnOrder.forEach((colIdx) => {
      const upper = upperCurtainsRef.current[colIdx];
      const lower = lowerCurtainsRef.current[colIdx];
      const delay = columnDelays[colIdx];

      if (upper) {
        tl.to(
          upper,
          {
            yPercent: -100,
            duration: 0.82,
            ease: "power3.inOut",
          },
          `<+=${delay}`
        );
      }

      if (lower) {
        tl.to(
          lower,
          {
            yPercent: 100,
            duration: 0.82,
            ease: "power3.inOut",
          },
          `<`
        );
      }
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
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      {/* =======================================================================
          12-Piece Split Curtain System (Upper 6 Panels & Lower 6 Panels)
         ======================================================================= */}
      <div className="fixed inset-0 z-[99990] pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`curtain-col-${i}`}
            className="absolute top-0 bottom-0"
            style={{
              left: `${(i * 100) / 6}%`,
              width: `calc(100% / 6 + 1px)`,
            }}
          >
            {/* Upper Half Panel (Lifts UP) */}
            <div
              ref={(el) => {
                upperCurtainsRef.current[i] = el;
              }}
              className="absolute top-0 left-0 w-full h-[50.5vh] bg-[#0A0A0A] origin-top will-change-transform"
            />
            {/* Bottom Half Panel (Drops DOWN) */}
            <div
              ref={(el) => {
                lowerCurtainsRef.current[i] = el;
              }}
              className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-[#0A0A0A] origin-bottom will-change-transform"
            />
          </div>
        ))}
      </div>

      {/* =======================================================================
          Centered Typography Content (Apple Hello Theme, Bold, No Glow)
         ======================================================================= */}
      <div className="relative z-[99995] flex flex-col items-center justify-center w-full max-w-5xl px-6 pointer-events-none">
        {/* PHASE 1: "Welcome" */}
        <div
          ref={welcomeScreenRef}
          className="flex flex-col items-center justify-center w-full"
        >
          <h1
            className="font-script font-bold text-[clamp(4.2rem,12vw,9rem)] text-[#C9AF7C] leading-none tracking-normal whitespace-nowrap px-4 py-2 select-none flex items-center justify-center"
          >
            {"Welcome".split("").map((char, index) => (
              <span
                key={`welcome-${index}`}
                className="welcome-letter inline-block will-change-[clip-path,opacity]"
                style={{
                  clipPath: "polygon(-40% -60%, -40% -60%, -60% 160%, -60% 160%)",
                  opacity: 0,
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* PHASE 2: "Guhan's Portfolio" */}
        <div
          ref={portfolioScreenRef}
          className="absolute inset-0 flex flex-col items-center justify-center w-full opacity-0 pointer-events-none"
        >
          <h2
            className="font-script font-bold text-[clamp(2.6rem,7.5vw,5.5rem)] text-[#C9AF7C] leading-none tracking-normal whitespace-nowrap px-4 py-2 select-none flex items-center justify-center"
          >
            {"Guhan's Portfolio".split("").map((char, index) =>
              char === " " ? (
                <span key={`space-${index}`} className="inline-block w-[0.28em]">&nbsp;</span>
              ) : (
                <span
                  key={`portfolio-${index}`}
                  className="portfolio-letter inline-block will-change-[clip-path,opacity]"
                  style={{
                    clipPath: "polygon(-40% -60%, -40% -60%, -60% 160%, -60% 160%)",
                    opacity: 0,
                  }}
                >
                  {char}
                </span>
              )
            )}
          </h2>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"welcome" | "monogram" | "done">("welcome");
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const welcomeSvgRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);
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

    // 2. Pre-calculate path lengths on mount (Part 1 performance requirement)
    const paths = pathsRef.current.filter(Boolean);
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

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

    // 3. Animated handwriting stroke-draw: length -> 0 (~1.1s)
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 1.15,
      ease: "power2.inOut",
      stagger: 0.05,
    })
      // Cross-fade/morph into solid gold fill (~220ms)
      .to(
        ".welcome-fill",
        {
          fillOpacity: 1,
          duration: 0.25,
          ease: "power1.in",
        },
        "-=0.15"
      )
      // Brief hold (~250ms)
      .to({}, { duration: 0.25 })
      // Fade & scale out Welcome SVG
      .to(welcomeSvgRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setPhase("monogram");
        },
      })
      // Cursive Monogram "g" + "PORTFOLIO '26" reveal
      .fromTo(
        ".monogram-reveal",
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        }
      )
      // Linger briefly before curtain wipe
      .to({}, { duration: 0.35 });

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
      {/* Curtain Panels for Split Reveal (Part 1 & 2) */}
      <div className="curtain curtain-top bg-[#0A0A0A]" />
      <div className="curtain curtain-bottom bg-[#0A0A0A]" />

      {/* Preloader Centered Content */}
      <div className="relative z-[100000] flex flex-col items-center justify-center select-none w-full max-w-lg px-6">
        {phase === "welcome" && (
          <div className="flex flex-col items-center justify-center">
            {/* Handcrafted Handwriting Vector SVG (Part 1) */}
            <svg
              ref={welcomeSvgRef}
              viewBox="0 0 440 150"
              className="w-full max-w-sm sm:max-w-md drop-shadow-[0_0_25px_rgba(201,175,124,0.3)]"
            >
              <g
                fill="#C9AF7C"
                fillOpacity="0"
                stroke="#C9AF7C"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="welcome-fill"
              >
                {/* W */}
                <path
                  ref={(el) => {
                    if (el) pathsRef.current[0] = el;
                  }}
                  d="M 32,54 C 36,36 46,30 54,36 C 62,42 56,76 48,102 C 58,64 74,42 86,44 C 96,48 88,78 82,102 C 94,62 110,42 122,46 C 130,50 124,68 116,80 C 114,84 120,88 128,78"
                />
                {/* e */}
                <path
                  ref={(el) => {
                    if (el) pathsRef.current[1] = el;
                  }}
                  d="M 128,78 C 134,68 144,58 152,62 C 160,66 150,88 140,94 C 132,98 128,92 136,84 C 144,76 158,76 168,82"
                />
                {/* l */}
                <path
                  ref={(el) => {
                    if (el) pathsRef.current[2] = el;
                  }}
                  d="M 168,82 C 180,70 192,30 200,28 C 206,26 208,32 202,46 C 192,68 182,94 188,98 C 194,102 204,92 214,82"
                />
                {/* c */}
                <path
                  ref={(el) => {
                    if (el) pathsRef.current[3] = el;
                  }}
                  d="M 214,82 C 222,72 232,65 240,68 C 246,70 238,88 228,94 C 222,98 220,92 228,84 C 236,78 246,78 256,82"
                />
                {/* o */}
                <path
                  ref={(el) => {
                    if (el) pathsRef.current[4] = el;
                  }}
                  d="M 256,82 C 264,70 276,66 282,72 C 288,78 282,94 272,98 C 262,102 256,88 266,74 C 274,64 288,66 296,76"
                />
                {/* m */}
                <path
                  ref={(el) => {
                    if (el) pathsRef.current[5] = el;
                  }}
                  d="M 296,76 C 300,82 294,94 292,98 C 296,84 306,70 314,72 C 322,74 318,88 316,98 C 322,84 332,70 340,72 C 348,74 344,88 342,98 C 348,90 356,82 366,84"
                />
                {/* e */}
                <path
                  ref={(el) => {
                    if (el) pathsRef.current[6] = el;
                  }}
                  d="M 366,84 C 374,72 384,66 390,70 C 396,74 390,90 382,96 C 374,100 372,92 380,84 C 388,76 400,78 410,82"
                />
                {/* Flourish underline stroke */}
                <path
                  ref={(el) => {
                    if (el) pathsRef.current[7] = el;
                  }}
                  d="M 46,118 C 146,132 284,128 406,110 C 416,108 418,114 408,116 C 316,136 156,140 48,122"
                  strokeWidth="2.4"
                />
              </g>
            </svg>
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#A8986E] uppercase mt-3">
              PORTFOLIO INTRO
            </span>
          </div>
        )}

        {phase === "monogram" && (
          /* Cursive Monogram Mark + Year Reveal */
          <div className="monogram-reveal flex flex-col items-center">
            <span className="font-script text-8xl sm:text-9xl text-[#C9AF7C] tracking-wide drop-shadow-[0_0_25px_rgba(201,175,124,0.35)]">
              g
            </span>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#A8986E] uppercase -mt-2">
              PORTFOLIO &apos;26
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

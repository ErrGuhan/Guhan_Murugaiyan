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
  const welcomePathsRef = useRef<SVGPathElement[]>([]);
  const portfolioPathsRef = useRef<SVGPathElement[]>([]);
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

    // 2. Pre-calculate path lengths for both Welcome & Portfolio on mount
    const wPaths = welcomePathsRef.current.filter(Boolean);
    wPaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    const gPaths = portfolioPathsRef.current.filter(Boolean);
    gPaths.forEach((path) => {
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

    // --- PHASE 1: BOLD "WELCOME" INTRO (1.8s duration) ---
    tl.to(wPaths, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: "power2.inOut",
      stagger: 0.05,
    })
      // Cross-fade/morph into solid gold fill (~300ms)
      .to(
        ".welcome-fill",
        {
          fillOpacity: 1,
          duration: 0.3,
          ease: "power1.in",
        },
        "-=0.25"
      )
      // Hold briefly (~350ms)
      .to({}, { duration: 0.35 })
      // Fade & scale out Welcome screen (~350ms)
      .to(welcomeScreenRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.35,
        ease: "power2.in",
      })

      // --- PHASE 2: BOLD ITALIC "GUHAN'S PORTFOLIO" TYPING MOTION (1.9s duration) ---
      .set(portfolioScreenRef.current, {
        opacity: 1,
        scale: 0.98,
      })
      .to(gPaths, {
        strokeDashoffset: 0,
        duration: 1.9,
        ease: "power2.inOut",
        stagger: 0.045,
      })
      // Morph into solid gold fill (~300ms)
      .to(
        ".portfolio-fill",
        {
          fillOpacity: 1,
          duration: 0.3,
          ease: "power1.in",
        },
        "-=0.25"
      )
      // Linger briefly before curtain wipe (~500ms)
      .to({}, { duration: 0.5 })
      // Smooth fade & gentle scale out into hero
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
            PHASE 1: BOLD WELCOME INTRO (Grand Scale, Thick 6.5px Gold Strokes)
           ======================================================================= */}
        <div
          ref={welcomeScreenRef}
          className="flex flex-col items-center justify-center w-full"
        >
          <svg
            viewBox="0 0 560 160"
            className="w-full drop-shadow-[0_0_35px_rgba(201,175,124,0.45)]"
          >
            <g
              fill="#C9AF7C"
              fillOpacity="0"
              stroke="#C9AF7C"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="skewX(-8)"
              className="welcome-fill"
            >
              {/* W */}
              <path
                ref={(el) => {
                  if (el) welcomePathsRef.current[0] = el;
                }}
                d="M 44,60 C 50,38 62,32 72,38 C 80,46 74,88 62,118 C 76,74 96,48 110,50 C 122,54 112,90 104,118 C 120,72 138,48 152,52 C 162,56 154,78 144,92 C 142,96 150,100 160,88"
              />
              {/* e */}
              <path
                ref={(el) => {
                  if (el) welcomePathsRef.current[1] = el;
                }}
                d="M 160,88 C 168,76 180,64 190,68 C 200,72 188,98 176,106 C 166,110 160,104 170,94 C 180,84 198,84 210,90"
              />
              {/* l */}
              <path
                ref={(el) => {
                  if (el) welcomePathsRef.current[2] = el;
                }}
                d="M 210,90 C 224,76 238,30 248,28 C 256,26 258,34 250,50 C 238,76 226,106 232,110 C 240,114 252,104 264,92"
              />
              {/* c */}
              <path
                ref={(el) => {
                  if (el) welcomePathsRef.current[3] = el;
                }}
                d="M 264,92 C 274,80 286,72 296,76 C 302,78 292,100 280,106 C 272,110 270,104 280,94 C 286,86 302,86 314,92"
              />
              {/* o */}
              <path
                ref={(el) => {
                  if (el) welcomePathsRef.current[4] = el;
                }}
                d="M 314,92 C 324,78 338,74 346,80 C 354,88 346,106 334,110 C 322,114 316,98 328,82 C 338,70 354,72 364,84"
              />
              {/* m */}
              <path
                ref={(el) => {
                  if (el) welcomePathsRef.current[5] = el;
                }}
                d="M 364,84 C 370,92 362,106 360,110 C 366,94 378,78 388,80 C 398,82 392,98 390,110 C 398,94 410,78 420,80 C 430,82 424,98 422,110 C 430,100 440,92 452,94"
              />
              {/* e */}
              <path
                ref={(el) => {
                  if (el) welcomePathsRef.current[6] = el;
                }}
                d="M 452,94 C 462,80 474,72 482,76 C 490,82 482,100 472,108 C 462,112 458,102 470,92 C 480,82 496,84 508,90"
              />
              {/* Flourish underline stroke */}
              <path
                ref={(el) => {
                  if (el) welcomePathsRef.current[7] = el;
                }}
                d="M 50,134 C 170,150 330,146 490,124 C 506,122 508,130 494,132 C 370,156 190,160 52,138"
                strokeWidth="4.8"
              />
            </g>
          </svg>
        </div>

        {/* =======================================================================
            PHASE 2: GUHAN'S PORTFOLIO (Bold Character in Italic, Typing Stroke Draw)
           ======================================================================= */}
        <div
          ref={portfolioScreenRef}
          className="absolute inset-0 flex flex-col items-center justify-center w-full opacity-0 pointer-events-none"
        >
          <svg
            viewBox="0 0 680 190"
            className="w-full drop-shadow-[0_0_35px_rgba(201,175,124,0.45)]"
          >
            <g
              fill="#C9AF7C"
              fillOpacity="0"
              stroke="#C9AF7C"
              strokeWidth="5.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="skewX(-11)"
              className="portfolio-fill"
            >
              {/* g */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[0] = el;
                }}
                d="M 64,68 C 50,68 38,80 38,96 C 38,112 50,120 64,120 C 78,120 86,106 86,86 L 86,136 C 86,158 66,168 50,166 C 40,164 34,158 40,154 C 46,150 58,152 66,146 C 74,140 78,130 78,116"
              />
              {/* u */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[1] = el;
                }}
                d="M 98,90 C 100,106 102,120 114,120 C 126,120 130,106 132,90 L 132,120"
              />
              {/* h */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[2] = el;
                }}
                d="M 148,52 L 148,120 C 148,102 158,92 170,92 C 182,92 184,106 184,120"
              />
              {/* a */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[3] = el;
                }}
                d="M 214,94 C 200,94 192,104 192,112 C 192,118 200,122 210,122 C 220,122 228,112 228,98 L 228,120"
              />
              {/* n */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[4] = el;
                }}
                d="M 242,96 L 242,120 C 242,104 252,94 264,94 C 276,94 278,106 278,120"
              />
              {/* ' (apostrophe) */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[5] = el;
                }}
                d="M 288,72 C 290,76 288,82 284,86"
                strokeWidth="4.8"
              />
              {/* s */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[6] = el;
                }}
                d="M 298,100 C 302,92 312,90 318,94 C 324,98 318,108 308,110 C 298,112 296,118 304,122 C 312,124 320,120 324,116"
              />

              {/* p */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[7] = el;
                }}
                d="M 354,92 L 354,148 M 354,96 C 362,88 374,88 380,94 C 386,100 384,114 374,118 C 366,120 358,118 354,114"
              />
              {/* o */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[8] = el;
                }}
                d="M 396,106 C 396,92 408,90 418,96 C 426,102 424,118 414,122 C 402,124 396,116 396,106"
              />
              {/* r */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[9] = el;
                }}
                d="M 438,98 L 438,120 C 438,104 444,96 454,96 C 458,96 462,98 464,100"
              />
              {/* t */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[10] = el;
                }}
                d="M 478,72 L 478,120 C 478,124 482,126 488,124 M 470,90 L 488,90"
              />
              {/* f */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[11] = el;
                }}
                d="M 508,60 C 502,56 496,60 496,68 L 496,144 M 490,90 L 504,90"
              />
              {/* o */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[12] = el;
                }}
                d="M 518,106 C 518,92 530,90 540,96 C 548,102 546,118 536,122 C 524,124 518,116 518,106"
              />
              {/* l */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[13] = el;
                }}
                d="M 558,54 L 558,118 C 558,122 562,124 568,122"
              />
              {/* i */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[14] = el;
                }}
                d="M 580,94 L 580,120 M 580,76 L 580,80"
              />
              {/* o */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[15] = el;
                }}
                d="M 596,106 C 596,92 608,90 618,96 C 626,102 624,118 614,122 C 602,124 596,116 596,106"
              />

              {/* Underline flourish */}
              <path
                ref={(el) => {
                  if (el) portfolioPathsRef.current[16] = el;
                }}
                d="M 50,178 C 180,192 420,188 616,168 C 630,166 632,172 618,174 C 440,196 190,200 52,182"
                strokeWidth="4.8"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}


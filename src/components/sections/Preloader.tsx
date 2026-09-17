"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isDone, setIsDone] = useState(false);
  const [progress, setProgress] = useState(0);

  // Structural & Animation Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const upperShardRef = useRef<HTMLDivElement>(null);
  const lowerShardRef = useRef<HTMLDivElement>(null);
  const slashBladeRef = useRef<HTMLDivElement>(null);
  const whiteFlashRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);
  const hudTopRef = useRef<HTMLDivElement>(null);
  const hudBottomRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);

  const mainTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const slashTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasFinished = useRef(false);

  // Climax Katana Slash & Split Shatter Opening Transition
  const triggerKatanaSlash = useCallback(() => {
    if (hasFinished.current) return;
    hasFinished.current = true;

    // Stop ongoing entrance animation
    if (mainTimelineRef.current) {
      mainTimelineRef.current.kill();
    }

    setProgress(100);

    const slashTl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        onComplete?.();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("resize"));
          ScrollTrigger.refresh();
        }
      },
    });
    slashTimelineRef.current = slashTl;

    // 1. Blade streaks diagonally across screen
    if (slashBladeRef.current) {
      slashTl.fromTo(
        slashBladeRef.current,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1.5,
          opacity: 1,
          duration: 0.18,
          ease: "power4.out",
        }
      );
    }

    // 2. High-impact white flash
    if (whiteFlashRef.current) {
      slashTl.to(
        whiteFlashRef.current,
        {
          opacity: 0.85,
          duration: 0.08,
          ease: "power2.in",
        },
        "<0.06"
      );
      slashTl.to(whiteFlashRef.current, {
        opacity: 0,
        duration: 0.12,
        ease: "power2.out",
      });
    }

    // 3. Fade out HUD & Zoom blast center text
    if (centerContentRef.current) {
      slashTl.to(
        centerContentRef.current,
        {
          scale: 1.15,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.22,
          ease: "power2.inOut",
        },
        "<"
      );
    }

    const hudElements = [hudTopRef.current, hudBottomRef.current].filter(Boolean);
    if (hudElements.length > 0) {
      slashTl.to(
        hudElements,
        {
          opacity: 0,
          duration: 0.18,
        },
        "<"
      );
    }

    // 4. Split Shatter: Diagonal Shards slide apart in opposite directions
    if (upperShardRef.current) {
      slashTl.to(
        upperShardRef.current,
        {
          xPercent: -85,
          yPercent: -105,
          rotation: -3,
          duration: 0.65,
          ease: "power4.inOut",
        },
        "<0.04"
      );
    }

    if (lowerShardRef.current) {
      slashTl.to(
        lowerShardRef.current,
        {
          xPercent: 85,
          yPercent: 105,
          rotation: 3,
          duration: 0.65,
          ease: "power4.inOut",
        },
        "<"
      );
    }

    // 5. Fade out slash blade line
    if (slashBladeRef.current) {
      slashTl.to(
        slashBladeRef.current,
        {
          opacity: 0,
          duration: 0.12,
        },
        "<0.08"
      );
    }
  }, [onComplete]);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        onComplete?.();
        return;
      }

      const progressObj = { val: 0 };

      // Master Entrance & Progression Timeline (Total ~1.3s before slash)
      const tl = gsap.timeline({
        onComplete: () => {
          triggerKatanaSlash();
        },
      });
      mainTimelineRef.current = tl;

      // Initial shockwave burst
      if (shockwaveRef.current) {
        tl.fromTo(
          shockwaveRef.current,
          { scale: 0.2, opacity: 0.8 },
          { scale: 2.8, opacity: 0, duration: 0.7, ease: "power2.out" },
          0
        );
      }

      // Entrance animation of central composition
      if (centerContentRef.current) {
        const badge = centerContentRef.current.querySelector(".p-badge");
        const title = centerContentRef.current.querySelector(".p-title");
        const sub = centerContentRef.current.querySelector(".p-sub");

        if (badge) {
          tl.fromTo(
            badge,
            { y: -20, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" },
            0.05
          );
        }

        if (title) {
          tl.fromTo(
            title,
            { scale: 1.15, opacity: 0, y: 15 },
            { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            0.1
          );
        }

        if (sub) {
          tl.fromTo(
            sub,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
            0.25
          );
        }
      }

      // Smooth counter progression (0 -> 100% across 1.1s)
      tl.to(
        progressObj,
        {
          val: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => setProgress(Math.round(progressObj.val)),
        },
        0
      );

      // Brief pause at 100% before triggering slash
      tl.to({}, { duration: 0.15 }, 1.1);

      // Safety fallback timer (2.5s max)
      const safetyTimer = setTimeout(() => {
        triggerKatanaSlash();
      }, 2500);

      return () => {
        clearTimeout(safetyTimer);
        if (tl) tl.kill();
        if (slashTimelineRef.current) slashTimelineRef.current.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [onComplete, triggerKatanaSlash, prefersReducedMotion],
    }
  );

  if (isDone || prefersReducedMotion) return null;

  return (
    <div
      id="preloader-overlay"
      ref={containerRef}
      onClick={triggerKatanaSlash}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden pointer-events-auto select-none cursor-pointer"
      title="Click anywhere to skip"
    >
      {/* 1. Impact White Flash Overlay */}
      <div
        ref={whiteFlashRef}
        className="fixed inset-0 z-[99998] bg-white pointer-events-none opacity-0 will-change-[opacity]"
      />

      {/* 2. Neon Katana Slash Blade Beam */}
      <div
        ref={slashBladeRef}
        className="fixed z-[99995] pointer-events-none opacity-0 will-change-transform"
        style={{
          top: "50%",
          left: "-25vw",
          width: "150vw",
          height: "5px",
          background:
            "linear-gradient(90deg, transparent, #FFE600, #FFFFFF, #FFE600, transparent)",
          boxShadow:
            "0 0 30px #FFE600, 0 0 60px rgba(255, 230, 0, 0.6), 0 0 15px #FFFFFF",
          transform: "translateY(-50%) rotate(-13.5deg) scaleX(0)",
        }}
      />

      {/* 3. Upper Diagonal Shard */}
      <div
        ref={upperShardRef}
        className="fixed inset-0 z-[99990] bg-[#0B0B0F] pointer-events-none will-change-transform bg-halftone-dark border-b-[3px] border-[#FFE600]"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 38%, 0% 62%)",
        }}
      />

      {/* 4. Lower Diagonal Shard */}
      <div
        ref={lowerShardRef}
        className="fixed inset-0 z-[99990] bg-[#0B0B0F] pointer-events-none will-change-transform bg-halftone-dark border-t-[3px] border-[#FFE600]"
        style={{
          clipPath: "polygon(0% 62%, 100% 38%, 100% 100%, 0% 100%)",
        }}
      />

      {/* 5. Radial Speedlines Background */}
      <div className="absolute inset-0 z-[99992] pointer-events-none overflow-hidden opacity-15">
        <div
          className="w-[200vw] h-[200vw] absolute -top-[50vw] -left-[50vw]"
          style={{
            background: `repeating-conic-gradient(
              from 0deg at 50% 50%,
              rgba(255, 230, 0, 0.25) 0deg 2.5deg,
              transparent 2.5deg 15deg,
              rgba(255, 255, 255, 0.15) 15deg 17.5deg,
              transparent 17.5deg 30deg
            )`,
          }}
        />
      </div>

      {/* 6. Kinetic Shockwave Impact Ring */}
      <div
        ref={shockwaveRef}
        className="absolute z-[99993] w-64 h-64 rounded-full border-[3px] border-[#FFE600] pointer-events-none opacity-0"
        style={{
          boxShadow: "0 0 30px #FFE600",
        }}
      />

      {/* 7. HUD Top Information Bar */}
      <div
        ref={hudTopRef}
        className="absolute top-5 sm:top-7 left-5 sm:left-8 right-5 sm:right-8 flex items-center justify-between z-[99994] pointer-events-none"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#17171C] border-[2px] border-black shadow-[2px_2px_0px_#000000] text-xs font-mono font-black text-[#FFE600]">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
          <span className="tracking-wider">PORTFOLIO &apos;26 // INITIALIZING</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#17171C] border-[2px] border-black shadow-[2px_2px_0px_#000000] text-xs font-mono font-black text-neutral-400">
          <span className="hidden sm:inline">[ CLICK ANYWHERE TO SKIP ↗ ]</span>
        </div>
      </div>

      {/* 8. Main Stage: Clean Symmetrical Presentation */}
      <div
        ref={centerContentRef}
        className="relative z-[99994] flex flex-col items-center justify-center w-full max-w-4xl px-4 pointer-events-none text-center"
      >
        <div className="p-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#FFE600] text-black border-[3px] border-black shadow-[4px_4px_0px_#000000] text-xs font-mono font-black tracking-widest uppercase mb-4 -rotate-1">
          <Sparkles className="w-4 h-4 fill-black" />
          <span>GUHAN MURUGAIYAN</span>
        </div>

        <h1
          className="p-title font-display font-black uppercase text-[clamp(2.2rem,7.2vw,5.4rem)] text-white tracking-tight leading-[0.94] drop-shadow-[6px_6px_0px_#000000]"
          style={{
            WebkitTextStroke: "2.5px #000000",
          }}
        >
          WELCOME TO <span className="text-[#FFE600]">MY PORTFOLIO</span>
        </h1>

        <div className="p-sub inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-neutral-300 font-bold tracking-widest mt-4 uppercase">
          <span className="inline-block w-2.5 h-0.5 bg-[#FFE600]" />
          <span>AI DEVELOPER & SYSTEMS ENGINEER</span>
          <span className="inline-block w-2.5 h-0.5 bg-[#FFE600]" />
        </div>
      </div>

      {/* 9. HUD Bottom Progress Bar */}
      <div
        ref={hudBottomRef}
        className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 right-6 sm:right-12 flex flex-col items-center gap-2.5 z-[99994] pointer-events-none"
      >
        {/* Clean High-Contrast Energy Meter */}
        <div className="w-full max-w-md h-3 bg-[#17171C] border-[2px] border-black shadow-[2px_2px_0px_#000000] rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-[#FFE600] rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full max-w-md text-[10px] font-mono font-black text-neutral-400 uppercase tracking-wider px-1">
          <span className="text-[#FFE600]">
            LOADING EXPERIENCE [ {progress}% ]
          </span>
          <span className="text-neutral-500">
            BASE: INDIA
          </span>
        </div>
      </div>
    </div>
  );
}

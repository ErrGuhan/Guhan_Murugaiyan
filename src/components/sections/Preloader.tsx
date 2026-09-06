"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
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

  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);

  const mainTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const slashTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasFinished = useRef(false);

  // Climax Katana Slash & Split Shatter Opening Transition
  const triggerKatanaSlash = useCallback(() => {
    if (hasFinished.current) return;
    hasFinished.current = true;

    // Stop ongoing animation
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
          duration: 0.22,
          ease: "power4.out",
        }
      );
    }

    // 2. High-impact anime white flash
    if (whiteFlashRef.current) {
      slashTl.to(
        whiteFlashRef.current,
        {
          opacity: 0.9,
          duration: 0.08,
          ease: "power2.in",
        },
        "<0.08"
      );
      slashTl.to(whiteFlashRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: "power2.out",
      });
    }

    // 3. Fade out HUD & Zoom blast center text
    const textElements = [phase1Ref.current, phase2Ref.current].filter(Boolean);
    if (textElements.length > 0) {
      slashTl.to(
        textElements,
        {
          scale: 1.45,
          opacity: 0,
          filter: "blur(12px)",
          duration: 0.3,
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
          y: -20,
          duration: 0.2,
        },
        "<"
      );
    }

    // 4. Split Shatter: Diagonal Shards violently slide apart in opposite directions
    if (upperShardRef.current) {
      slashTl.to(
        upperShardRef.current,
        {
          xPercent: -85,
          yPercent: -105,
          rotation: -4,
          duration: 0.72,
          ease: "power4.inOut",
        },
        "<0.05"
      );
    }

    if (lowerShardRef.current) {
      slashTl.to(
        lowerShardRef.current,
        {
          xPercent: 85,
          yPercent: 105,
          rotation: 4,
          duration: 0.72,
          ease: "power4.inOut",
        },
        "<"
      );
    }

    // Fade out slash blade line
    if (slashBladeRef.current) {
      slashTl.to(
        slashBladeRef.current,
        {
          opacity: 0,
          duration: 0.15,
        },
        "<0.1"
      );
    }
  }, [onComplete]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    const progressObj = { val: 0 };

    // Master Entrance & Kinetic Presentation Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        triggerKatanaSlash();
      },
    });
    mainTimelineRef.current = tl;

    // Reset initial states
    gsap.set(phase2Ref.current, { opacity: 0, xPercent: 120, skewX: 20 });
    gsap.set(phase1Ref.current, { opacity: 1, xPercent: 0, skewX: 0 });

    // Initial shockwave burst
    if (shockwaveRef.current) {
      tl.fromTo(
        shockwaveRef.current,
        { scale: 0.2, opacity: 0.8 },
        { scale: 2.8, opacity: 0, duration: 0.85, ease: "power2.out" },
        0
      );
    }

    // Smooth counter progression (0 -> 50% during Phase 1 across 2.0s)
    tl.to(
      progressObj,
      {
        val: 50,
        duration: 2.0,
        ease: "power1.inOut",
        onUpdate: () => setProgress(Math.round(progressObj.val)),
      },
      0
    );

    // Phase 1 Kinetic Slam: "WELCOME TO MY ARC"
    if (phase1Ref.current) {
      const badge = phase1Ref.current.querySelector(".p1-badge");
      const title = phase1Ref.current.querySelector(".p1-title");
      const sub = phase1Ref.current.querySelector(".p1-sub");

      if (badge) {
        tl.fromTo(
          badge,
          { y: -30, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
          0.05
        );
      }

      if (title) {
        tl.fromTo(
          title,
          { scale: 1.7, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "elastic.out(1, 0.72)" },
          0.12
        );
      }

      if (sub) {
        tl.fromTo(
          sub,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          0.45
        );
      }
    }

    // At 2.1s: Phase 1 whips away to left with speedline blur
    if (phase1Ref.current) {
      tl.to(
        phase1Ref.current,
        {
          xPercent: -130,
          skewX: -25,
          opacity: 0,
          duration: 0.35,
          ease: "power3.in",
        },
        2.1
      );
    }

    // Counter surges from 50% to 100% (Overdrive) across 1.8s
    tl.to(
      progressObj,
      {
        val: 100,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => setProgress(Math.round(progressObj.val)),
      },
      2.2
    );

    // Phase 2 Character Reveal Slam: "GUHAN MURUGAIYAN"
    if (phase2Ref.current) {
      const badge = phase2Ref.current.querySelector(".p2-badge");
      const title = phase2Ref.current.querySelector(".p2-title");
      const sub = phase2Ref.current.querySelector(".p2-sub");

      tl.to(
        phase2Ref.current,
        {
          xPercent: 0,
          skewX: 0,
          opacity: 1,
          duration: 0.55,
          ease: "back.out(1.5)",
        },
        2.3
      );

      if (badge) {
        tl.fromTo(
          badge,
          { y: -20, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)" },
          2.4
        );
      }

      if (title) {
        tl.fromTo(
          title,
          { scale: 1.4, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.65, ease: "elastic.out(1, 0.75)" },
          2.45
        );
      }

      if (sub) {
        tl.fromTo(
          sub,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
          2.7
        );
      }
    }

    // Hold Phase 2 proudly so user can take in the character title and effects, then trigger Katana Slash at ~4.5s
    tl.to({}, { duration: 1.2 }, 3.3);

    // Failsafe safety timer (5.8s max)
    const safetyTimer = setTimeout(() => {
      triggerKatanaSlash();
    }, 5800);

    return () => {
      clearTimeout(safetyTimer);
      if (tl) tl.kill();
      if (slashTimelineRef.current) slashTimelineRef.current.kill();
    };
  }, [onComplete, triggerKatanaSlash]);

  if (isDone) return null;

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
          height: "6px",
          background:
            "linear-gradient(90deg, transparent, #00F0FF, #FFFFFF, #FFE600, transparent)",
          boxShadow:
            "0 0 35px #FFE600, 0 0 60px #00F0FF, 0 0 15px #FFFFFF",
          transform: "translateY(-50%) rotate(-13.5deg) scaleX(0)",
        }}
      />

      {/* 3. Upper Diagonal Shard (Slices UP & LEFT on climax) */}
      <div
        ref={upperShardRef}
        className="fixed inset-0 z-[99990] bg-[#0B0B0F] pointer-events-none will-change-transform bg-halftone-dark"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 38%, 0% 62%)",
        }}
      >
        {/* Yellow Diagonal Cut Edge Rim */}
        <div
          className="absolute inset-0 pointer-events-none border-b-[4px] border-[#FFE600]"
          style={{
            clipPath: "polygon(0% 60.5%, 100% 36.5%, 100% 38%, 0% 62%)",
            background: "#FFE600",
            boxShadow: "0 0 20px #FFE600",
          }}
        />
      </div>

      {/* 4. Lower Diagonal Shard (Slices DOWN & RIGHT on climax) */}
      <div
        ref={lowerShardRef}
        className="fixed inset-0 z-[99990] bg-[#0B0B0F] pointer-events-none will-change-transform bg-halftone-dark"
        style={{
          clipPath: "polygon(0% 62%, 100% 38%, 100% 100%, 0% 100%)",
        }}
      >
        {/* Cyan Diagonal Cut Edge Rim */}
        <div
          className="absolute inset-0 pointer-events-none border-t-[4px] border-[#00F0FF]"
          style={{
            clipPath: "polygon(0% 62%, 100% 38%, 100% 39.5%, 0% 63.5%)",
            background: "#00F0FF",
            boxShadow: "0 0 20px #00F0FF",
          }}
        />
      </div>

      {/* 5. Radial Manga Speedlines Background */}
      <div className="absolute inset-0 z-[99992] pointer-events-none overflow-hidden animate-speedline-pulse opacity-25">
        <div
          className="w-[200vw] h-[200vw] absolute -top-[50vw] -left-[50vw]"
          style={{
            background: `repeating-conic-gradient(
              from 0deg at 50% 50%,
              rgba(255, 230, 0, 0.3) 0deg 2.5deg,
              transparent 2.5deg 12deg,
              rgba(0, 240, 255, 0.25) 12deg 14.5deg,
              transparent 14.5deg 24deg
            )`,
          }}
        />
      </div>

      {/* 6. Kinetic Shockwave Impact Ring */}
      <div
        ref={shockwaveRef}
        className="absolute z-[99993] w-64 h-64 rounded-full border-[4px] border-[#FFE600] pointer-events-none opacity-0"
        style={{
          boxShadow: "0 0 30px #FFE600",
        }}
      />

      {/* 7. HUD Top Information Bar */}
      <div
        ref={hudTopRef}
        className="absolute top-5 sm:top-7 left-5 sm:left-8 right-5 sm:right-8 flex items-center justify-between z-[99994] pointer-events-none"
      >
        {/* Left: System Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#17171C] border-[2.5px] border-black shadow-[3px_3px_0px_#000000] text-xs font-mono font-black text-[#FFE600]">
          <Zap className="w-3.5 h-3.5 fill-[#FFE600]" />
          <span className="tracking-wider">ARC &apos;26 // OVERDRIVE</span>
        </div>

        {/* Center: Bouncing Audio/Power Equalizer */}
        <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#17171C] border-[2.5px] border-black shadow-[3px_3px_0px_#000000]">
          <span className="w-1 bg-[#00F0FF] rounded-full animate-eq-1" />
          <span className="w-1 bg-[#FFE600] rounded-full animate-eq-2" />
          <span className="w-1 bg-[#FF2A55] rounded-full animate-eq-3" />
          <span className="w-1 bg-[#00E676] rounded-full animate-eq-4" />
          <span className="text-[10px] font-mono text-neutral-300 font-black ml-1.5 tracking-widest uppercase">
            SYNC 120HZ
          </span>
        </div>

        {/* Right: Power Progress Gauge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFE600] text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000000] text-xs font-mono font-black">
          <Sparkles className="w-3.5 h-3.5 fill-black" />
          <span>PWR: {progress}%</span>
        </div>
      </div>

      {/* 8. Main Stage: Dynamic Kinetic Text Presentation */}
      <div className="relative z-[99994] flex flex-col items-center justify-center w-full max-w-5xl px-4 sm:px-6 pointer-events-none text-center">
        {/* PHASE 1 (FIRST): "GUHAN MURUGAIYAN" */}
        <div
          ref={phase1Ref}
          className="absolute flex flex-col items-center justify-center w-full will-change-transform"
        >
          <div className="p1-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#FFE600] text-black border-[3px] border-black shadow-[4px_4px_0px_#000000] text-xs font-mono font-black tracking-widest uppercase mb-4 -rotate-1">
            <Sparkles className="w-4 h-4 fill-black" />
            <span>PROTAGONIST // LVL 99 ARCHITECT</span>
          </div>

          <h1
            className="p1-title font-display font-black text-[clamp(2.5rem,8.5vw,6.5rem)] text-white tracking-tight leading-[0.92] drop-shadow-[6px_6px_0px_#000000]"
            style={{
              WebkitTextStroke: "2.5px #000000",
            }}
          >
            GUHAN <span className="text-[#FFE600]">MURUGAIYAN</span>
          </h1>

          <div className="p1-sub inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#00F0FF] font-black tracking-widest mt-5 uppercase">
            <span className="inline-block w-2.5 h-0.5 bg-[#00F0FF]" />
            <span>AI DEVELOPER &amp; CREATIVE ARCHITECT</span>
            <span className="inline-block w-2.5 h-0.5 bg-[#00F0FF]" />
          </div>
        </div>

        {/* PHASE 2 (SECOND): "WELCOME TO MY ARC" */}
        <div
          ref={phase2Ref}
          className="flex flex-col items-center justify-center w-full will-change-transform"
        >
          <div className="p2-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#00F0FF] text-black border-[3px] border-black shadow-[4px_4px_0px_#000000] text-xs font-mono font-black tracking-widest uppercase mb-4 rotate-1">
            <Zap className="w-4 h-4 fill-black" />
            <span>ARC &apos;26 // PROLOGUE</span>
          </div>

          <h2
            className="p2-title font-display font-black text-[clamp(2.8rem,9.5vw,7.2rem)] text-[#FFE600] tracking-tight leading-[0.92] drop-shadow-[6px_6px_0px_#000000]"
            style={{
              WebkitTextStroke: "2.5px #000000",
            }}
          >
            WELCOME TO <span className="text-white">MY ARC</span>
          </h2>

          <div className="p2-sub inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#FFE600] font-black tracking-widest mt-5 uppercase">
            <span className="inline-block w-2.5 h-0.5 bg-[#FFE600]" />
            <span>CHAPTER 01 // THE JOURNEY BEGINS</span>
            <span className="inline-block w-2.5 h-0.5 bg-[#FFE600]" />
          </div>
        </div>
      </div>

      {/* 9. HUD Bottom Progress Bar & Skip Prompt */}
      <div
        ref={hudBottomRef}
        className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 right-6 sm:right-12 flex flex-col items-center gap-2.5 z-[99994] pointer-events-none"
      >
        {/* Dynamic Neo-Brutalist Energy Meter */}
        <div className="w-full max-w-md h-3.5 bg-[#17171C] border-[2.5px] border-black shadow-[3px_3px_0px_#000000] rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#FFE600] via-[#00F0FF] to-[#FFE600] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full max-w-md text-[10px] font-mono font-black text-neutral-400 uppercase tracking-wider px-1">
          <span className="text-[#FFE600]">
            {progress < 100
              ? `INITIALIZING SYSTEM MATRIX [ ${progress}% ]`
              : "MAX POWER // OVERDRIVE READY ⚡"}
          </span>
          <span className="text-neutral-400 hover:text-white transition-colors">
            [ CLICK ANYWHERE TO SKIP ↗ ]
          </span>
        </div>
      </div>
    </div>
  );
}

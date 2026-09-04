"use client";

import { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [showMonogram, setShowMonogram] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const isRunning = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isRunning.current) return;
    isRunning.current = true;

    // 1. Check if already seen in current browser session
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

    // 2. Realistic smooth simulated progress 0% -> 100% (~1.4s)
    const milestones = [0, 14, 28, 46, 58, 74, 86, 92, 98, 100];
    let index = 0;

    function nextStep() {
      if (index < milestones.length) {
        const val = milestones[index];
        setProgress(val);
        index++;

        if (val === 100) {
          // Pause briefly (180ms)
          setTimeout(() => {
            setShowMonogram(true);

            // Monogram lingers for ~500ms, then curtains slide open
            setTimeout(() => {
              sessionStorage.setItem("guhan_preloader_seen", "true");
              document.body.classList.add("curtains-open");

              setTimeout(() => {
                setIsDone(true);
                onComplete?.();
              }, 950);
            }, 550);
          }, 180);
          return;
        }

        let delay = 90 + Math.random() * 80;
        if (val === 92 || val === 98) delay = 220; // Suspense pause before settling at 100%
        setTimeout(nextStep, delay);
      }
    }

    const startTimer = setTimeout(nextStep, 100);
    return () => clearTimeout(startTimer);
  }, [onComplete]);

  if (isDone) return null;

  // Path length for custom stylized circular "G" loader
  const circumference = 2 * Math.PI * 46;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      id="preloader-overlay"
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#0A0A0A] pointer-events-auto"
    >
      {/* Curtain Panels for Split Reveal (Part 2) */}
      <div className="curtain curtain-top bg-[#0A0A0A]" />
      <div className="curtain curtain-bottom bg-[#0A0A0A]" />

      {/* Preloader Centered Content */}
      <div className="relative z-[100000] flex flex-col items-center justify-center transition-opacity duration-400 select-none">
        {!showMonogram ? (
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Custom stylized G monogram stroke ring */}
            <svg
              className="w-full h-full -rotate-90 transform"
              viewBox="0 0 120 120"
            >
              {/* Background faint track */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="3.5"
              />
              {/* Animated Gold Progress Stroke */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="transparent"
                stroke="#C9AF7C"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-150 ease-out"
              />
            </svg>

            {/* Centered stylized G monogram silhouette & Counter */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-cinzel text-2xl font-bold tracking-wider text-[#F0F0F0]">
                {progress}%
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#C9AF7C] uppercase mt-0.5">
                GUHAN
              </span>
            </div>
          </div>
        ) : (
          /* Cursive Monogram Mark (stylized lowercase "g" for Guhan) fading in */
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
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

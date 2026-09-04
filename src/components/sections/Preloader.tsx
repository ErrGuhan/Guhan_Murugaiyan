"use client";

import { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [showHello, setShowHello] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const isRunning = useRef(false);

  useEffect(() => {
    if (isRunning.current) return;
    isRunning.current = true;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setIsDone(true);
        onComplete?.();
      }, 0);
      return () => clearTimeout(timer);
    }

    // Milestones from reference video: 0%, 13%, 27%, 45%, 55%, 72%, 88%, 91%, 99%, 100%
    const milestones = [0, 13, 27, 45, 55, 72, 88, 91, 99, 100];
    let index = 0;

    function nextStep() {
      if (index < milestones.length) {
        const val = milestones[index];
        setProgress(val);
        index++;

        if (val === 100) {
          // Pause briefly, then show cursive "hello"
          setTimeout(() => {
            setShowHello(true);

            // After displaying hello for 0.7s, trigger curtains
            setTimeout(() => {
              document.body.classList.add("curtains-open");

              // After curtains slide open, remove preloader from DOM
              setTimeout(() => {
                setIsDone(true);
                onComplete?.();
              }, 900);
            }, 750);
          }, 250);
          return;
        }

        // Realistic variable speed matching authentic asset loading
        let delay = 100 + Math.random() * 120;
        if (val === 91 || val === 99) delay = 320; // Suspense pause before 100%
        setTimeout(nextStep, delay);
      }
    }

    const startTimer = setTimeout(nextStep, 150);
    return () => clearTimeout(startTimer);
  }, [onComplete]);

  if (isDone) return null;

  // SVG ring circumference for r=68 is 2 * Math.PI * 68 ≈ 427.26
  const circumference = 2 * Math.PI * 68;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-black pointer-events-auto">
      {/* Curtain Panels for Split Reveal (Top and Bottom) */}
      <div className="curtain curtain-top bg-[#090a0e]" />
      <div className="curtain curtain-bottom bg-[#090a0e]" />

      {/* Preloader Centered Content */}
      <div
        id="preloader-content"
        className="relative z-[100000] flex flex-col items-center justify-center transition-opacity duration-500"
      >
        {!showHello ? (
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Gold Ring Loader (Matching Video 00:00 - 00:05) */}
            <svg
              className="w-full h-full -rotate-90 transform"
              viewBox="0 0 160 160"
            >
              <circle
                cx="80"
                cy="80"
                r="68"
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="4"
              />
              <circle
                cx="80"
                cy="80"
                r="68"
                fill="transparent"
                stroke="#D4AF37"
                strokeWidth="4.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-150 ease-out"
              />
            </svg>

            {/* Percentage Number in Editorial Serif (Video 00:00 - 00:05) */}
            <div className="absolute inset-0 flex items-center justify-center select-none">
              <span className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-[#E5C583]">
                {progress}%
              </span>
            </div>
          </div>
        ) : (
          /* Golden Cursive "hello" (Matching Video 00:08 - 00:12) */
          <div className="flex flex-col items-center select-none animate-in fade-in zoom-in-95 duration-500">
            <span className="font-script text-7xl sm:text-8xl md:text-9xl text-[#E5C583] tracking-wide drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              hello
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [showHello, setShowHello] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
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

    const duration = 2.2; // Smooth 2.2 second loader
    const obj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Show cursive "hello"
        setShowHello(true);

        // After displaying hello for 0.7s, open split curtains
        gsap.delayedCall(0.7, () => {
          document.body.classList.add("curtains-open");
          gsap.to("#preloader-content", {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
          });

          gsap.delayedCall(1.0, () => {
            setIsDone(true);
            onComplete?.();
          });
        });
      },
    });

    tl.to(obj, {
      val: 100,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.round(obj.val));
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (isDone) return null;

  // SVG ring circumference for r=68 is 2 * Math.PI * 68 ≈ 427.25
  const circumference = 2 * Math.PI * 68;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[99990] flex items-center justify-center overflow-hidden">
      {/* Curtain Panels */}
      <div className="curtain curtain-top bg-[#0A0A0A]" />
      <div className="curtain curtain-bottom bg-[#0A0A0A]" />

      {/* Centered Content */}
      <div
        id="preloader-content"
        className="relative z-[99995] flex flex-col items-center justify-center"
      >
        {!showHello ? (
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Ring Loader */}
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
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-75"
              />
            </svg>

            {/* Percentage Number in Editorial Serif */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-cinzel text-3xl md:text-4xl font-bold tracking-tight text-[#FFDF73]">
                {progress}%
              </span>
            </div>
          </div>
        ) : (
          /* Elegant Cursive "hello" */
          <div className="animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center">
            <span className="font-serif italic text-6xl sm:text-7xl md:text-8xl text-gold-gradient tracking-wide select-none drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              hello
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { playWhoosh } from "@/lib/sound-effects";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useThrottledScroll } from "@/hooks/useThrottledScroll";

export default function SpeedLinesOverlay() {
  const [isActive, setIsActive] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSoundTime = useRef(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      lastScrollY.current = window.scrollY;
      lastTime.current = performance.now();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useThrottledScroll((currentScrollY) => {
    if (prefersReducedMotion) return;

    const currentTime = performance.now();
    const timeDelta = Math.max(1, currentTime - lastTime.current);
    const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
    const velocity = (scrollDelta / timeDelta) * 16; // Normalized to ~60fps frame

    lastScrollY.current = currentScrollY;
    lastTime.current = currentTime;

    // Trigger speed streaks on high velocity (> 38px/frame equivalent)
    if (velocity > 38) {
      setIsActive(true);

      // Sound trigger debounced to at most once per 1.5s
      if (currentTime - lastSoundTime.current > 1500) {
        playWhoosh();
        lastSoundTime.current = currentTime;
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsActive(false);
      }, 220);
    }
  });

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 pointer-events-none z-40 transition-opacity duration-150",
        isActive ? "opacity-90" : "opacity-0"
      )}
    >
      {/* Comic Motion Speed Streaks (SVG) */}
      <svg
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="speedCyan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="speedYellow" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FFE600" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFE600" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFE600" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="speedWhite" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Top Streaks */}
        <path d="M 40,0 L 45,280 L 41,0 Z" fill="url(#speedCyan)" />
        <path d="M 120,0 L 126,380 L 122,0 Z" fill="url(#speedWhite)" />
        <path d="M 220,0 L 228,240 L 222,0 Z" fill="url(#speedYellow)" />
        <path d="M 380,0 L 388,420 L 382,0 Z" fill="url(#speedCyan)" />
        <path d="M 520,0 L 526,290 L 521,0 Z" fill="url(#speedWhite)" />
        <path d="M 720,0 L 728,340 L 722,0 Z" fill="url(#speedYellow)" />
        <path d="M 960,0 L 968,460 L 962,0 Z" fill="url(#speedCyan)" />
        <path d="M 1180,0 L 1186,320 L 1181,0 Z" fill="url(#speedWhite)" />
        <path d="M 1360,0 L 1368,440 L 1362,0 Z" fill="url(#speedYellow)" />
        <path d="M 1540,0 L 1547,280 L 1541,0 Z" fill="url(#speedCyan)" />
        <path d="M 1720,0 L 1727,390 L 1722,0 Z" fill="url(#speedWhite)" />
        <path d="M 1860,0 L 1868,260 L 1862,0 Z" fill="url(#speedYellow)" />

        {/* Bottom Streaks */}
        <path d="M 80,1080 L 86,760 L 81,1080 Z" fill="url(#speedYellow)" />
        <path d="M 280,1080 L 288,680 L 282,1080 Z" fill="url(#speedCyan)" />
        <path d="M 460,1080 L 466,800 L 461,1080 Z" fill="url(#speedWhite)" />
        <path d="M 640,1080 L 648,640 L 642,1080 Z" fill="url(#speedYellow)" />
        <path d="M 860,1080 L 868,720 L 862,1080 Z" fill="url(#speedCyan)" />
        <path d="M 1080,1080 L 1088,620 L 1082,1080 Z" fill="url(#speedWhite)" />
        <path d="M 1260,1080 L 1267,780 L 1261,1080 Z" fill="url(#speedYellow)" />
        <path d="M 1480,1080 L 1488,690 L 1482,1080 Z" fill="url(#speedCyan)" />
        <path d="M 1660,1080 L 1667,790 L 1662,1080 Z" fill="url(#speedWhite)" />
        <path d="M 1820,1080 L 1828,710 L 1822,1080 Z" fill="url(#speedYellow)" />

        {/* Corner Burst Accents */}
        <polygon points="0,0 200,0 0,160" fill="#00F0FF" fillOpacity="0.15" />
        <polygon points="1920,0 1720,0 1920,160" fill="#FFE600" fillOpacity="0.15" />
        <polygon points="0,1080 220,1080 0,920" fill="#FFE600" fillOpacity="0.15" />
        <polygon points="1920,1080 1700,1080 1920,920" fill="#00F0FF" fillOpacity="0.15" />
      </svg>
    </div>
  );
}

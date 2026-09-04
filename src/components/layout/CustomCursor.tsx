"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isViewMode, setIsViewMode] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only run on non-touch devices and non-reduced-motion
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    document.body.classList.add("custom-cursor-active");

    const cursor = cursorRef.current;
    if (!cursor) return;

    const setX = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setX(e.clientX);
      setY(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewable = target.closest("[data-cursor='view']");
      const interactive = target.closest("a, button, [role='button'], input, textarea, .circle-hover-parent, [data-cursor='pointer']");

      if (viewable) {
        setIsViewMode(true);
        setIsHovered(true);
      } else if (interactive) {
        setIsViewMode(false);
        setIsHovered(true);
      } else {
        setIsViewMode(false);
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-[999999] flex items-center justify-center rounded-full transition-[width,height,background-color,border-color,opacity,transform] duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${
        isViewMode
          ? "w-16 h-16 bg-[#0C0C0C]/90 border border-[#C9AF7C] text-[#C9AF7C] text-[10px] font-mono font-bold tracking-widest shadow-lg"
          : isHovered
          ? "w-12 h-12 bg-[#C9AF7C]/25 border border-[#C9AF7C]/80 backdrop-blur-[1px] scale-110"
          : "w-3.5 h-3.5 bg-[#F1E8E0] border border-[#0C0C0C]/40 shadow-sm"
      }`}
    >
      {isViewMode && <span className="select-none tracking-widest animate-pulse">VIEW</span>}
    </div>
  );
}

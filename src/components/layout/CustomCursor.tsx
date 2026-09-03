"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isViewMode, setIsViewMode] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only run on non-touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    document.body.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);

      // Check target element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, .interactive-cursor");
      const viewable = target.closest("[data-cursor='view']");

      if (viewable) {
        setIsViewMode(true);
        setIsHovered(true);
        setCursorText("VIEW");
      } else if (interactive) {
        setIsViewMode(false);
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsViewMode(false);
        setIsHovered(false);
        setCursorText("");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-amber-400 rounded-full pointer-events-none z-[99999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isViewMode ? "opacity-0" : ""}`}
      />

      {/* Trailing ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99998] flex items-center justify-center -ml-6 -mt-6 rounded-full border transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isViewMode
            ? "w-20 h-20 -ml-10 -mt-10 bg-black/90 border-[#D4AF37] text-[#FFDF73] font-mono text-[11px] font-bold tracking-widest scale-100 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            : isHovered
            ? "w-14 h-14 -ml-7 -mt-7 border-[#D4AF37] bg-amber-400/10 scale-100"
            : "w-10 h-10 border-neutral-600/60 scale-75"
        }`}
      >
        {isViewMode && cursorText && (
          <span className="tracking-widest animate-pulse">{cursorText}</span>
        )}
      </div>
    </>
  );
}

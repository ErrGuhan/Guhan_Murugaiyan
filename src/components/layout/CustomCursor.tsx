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

    const cursor = cursorRef.current;
    if (!cursor) return;

    const setX = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!document.body.classList.contains("custom-cursor-active")) {
        document.body.classList.add("custom-cursor-active");
      }
      setIsVisible(true);
      setX(e.clientX);
      setY(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewable = target.closest("[data-cursor='view']");
      const interactive = target.closest("a, button, [role='button'], input, textarea, .comic-btn, .comic-card, .circle-hover-parent, [data-cursor='pointer']");

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
      document.body.classList.remove("custom-cursor-active");
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
          ? "w-16 h-16 bg-[#FFE600] border-[2.5px] border-black text-black text-[10px] font-mono font-black tracking-widest shadow-[3px_3px_0px_#000000]"
          : isHovered
          ? "w-12 h-12 bg-[#FFE600]/30 border-[2px] border-[#FFE600] backdrop-blur-[1px] scale-110 shadow-[2px_2px_0px_#000000]"
          : "w-3.5 h-3.5 bg-[#FFE600] border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000000]"
      }`}
    >
      {isViewMode && <span className="select-none tracking-widest animate-pulse font-black">VIEW</span>}
    </div>
  );
}

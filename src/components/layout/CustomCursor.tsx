"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isViewMode, setIsViewMode] = useState<boolean>(false);
  const [isDragMode, setIsDragMode] = useState<boolean>(false);
  const [isExternalMode, setIsExternalMode] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkIsTouchOrMobile = () => {
      const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches;
      const isMobileWidth = window.innerWidth < 1024;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return isTouch || isMobileWidth || prefersReducedMotion;
    };

    if (checkIsTouchOrMobile()) return;

    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    if (!cursor) return;

    const setX = gsap.quickTo(cursor, "x", { duration: 0.16, ease: "power3.out" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.16, ease: "power3.out" });

    // 1. Spark Trail Canvas Setup
    let ctx: CanvasRenderingContext2D | null = null;
    const particles: SparkParticle[] = [];
    const colors = ["#FFE600", "#00F0FF", "#FF2A55", "#FFFFFF"];

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext("2d");
    }

    let lastX = 0;
    let lastY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (checkIsTouchOrMobile()) {
        setIsEnabled(false);
        setIsVisible(false);
        document.body.classList.remove("custom-cursor-active");
        return;
      }

      setIsEnabled(true);
      if (!document.body.classList.contains("custom-cursor-active")) {
        document.body.classList.add("custom-cursor-active");
      }
      setIsVisible(true);
      setX(e.clientX);
      setY(e.clientY);

      // Emit 2-3 tiny sparks on movement
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 6 && ctx) {
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: e.clientX + (Math.random() - 0.5) * 6,
            y: e.clientY + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2 + 0.5,
            size: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: 0.05 + Math.random() * 0.03,
          });
        }
      }
      lastX = e.clientX;
      lastY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const dragEl = target.closest("[data-cursor='drag']");
      const extEl = target.closest("[data-cursor='external']") || target.closest("a[target='_blank']");
      const viewEl = target.closest("[data-cursor='view']");
      const interactiveEl = target.closest(
        "a, button, [role='button'], input, textarea, .comic-btn, .comic-card, .circle-hover-parent, [data-cursor='pointer']"
      );

      if (dragEl) {
        setIsDragMode(true);
        setIsExternalMode(false);
        setIsViewMode(false);
        setIsHovered(true);
      } else if (extEl) {
        setIsExternalMode(true);
        setIsDragMode(false);
        setIsViewMode(false);
        setIsHovered(true);
      } else if (viewEl) {
        setIsViewMode(true);
        setIsDragMode(false);
        setIsExternalMode(false);
        setIsHovered(true);
      } else if (interactiveEl) {
        setIsDragMode(false);
        setIsExternalMode(false);
        setIsViewMode(false);
        setIsHovered(true);
      } else {
        setIsDragMode(false);
        setIsExternalMode(false);
        setIsViewMode(false);
        setIsHovered(false);
      }
    };

    // 2. Particle Animation Loop
    let animId: number;
    let hasCleared = false;
    const renderSparks = () => {
      animId = requestAnimationFrame(renderSparks);
      if (!ctx || !canvas) return;

      if (particles.length === 0) {
        if (!hasCleared) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          hasCleared = true;
        }
        return;
      }

      hasCleared = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        // Draw crisp comic square particle
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1;
    };
    renderSparks();

    const onMouseLeave = () => {
      setIsVisible(false);
      document.body.classList.remove("custom-cursor-active");
    };

    const onResize = () => {
      if (checkIsTouchOrMobile()) {
        setIsEnabled(false);
        setIsVisible(false);
        document.body.classList.remove("custom-cursor-active");
      } else {
        setIsEnabled(true);
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* 2D Canvas for Comic Particle Spark Trail */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[999998] hidden lg:block"
      />

      {/* Main Comic Magnetic Cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`custom-cursor-element hidden lg:flex fixed top-0 left-0 pointer-events-none z-[999999] items-center justify-center rounded-full transition-[width,height,background-color,border-color,opacity,transform] duration-200 ease-out -translate-x-1/2 -translate-y-1/2 select-none ${
          isEnabled && isVisible ? "opacity-100" : "opacity-0 !hidden"
        } ${
          isDragMode
            ? "w-20 h-10 rounded-xl bg-[#FFE600] border-[2.5px] border-black text-black font-mono font-black text-[11px] shadow-[3px_3px_0px_#000000] gap-1.5"
            : isExternalMode
            ? "w-16 h-16 bg-[#00F0FF] border-[2.5px] border-black text-black font-mono font-black text-[10px] shadow-[3px_3px_0px_#000000] flex-col"
            : isViewMode
            ? "w-16 h-16 bg-[#FFE600] border-[2.5px] border-black text-black text-[10px] font-mono font-black tracking-widest shadow-[3px_3px_0px_#000000]"
            : isHovered
            ? "w-12 h-12 bg-[#FFE600]/30 border-[2px] border-[#FFE600] backdrop-blur-[1px] scale-110 shadow-[2px_2px_0px_#000000]"
            : "w-3.5 h-3.5 bg-[#FFE600] border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000000]"
        }`}
      >
        {isDragMode && (
          <>
            <MoveHorizontal className="w-3.5 h-3.5 stroke-[3]" />
            <span>DRAG</span>
          </>
        )}
        {isExternalMode && (
          <>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            <span className="text-[9px] tracking-wider">OPEN</span>
          </>
        )}
        {isViewMode && (
          <span className="select-none tracking-widest animate-pulse font-black">
            VIEW
          </span>
        )}
      </div>
    </>
  );
}

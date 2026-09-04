"use client";

import React, { useRef, useState } from "react";


interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  shape?: "pill" | "rounded" | "circle";
  tint?: "gold" | "obsidian" | "neutral";
  refractionStrength?: number; // 0 to 1
  specular?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function LiquidGlass({
  children,
  className = "",
  shape = "rounded",
  tint = "obsidian",
  refractionStrength = 0.5,
  specular = true,
  interactive = true,
  onClick,
  style,
}: LiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });
  const [isHovered, setIsHovered] = useState(false);

  // Shape classes
  const shapeClass =
    shape === "pill"
      ? "rounded-full"
      : shape === "circle"
      ? "rounded-full aspect-square"
      : "rounded-2xl";

  // Tint gradients and border glows
  const tintStyles = {
    obsidian: {
      bg: "bg-[#0c0c0c]/65",
      border: "border-white/12",
      glow: "rgba(255, 255, 255, 0.08)",
      chroma: "rgba(212, 175, 55, 0.15)",
    },
    gold: {
      bg: "bg-[#18150d]/70",
      border: "border-[#D4AF37]/35",
      glow: "rgba(212, 175, 55, 0.25)",
      chroma: "rgba(255, 223, 115, 0.3)",
    },
    neutral: {
      bg: "bg-white/10",
      border: "border-white/20",
      glow: "rgba(255, 255, 255, 0.15)",
      chroma: "rgba(200, 220, 255, 0.2)",
    },
  }[tint];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 50, y: 50 });
      }}
      className={`relative group backdrop-blur-xl ${tintStyles.bg} ${tintStyles.border} border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden transition-all duration-500 ${shapeClass} ${className}`}
      style={{
        ...style,
        backdropFilter: `blur(${16 + refractionStrength * 12}px) saturate(160%)`,
        WebkitBackdropFilter: `blur(${16 + refractionStrength * 12}px) saturate(160%)`,
      }}
    >
      {/* Liquid Refraction & Chromatic Aberration Layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${tintStyles.chroma} 0%, transparent 60%)`,
        }}
      />

      {/* Dynamic Specular Sheen (Apple Liquid Glass Optical Highlight) */}
      {specular && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.75 : 0.35,
            background: `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)`,
          }}
        />
      )}

      {/* Beveled Edge Highlight (Prismatic Rim) */}
      <div
        className={`absolute inset-0 pointer-events-none border border-white/20 ${shapeClass}`}
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent 70%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

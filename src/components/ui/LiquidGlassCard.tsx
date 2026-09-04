"use client";

import React from "react";
import LiquidGlass from "./LiquidGlass";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  badge?: string;
  tint?: "gold" | "obsidian" | "neutral";
  onClick?: () => void;
  interactive?: boolean;
}

export default function LiquidGlassCard({
  children,
  className = "",
  badge,
  tint = "obsidian",
  onClick,
  interactive = true,
}: LiquidGlassCardProps) {
  return (
    <LiquidGlass
      shape="rounded"
      tint={tint}
      interactive={interactive}
      onClick={onClick}
      className={`p-6 sm:p-8 hover:border-[#D4AF37]/50 transition-all duration-500 ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#FFDF73] text-[11px] font-mono tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          {badge}
        </div>
      )}
      {children}
    </LiquidGlass>
  );
}

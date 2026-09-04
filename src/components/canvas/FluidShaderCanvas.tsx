"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// Dynamically load ShaderGradient to avoid SSR hydration issues
const ShaderGradientCanvas = dynamic(
  () =>
    import("@shadergradient/react").then((mod) => mod.ShaderGradientCanvas),
  { ssr: false }
);

const ShaderGradient = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradient),
  { ssr: false }
);

interface FluidShaderCanvasProps {
  className?: string;
  intensity?: "subtle" | "vibrant";
  interactive?: boolean;
}

export default function FluidShaderCanvas({
  className = "",
  intensity = "subtle",
  interactive = true,
}: FluidShaderCanvasProps) {
  const mounted = useIsClient();
  const [coords, setCoords] = useState({ x: 0, y: 0 });


  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setCoords({ x: x * 0.15, y: y * 0.15 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  if (!mounted) {
    // Elegant fallback during SSR and initial hydration
    return (
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-br from-[#12100C] via-[#0A0A0A] to-[#16130B] opacity-75 ${className}`}
      />
    );
  }

  // Palette tailored for obsidian and champagne gold aesthetic
  const isVibrant = intensity === "vibrant";

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${className}`}
      style={{ zIndex: 0 }}
    >
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        pixelDensity={1.2}
        fov={45}
      >
        <ShaderGradient
          control="props"
          animate="on"
          type="waterPlane"
          uSpeed={0.18}
          uStrength={isVibrant ? 2.4 : 1.6}
          uDensity={1.3}
          uFrequency={5.5}
          uAmplitude={0.8}
          // Obsidian, gold & amber tones
          color1="#0c0c0c"
          color2="#D4AF37"
          color3="#1c160c"
          reflection={0.3}
          wireframe={false}
          cAzimuthAngle={180 + coords.x * 20}
          cPolarAngle={90 + coords.y * 15}
          cDistance={3.6}
          cameraZoom={1}
          lightType="3d"
          brightness={isVibrant ? 1.2 : 0.85}
          envPreset="city"
          grain="on"
        />
      </ShaderGradientCanvas>

      {/* Subtle vignette and contrast depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/30 to-[#0A0A0A] pointer-events-none" />
    </div>
  );
}

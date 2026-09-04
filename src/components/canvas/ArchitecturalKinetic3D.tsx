"use client";

import React, { useRef, useEffect, useSyncExternalStore, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function KineticArtifact({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshGroup = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshGroup.current) return;

    // Smooth inertia tilt towards cursor
    const targetX = (mouse.current?.x || 0) * 0.45;
    const targetY = (mouse.current?.y || 0) * 0.45;

    meshGroup.current.rotation.y +=
      (targetX - meshGroup.current.rotation.y) * 0.05 + delta * 0.25;
    meshGroup.current.rotation.x +=
      (-targetY - meshGroup.current.rotation.x) * 0.05 + delta * 0.15;

    // Opposite rotations for outer orbital rings
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.4;
      outerRingRef.current.rotation.y -= delta * 0.3;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={meshGroup} scale={1.8}>
      {/* Floating Dynamics */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Core Architectural Refractive Crystal */}
        <mesh ref={coreMeshRef}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={512}
            transmission={0.94}
            roughness={0.08}
            thickness={1.4}
            ior={1.52}
            chromaticAberration={0.08}
            anisotropy={0.2}
            distortion={0.3}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#FFF2D6"
          />
        </mesh>

        {/* Outer Gold Wireframe Cage */}
        <mesh ref={wireframeRef} scale={1.22}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.92}
            roughness={0.18}
            wireframe
            wireframeLinewidth={2}
          />
        </mesh>

        {/* Orbital Gold Gyroscope Ring */}
        <mesh ref={outerRingRef} scale={1.45}>
          <torusGeometry args={[1, 0.025, 16, 64]} />
          <meshStandardMaterial
            color="#FFDF73"
            metalness={0.95}
            roughness={0.12}
            emissive="#D4AF37"
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Secondary Inner Axis Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.35}>
          <torusGeometry args={[1, 0.018, 16, 64]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function ArchitecturalKinetic3D({
  className = "",
}: {
  className?: string;
}) {
  const mounted = useIsClient();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  if (!mounted) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="w-32 h-32 rounded-full border border-[#D4AF37]/20 animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[380px] pointer-events-none select-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFF8E7" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#D4AF37" />
        <pointLight position={[0, 0, 2]} intensity={1.2} color="#FFDF73" />

        <Suspense fallback={null}>
          <KineticArtifact mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}

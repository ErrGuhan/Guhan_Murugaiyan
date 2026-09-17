"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroReactorCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    // 2. Renderer
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return; // WebGL not supported
    }

    // 3. Lighting (Dramatic comic cel lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffe600, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00f0ff, 2.2);
    rimLight.position.set(-4, -3, -3);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xff2a55, 3.0, 10);
    accentLight.position.set(0, 0, 0);
    scene.add(accentLight);

    // 4. Geometry Group (ARC Core Reactor)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Faceted Core: Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshLambertMaterial({
      color: 0x13131a,
      emissive: 0xffe600,
      emissiveIntensity: 0.25,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Comic Ink Edge Outlines for Inner Core
    const edgesGeo = new THREE.EdgesGeometry(coreGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 3,
    });
    const edgeLines = new THREE.LineSegments(edgesGeo, edgeMat);
    coreGroup.add(edgeLines);

    // Outer Cage: Octahedron
    const outerGeo = new THREE.OctahedronGeometry(1.7, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Outer Edge Lines
    const outerEdgesGeo = new THREE.EdgesGeometry(outerGeo);
    const outerEdgeLines = new THREE.LineSegments(
      outerEdgesGeo,
      new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
    );
    coreGroup.add(outerEdgeLines);

    // Concentric Gyro Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(2.1, 0.03, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xffe600,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.3, 0.025, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    coreGroup.add(ringMesh2);

    // Floating Energy Shards
    const shardGroup = new THREE.Group();
    const shardGeo = new THREE.TetrahedronGeometry(0.15, 0);
    const shardColors = [0xffe600, 0x00f0ff, 0xff2a55];

    for (let i = 0; i < 18; i++) {
      const shardMat = new THREE.MeshBasicMaterial({
        color: shardColors[i % 3],
        wireframe: i % 2 === 0,
      });
      const shard = new THREE.Mesh(shardGeo, shardMat);
      const radius = 2.4 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      shard.position.set(
        radius * Math.cos(theta) * Math.cos(phi),
        radius * Math.sin(phi),
        radius * Math.sin(theta) * Math.cos(phi)
      );
      shard.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      shardGroup.add(shard);
    }
    coreGroup.add(shardGroup);

    // 5. Mouse Interaction & Physics
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let targetScale = 1;
    let currentScale = 1;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normY = (e.clientY - centerY) / (window.innerHeight / 2);

      targetRotY = normX * 1.2;
      targetRotX = normY * 0.8;
      targetScale = 1.08;
    };

    const onMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
      targetScale = 1;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    container.addEventListener("mouseleave", onMouseLeave);

    // 6. Intersection Observer to pause when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 7. Resize Handler
    const onResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // 8. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible || !renderer) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Damped lerp mouse follow
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentScale += (targetScale - currentScale) * 0.1;

      if (!prefersReducedMotion) {
        // Continuous idle rotations
        coreGroup.rotation.y = currentRotY + elapsed * 0.35;
        coreGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.6) * 0.12;

        ringMesh1.rotation.z += delta * 0.6;
        ringMesh2.rotation.x += delta * 0.8;
        outerMesh.rotation.y -= delta * 0.25;
        shardGroup.rotation.y += delta * 0.15;

        // Subtle core pulsation
        const pulse = 1 + Math.sin(elapsed * 2.5) * 0.04;
        coreMesh.scale.set(pulse, pulse, pulse);
        edgeLines.scale.set(pulse, pulse, pulse);
      }

      coreGroup.scale.set(currentScale, currentScale, currentScale);
      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }

      // Dispose geometries & materials
      coreGeo.dispose();
      coreMat.dispose();
      edgesGeo.dispose();
      edgeMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      outerEdgesGeo.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      shardGeo.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center pointer-events-auto"
      style={{ touchAction: "none" }}
      aria-label="Interactive 3D ARC Reactor"
    />
  );
}

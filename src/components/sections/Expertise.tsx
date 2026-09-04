"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface TechBubble {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sandboxRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<number>(0);

  // Floating Draggable Tech Matrix (Video 01:00 - 01:14)
  const [bubbles, setBubbles] = useState<TechBubble[]>([
    { id: "1", name: "Java 21", color: "#E5C583", x: 30, y: 30, vx: 1.2, vy: -0.8 },
    { id: "2", name: "Agentic AI", color: "#FFDF73", x: 120, y: 80, vx: -1.4, vy: 1.1 },
    { id: "3", name: "Python", color: "#4facfe", x: 70, y: 140, vx: 1.5, vy: 0.7 },
    { id: "4", name: "Analytics", color: "#00f5a0", x: 180, y: 40, vx: -0.9, vy: -1.2 },
    { id: "5", name: "LLM Agents", color: "#9d4edd", x: 140, y: 170, vx: 1.1, vy: 1.3 },
    { id: "6", name: "Spring Boot", color: "#00f2fe", x: 40, y: 210, vx: -1.3, vy: 0.9 },
    { id: "7", name: "Data Security", color: "#ff758c", x: 170, y: 120, vx: 0.8, vy: -1.4 },
  ]);

  const activeDragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    let animId: number;

    const updatePhysics = () => {
      if (!sandboxRef.current) return;
      const rect = sandboxRef.current.getBoundingClientRect();
      const maxX = rect.width - 110;
      const maxY = rect.height - 40;

      setBubbles((prev) =>
        prev.map((b) => {
          if (activeDragRef.current && activeDragRef.current.id === b.id) {
            return b;
          }

          let newX = b.x + b.vx;
          let newY = b.y + b.vy;
          let newVx = b.vx;
          let newVy = b.vy;

          if (newX <= 5) {
            newX = 5;
            newVx = -newVx * 0.9;
          } else if (newX >= maxX) {
            newX = maxX;
            newVx = -newVx * 0.9;
          }

          if (newY <= 5) {
            newY = 5;
            newVy = -newVy * 0.9;
          } else if (newY >= maxY) {
            newY = maxY;
            newVy = -newVy * 0.9;
          }

          // Gentle ambient drift
          if (Math.abs(newVx) < 0.2) newVx += (Math.random() - 0.5) * 0.3;
          if (Math.abs(newVy) < 0.2) newVy += (Math.random() - 0.5) * 0.3;

          return { ...b, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    if (!sandboxRef.current) return;
    const rect = sandboxRef.current.getBoundingClientRect();
    const bubble = bubbles.find((b) => b.id === id);
    if (!bubble) return;

    activeDragRef.current = {
      id,
      offsetX: e.clientX - rect.left - bubble.x,
      offsetY: e.clientY - rect.top - bubble.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!activeDragRef.current || !sandboxRef.current) return;
    const rect = sandboxRef.current.getBoundingClientRect();
    const { id, offsetX, offsetY } = activeDragRef.current;

    const newX = e.clientX - rect.left - offsetX;
    const newY = e.clientY - rect.top - offsetY;

    setBubbles((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              x: newX,
              y: newY,
              vx: (newX - b.x) * 0.4,
              vy: (newY - b.y) * 0.4,
            }
          : b
      )
    );
  };

  const handleMouseUp = () => {
    activeDragRef.current = null;
  };

  useGSAP(
    () => {
      gsap.from(".expertise-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  const accordionItems = [
    {
      num: "01",
      title: "Agentic AI & Multi-Agent Swarms",
      desc: "Architecting autonomous cooperative agent networks, LLM tool calling, memory management, and task decomposition pipelines.",
      tags: ["Multi-Agent", "LLM Orchestration", "Bioinformatics AI"],
    },
    {
      num: "02",
      title: "Java Enterprise & Systems Development",
      desc: "Building resilient object-oriented backends, concurrent task execution engines, and structured software design patterns.",
      tags: ["Core Java 21", "Multithreading", "OOP & Clean Arch"],
    },
    {
      num: "03",
      title: "Data Analytics & Insights Engineering",
      desc: "Practical analytics workflows applied at NoviTech R&D, converting messy raw data into actionable dashboards and statistical models.",
      tags: ["Data Workflows", "Statistical Insights", "ETL Automation"],
    },
    {
      num: "04",
      title: "Leadership & Analytical Rigor",
      desc: "NSS community leadership paired with analytical accounting experience at Jana Fibre Glass, ensuring meticulous precision.",
      tags: ["Team Leadership", "Financial Analysis", "Communication"],
    },
  ];

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-[#090a0e] text-white border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-14 md:mb-18">
          <div className="expertise-reveal inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#FFDF73] text-[11px] font-mono tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            {"// 02 — SPECIALIZATION & TECH STACK"}
          </div>

          <h2 className="expertise-reveal font-syne text-4xl sm:text-6xl font-extrabold tracking-tight uppercase text-white">
            MY <span className="text-[#FFDF73]">EXPERTISE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Statement & Interactive Physics Tech Sandbox (Video 01:00) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="expertise-reveal font-syne text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug text-white">
                I design and build intelligent systems where autonomy, code, and
                motion work as one.
              </h3>
              <p className="expertise-reveal mt-4 text-[#CBD5E1] text-sm leading-relaxed">
                From autonomous multi-agent swarms to high-throughput Java
                workflows and data pipelines, I build robust, intelligent
                architectures designed to scale.
              </p>
            </div>

            {/* Interactive Physics Sandbox Box (Exact from Video 01:00) */}
            <div
              className="expertise-reveal rounded-2xl bg-[#0e121a] border border-white/10 overflow-hidden shadow-2xl"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between text-xs font-mono text-neutral-300 bg-white/[0.02]">
                <span className="flex items-center gap-2 text-[#E5C583] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  INTERACTIVE TECH MATRIX
                </span>
                <span className="text-[10px] uppercase text-[#D4AF37] font-bold">
                  DRAG &amp; TOSS BADGES
                </span>
              </div>

              <div
                ref={sandboxRef}
                className="relative w-full h-64 sm:h-72 select-none overflow-hidden bg-[#0a0d14]"
              >
                {bubbles.map((b) => (
                  <div
                    key={b.id}
                    onMouseDown={(e) => handleMouseDown(b.id, e)}
                    className="absolute cursor-grab active:cursor-grabbing px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold border shadow-md transition-transform hover:scale-110 flex items-center gap-1.5 select-none"
                    style={{
                      transform: `translate3d(${b.x}px, ${b.y}px, 0)`,
                      backgroundColor: "#131722",
                      borderColor: "rgba(255, 255, 255, 0.18)",
                      color: b.color,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: b.color }}
                    />
                    {b.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Accordion Cards (Video 01:05 - 01:14) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {accordionItems.map((item, idx) => {
              const isOpen = activeItem === idx;

              return (
                <div
                  key={item.num}
                  onClick={() => setActiveItem(idx)}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer bg-[#0e121a] ${
                    isOpen
                      ? "border-[#D4AF37]/60 shadow-xl"
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className="font-mono text-sm sm:text-base font-bold text-[#D4AF37]">
                        {item.num}
                      </span>
                      <div>
                        <h4
                          className={`font-syne text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                            isOpen ? "text-[#FFDF73]" : "text-white"
                          }`}
                        >
                          {item.title}
                        </h4>
                        <p className="text-[#CBD5E1] text-sm mt-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full border border-white/10 flex items-center justify-center transition-all ${
                        isOpen
                          ? "bg-[#D4AF37] text-black rotate-45"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

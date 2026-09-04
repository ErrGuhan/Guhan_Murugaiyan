"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Cpu, Layers, BarChart3, ShieldCheck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface ExpertiseArea {
  num: string;
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  image: string;
  icon: typeof Cpu;
}

export default function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewPanelRef = useRef<HTMLDivElement>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState<number | null>(null);

  const expertiseList: ExpertiseArea[] = [
    {
      num: "01",
      slug: "agentic-ai",
      title: "Agentic AI & Multi-Agent Swarms",
      desc: "Architecting autonomous cooperative agent networks, LLM tool calling, memory persistence, and multi-stage task decomposition pipelines.",
      tags: ["Multi-Agent Swarm", "LLM Orchestration", "Python", "Autonomous Tools"],
      image: "/expertise/agentic-ai.png",
      icon: Cpu,
    },
    {
      num: "02",
      slug: "java-enterprise",
      title: "Java Enterprise & Systems Development",
      desc: "Building resilient object-oriented backends, concurrent transaction execution engines, clean service architectures, and Spring Boot APIs.",
      tags: ["Core Java 21", "Spring Boot", "Concurrency", "OOP Architecture"],
      image: "/expertise/java-enterprise.png",
      icon: Layers,
    },
    {
      num: "03",
      slug: "data-analytics",
      title: "Data Analytics & Insights Engineering",
      desc: "Applied analytics workflows developed at NoviTech R&D, turning raw enterprise streams into automated anomaly alerts and executive metrics.",
      tags: ["Data Pipelines", "Statistical Modeling", "ETL Automation", "Pandas"],
      image: "/expertise/data-analytics.png",
      icon: BarChart3,
    },
    {
      num: "04",
      slug: "leadership-rigor",
      title: "Leadership & Analytical Rigor",
      desc: "NSS community leadership paired with analytical accounting and financial integrity at Jana Fibre Glass, ensuring disciplined execution.",
      tags: ["NSS Representative", "Accounting Precision", "Executive Comms"],
      image: "/expertise/leadership-rigor.png",
      icon: ShieldCheck,
    },
  ];

  const floatingIcons = [
    { name: "Java 21", color: "#C9AF7C", left: "10%", top: "15%", duration: 3.2, delay: 0 },
    { name: "Python", color: "#4facfe", left: "62%", top: "8%", duration: 3.8, delay: 0.4 },
    { name: "Spring Boot", color: "#68d391", left: "32%", top: "42%", duration: 3.5, delay: 0.8 },
    { name: "Next.js", color: "#F0F0F0", left: "70%", top: "50%", duration: 4.1, delay: 0.2 },
    { name: "Supabase", color: "#3ecf8e", left: "15%", top: "72%", duration: 3.6, delay: 1.1 },
    { name: "GSAP", color: "#FFDF73", left: "55%", top: "78%", duration: 3.9, delay: 0.6 },
  ];

  // GSAP quickTo cursor tracking for preview panel (Part 6)
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const panel = previewPanelRef.current;
    if (!panel) return;

    const setX = gsap.quickTo(panel, "x", { duration: 0.25, ease: "power3.out" });
    const setY = gsap.quickTo(panel, "y", { duration: 0.25, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      setX(e.clientX + 24);
      setY(e.clientY - 90);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(
    () => {
      // 1. Idle float animation for floating tech icons (Part 6)
      floatingIcons.forEach((icon, idx) => {
        gsap.to(`.floating-icon-${idx}`, {
          y: "-=18",
          rotation: idx % 2 === 0 ? 5 : -5,
          duration: icon.duration,
          delay: icon.delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // 2. Staggered reveal for expertise rows
      gsap.from(".expertise-row", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  const activeHoverItem = expertiseList.find((item) => item.slug === hoveredSlug);

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#0A0A0A] text-[#F0F0F0] border-t border-[#C9AF7C]/15 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Eyebrow & Header (Part 6) */}
        <div className="mb-14 md:mb-18">
          <span className="text-xs font-mono tracking-[0.2em] text-[#C9AF7C] uppercase mb-3 block font-semibold">
            — 03 · EXPERTISE
          </span>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase text-white">
            <span className="text-[#7A7A7A]">MY</span> EXPERTISE
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Overview, Floating Tech Icons & Tag Pills (Part 6) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="font-syne text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug text-[#F0F0F0]">
                I design and build intelligent systems where autonomy, code, and
                concurrency scale in harmony.
              </h3>
              <p className="mt-4 text-[#CBD5E1] text-sm leading-relaxed">
                From autonomous multi-agent networks to resilient Java backends and
                data pipelines, I deliver production systems engineered with architectural
                rigor and speed.
              </p>
            </div>

            {/* Floating Tech Stack Cluster Container (Part 6) */}
            <div className="relative w-full h-72 rounded-2xl bg-[#111111] border border-[#C9AF7C]/20 overflow-hidden shadow-2xl p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C9AF7C] font-semibold">
                  CORE TECHNICAL MATRIX
                </span>
                <span className="w-2 h-2 rounded-full bg-[#C9AF7C] animate-pulse" />
              </div>

              {/* Floating badges with individual continuous float loop */}
              {floatingIcons.map((icon, idx) => (
                <div
                  key={icon.name}
                  className={`floating-icon-${idx} absolute px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold border shadow-lg backdrop-blur-sm select-none transition-transform hover:scale-110 cursor-default`}
                  style={{
                    left: icon.left,
                    top: icon.top,
                    backgroundColor: "#161616",
                    borderColor: `${icon.color}40`,
                    color: icon.color,
                  }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
                    style={{ backgroundColor: icon.color }}
                  />
                  {icon.name}
                </div>
              ))}
            </div>

            {/* Top 4-5 Skills Pill Row (Part 6 & 9) */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Java Development",
                "AI Agent Architect",
                "AI Architect",
                "Data Analytics",
                "Concurrent Systems",
              ].map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#C9AF7C]/25 text-[#F0F0F0] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Numbered List Rows (01-04) (Part 6) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {expertiseList.map((item, idx) => {
              const IconComp = item.icon;
              const isMobileActive = activeMobileIdx === idx;

              return (
                <div
                  key={item.num}
                  onMouseEnter={() => setHoveredSlug(item.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  onClick={() =>
                    setActiveMobileIdx(isMobileActive ? null : idx)
                  }
                  className={`expertise-row group relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer bg-[#111111] ${
                    isMobileActive || hoveredSlug === item.slug
                      ? "border-[#C9AF7C] shadow-2xl bg-[#141414]"
                      : "border-white/10 hover:border-[#C9AF7C]/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className="font-mono text-sm sm:text-base font-bold text-[#C9AF7C] mt-1">
                        {item.num}
                      </span>

                      <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          {/* Row Icon in Box with subtle scale/rotate on hover */}
                          <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] border border-[#C9AF7C]/30 flex items-center justify-center text-[#C9AF7C] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                            <IconComp className="w-4 h-4" />
                          </div>

                          <h4 className="font-syne text-lg sm:text-xl font-bold tracking-tight text-[#F0F0F0] group-hover:text-[#C9AF7C] transition-colors">
                            {item.title}
                          </h4>
                        </div>

                        <p className="text-[#CBD5E1] text-xs sm:text-sm mt-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#7A7A7A] group-hover:text-[#C9AF7C] group-hover:border-[#C9AF7C]/50 transition-colors flex-shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Skill Tag Pills */}
                  <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-white/10">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Mobile Tap-Expanded Preview (Part 6) */}
                  {isMobileActive && (
                    <div className="mt-4 pt-4 border-t border-[#C9AF7C]/30 block md:hidden animate-in fade-in duration-300">
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#C9AF7C]/40">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Desktop Cursor-Following Preview Panel (Part 6) */}
      <div
        ref={previewPanelRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99990] hidden md:block w-72 aspect-video rounded-xl overflow-hidden border border-[#C9AF7C]/80 shadow-[0_12px_40px_rgba(0,0,0,0.8)] bg-black/90 transition-[opacity,transform] duration-300 ${
          hoveredSlug ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {activeHoverItem && (
          <div className="relative w-full h-full">
            <Image
              src={activeHoverItem.image}
              alt={activeHoverItem.title}
              fill
              className="object-cover"
              sizes="300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
              <span className="text-[10px] font-mono tracking-wider text-[#C9AF7C] uppercase font-semibold">
                {activeHoverItem.title}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Cpu, Layers, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    { name: "Java 21", color: "#FFE600", left: "8%", top: "15%", duration: 3.2, delay: 0 },
    { name: "Python", color: "#00F0FF", left: "62%", top: "10%", duration: 3.8, delay: 0.4 },
    { name: "Spring Boot", color: "#00E676", left: "28%", top: "42%", duration: 3.5, delay: 0.8 },
    { name: "Next.js", color: "#FFFFFF", left: "70%", top: "50%", duration: 4.1, delay: 0.2 },
    { name: "Supabase", color: "#3ECF8E", left: "12%", top: "72%", duration: 3.6, delay: 1.1 },
    { name: "GSAP Motion", color: "#FFE600", left: "55%", top: "76%", duration: 3.9, delay: 0.6 },
  ];

  // GSAP quickTo cursor tracking for preview panel
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const panel = previewPanelRef.current;
    if (!panel) return;

    const setX = gsap.quickTo(panel, "x", { duration: 0.2, ease: "power3.out" });
    const setY = gsap.quickTo(panel, "y", { duration: 0.2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const panelWidth = 288;
      const panelHeight = 162;

      let targetX = e.clientX + 24;
      if (e.clientX + panelWidth + 36 > window.innerWidth) {
        targetX = e.clientX - panelWidth - 24;
      }

      let targetY = e.clientY - 90;
      targetY = Math.max(75, Math.min(window.innerHeight - panelHeight - 20, targetY));

      setX(targetX);
      setY(targetY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(
    () => {
      // 1. Idle float animation for floating tech icons
      floatingIcons.forEach((icon, idx) => {
        gsap.to(`.floating-icon-${idx}`, {
          y: "-=16",
          rotation: idx % 2 === 0 ? 4 : -4,
          duration: icon.duration,
          delay: icon.delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // 2. Responsive Animation via gsap.matchMedia()
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".expertise-row",
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".expertise-row",
              start: "top 85%",
              once: true,
            },
            clearProps: "opacity,transform",
          }
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(".expertise-row", {
          opacity: 1,
          y: 0,
          clearProps: "opacity,transform",
        });
      });

      const timer = setTimeout(() => {
        gsap.set(".expertise-row", {
          opacity: 1,
          y: 0,
          clearProps: "opacity,transform",
        });
      }, 1500);

      return () => clearTimeout(timer);
    },
    { scope: containerRef }
  );

  const activeHoverItem = expertiseList.find((item) => item.slug === hoveredSlug);

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#0B0B0F] text-white border-t-[3px] border-black overflow-hidden bg-halftone-dark"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF] text-black border-[3px] border-black shadow-[3px_3px_0px_#000000] rounded-lg text-xs font-mono font-black tracking-widest uppercase mb-3">
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>— 03 · TECHNICAL SKILLS &amp; ARSENAL</span>
          </div>

          <h2
            data-text="MY EXPERTISE"
            className="comic-glitch-text text-4xl sm:text-6xl md:text-7xl leading-tight tracking-tight uppercase text-white drop-shadow-[5px_5px_0px_#000000]"
          >
            <span className="text-[#FFE600]">MY</span> EXPERTISE
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Overview & Floating Tech Stack Matrix */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="comic-card p-6 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000]">
              <h3 className="font-syne text-2xl sm:text-3xl font-black tracking-tight leading-snug text-white">
                Intelligent systems where autonomy, code, and concurrency scale in harmony.
              </h3>
              <p className="mt-4 text-neutral-300 text-sm leading-relaxed">
                From autonomous multi-agent networks to resilient Java backends and
                data pipelines, I deliver production systems engineered with architectural
                rigor and speed.
              </p>
            </div>

            {/* Floating Tech Stack Cluster Container */}
            <div className="comic-card relative w-full h-72 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000] overflow-hidden p-4">
              <div className="flex items-center justify-between border-b-[2px] border-black pb-2 mb-2">
                <span className="text-[11px] font-mono font-black tracking-widest uppercase text-[#FFE600]">
                  TECHNICAL MATRIX // CORE STACK
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] border border-black animate-pulse" />
              </div>

              {/* Floating badges with 3px black borders & 3px shadows */}
              {floatingIcons.map((icon, idx) => (
                <div
                  key={icon.name}
                  className={`floating-icon-${idx} absolute px-3.5 py-1.5 rounded-lg text-xs font-mono font-black border-[2.5px] border-black shadow-[3px_3px_0px_#000000] select-none transition-transform hover:scale-110 cursor-default`}
                  style={{
                    left: icon.left,
                    top: icon.top,
                    backgroundColor: "#1A1A24",
                    color: icon.color,
                  }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle border border-black"
                    style={{ backgroundColor: icon.color }}
                  />
                  {icon.name}
                </div>
              ))}
            </div>

            {/* Top 4-5 Skills Pill Row */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "Java Development",
                "AI Agent Architect",
                "Data Analytics",
                "Concurrent Systems",
              ].map((skill) => (
                <span
                  key={skill}
                  className="comic-card text-xs font-mono font-black px-3.5 py-1.5 rounded-lg bg-[#FFE600] text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000000]"
                >
                  ⚡ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Numbered List Rows (01-04) */}
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
                  className={`expertise-row comic-card group relative p-6 sm:p-7 rounded-2xl border-[3px] border-black shadow-[4px_4px_0px_#000000] transition-all cursor-pointer bg-[#13131A] ${
                    isMobileActive || hoveredSlug === item.slug
                      ? "bg-[#1C1C26] shadow-[6px_6px_0px_#000000] -translate-x-1 -translate-y-1"
                      : "hover:bg-[#1A1A24]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Number Badge with 3px border */}
                      <span className="font-mono font-black text-base px-2.5 py-1 rounded-lg bg-[#FFE600] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] mt-0.5">
                        {item.num}
                      </span>

                      <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          {/* Row Icon in Box with 2.5px border */}
                          <div className="w-8 h-8 rounded-lg bg-[#FFE600] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6">
                            <IconComp className="w-4 h-4 stroke-[2.5]" />
                          </div>

                          <h4 className="font-syne text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-[#FFE600] transition-colors">
                            {item.title}
                          </h4>
                        </div>

                        <p className="text-neutral-300 text-xs sm:text-sm mt-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="comic-btn w-8 h-8 rounded-lg bg-white text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center group-hover:bg-[#FFE600] transition-colors flex-shrink-0">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Skill Tag Pills */}
                  <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t-[2px] border-black/40">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono font-bold px-3 py-1 rounded-md bg-[#1A1A24] text-neutral-200 border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000000]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Mobile Tap Cue */}
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#FFE600] font-bold md:hidden">
                    <span>{isMobileActive ? "Tap to close preview" : "Tap to view snapshot"}</span>
                    <span>{isMobileActive ? "▲" : "▼"}</span>
                  </div>

                  {/* Mobile Tap-Expanded Preview */}
                  {isMobileActive && (
                    <div className="mt-4 pt-4 border-t-[2px] border-black block md:hidden animate-in fade-in duration-300">
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_#000000]">
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

      {/* Floating Desktop Cursor-Following Preview Panel */}
      <div
        ref={previewPanelRef}
        className={`fixed top-0 left-0 pointer-events-none z-40 hidden md:block w-72 aspect-video rounded-xl overflow-hidden border-[3px] border-black shadow-[6px_6px_0px_#000000] bg-black transition-[opacity,transform] duration-200 ${
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-2.5">
              <span className="text-[10px] font-mono font-black tracking-wider text-[#FFE600] uppercase bg-black/80 px-2 py-0.5 rounded border border-black">
                {activeHoverItem.title}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

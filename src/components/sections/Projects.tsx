"use client";

import { useRef } from "react";
import Image from "next/image";
import { PROJECTS } from "@/lib/project-data";
import { ArrowUpRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import LiquidGlass from "@/components/ui/LiquidGlass";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      // Only perform pinned horizontal scrolling on desktop (> 1024px)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const totalScroll = track.scrollWidth - window.innerWidth + 120;

        gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
          },
        });

        // Parallax depth on background WORK text
        gsap.to(".work-bg-text", {
          x: 200,
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: 1.5,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative bg-[#0A0A0A] text-white min-h-screen flex flex-col justify-between overflow-hidden py-20 lg:py-0"
    >
      {/* Giant Background WORK Typography (Reference Video 01:17 - 01:24) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full select-none pointer-events-none z-0 overflow-hidden opacity-[0.04]">
        <div className="work-bg-text font-syne font-black text-[35vw] tracking-tighter text-white whitespace-nowrap text-center">
          WORK
        </div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 px-6 md:px-12 pt-8 lg:pt-16 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <LiquidGlass
            shape="pill"
            tint="gold"
            refractionStrength={0.4}
            className="inline-flex items-center gap-2 px-3.5 py-1 text-[#FFDF73] text-[11px] font-mono tracking-widest uppercase mb-3"
          >
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            SELECTED WORKS · 2025 - 2026
          </LiquidGlass>
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold tracking-tight uppercase">
            FEATURED <span className="text-gold-gradient">PROJECTS</span>
          </h2>
        </div>

        <p className="text-xs font-mono text-neutral-400 tracking-wider uppercase max-w-xs text-left sm:text-right">
          CRAFTED WITH PRECISION, DESIGN SENSIBILITY, AND HIGH-VELOCITY CODE.
        </p>
      </div>

      {/* Project Horizontal Cards Track (Desktop Pinned Horizontal / Mobile Vertical) */}
      <div className="relative z-10 w-full flex-1 flex items-center overflow-hidden my-8 lg:my-0">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 md:px-12 w-full lg:w-max items-stretch lg:items-center py-6"
        >
          {PROJECTS.map((project) => (
            <LiquidGlass
              key={project.id}
              shape="rounded"
              tint="obsidian"
              refractionStrength={0.6}
              className="w-full lg:w-[720px] flex-shrink-0 p-6 sm:p-8 flex flex-col justify-between group hover:border-[#D4AF37]/60 transition-all duration-500 shadow-2xl overflow-hidden"
            >
              {/* Card Top: Number & Category */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold text-[#D4AF37]">
                    /{project.num}
                  </span>
                  <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase">
                    {project.category}
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  {project.year}
                </span>
              </div>

              {/* Card Image Showcase */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden my-6 bg-neutral-900 border border-white/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 700px"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Card Bottom Content */}
              <div>
                <h3 className="font-syne text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#FFDF73] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[#D4AF37] tracking-wider uppercase mt-1">
                  {project.subtitle}
                </p>
                <p className="text-sm text-neutral-400 mt-3 line-clamp-2 leading-relaxed font-normal">
                  {project.description}
                </p>

                {/* Tech Pills & Actions */}
                <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white transition-colors"
                        aria-label="GitHub Source"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {project.liveUrl && (
                      <MagneticButton href={project.liveUrl} target="_blank" rel="noreferrer">
                        <LiquidGlass
                          shape="pill"
                          tint="gold"
                          refractionStrength={0.5}
                          className="px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase text-white hover:text-black hover:bg-[#D4AF37] transition-all flex items-center gap-1"
                        >
                          EXPLORE <ArrowUpRight className="w-3.5 h-3.5" />
                        </LiquidGlass>
                      </MagneticButton>
                    )}
                  </div>
                </div>
              </div>
            </LiquidGlass>
          ))}
        </div>
      </div>

      {/* Footer bar for section */}
      <div className="relative z-10 px-6 md:px-12 pb-6 flex items-center justify-between text-xs font-mono text-neutral-500 border-t border-white/5 pt-4">
        <span>03 · PINNED GALLERY</span>
        <span className="hidden sm:inline">SCROLL HORIZONTALLY TO DISCOVER</span>
        <span>06 CASE STUDIES</span>
      </div>
    </section>
  );
}

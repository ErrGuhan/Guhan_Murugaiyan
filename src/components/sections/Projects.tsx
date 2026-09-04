"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Terminal } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REAL_PROJECTS } from "@/lib/project-data";

gsap.registerPlugin(ScrollTrigger);

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function Projects() {
  const transitionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const workDispRef = useRef<SVGFEDisplacementMapElement>(null);

  // Marquee Tracks (Part 7)
  const techMarquee = [
    "JAVA 21",
    "PYTHON",
    "SPRING BOOT",
    "NEXT.JS 16",
    "REACT 19",
    "GSAP MOTION",
    "SUPABASE",
    "POSTGRESQL",
    "TAILWIND V4",
    "LENIS SCROLL",
  ];

  const domainMarquee = [
    "AI AGENTS",
    "DATA ANALYTICS",
    "JAVA ENTERPRISE",
    "STUDENT MARKETPLACE",
    "PRODUCTIVITY OS",
    "SYSTEMS ARCHITECTURE",
    "DOCUMENT PARSING",
    "AUTONOMOUS WORKFLOWS",
  ];

  // 1. ScrollTrigger-driven liquid melt reveal on "WORK" title (Part 7)
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReducedMotion && workDispRef.current) {
        gsap.fromTo(
          workDispRef.current,
          { attr: { scale: 35 } },
          {
            attr: { scale: 0 },
            scrollTrigger: {
              trigger: transitionRef.current,
              start: "top 85%",
              end: "bottom 45%",
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Project cards clip-path & slide reveal (Part 8)
      const cards = gsap.utils.toArray<HTMLElement>(".work-card-reveal");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            clipPath: "polygon(0 15%, 100% 15%, 100% 100%, 0% 100%)",
            opacity: 0,
            y: 40,
          },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative bg-[#0A0A0A] text-[#F0F0F0] overflow-hidden">
      {/* SVG Liquid Distortion Filter for "WORK" Title Reveal (Part 7) */}
      <svg
        className="absolute w-0 h-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <filter id="work-liquid-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.08"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              ref={workDispRef}
              in="SourceGraphic"
              in2="noise"
              scale="35"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* PART 7: WORK TRANSITION (Marquee + Background Grid + Liquid Title) */}
      <section
        id="work"
        ref={transitionRef}
        className="relative pt-28 pb-16 overflow-hidden border-t border-[#C9AF7C]/15 select-none bg-grid-pattern"
      >
        {/* Top Marquee Band: Tech Stack (Moving Left) */}
        <div className="relative py-2.5 border-y border-white/10 overflow-hidden bg-black/60">
          <div className="animate-marquee-left space-x-8 text-xs sm:text-sm font-mono tracking-widest text-[#A8986E] uppercase">
            {[...techMarquee, ...techMarquee, ...techMarquee].map((item, idx) => (
              <span key={`tech-${idx}`} className="hover:text-[#F0F0F0] transition-colors">
                {item} •
              </span>
            ))}
          </div>
        </div>

        {/* Center: Large Condensed "WORK" Title with Liquid Reveal */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex flex-col items-center text-center">
          <span className="text-xs font-mono tracking-[0.25em] text-[#C9AF7C] uppercase mb-3 font-semibold">
            SCROLL TO EXPLORE MY
          </span>

          <h2
            className="font-display font-black text-[clamp(5rem,18vw,14rem)] leading-[0.82] tracking-tighter uppercase text-[#C9AF7C] drop-shadow-[0_0_35px_rgba(201,175,124,0.2)] [filter:url(#work-liquid-filter)]"
          >
            WORK
          </h2>
        </div>

        {/* Bottom Marquee Band: Domain Categories (Moving Right) */}
        <div className="relative py-2.5 border-y border-white/10 overflow-hidden bg-black/60">
          <div className="animate-marquee-right space-x-8 text-xs sm:text-sm font-mono tracking-widest text-neutral-400 uppercase">
            {[...domainMarquee, ...domainMarquee, ...domainMarquee].map((item, idx) => (
              <span key={`domain-${idx}`} className="hover:text-[#C9AF7C] transition-colors">
                {item} •
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PART 8: FEATURED CASE STUDIES (Real Projects & Authentic Code) */}
      <section className="relative py-20 px-6 md:px-12 max-w-5xl mx-auto w-full">
        {/* Section Tag Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C9AF7C]/30 bg-[#C9AF7C]/10 text-[#C9AF7C] text-[11px] font-mono tracking-widest uppercase mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C9AF7C]" />
              {"// 03 — FEATURED PROJECTS"}
            </div>
            <h3 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              SELECTED CASE STUDIES
            </h3>
          </div>

          <p className="text-xs font-mono text-[#7A7A7A] tracking-wider uppercase max-w-xs text-left sm:text-right">
            REAL REPOSITORIES, PRODUCTION SCHEMAS &amp; AUTHENTIC CODE.
          </p>
        </div>

        {/* Project Cards Stack */}
        <div className="flex flex-col gap-14 w-full">
          {REAL_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="work-card-reveal rounded-3xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/50 transition-all duration-500 shadow-2xl p-6 sm:p-8 lg:p-10 w-full overflow-hidden group"
            >
              {/* Card Top: Number, Category & Rotating Status Badge */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold text-[#C9AF7C]">
                    CASE {project.num}
                  </span>
                  <span className="text-xs font-mono tracking-widest text-[#7A7A7A] uppercase font-semibold">
                    / {project.category}
                  </span>
                </div>

                {/* Rotating Circular Status Badge (Part 8) */}
                <div className="relative w-12 h-12 flex items-center justify-center select-none">
                  <svg
                    className="w-full h-full spin-slow"
                    viewBox="0 0 100 100"
                  >
                    <path
                      id={`badgePath-${project.id}`}
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      fill="transparent"
                    />
                    <text className="text-[9px] font-mono tracking-[0.24em] uppercase fill-[#C9AF7C]">
                      <textPath href={`#badgePath-${project.id}`} startOffset="0%">
                        {project.isLive
                          ? "LIVE DEMO ↗ • LIVE DEMO ↗ • "
                          : "IN DEVELOPMENT • IN DEVELOPMENT • "}
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute w-5 h-5 rounded-full bg-[#161616] border border-[#C9AF7C]/40 flex items-center justify-center text-[#C9AF7C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9AF7C]" />
                  </div>
                </div>
              </div>

              {/* Project Preview Mockup Frame (Part 8) */}
              <div
                className="relative w-full aspect-[21/9] sm:aspect-[24/9] my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#161616] group/frame cursor-pointer"
                data-cursor="view"
              >
                {/* Fallback image with hover scale */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center opacity-60 contrast-125 transition-transform duration-700 ease-out group-hover/frame:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] font-mono text-[#C9AF7C] tracking-widest uppercase mb-1">
                    ENGINEERED BY GUHAN MURUGAIYAN
                  </span>
                  <h4 className="font-syne text-2xl sm:text-3xl font-extrabold uppercase text-white">
                    {project.title}
                  </h4>
                </div>
              </div>

              {/* Card Split: Description on Left & Real Code Snippet Block on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-start">
                <div className="lg:col-span-6 space-y-4">
                  <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Real Code Snippet Window (Part 8) */}
                <div className="lg:col-span-6 rounded-xl bg-[#07090D] border border-white/10 overflow-hidden font-mono text-xs shadow-xl">
                  <div className="px-4 py-2.5 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#A8986E]">
                      <Terminal className="w-3 h-3" />
                      <span>{project.filename}</span>
                    </div>
                  </div>
                  <pre className="p-4 text-[11px] sm:text-xs leading-relaxed text-[#CBD5E1] overflow-x-auto max-h-56 selection:bg-[#C9AF7C] selection:text-black">
                    <code>{project.codeSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Card Bottom CTA Actions (Part 8) */}
              <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-mono text-[#7A7A7A]">
                  SOURCE GROUNDED IN REPO
                </span>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="circle-hover-parent px-4 py-2 rounded-full border border-white/15 text-xs font-mono font-semibold tracking-wider uppercase text-white hover:text-black [--circle-bg:#F0F0F0] flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      VIEW REPO
                    </a>
                  )}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="circle-hover-parent px-5 py-2 rounded-full bg-[#C9AF7C] text-black text-xs font-mono font-bold tracking-wider uppercase hover:text-white [--circle-bg:#0A0A0A] flex items-center gap-1.5 transition-all shadow-md"
                    >
                      LIVE DEMO <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#A8986E] text-xs font-mono tracking-wider uppercase">
                      IN DEVELOPMENT
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Terminal,
} from "lucide-react";
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
  const pinnedWrapperRef = useRef<HTMLDivElement>(null);
  const stickyInnerRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const workDispRef = useRef<SVGFEDisplacementMapElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const techMarquee = [
    "JAVA 21", "SPRING BOOT", "REACT 19", "NEXT.JS 16", "THREE.JS 3D",
    "SUPABASE", "PRISMA ORM", "TYPESCRIPT", "GSAP MOTION", "TAILWIND V4",
  ];

  const domainMarquee = [
    "STUDENT MARKETPLACE", "PRODUCTIVITY TRACKER", "BANKING & TRANSFER UI",
    "3D PRODUCT CONFIGURATOR", "LUXURY EVENT STYLING", "CLEAN ARCHITECTURE",
    "FULL-STACK WEB", "CONCURRENT SYSTEMS",
  ];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    },
    { scope: transitionRef }
  );

  useEffect(() => {
    const wrapper = pinnedWrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    track.scrollLeft = 0;
    setActiveIndex(0);

    let st: ScrollTrigger | null = null;

    const rafId = requestAnimationFrame(() => {
      const maxTrackScroll = track.scrollWidth - track.clientWidth;
      if (maxTrackScroll <= 0) return;

      wrapper.style.height = `calc(100vh + ${maxTrackScroll}px)`;

      st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: () => `+=${maxTrackScroll}`,
        scrub: 1,
        onUpdate: (self) => {
          const newScrollLeft = self.progress * maxTrackScroll;
          track.scrollLeft = newScrollLeft;

          const cards = track.querySelectorAll<HTMLElement>(".project-card");
          if (!cards.length) return;
          const trackCenter = track.clientWidth / 2 + newScrollLeft;
          let closestIdx = 0;
          let minDist = Infinity;
          cards.forEach((card, i) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const dist = Math.abs(trackCenter - cardCenter);
            if (dist < minDist) { minDist = dist; closestIdx = i; }
          });
          setActiveIndex(closestIdx);
        },
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (st) st.kill();
      if (wrapper) wrapper.style.height = "";
    };
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const wrapper = pinnedWrapperRef.current;
    if (!track || !wrapper) return;

    const targetIdx = Math.max(0, Math.min(REAL_PROJECTS.length - 1, index));
    setActiveIndex(targetIdx);

    const cards = track.querySelectorAll<HTMLElement>(".project-card");
    const targetCard = cards[targetIdx];
    if (!targetCard) return;

    const cardLeft = targetCard.offsetLeft;
    const cardWidth = targetCard.offsetWidth;
    const trackWidth = track.clientWidth;
    const targetScrollLeft = Math.max(0, cardLeft - (trackWidth - cardWidth) / 2);

    const maxTrackScroll = track.scrollWidth - track.clientWidth;
    if (maxTrackScroll > 0) {
      const progress = targetScrollLeft / maxTrackScroll;
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const targetPageY = wrapperTop + progress * maxTrackScroll;
      const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, opts?: Record<string, unknown>) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(targetPageY, { duration: 0.8 });
      } else {
        window.scrollTo({ top: targetPageY, behavior: "smooth" });
      }
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") scrollToIndex(activeIndex + 1);
    else if (e.key === "ArrowLeft") scrollToIndex(activeIndex - 1);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("a, button, input, pre, code")) return;
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = trackRef.current ? trackRef.current.scrollLeft : 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current || !pinnedWrapperRef.current) return;
    e.preventDefault();
    const walk = (e.pageX - startX.current) * 1.35;
    const newScrollLeft = Math.max(0, scrollStart.current - walk);
    const maxTrackScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
    if (maxTrackScroll > 0) {
      const progress = Math.min(1, newScrollLeft / maxTrackScroll);
      const wrapperTop = pinnedWrapperRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: wrapperTop + progress * maxTrackScroll });
    }
  };

  const handleMouseUpOrLeave = () => { isDragging.current = false; };

  return (
    <div className="relative bg-[#0A0A0A] text-[#F0F0F0] select-none">
      <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="work-liquid-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" result="noise" />
            <feDisplacementMap ref={workDispRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <section
        id="work"
        ref={transitionRef}
        className="relative pt-28 pb-16 overflow-hidden border-t border-[#C9AF7C]/15 select-none bg-grid-pattern"
      >
        <div className="relative py-2.5 border-y border-white/10 overflow-hidden bg-black/60">
          <div className="animate-marquee-left space-x-8 text-xs sm:text-sm font-mono tracking-widest text-[#A8986E] uppercase">
            {[...techMarquee, ...techMarquee, ...techMarquee].map((item, idx) => (
              <span key={`tech-${idx}`} className="hover:text-[#F0F0F0] transition-colors">{item} •</span>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex flex-col items-center text-center">
          <span className="text-xs font-mono tracking-[0.25em] text-[#C9AF7C] uppercase mb-3 font-semibold">
            SCROLL TO EXPLORE MY
          </span>
          <h2 className="font-display font-black text-[clamp(5rem,18vw,14rem)] leading-[0.82] tracking-tighter uppercase text-[#C9AF7C] drop-shadow-[0_0_35px_rgba(201,175,124,0.2)] [filter:url(#work-liquid-filter)]">
            WORK
          </h2>
        </div>

        <div className="relative py-2.5 border-y border-white/10 overflow-hidden bg-black/60">
          <div className="animate-marquee-right space-x-8 text-xs sm:text-sm font-mono tracking-widest text-neutral-400 uppercase">
            {[...domainMarquee, ...domainMarquee, ...domainMarquee].map((item, idx) => (
              <span key={`domain-${idx}`} className="hover:text-[#C9AF7C] transition-colors">{item} •</span>
            ))}
          </div>
        </div>
      </section>

      <div
        ref={pinnedWrapperRef}
        className="relative w-full"
        style={{ height: "100vh" }}
      >
        <div
          ref={stickyInnerRef}
          className="sticky top-0 w-full h-screen overflow-hidden bg-[#0A0A0A]"
        >
          <section
            ref={gallerySectionRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="Selected Case Studies Horizontal Gallery"
            className="relative h-full py-8 sm:py-10 px-4 sm:px-8 lg:px-12 flex flex-col justify-center outline-none"
          >
            <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-4 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C9AF7C]/30 bg-[#C9AF7C]/10 text-[#C9AF7C] text-[11px] font-mono tracking-widest uppercase mb-2 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9AF7C]" />
                  {`// 03 — FEATURED PROJECTS (0${activeIndex + 1} / 05)`}
                </div>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white">
                  SELECTED CASE STUDIES
                </h3>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-center">
                <div className="flex items-center gap-2">
                  {REAL_PROJECTS.map((p, i) => (
                    <button
                      key={`dot-${p.id}`}
                      onClick={() => scrollToIndex(i)}
                      aria-label={`Go to project ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? "w-8 bg-[#C9AF7C]" : "w-2 bg-white/20 hover:bg-white/50"}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollToIndex(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    aria-label="Previous project"
                    className="circle-hover-parent w-10 h-10 rounded-full border border-white/15 text-white disabled:opacity-30 disabled:pointer-events-none hover:border-[#C9AF7C] hover:text-black [--circle-bg:#C9AF7C] transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 z-10" />
                  </button>
                  <button
                    onClick={() => scrollToIndex(activeIndex + 1)}
                    disabled={activeIndex === REAL_PROJECTS.length - 1}
                    aria-label="Next project"
                    className="circle-hover-parent w-10 h-10 rounded-full border border-white/15 text-white disabled:opacity-30 disabled:pointer-events-none hover:border-[#C9AF7C] hover:text-black [--circle-bg:#C9AF7C] transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 z-10" />
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={trackRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className="relative flex flex-row items-stretch w-full overflow-x-hidden py-3 px-4 sm:px-8 md:px-12 lg:px-16 no-scrollbar cursor-grab active:cursor-grabbing gap-5 sm:gap-6 lg:gap-8 flex-1"
              style={{ scrollBehavior: "auto" }}
            >
              {REAL_PROJECTS.map((project, idx) => (
                <div
                  key={project.id}
                  className="project-card relative rounded-3xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/50 transition-all duration-500 shadow-2xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between group select-text flex-shrink-0"
                  style={{ width: "clamp(300px, 68vw, 800px)" }}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-bold text-[#C9AF7C]">CASE {project.num}</span>
                      <span className="text-xs font-mono tracking-widest text-[#7A7A7A] uppercase font-semibold">/ {project.category}</span>
                      <span className="hidden sm:inline-block text-[11px] font-mono text-[#A8986E]">[0{idx + 1} of 05]</span>
                    </div>
                    <div className="relative w-10 h-10 flex items-center justify-center select-none flex-shrink-0">
                      <svg className="w-full h-full spin-slow" viewBox="0 0 100 100">
                        <path id={`badgePath-${project.id}`} d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="transparent" />
                        <text className="text-[9px] font-mono tracking-[0.24em] uppercase fill-[#C9AF7C]">
                          <textPath href={`#badgePath-${project.id}`} startOffset="0%">LIVE DEMO ↗ • LIVE DEMO ↗ • </textPath>
                        </text>
                      </svg>
                      <div className="absolute w-4 h-4 rounded-full bg-[#161616] border border-[#C9AF7C]/40 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9AF7C]" />
                      </div>
                    </div>
                  </div>

                  <div
                    className="relative w-full my-4 rounded-2xl overflow-hidden border border-white/10 bg-[#161616] group/frame cursor-pointer"
                    style={{ aspectRatio: "21/8" }}
                    data-cursor="view"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center opacity-60 contrast-125 transition-transform duration-700 ease-out group-hover/frame:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5">
                      <span className="text-[10px] font-mono text-[#C9AF7C] tracking-widest uppercase mb-1 font-semibold">ENGINEERED BY GUHAN MURUGAIYAN</span>
                      <h4 className="font-syne text-xl sm:text-2xl font-extrabold uppercase text-white">{project.title}</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-2 items-start flex-1">
                    <div className="lg:col-span-6 space-y-3">
                      <p className="text-sm text-[#CBD5E1] leading-relaxed line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-6 rounded-xl bg-[#07090D] border border-white/10 overflow-hidden font-mono text-xs shadow-xl">
                      <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
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
                      <pre className="p-3 text-[11px] leading-relaxed text-[#CBD5E1] overflow-x-auto max-h-32 selection:bg-[#C9AF7C] selection:text-black">
                        <code>{project.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 mt-auto">
                    <span className="text-xs font-mono text-[#7A7A7A]">SOURCE GROUNDED IN REPO</span>
                    <div className="flex items-center gap-2.5">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="circle-hover-parent px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-mono font-semibold tracking-wider uppercase text-white hover:text-black [--circle-bg:#F0F0F0] flex items-center gap-1.5 transition-colors">
                        <GithubIcon className="w-3.5 h-3.5" /> VIEW REPO
                      </a>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="circle-hover-parent px-4 py-1.5 rounded-full bg-[#C9AF7C] text-black text-xs font-mono font-bold tracking-wider uppercase hover:text-white [--circle-bg:#0A0A0A] flex items-center gap-1.5 transition-all shadow-md">
                        LIVE DEMO <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-center gap-3 text-[11px] font-mono text-white/25 tracking-widest uppercase select-none">
              <span>← scroll to explore projects →</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

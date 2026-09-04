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
  const [isMobile, setIsMobile] = useState(false);
  const [centerPadding, setCenterPadding] = useState(0);

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

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Liquid distortion text reveal on "WORK"
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

  // Desktop Pinned Horizontal Scroll Architecture
  useEffect(() => {
    if (isMobile) return;

    const wrapper = pinnedWrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const totalProjects = REAL_PROJECTS.length;
    if (totalProjects <= 1) return;

    let st: ScrollTrigger | null = null;
    let tween: gsap.core.Tween | null = null;

    const setupGallery = () => {
      if (st) st.kill();
      if (tween) tween.kill();

      const cards = track.querySelectorAll<HTMLElement>(".project-card");
      if (cards.length < 2) return;

      const firstCard = cards[0];
      const lastCard = cards[cards.length - 1];

      // Calculate center padding so Card 1 starts centered in the viewport
      const viewportWidth = window.innerWidth;
      const cardWidth = firstCard.offsetWidth;
      const calculatedPadding = Math.max(24, Math.round((viewportWidth - cardWidth) / 2));
      setCenterPadding(calculatedPadding);

      // Force recalculation of card positions with updated padding
      requestAnimationFrame(() => {
        const currentCards = track.querySelectorAll<HTMLElement>(".project-card");
        if (!currentCards.length) return;
        const c0 = currentCards[0];
        const cLast = currentCards[currentCards.length - 1];

        // Exact horizontal distance to travel from Card 0 center to Card N-1 center
        const totalDistance = cLast.offsetLeft - c0.offsetLeft;
        if (totalDistance <= 0) return;

        // Dynamic vertical scroll distance proportional strictly to project count (N - 1 steps)
        // Each project step consumes ~75% of viewport height (deliberate & responsive)
        const vh = window.innerHeight;
        const stepScroll = Math.min(800, Math.max(500, Math.round(vh * 0.75)));
        const scrollDistance = (totalProjects - 1) * stepScroll;

        // Set wrapper height so sticky container releases immediately when Project N finishes
        wrapper.style.height = `${vh + scrollDistance}px`;

        gsap.set(track, { x: 0 });

        tween = gsap.to(track, {
          x: -totalDistance,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const rawProgress = self.progress * (totalProjects - 1);
              const active = Math.min(totalProjects - 1, Math.max(0, Math.round(rawProgress)));
              setActiveIndex(active);
            },
          },
        });

        st = tween.scrollTrigger ?? null;
      });
    };

    const timer = setTimeout(setupGallery, 100);

    const handleResize = () => {
      setupGallery();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (st) st.kill();
      if (tween) tween.kill();
      if (wrapper) wrapper.style.height = "";
      if (track) gsap.set(track, { clearProps: "x" });
    };
  }, [isMobile]);

  // Mobile IntersectionObserver to update activeIndex on vertical scroll
  useEffect(() => {
    if (!isMobile) return;
    const cards = trackRef.current?.querySelectorAll<HTMLElement>(".project-card");
    if (!cards || !cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(cards).indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.45 }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [isMobile]);

  // Programmatic scroll to specific card index
  const scrollToIndex = useCallback(
    (index: number) => {
      const targetIdx = Math.max(0, Math.min(REAL_PROJECTS.length - 1, index));
      setActiveIndex(targetIdx);

      if (isMobile) {
        const cards = trackRef.current?.querySelectorAll<HTMLElement>(".project-card");
        if (cards && cards[targetIdx]) {
          cards[targetIdx].scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      const wrapper = pinnedWrapperRef.current;
      if (!wrapper) return;

      const totalProjects = REAL_PROJECTS.length;
      const vh = window.innerHeight;
      const stepScroll = Math.min(800, Math.max(500, Math.round(vh * 0.75)));
      const scrollDistance = (totalProjects - 1) * stepScroll;

      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const targetPageY = wrapperTop + (targetIdx / (totalProjects - 1)) * scrollDistance;

      const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, opts?: Record<string, unknown>) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(targetPageY, { duration: 0.8 });
      } else {
        window.scrollTo({ top: targetPageY, behavior: "smooth" });
      }
    },
    [isMobile]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") scrollToIndex(activeIndex + 1);
    else if (e.key === "ArrowLeft") scrollToIndex(activeIndex - 1);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("a, button, input, pre, code")) return;
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = window.scrollY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || isMobile || !pinnedWrapperRef.current) return;
    e.preventDefault();
    const walk = (e.pageX - startX.current) * 1.5;
    window.scrollTo({ top: scrollStart.current - walk });
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

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

      {/* Marquee & Title Section */}
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

      {/* Pinned Gallery Container */}
      <div
        ref={pinnedWrapperRef}
        className={`relative w-full ${isMobile ? "h-auto" : ""}`}
        style={isMobile ? { height: "auto" } : undefined}
      >
        <div
          ref={stickyInnerRef}
          className={
            isMobile
              ? "relative w-full py-12 px-4 bg-[#0A0A0A]"
              : "sticky top-0 w-full h-screen overflow-hidden bg-[#0A0A0A]"
          }
        >
          <section
            ref={gallerySectionRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="Selected Case Studies Gallery"
            className="relative h-full py-6 sm:py-8 px-4 sm:px-8 lg:px-12 flex flex-col justify-center outline-none"
          >
            {/* Header & Controls */}
            <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 mb-3 border-b border-white/10">
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

            {/* Cards Track */}
            <div
              ref={trackRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className={
                isMobile
                  ? "flex flex-col items-center w-full gap-8 py-4"
                  : "relative flex flex-row items-stretch flex-nowrap py-2 cursor-grab active:cursor-grabbing gap-6 sm:gap-8 flex-1"
              }
              style={
                isMobile
                  ? {}
                  : {
                      willChange: "transform",
                      paddingLeft: `${centerPadding}px`,
                      paddingRight: `${centerPadding}px`,
                    }
              }
            >
              {REAL_PROJECTS.map((project, idx) => (
                <div
                  key={project.id}
                  className="project-card relative rounded-3xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/50 transition-all duration-500 shadow-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between group select-text flex-shrink-0"
                  style={
                    isMobile
                      ? { width: "100%", maxWidth: "560px" }
                      : { width: "clamp(320px, 66vw, 780px)" }
                  }
                >
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
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
                    className="relative w-full my-3.5 rounded-2xl overflow-hidden border border-white/10 bg-[#161616] group/frame cursor-pointer"
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
                      <pre className="p-3 text-[11px] leading-relaxed text-[#CBD5E1] overflow-x-auto max-h-28 selection:bg-[#C9AF7C] selection:text-black">
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

            <div className="mt-2 flex items-center justify-center gap-3 text-[11px] font-mono text-white/25 tracking-widest uppercase select-none">
              <span>{isMobile ? "↓ scroll down to explore projects ↓" : "← scroll to explore projects →"}</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


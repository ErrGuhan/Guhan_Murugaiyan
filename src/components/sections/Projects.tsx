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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  const totalProjects = REAL_PROJECTS.length;

  // Responsive & Reduced Motion Detection
  useEffect(() => {
    const checkState = () => {
      setIsMobile(window.innerWidth < 768);
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };
    checkState();
    window.addEventListener("resize", checkState);
    return () => window.removeEventListener("resize", checkState);
  }, []);

  // Liquid distortion text reveal on "WORK"
  useGSAP(
    () => {
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
    { scope: transitionRef, dependencies: [prefersReducedMotion] }
  );

  // Desktop Pinned Horizontal Scroll Architecture
  useEffect(() => {
    if (isMobile || prefersReducedMotion) {
      if (pinnedWrapperRef.current) {
        pinnedWrapperRef.current.style.height = "auto";
      }
      if (trackRef.current) {
        gsap.set(trackRef.current, { clearProps: "all" });
      }
      return;
    }

    const wrapper = pinnedWrapperRef.current;
    const stickyInner = stickyInnerRef.current;
    const track = trackRef.current;
    if (!wrapper || !stickyInner || !track) return;
    if (totalProjects <= 1) return;

    let st: ScrollTrigger | null = null;
    let travelDistance = 0;

    const calculateAndBind = () => {
      // Clean up previous trigger if exists
      if (st) {
        st.kill();
        st = null;
      }

      // Exact horizontal travel required to bring last project into final frame
      const maxScroll = track.scrollWidth - stickyInner.clientWidth;
      travelDistance = Math.max(0, maxScroll);

      if (travelDistance <= 0) {
        wrapper.style.height = "100vh";
        gsap.set(track, { x: 0 });
        return;
      }

      // Vertical driver height strictly equals 1 viewport height + horizontal travel distance
      // This produces an exact 1:1 scroll relationship with zero artificial dead space.
      wrapper.style.height = `${window.innerHeight + travelDistance}px`;

      // Set initial transform
      gsap.set(track, { x: 0 });

      // Create ScrollTrigger bound to the driver container
      st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true, // 1:1 immediate sync with Lenis smooth scroll
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const currentX = -travelDistance * self.progress;
          gsap.set(track, { x: currentX });

          // Update active index based on progress
          const rawIdx = Math.round(self.progress * (totalProjects - 1));
          const boundedIdx = Math.min(totalProjects - 1, Math.max(0, rawIdx));
          setActiveIndex(boundedIdx);
        },
      });

      ScrollTrigger.refresh();
    };

    // Calculate immediately and also after layout settles
    calculateAndBind();
    const timer = setTimeout(calculateAndBind, 120);

    // ResizeObserver watches track and container dimensions dynamically
    const ro = new ResizeObserver(() => {
      calculateAndBind();
    });
    ro.observe(track);
    ro.observe(stickyInner);

    const handleWindowResize = () => {
      calculateAndBind();
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("resize", handleWindowResize);
      if (st) st.kill();
      if (wrapper) wrapper.style.height = "";
      if (track) gsap.set(track, { clearProps: "x" });
    };
  }, [isMobile, prefersReducedMotion, totalProjects]);

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
      const targetIdx = Math.max(0, Math.min(totalProjects - 1, index));
      setActiveIndex(targetIdx);

      if (isMobile || prefersReducedMotion) {
        const cards = trackRef.current?.querySelectorAll<HTMLElement>(".project-card");
        if (cards && cards[targetIdx]) {
          cards[targetIdx].scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      const wrapper = pinnedWrapperRef.current;
      const stickyInner = stickyInnerRef.current;
      const track = trackRef.current;
      if (!wrapper || !stickyInner || !track) return;

      const travelDistance = Math.max(0, track.scrollWidth - stickyInner.clientWidth);
      if (travelDistance <= 0 || totalProjects <= 1) return;

      const progress = targetIdx / (totalProjects - 1);
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const targetPageY = wrapperTop + progress * travelDistance;

      const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, opts?: Record<string, unknown>) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(targetPageY, { duration: 0.8 });
      } else {
        window.scrollTo({ top: targetPageY, behavior: "smooth" });
      }
    },
    [isMobile, prefersReducedMotion, totalProjects]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") scrollToIndex(activeIndex + 1);
    else if (e.key === "ArrowLeft") scrollToIndex(activeIndex - 1);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile || prefersReducedMotion || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("a, button, input, pre, code")) return;
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = window.scrollY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || isMobile || prefersReducedMotion || !pinnedWrapperRef.current) return;
    e.preventDefault();
    const walk = (e.pageX - startX.current) * 1.5;
    window.scrollTo({ top: scrollStart.current - walk });
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const isStackedMode = isMobile || prefersReducedMotion;

  return (
    <section id="work" className="relative w-full bg-[#0A0A0A] text-[#F0F0F0] select-none">
      <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="work-liquid-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" result="noise" />
            <feDisplacementMap ref={workDispRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Part A: Marquee & WORK Title Banner */}
      <div
        ref={transitionRef}
        className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden border-t border-[#C9AF7C]/15 select-none bg-grid-pattern"
      >
        <div className="relative py-2.5 border-y border-white/10 overflow-hidden bg-black/60">
          <div className="animate-marquee-left space-x-8 text-xs sm:text-sm font-mono tracking-widest text-[#A8986E] uppercase">
            {[...techMarquee, ...techMarquee, ...techMarquee].map((item, idx) => (
              <span key={`tech-${idx}`} className="hover:text-[#F0F0F0] transition-colors">{item} •</span>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 sm:py-12 flex flex-col items-center text-center">
          <span className="text-xs font-mono tracking-[0.25em] text-[#C9AF7C] uppercase mb-3 font-semibold">
            SCROLL TO EXPLORE MY
          </span>
          <h2 className="font-display font-black text-[clamp(4.5rem,17vw,13rem)] leading-[0.82] tracking-tighter uppercase text-[#C9AF7C] drop-shadow-[0_0_35px_rgba(201,175,124,0.2)] [filter:url(#work-liquid-filter)]">
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
      </div>

      {/* Part B: Project Scroll Driver & Pinned Gallery Viewport */}
      <div
        ref={pinnedWrapperRef}
        className={`relative w-full ${isStackedMode ? "h-auto" : ""}`}
        style={isStackedMode ? { height: "auto" } : undefined}
      >
        <div
          ref={stickyInnerRef}
          className={
            isStackedMode
              ? "relative w-full py-12 px-4 sm:px-6 bg-[#0A0A0A]"
              : "sticky top-0 w-full h-[100dvh] overflow-hidden bg-[#0A0A0A] flex flex-col justify-between py-4 sm:py-6"
          }
        >
          <div
            ref={gallerySectionRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="Selected Case Studies Gallery"
            className={`relative w-full flex flex-col justify-between outline-none ${
              isStackedMode ? "" : "h-full px-4 sm:px-8 lg:px-12"
            }`}
          >
            {/* Header & Gallery Navigation Controls */}
            <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-white/10 flex-shrink-0">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9AF7C]/30 bg-[#C9AF7C]/10 text-[#C9AF7C] text-[11px] font-mono tracking-widest uppercase mb-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9AF7C]" />
                  {`// 05 — FEATURED PROJECTS (0${activeIndex + 1} / 0${totalProjects})`}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white">
                  SELECTED CASE STUDIES
                </h3>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-center">
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {REAL_PROJECTS.map((p, i) => (
                    <button
                      key={`dot-${p.id}`}
                      onClick={() => scrollToIndex(i)}
                      aria-label={`Go to project ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeIndex === i
                          ? "w-7 sm:w-8 bg-[#C9AF7C]"
                          : "w-2 bg-white/20 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                {/* Left / Right arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollToIndex(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    aria-label="Previous project"
                    className="circle-hover-parent w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 text-white disabled:opacity-30 disabled:pointer-events-none hover:border-[#C9AF7C] hover:text-black [--circle-bg:#C9AF7C] transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 z-10" />
                  </button>
                  <button
                    onClick={() => scrollToIndex(activeIndex + 1)}
                    disabled={activeIndex === totalProjects - 1}
                    aria-label="Next project"
                    className="circle-hover-parent w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 text-white disabled:opacity-30 disabled:pointer-events-none hover:border-[#C9AF7C] hover:text-black [--circle-bg:#C9AF7C] transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 z-10" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cards Track Container */}
            <div className={isStackedMode ? "w-full my-6" : "relative w-full overflow-hidden flex-1 flex items-center my-1"}>
              <div
                ref={trackRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className={
                  isStackedMode
                    ? "flex flex-col items-center w-full gap-8 py-2"
                    : "relative flex flex-row items-stretch flex-nowrap py-2 cursor-grab active:cursor-grabbing gap-6 sm:gap-8 flex-1"
                }
                style={
                  isStackedMode
                    ? {}
                    : {
                        willChange: "transform",
                        paddingLeft: "calc((100vw - min(100vw, 1280px)) / 2 + 16px)",
                        paddingRight: "calc((100vw - min(100vw, 1280px)) / 2 + 48px)",
                      }
                }
              >
                {REAL_PROJECTS.map((project, idx) => (
                  <div
                    key={project.id}
                    className="project-card relative rounded-3xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/50 transition-all duration-500 shadow-2xl p-4 sm:p-5 lg:p-6 flex flex-col justify-between group select-text flex-shrink-0"
                    style={
                      isStackedMode
                        ? { width: "100%", maxWidth: "560px" }
                        : {
                            width: "clamp(320px, 64vw, 760px)",
                            maxHeight: "min(620px, 74vh)",
                          }
                    }
                  >
                    {/* Top Case Bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono font-bold text-[#C9AF7C]">CASE {project.num}</span>
                        <span className="text-xs font-mono tracking-widest text-[#7A7A7A] uppercase font-semibold">/ {project.category}</span>
                        <span className="hidden sm:inline-block text-[11px] font-mono text-[#A8986E]">
                          [0{idx + 1} of 0{totalProjects}]
                        </span>
                      </div>
                      <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center select-none flex-shrink-0">
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

                    {/* Project Preview Image */}
                    <div
                      className="relative w-full my-2.5 sm:my-3 rounded-2xl overflow-hidden border border-white/10 bg-[#161616] group/frame cursor-pointer flex-shrink-0"
                      style={{ aspectRatio: "21/8", maxHeight: "180px" }}
                      data-cursor="view"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center opacity-60 contrast-125 transition-transform duration-700 ease-out group-hover/frame:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 760px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3 sm:p-4">
                        <span className="text-[9px] sm:text-[10px] font-mono text-[#C9AF7C] tracking-widest uppercase mb-0.5 font-semibold">
                          ENGINEERED BY GUHAN MURUGAIYAN
                        </span>
                        <h4 className="font-syne text-lg sm:text-xl lg:text-2xl font-extrabold uppercase text-white">
                          {project.title}
                        </h4>
                      </div>
                    </div>

                    {/* Content & Code Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 my-1 sm:my-2 items-start flex-1 min-h-0">
                      <div className="lg:col-span-6 space-y-2">
                        <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.tags.map((tag) => (
                            <span key={tag} className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="lg:col-span-6 rounded-xl bg-[#07090D] border border-white/10 overflow-hidden font-mono text-xs shadow-xl">
                        <div className="px-3 py-1.5 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                            <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                            <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-[#A8986E]">
                            <Terminal className="w-3 h-3" />
                            <span>{project.filename}</span>
                          </div>
                        </div>
                        <pre className="p-2 sm:p-2.5 text-[10px] sm:text-[11px] leading-relaxed text-[#CBD5E1] overflow-x-auto max-h-20 sm:max-h-24 selection:bg-[#C9AF7C] selection:text-black">
                          <code>{project.codeSnippet}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Action Links Footer */}
                    <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 mt-auto flex-shrink-0">
                      <span className="text-[11px] font-mono text-[#7A7A7A]">SOURCE GROUNDED IN REPO</span>
                      <div className="flex items-center gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="circle-hover-parent px-3 py-1.5 rounded-full border border-white/15 text-[11px] font-mono font-semibold tracking-wider uppercase text-white hover:text-black [--circle-bg:#F0F0F0] flex items-center gap-1.5 transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" /> REPO
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="circle-hover-parent px-3.5 py-1.5 rounded-full bg-[#C9AF7C] text-black text-[11px] font-mono font-bold tracking-wider uppercase hover:text-white [--circle-bg:#0A0A0A] flex items-center gap-1.5 transition-all shadow-md"
                        >
                          LIVE DEMO <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Scroll Prompt */}
            <div className="flex-shrink-0 flex items-center justify-center gap-3 text-[11px] font-mono text-white/30 tracking-widest uppercase select-none">
              <span>{isStackedMode ? "↓ scroll down to explore projects ↓" : "← scroll vertically to explore projects →"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

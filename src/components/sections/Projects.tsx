"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Terminal,
  RotateCw,
  Activity,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REAL_PROJECTS } from "@/lib/project-data";
import { playCardFlip, playHoverTick } from "@/lib/sound-effects";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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

  const [flippedCardIds, setFlippedCardIds] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playCardFlip();
    setFlippedCardIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

  useEffect(() => {
    const checkState = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkState();
    window.addEventListener("resize", checkState);
    return () => window.removeEventListener("resize", checkState);
  }, []);

  useGSAP(
    () => {
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
        if (st) {
          st.kill();
          st = null;
        }

        const maxScroll = track.scrollWidth - stickyInner.clientWidth;
        travelDistance = Math.max(0, maxScroll);

        if (travelDistance <= 0) {
          wrapper.style.height = "100vh";
          gsap.set(track, { x: 0 });
          return;
        }

        wrapper.style.height = `${window.innerHeight + travelDistance}px`;
        gsap.set(track, { x: 0 });

        st = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const currentX = -travelDistance * self.progress;
            gsap.set(track, { x: currentX });

            const rawIdx = Math.round(self.progress * (totalProjects - 1));
            const boundedIdx = Math.min(totalProjects - 1, Math.max(0, rawIdx));
            setActiveIndex(boundedIdx);
          },
        });

        ScrollTrigger.refresh();
      };

      calculateAndBind();
      const timer = setTimeout(calculateAndBind, 120);

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
    },
    {
      scope: pinnedWrapperRef,
      dependencies: [isMobile, prefersReducedMotion, totalProjects],
    }
  );

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
    <section id="work" className="relative w-full bg-[#0B0B0F] text-white select-none border-t-[3px] border-black scroll-mt-20">
      {/* Deep-link alias for /#projects */}
      <div id="projects" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

      {/* Part A: Comic Hazard Striping & Heavy Distorted WORK Title Banner */}
      <div
        ref={transitionRef}
        className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden border-b-[3px] border-black select-none bg-halftone-dark"
      >
        {/* Top Marquee Hazard Tape */}
        <div className="relative py-2.5 border-y-[3px] border-black overflow-hidden bg-[#FFE600] text-black shadow-[0_4px_0px_#000000]">
          <div className="animate-marquee-left space-x-8 text-xs sm:text-sm font-mono font-black tracking-widest uppercase">
            {[...techMarquee, ...techMarquee, ...techMarquee].map((item, idx) => (
              <span key={`tech-${idx}`} className="hover:text-white transition-colors">{item} ★</span>
            ))}
          </div>
        </div>

        {/* Center Distorted WORK Title */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 bg-white text-black border-[2.5px] sm:border-[3px] border-black shadow-[2.5px_2.5px_0px_#000000] sm:shadow-[3px_3px_0px_#000000] rounded-lg text-[11px] sm:text-xs font-mono font-black tracking-widest uppercase mb-3 -rotate-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FFE600] fill-[#FFE600]" />
            <span>{"FEATURED PROJECTS // CASE STUDIES"}</span>
          </div>

          <h2
            data-text="WORK"
            className="comic-glitch-text text-[clamp(3.8rem,16vw,14rem)] leading-[0.82] tracking-tighter uppercase text-[#FFE600] drop-shadow-[5px_5px_0px_#000000] sm:drop-shadow-[7px_7px_0px_#000000]"
          >
            WORK
          </h2>
        </div>

        {/* Bottom Marquee Hazard Tape */}
        <div className="relative py-2.5 border-y-[3px] border-black overflow-hidden bg-[#00F0FF] text-black shadow-[0_4px_0px_#000000]">
          <div className="animate-marquee-right space-x-8 text-xs sm:text-sm font-mono font-black tracking-widest uppercase">
            {[...domainMarquee, ...domainMarquee, ...domainMarquee].map((item, idx) => (
              <span key={`domain-${idx}`} className="hover:text-white transition-colors">{item} ⚡</span>
            ))}
          </div>
        </div>
      </div>

      {/* Part B: Project Scroll Driver & Pinned Gallery Viewport */}
      <div
        ref={pinnedWrapperRef}
        className={cn("relative w-full", isStackedMode && "h-auto")}
        style={isStackedMode ? { height: "auto" } : undefined}
      >
        <div
          ref={stickyInnerRef}
          className={
            isStackedMode
              ? "relative w-full py-8 sm:py-12 px-3 sm:px-6 bg-[#0B0B0F] bg-halftone-dark"
              : "sticky top-0 w-full h-[100dvh] overflow-hidden bg-[#0B0B0F] bg-halftone-dark flex flex-col justify-between py-4 sm:py-6"
          }
        >
          <div
            ref={gallerySectionRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="Selected Case Studies Gallery"
            className={cn(
              "relative w-full flex flex-col justify-between outline-none",
              !isStackedMode && "h-full px-4 sm:px-8 lg:px-12"
            )}
          >
            {/* Header & Gallery Navigation Controls */}
            <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b-[3px] border-black flex-shrink-0">
              <div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg border-[2px] sm:border-[2.5px] border-black bg-[#FFE600] text-black shadow-[2px_2px_0px_#000000] sm:shadow-[2.5px_2.5px_0px_#000000] text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-black">
                    <Sparkles className="w-3.5 h-3.5 fill-black" />
                    {`// 01 — FEATURED WORK (0${activeIndex + 1} / 0${totalProjects})`}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg border-[1.5px] sm:border-[2px] border-black bg-[#13131A] text-[#00F0FF] shadow-[2px_2px_0px_#000000] text-[9px] sm:text-[10px] font-mono font-black tracking-wider uppercase">
                    <Activity className="w-3 h-3 text-[#00E676] animate-pulse" />
                    <span>5 PRODUCTION CASE STUDIES · LIVE DEMOS</span>
                  </div>
                </div>
                <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white -webkit-text-stroke-[1.5px_#000] drop-shadow-[3px_3px_0px_#000000]">
                  SELECTED CASE STUDIES
                </h3>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-center">
                {/* Dots indicator with comic borders */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {REAL_PROJECTS.map((p, i) => (
                    <button
                      key={`dot-${p.id}`}
                      onClick={() => {
                        playHoverTick();
                        scrollToIndex(i);
                      }}
                      aria-label={`Go to project ${i + 1}`}
                      className={cn(
                        "h-3 rounded-md border-[2px] border-black transition-all",
                        activeIndex === i
                          ? "w-8 bg-[#FFE600] shadow-[2px_2px_0px_#000000]"
                          : "w-3 bg-neutral-600 hover:bg-white"
                      )}
                    />
                  ))}
                </div>

                {/* Left / Right arrows with 3px black borders & 3px shadows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playHoverTick();
                      scrollToIndex(activeIndex - 1);
                    }}
                    disabled={activeIndex === 0}
                    aria-label="Previous project"
                    className="comic-btn w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000000] disabled:opacity-30 disabled:pointer-events-none hover:bg-[#FFE600] flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[3]" />
                  </button>
                  <button
                    onClick={() => {
                      playHoverTick();
                      scrollToIndex(activeIndex + 1);
                    }}
                    disabled={activeIndex === totalProjects - 1}
                    aria-label="Next project"
                    className="comic-btn w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000000] disabled:opacity-30 disabled:pointer-events-none hover:bg-[#FFE600] flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cards Track Container with data-cursor="drag" */}
            <div
              data-cursor="drag"
              className={isStackedMode ? "w-full my-6" : "relative w-full overflow-hidden flex-1 flex items-center my-1"}
            >
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
                {REAL_PROJECTS.map((project, idx) => {
                  const isFlipped = !!flippedCardIds[project.id];
                  return (
                    <div
                      key={project.id}
                      className="project-card flex-shrink-0 [perspective:1200px]"
                      style={
                        isStackedMode
                          ? { width: "100%", maxWidth: "580px" }
                          : {
                              width: "clamp(340px, 66vw, 780px)",
                              maxHeight: "min(640px, 76vh)",
                            }
                      }
                    >
                      <div
                        className={cn(
                          "relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]",
                          isFlipped && "[transform:rotateY(180deg)]"
                        )}
                      >
                        {/* FRONT FACE: Visual Preview & Live Launch */}
                        <div className="relative rounded-2xl bg-[#13131A] border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] sm:hover:shadow-[7px_7px_0px_#000000] p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between group select-text h-full [backface-visibility:hidden]">
                          {/* Top Case Bar */}
                          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b-[2px] border-black flex-shrink-0 gap-1.5 sm:gap-2 flex-wrap">
                            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                              <span className="px-2 py-0.5 rounded-md bg-[#FFE600] text-black border-[2px] border-black shadow-[1.5px_1.5px_0px_#000000] sm:shadow-[2px_2px_0px_#000000] font-mono font-black text-[11px] sm:text-xs flex-shrink-0">
                                ARC {project.num}
                              </span>
                              <span className="text-[10px] sm:text-xs font-mono tracking-wider text-neutral-300 uppercase font-black truncate max-w-[130px] sm:max-w-none">
                                / {project.category}
                              </span>
                              <span className="hidden sm:inline-block text-[11px] font-mono text-[#FFE600] font-bold">
                                [0{idx + 1} / 0{totalProjects}]
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                              <button
                                type="button"
                                onClick={(e) => toggleFlip(project.id, e)}
                                data-cursor="pointer"
                                className="comic-btn px-2 sm:px-2.5 py-1 rounded-md bg-[#00F0FF] text-black border-[2px] border-black shadow-[1.5px_1.5px_0px_#000000] sm:shadow-[2px_2px_0px_#000000] text-[9px] sm:text-[10px] font-mono font-black tracking-wider uppercase flex items-center gap-1 hover:bg-[#FFE600] cursor-pointer min-h-[30px]"
                                title="Flip to inspect code architecture"
                              >
                                <RotateCw className="w-3 h-3 stroke-[2.5]" />
                                <span>CODE</span>
                              </button>
                              <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-[#00E676] text-black border-[2px] border-black shadow-[1.5px_1.5px_0px_#000000] sm:shadow-[2px_2px_0px_#000000] text-[9px] sm:text-[10px] font-mono font-black tracking-wider uppercase">
                                RELEASED ⚡
                              </span>
                            </div>
                          </div>

                          {/* Project Preview Image */}
                          <div
                            className="relative w-full my-2.5 sm:my-3 rounded-xl overflow-hidden border-[2.5px] sm:border-[3px] border-black shadow-[2.5px_2.5px_0px_#000000] sm:shadow-[3px_3px_0px_#000000] bg-[#161616] group/frame cursor-pointer flex-shrink-0 aspect-[16/9] sm:aspect-[21/8] max-h-[220px]"
                            data-cursor="view"
                          >
                            <Image
                              src={project.image}
                              alt={project.imageAlt}
                              fill
                              placeholder="blur"
                              blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMSAxMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzEzMTMxQSIvPjwvc3ZnPg=="
                              className="object-cover object-center opacity-85 contrast-125 transition-transform duration-500 ease-out group-hover/frame:scale-[1.03]"
                              sizes="(max-width: 1024px) 100vw, 760px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2.5 sm:p-4">
                              <span className="text-[9px] sm:text-[10px] font-mono text-[#FFE600] tracking-widest uppercase mb-0.5 font-black">
                                ARCHITECT: GUHAN MURUGAIYAN
                              </span>
                              <h4 className="font-syne text-base sm:text-xl lg:text-2xl font-black uppercase text-white drop-shadow-[2px_2px_0px_#000000] leading-tight">
                                {project.title}
                              </h4>
                            </div>
                          </div>

                          {/* Content Grid */}
                          <div className="my-1 sm:my-2 flex-1 min-h-0 space-y-1.5 sm:space-y-2">
                            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5 sm:pt-1">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[9px] sm:text-[11px] font-mono font-bold px-2 sm:px-2.5 py-0.5 rounded-md bg-[#1C1C26] border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000000] text-white"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Links Footer */}
                          <div className="pt-2.5 sm:pt-3 border-t-[2px] border-black flex flex-wrap items-center justify-between gap-2 mt-auto flex-shrink-0">
                            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-neutral-400">
                              VERIFIED REPO SOURCE
                            </span>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="comic-btn px-2.5 sm:px-3 py-1.5 rounded-lg bg-white text-black text-[10px] sm:text-[11px] font-mono font-black tracking-wider uppercase flex items-center gap-1 sm:gap-1.5 hover:bg-[#00F0FF] min-h-[38px]"
                              >
                                <GithubIcon className="w-3.5 h-3.5" /> REPO
                              </a>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="comic-btn px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#FFE600] text-black text-[10px] sm:text-[11px] font-mono font-black tracking-wider uppercase hover:bg-[#00E676] flex items-center gap-1 sm:gap-1.5 min-h-[38px]"
                              >
                                LIVE DEMO <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* BACK FACE: Architecture Terminal & Code Blueprint */}
                        <div className="absolute inset-0 rounded-2xl bg-[#08080E] border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] sm:hover:shadow-[7px_7px_0px_#000000] p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between select-text [transform:rotateY(180deg)] [backface-visibility:hidden]">
                          {/* Terminal Header */}
                          <div className="flex items-center justify-between pb-2 sm:pb-2.5 border-b-[2px] border-black flex-shrink-0 gap-2 bg-[#13131A] -mx-3.5 -mt-3.5 sm:-mx-5 sm:-mt-5 lg:-mx-6 lg:-mt-6 p-2.5 sm:p-3 rounded-t-2xl">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 sm:gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF2A55] border border-black" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FFE600] border border-black" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#00E676] border border-black" />
                              </div>
                              <span className="font-mono text-[11px] sm:text-xs font-black text-[#FFE600] tracking-wider uppercase">
                                {`ARC ${project.num} // ARCHITECTURE`}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-neutral-400 font-bold">
                                <Terminal className="w-3 h-3 text-[#00F0FF]" />
                                <span>{project.filename}</span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => toggleFlip(project.id, e)}
                                data-cursor="pointer"
                                className="comic-btn px-2 sm:px-2.5 py-1 rounded-md bg-[#FFE600] text-black border-[2px] border-black shadow-[1.5px_1.5px_0px_#000000] sm:shadow-[2px_2px_0px_#000000] text-[9px] sm:text-[10px] font-mono font-black tracking-wider uppercase flex items-center gap-1 hover:bg-[#00F0FF] cursor-pointer min-h-[30px]"
                                title="Flip back to preview"
                              >
                                <RotateCw className="w-3 h-3 stroke-[2.5]" />
                                <span>PREVIEW</span>
                              </button>
                            </div>
                          </div>

                          {/* Code Terminal View */}
                          <div className="my-2 sm:my-3 flex-1 min-h-0 flex flex-col justify-between">
                            <pre className="p-2.5 sm:p-4 text-[9px] sm:text-[11px] leading-relaxed text-neutral-200 overflow-x-auto overflow-y-auto max-h-[190px] sm:max-h-[260px] bg-black/90 rounded-xl border-[2px] border-black font-mono selection:bg-[#FFE600] selection:text-black">
                              <code>{project.codeSnippet}</code>
                            </pre>

                            {/* Architecture Spec Grid */}
                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2 sm:mt-3 font-mono text-[9px] sm:text-[10px]">
                              <div className="p-1.5 sm:p-2 rounded-lg bg-[#13131A] border-[1.5px] border-black">
                                <span className="text-neutral-500 block uppercase font-bold text-[8px] sm:text-[9px]">ARC YEAR</span>
                                <span className="text-[#FFE600] font-black">{project.year}</span>
                              </div>
                              <div className="p-1.5 sm:p-2 rounded-lg bg-[#13131A] border-[1.5px] border-black">
                                <span className="text-neutral-500 block uppercase font-bold text-[8px] sm:text-[9px]">RUNTIME</span>
                                <span className="text-[#00F0FF] font-black truncate block">{project.tags[0] ?? "TypeScript"}</span>
                              </div>
                              <div className="p-1.5 sm:p-2 rounded-lg bg-[#13131A] border-[1.5px] border-black">
                                <span className="text-neutral-500 block uppercase font-bold text-[8px] sm:text-[9px]">STATUS</span>
                                <span className={cn(
                                  "font-black text-[8px] sm:text-[9px] tracking-wide",
                                  project.statusBadge === "SHIPPED" ? "text-[#00E676]" : "text-[#FFE600]"
                                )}>
                                  {project.statusBadge === "SHIPPED" ? "⚡ SHIPPED" : "🔧 PROGRESS"}
                                </span>
                              </div>
                            </div>

                            {/* Difficulty star rating */}
                            <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 font-mono text-[9px] sm:text-[10px]">
                              <span className="text-neutral-500 uppercase font-bold tracking-wider">DIFFICULTY:</span>
                              <span className="tracking-wide" aria-label={`Difficulty: ${project.difficulty} out of 5 stars`}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span
                                    key={i}
                                    className={i < project.difficulty ? "text-[#FFE600]" : "text-neutral-700"}
                                  >
                                    ★
                                  </span>
                                ))}
                              </span>
                            </div>
                          </div>

                          {/* Terminal Footer Actions */}
                          <div className="pt-2 sm:pt-3 border-t-[2px] border-black flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mt-auto flex-shrink-0">
                            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-neutral-400">
                              {"// VERIFIED COMPONENT SCHEMA"}
                            </span>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="comic-btn px-2.5 sm:px-3 py-1.5 rounded-lg bg-white text-black text-[10px] sm:text-[11px] font-mono font-black tracking-wider uppercase flex items-center gap-1 sm:gap-1.5 hover:bg-[#00F0FF] min-h-[38px]"
                              >
                                <GithubIcon className="w-3.5 h-3.5" /> REPO SOURCE
                              </a>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="comic-btn px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#FFE600] text-black text-[10px] sm:text-[11px] font-mono font-black tracking-wider uppercase hover:bg-[#00E676] flex items-center gap-1 sm:gap-1.5 min-h-[38px]"
                              >
                                LAUNCH <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Drag Notch & Navigation Prompt */}
            <div className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[11px] font-mono font-bold text-neutral-400 tracking-widest uppercase select-none mt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#13131A] border-[2px] border-black shadow-[2px_2px_0px_#000000] rounded-md text-white">
                <span className="text-[#FFE600] animate-pulse">◀◀</span>
                {isStackedMode ? "SWIPE OR SCROLL MISSION MATRIX" : "DRAG OR SCROLL ARC MATRIX"}
                <span className="text-[#00F0FF] animate-pulse">▶▶</span>
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">
                {"// TIP: CLICK [CODE] TO FLIP CARDS"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


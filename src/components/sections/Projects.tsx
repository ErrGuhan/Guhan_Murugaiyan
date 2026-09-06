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
  }, [isMobile, prefersReducedMotion, totalProjects]);

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
    <section id="work" className="relative w-full bg-[#0B0B0F] text-white select-none border-t-[3px] border-black">
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
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 sm:py-14 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black border-[3px] border-black shadow-[3px_3px_0px_#000000] rounded-lg text-xs font-mono font-black tracking-widest uppercase mb-3 -rotate-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FFE600] fill-[#FFE600]" />
            <span>ARC CASE STUDIES // FEATURED WORK</span>
          </div>

          <h2
            data-text="WORK"
            className="comic-glitch-text text-[clamp(4.5rem,18vw,14rem)] leading-[0.82] tracking-tighter uppercase text-[#FFE600] drop-shadow-[7px_7px_0px_#000000]"
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
        className={`relative w-full ${isStackedMode ? "h-auto" : ""}`}
        style={isStackedMode ? { height: "auto" } : undefined}
      >
        <div
          ref={stickyInnerRef}
          className={
            isStackedMode
              ? "relative w-full py-12 px-4 sm:px-6 bg-[#0B0B0F] bg-halftone-dark"
              : "sticky top-0 w-full h-[100dvh] overflow-hidden bg-[#0B0B0F] bg-halftone-dark flex flex-col justify-between py-4 sm:py-6"
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
            <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b-[3px] border-black flex-shrink-0">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-[2.5px] border-black bg-[#FFE600] text-black shadow-[2.5px_2.5px_0px_#000000] text-[11px] font-mono tracking-widest uppercase mb-1 font-black">
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  {`// 05 — MISSION ARC (0${activeIndex + 1} / 0${totalProjects})`}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white -webkit-text-stroke-[1.5px_#000] drop-shadow-[3px_3px_0px_#000000]">
                  SELECTED CASE STUDIES
                </h3>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-center">
                {/* Dots indicator with comic borders */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {REAL_PROJECTS.map((p, i) => (
                    <button
                      key={`dot-${p.id}`}
                      onClick={() => scrollToIndex(i)}
                      aria-label={`Go to project ${i + 1}`}
                      className={`h-3 rounded-md border-[2px] border-black transition-all ${
                        activeIndex === i
                          ? "w-8 bg-[#FFE600] shadow-[2px_2px_0px_#000000]"
                          : "w-3 bg-neutral-600 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>

                {/* Left / Right arrows with 3px black borders & 3px shadows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollToIndex(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    aria-label="Previous project"
                    className="comic-btn w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000000] disabled:opacity-30 disabled:pointer-events-none hover:bg-[#FFE600] flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[3]" />
                  </button>
                  <button
                    onClick={() => scrollToIndex(activeIndex + 1)}
                    disabled={activeIndex === totalProjects - 1}
                    aria-label="Next project"
                    className="comic-btn w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-black border-[2.5px] border-black shadow-[3px_3px_0px_#000000] disabled:opacity-30 disabled:pointer-events-none hover:bg-[#FFE600] flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[3]" />
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
                    className="project-card comic-card relative rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] p-4 sm:p-5 lg:p-6 flex flex-col justify-between group select-text flex-shrink-0"
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
                    <div className="flex items-center justify-between pb-3 border-b-[2px] border-black flex-shrink-0">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-[#FFE600] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] font-mono font-black text-xs">
                          ARC {project.num}
                        </span>
                        <span className="text-xs font-mono tracking-wider text-neutral-300 uppercase font-black">
                          / {project.category}
                        </span>
                        <span className="hidden sm:inline-block text-[11px] font-mono text-[#FFE600] font-bold">
                          [0{idx + 1} / 0{totalProjects}]
                        </span>
                      </div>

                      {/* Comic Status Tag */}
                      <span className="px-2.5 py-0.5 rounded-md bg-[#00E676] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] text-[10px] font-mono font-black tracking-wider uppercase">
                        RELEASED ⚡
                      </span>
                    </div>

                    {/* Project Preview Image with 3px border & 3px shadow */}
                    <div
                      className="relative w-full my-2.5 sm:my-3 rounded-xl overflow-hidden border-[3px] border-black shadow-[3px_3px_0px_#000000] bg-[#161616] group/frame cursor-pointer flex-shrink-0"
                      style={{ aspectRatio: "21/8", maxHeight: "180px" }}
                      data-cursor="view"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center opacity-85 contrast-125 transition-transform duration-500 ease-out group-hover/frame:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 760px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3 sm:p-4">
                        <span className="text-[10px] font-mono text-[#FFE600] tracking-widest uppercase mb-0.5 font-black">
                          ARCHITECT: GUHAN MURUGAIYAN
                        </span>
                        <h4 className="font-syne text-lg sm:text-xl lg:text-2xl font-black uppercase text-white drop-shadow-[2px_2px_0px_#000000]">
                          {project.title}
                        </h4>
                      </div>
                    </div>

                    {/* Content & Code Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 my-1 sm:my-2 items-start flex-1 min-h-0">
                      <div className="lg:col-span-6 space-y-2">
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#1C1C26] border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000000] text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Comic Terminal Code Box */}
                      <div className="lg:col-span-6 rounded-xl bg-[#08080C] border-[2.5px] border-black shadow-[3px_3px_0px_#000000] overflow-hidden font-mono text-xs">
                        <div className="px-3 py-1.5 border-b-[2px] border-black flex items-center justify-between bg-[#13131A]">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF2A55] border border-black" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFE600] border border-black" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#00E676] border border-black" />
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-[#FFE600] font-black">
                            <Terminal className="w-3 h-3 stroke-[2.5]" />
                            <span>{project.filename}</span>
                          </div>
                        </div>
                        <pre className="p-2 sm:p-2.5 text-[10px] sm:text-[11px] leading-relaxed text-neutral-300 overflow-x-auto max-h-20 sm:max-h-24 selection:bg-[#FFE600] selection:text-black">
                          <code>{project.codeSnippet}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Action Links Footer */}
                    <div className="pt-2.5 sm:pt-3 border-t-[2px] border-black flex flex-wrap items-center justify-between gap-2.5 mt-auto flex-shrink-0">
                      <span className="text-[11px] font-mono font-bold text-neutral-400">
                        VERIFIED REPO SOURCE
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="comic-btn px-3 py-1.5 rounded-lg bg-white text-black text-[11px] font-mono font-black tracking-wider uppercase flex items-center gap-1.5 hover:bg-[#00F0FF]"
                        >
                          <GithubIcon className="w-3.5 h-3.5" /> REPO
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="comic-btn px-3.5 py-1.5 rounded-lg bg-[#FFE600] text-black text-[11px] font-mono font-black tracking-wider uppercase hover:bg-[#00E676] flex items-center gap-1.5"
                        >
                          LIVE DEMO <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Scroll Prompt */}
            <div className="flex-shrink-0 flex items-center justify-center gap-3 text-[11px] font-mono font-bold text-neutral-400 tracking-widest uppercase select-none">
              <span>{isStackedMode ? "↓ SCROLL DOWN FOR NEXT MISSION ARC ↓" : "← SCROLL VERTICALLY TO NAVIGATE CASE STUDIES →"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

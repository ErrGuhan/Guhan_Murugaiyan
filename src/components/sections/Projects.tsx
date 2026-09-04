"use client";

import { useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import FluidShaderCanvas from "@/components/canvas/FluidShaderCanvas";
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

  const tickerItems = [
    "AI AGENT ARCHITECTURE ✦",
    "MULTI-AGENT SYSTEMS ✦",
    "JAVA ENTERPRISE ✦",
    "BIOINFORMATICS AGENTS ✦",
    "DATA ANALYTICS ✦",
    "SVCET CSE ✦",
    "AUTONOMOUS RESUME PARSER ✦",
    "NSS LEADERSHIP ✦",
  ];

  const caseStudies = [
    {
      num: "01",
      title: "Multi-Agent AI for Bioinformatics",
      category: "AUTONOMOUS SWARM",
      desc: "An autonomous cooperative multi-agent system engineered to coordinate biological sequence retrieval, genomic clustering, and scientific literature summarization using specialized LLM agents.",
      tags: ["Multi-Agent Swarm", "LLM Tooling", "Python", "Bioinformatics"],
      filename: "AgentBioPipeline.java",
      stamp: "BIO·AI",
      image: "/images/project-ai.jpg",
      code: `public class BioAgentSwarm {
  private final AgentOrchestrator coordinator;
  
  public void executeSequenceAnalysis(DNASeq seq) {
    Agent researcher = coordinator.get("PubMed-Agent");
    Agent aligner   = coordinator.get("BLAST-Node");
    
    var findings = researcher.queryRelated(seq);
    var aligned  = aligner.process(seq);
    
    coordinator.synthesize(findings, aligned);
  }
}`,
    },
    {
      num: "02",
      title: "Automated AI Resume Parser",
      category: "AGENTIC NLP",
      desc: "An intelligent applicant evaluation pipeline built with NLP and agentic heuristics. Extracts skills, categorizes experience, and calculates semantic candidate-job matching scores with high accuracy.",
      tags: ["Agentic AI", "Java Backend", "NLP Heuristics", "Document Parsing"],
      filename: "ResumeParserEngine.java",
      stamp: "AI·PARSER",
      image: "/images/project-portfolio.jpg",
      code: `public class NeuroParser {
  public CandidateProfile extractEntities(PDFDoc doc) {
    String text = doc.extractStructuredText();
    List<Skill> skills = SkillMatcher.eval(text);
    MatchScore score = JobCriteria.calculate(skills);
    
    return new CandidateProfile(skills, score);
  }
}`,
    },
    {
      num: "03",
      title: "NoviTech Analytics Workflow",
      category: "DATA PIPELINE",
      desc: "Enterprise analytics pipeline and insight generator constructed during my role at NoviTech R&D Pvt Ltd. Automates raw tabular data normalization, anomaly detection, and operational trend discovery.",
      tags: ["Data Analytics", "Python / Pandas", "Statistical Modeling", "ETL"],
      filename: "pipeline_analytics.py",
      stamp: "DATA·OPS",
      image: "/images/project-ecommerce.jpg",
      code: `import pandas as pd
from novitech.analytics import StreamProcessor

def transform_raw_stream(data_source):
    df = pd.read_parquet(data_source)
    cleaned = df.pipe(normalize_timestamps)
                .pipe(detect_anomalies)
    
    insights = generate_business_metrics(cleaned)
    return insights`,
    },
    {
      num: "04",
      title: "Autonomous Java Agent Framework",
      category: "CORE ARCHITECTURE",
      desc: "High-performance Java core framework featuring concurrent agent execution, inter-agent messaging channels, memory caching, and tool invocation with virtual threads.",
      tags: ["Java 21", "Virtual Threads", "Concurrency", "Clean Arch"],
      filename: "ConcurrentDispatcher.java",
      stamp: "JAVA·CORE",
      image: "/images/project-watches.jpg",
      code: `public record AgentTask(String id, Runnable action) {}

public class Dispatcher {
  private final ExecutorService pool = 
      Executors.newVirtualThreadPerTaskExecutor();
      
  public Future<Result> dispatch(AgentTask task) {
    return pool.submit(() -> executeAgentLogic(task));
  }
}`,
    },
  ];

  return (
    <>
      {/* 1. Giant WORK Transition Banner & Marquee (Video 01:15 - 01:25) */}
      <div className="relative bg-[#090a0e] text-white pt-24 pb-16 overflow-hidden border-t border-white/5 select-none">
        {/* Subtle Fluid Shader Backdrop behind giant WORK banner */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <FluidShaderCanvas intensity="subtle" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase mb-4">
            SCROLL TO EXPLORE MY
          </span>

          {/* Giant Condensed WORK Text with Paint Particle Aesthetic (Video 01:17) */}
          <div className="font-syne font-black text-[22vw] sm:text-[20vw] leading-[0.8] tracking-tighter uppercase text-[#E5C583] drop-shadow-[0_20px_60px_rgba(212,175,55,0.15)]">
            WORK
          </div>
        </div>

        {/* Infinite Scrolling Ticker (Video 01:16) */}
        <div className="relative z-10 mt-12 py-3.5 border-y border-white/10 overflow-hidden bg-black/40">
          <div className="flex w-max animate-marquee space-x-8 text-xs sm:text-sm font-mono tracking-widest text-neutral-300 uppercase">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <span key={idx} className="hover:text-[#FFDF73] transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Featured Projects / Case Studies Showcase (Video 01:26 - 01:51) */}
      <section
        id="work"
        ref={containerRef}
        className="relative bg-[#090a0e] text-white min-h-screen flex flex-col justify-between overflow-hidden py-20 lg:py-0"
      >
        {/* Parallax Background WORK Outline */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full select-none pointer-events-none z-0 overflow-hidden opacity-[0.03]">
          <div className="work-bg-text font-syne font-black text-[35vw] tracking-tighter text-white whitespace-nowrap text-center">
            WORK
          </div>
        </div>

        {/* Section Header */}
        <div className="relative z-10 px-6 md:px-12 pt-8 lg:pt-16 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#FFDF73] text-[11px] font-mono tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              {"// 03 — FEATURED CASE STUDIES"}
            </div>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold tracking-tight uppercase">
              MY <span className="text-[#FFDF73]">WORK</span>
            </h2>
          </div>

          <p className="text-xs font-mono text-neutral-400 tracking-wider uppercase max-w-xs text-left sm:text-right">
            AUTONOMOUS AGENTS, CONCURRENT BACKENDS &amp; DATA SYSTEMS.
          </p>
        </div>

        {/* Project Horizontal Track (Video 01:26 - 01:51) */}
        <div className="relative z-10 w-full flex-1 flex items-center overflow-hidden my-8 lg:my-0">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 md:px-12 w-full lg:w-max items-stretch lg:items-center py-6"
          >
            {caseStudies.map((project) => (
              <div
                key={project.num}
                className="w-full lg:w-[820px] flex-shrink-0 rounded-3xl bg-[#10131C]/90 border border-white/10 p-6 sm:p-8 flex flex-col justify-between group hover:border-[#D4AF37]/60 transition-all duration-500 shadow-2xl overflow-hidden"
              >
                {/* Card Top: Number & Category */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-[#D4AF37]">
                      CASE STUDY · {project.num}
                    </span>
                    <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#FFDF73] border border-white/10">
                    {project.stamp}
                  </span>
                </div>

                {/* Card Split: Description on Left & Live Code Mockup / Visual on Right */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center">
                  <div className="md:col-span-6 space-y-4">
                    <h3 className="font-syne text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#FFDF73] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10.5px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code Window Mockup (Exact from Video 01:26 - 01:45) */}
                  <div className="md:col-span-6 rounded-xl bg-black/70 border border-white/10 overflow-hidden font-mono text-xs">
                    <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[10px] text-neutral-500">
                        {project.filename}
                      </span>
                    </div>
                    <pre className="p-4 text-[11px] leading-relaxed text-neutral-300 overflow-x-auto selection:bg-[#D4AF37] selection:text-black">
                      <code>{project.code}</code>
                    </pre>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">
                    ENGINEERED BY GUHAN
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#D4AF37] transition-colors"
                  >
                    EXPLORE ARCHITECTURE <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

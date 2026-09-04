"use client";

import { useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Smooth reveal for stacked project cards
      gsap.from(".stack-card", {
        y: 60,
        opacity: 0,
        stagger: 0.18,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
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
      <div className="relative bg-[#090a0e] text-white pt-24 pb-16 overflow-hidden border-t border-white/10 select-none">
        {/* Crisp radial highlight instead of blurry shader */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(212, 175, 55, 0.12) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase mb-4 font-semibold">
            SCROLL TO EXPLORE MY
          </span>

          {/* Giant Condensed WORK Text */}
          <div className="font-syne font-black text-[clamp(4.5rem,14vw,11rem)] leading-[0.82] tracking-tighter uppercase text-[#E5C583]">
            WORK
          </div>
        </div>

        {/* Infinite Scrolling Ticker (Video 01:16) */}
        <div className="relative z-10 mt-12 py-3 border-y border-white/10 overflow-hidden bg-black/60">
          <div className="flex w-max animate-marquee space-x-8 text-xs sm:text-sm font-mono tracking-widest text-neutral-300 uppercase">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <span key={idx} className="hover:text-[#FFDF73] transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Featured Projects / Authentic Stacked Cards Showcase (Video 01:26 - 01:51) */}
      <section
        id="work"
        ref={containerRef}
        className="relative bg-[#090a0e] text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#FFDF73] text-[11px] font-mono tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                {"// 03 — FEATURED CASE STUDIES"}
              </div>
              <h2 className="font-syne text-4xl sm:text-6xl font-extrabold tracking-tight uppercase text-white">
                MY <span className="text-[#FFDF73]">WORK</span>
              </h2>
            </div>

            <p className="text-xs font-mono text-neutral-400 tracking-wider uppercase max-w-xs text-left sm:text-right">
              AUTONOMOUS AGENTS, CONCURRENT BACKENDS &amp; DATA SYSTEMS.
            </p>
          </div>

          {/* Authentic Sticky Stacked Cards (Video 01:26 - 01:51 & legacy index.html) */}
          <div className="flex flex-col gap-10 w-full">
            {caseStudies.map((project, idx) => (
              <div
                key={project.num}
                className="stack-card sticky rounded-3xl bg-[#0e121a] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-2xl p-6 sm:p-8 lg:p-10 w-full overflow-hidden"
                style={{ top: `${88 + idx * 24}px` }}
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
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/5 text-[#FFDF73] border border-white/10 font-medium">
                    {project.stamp}
                  </span>
                </div>

                {/* Card Split: Description on Left & Live Code Mockup on Right */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-6 items-center">
                  <div className="md:col-span-6 space-y-4">
                    <h3 className="font-syne text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#FFDF73] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code Window Mockup */}
                  <div className="md:col-span-6 rounded-xl bg-[#06080d] border border-white/10 overflow-hidden font-mono text-xs shadow-lg">
                    <div className="px-4 py-2.5 border-b border-white/10 flex items-center justify-between bg-white/[0.04]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <span className="text-[11px] text-neutral-400">
                        {project.filename}
                      </span>
                    </div>
                    <pre className="p-4 text-[11px] sm:text-xs leading-relaxed text-[#CBD5E1] overflow-x-auto selection:bg-[#D4AF37] selection:text-black">
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
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D4AF37] text-black text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#FFDF73] transition-all shadow-md"
                  >
                    EXPLORE ARCHITECTURE <ArrowUpRight className="w-4 h-4" />
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

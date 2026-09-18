"use client";

import { useRef } from "react";
import { Award, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Credentials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".cred-reveal", {
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  const certs = [
    {
      title: "Learner to Builder: Become an AI Architect",
      issuer: "AI Architecture & LLM Design",
    },
    {
      title: "Basic Data Security",
      issuer: "Information Protection & Systems Security",
    },
    {
      title: "Data Analytics",
      issuer: "Quantitative Modeling & Statistical Analysis",
    },
    {
      title: "Digital Productivity Certificate",
      issuer: "Workflow Optimization & Automation",
    },
    {
      title: "Communication Skill",
      issuer: "Executive Communication & Team Presentation",
    },
  ];

  return (
    <section
      id="credentials"
      ref={containerRef}
      className="relative min-h-screen py-20 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#0B0B0F] text-white border-t-[3px] border-black overflow-hidden bg-halftone-dark scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 md:mb-18">
          <div className="cred-reveal inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-lg border-[2.5px] sm:border-[3px] border-black bg-[#FFE600] text-black shadow-[2.5px_2.5px_0px_#000000] sm:shadow-[3px_3px_0px_#000000] text-[11px] sm:text-xs font-mono tracking-widest uppercase mb-3 sm:mb-4 font-black">
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span>{"// 04 · EXPERIENCE & CERTIFICATIONS"}</span>
          </div>

          <h2
            className="cred-reveal font-display text-3xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase text-white drop-shadow-[4px_4px_0px_#000000] sm:drop-shadow-[5px_5px_0px_#000000]"
            style={{ paintOrder: "stroke fill", WebkitTextStroke: "1px #000" }}
          >
            EXPERIENCE <span className="text-[#FFE600]">& CREDENTIALS</span>
          </h2>
        </div>

        {/* Certifications Badge Grid with 3px black borders & 4px shadows */}
        <div className="cred-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {certs.map((c, idx) => (
            <div
              key={c.title}
              className={cn(
                "comic-card p-4 sm:p-5 rounded-2xl bg-[#13131A] border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] sm:hover:shadow-[7px_7px_0px_#000000] flex items-start gap-3 sm:gap-4 group cursor-default",
                idx < 2 ? "lg:col-span-3" : "lg:col-span-2"
              )}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FFE600] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <Award className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.5]" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-sans font-bold text-sm sm:text-base text-white group-hover:text-[#FFE600] transition-colors leading-snug tracking-tight">
                  {c.title}
                </h4>
                <p className="text-[11px] sm:text-xs font-mono text-neutral-300 mt-1 font-semibold">
                  {c.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Experience & Education Timelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-14 pt-8 sm:pt-10 border-t-[3px] border-black">
          {/* Experience Column */}
          <div className="cred-reveal space-y-4 sm:space-y-6">
            <h3 className="font-display font-black text-xl sm:text-2xl uppercase flex items-center gap-2.5 sm:gap-3 text-white">
              <span className="p-1.5 rounded-lg bg-[#FFE600] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000]">
                <Briefcase className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.5]" />
              </span>
              <span>WORK EXPERIENCE</span>
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div className="comic-card p-4 sm:p-6 rounded-2xl bg-[#13131A] border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000]">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-md bg-[#FFE600] text-black border-[1.5px] sm:border-[2px] border-black shadow-[1.5px_1.5px_0px_#000000] sm:shadow-[2px_2px_0px_#000000] text-[11px] sm:text-xs font-mono font-black uppercase">
                  July 2026 – 2026
                </span>
                <h4 className="font-sans font-extrabold text-base sm:text-lg text-white mt-2 tracking-tight">
                  Data Analyst
                </h4>
                <p className="text-xs font-mono font-bold text-[#00F0FF]">
                  NoviTech R&D Pvt Ltd · Chennai
                </p>
                <p className="text-xs sm:text-sm text-neutral-200 mt-2 sm:mt-3 leading-relaxed">
                  Immersed in practical analytics workflows, turning raw enterprise streams into meaningful statistical metrics and automated anomaly detection pipelines.
                </p>
              </div>

              <div className="comic-card p-4 sm:p-6 rounded-2xl bg-[#13131A] border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000]">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-md bg-[#00F0FF] text-black border-[1.5px] sm:border-[2px] border-black shadow-[1.5px_1.5px_0px_#000000] sm:shadow-[2px_2px_0px_#000000] text-[11px] sm:text-xs font-mono font-black uppercase">
                  May 2024 – Present
                </span>
                <h4 className="font-sans font-extrabold text-base sm:text-lg text-white mt-2 tracking-tight">
                  Accountant
                </h4>
                <p className="text-xs font-mono font-bold text-[#FFE600]">
                  Jana Fibre Glass
                </p>
                <p className="text-xs sm:text-sm text-neutral-200 mt-2 sm:mt-3 leading-relaxed">
                  Managing financial data integrity, operational ledger reconciliation, and reporting precision across manufacturing supply chains.
                </p>
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div className="cred-reveal space-y-4 sm:space-y-6">
            <h3 className="font-display font-black text-xl sm:text-2xl uppercase flex items-center gap-2.5 sm:gap-3 text-white">
              <span className="p-1.5 rounded-lg bg-[#00F0FF] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000]">
                <GraduationCap className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.5]" />
              </span>
              <span>ACADEMIC BACKGROUND</span>
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div className="comic-card p-4 sm:p-6 rounded-2xl bg-[#13131A] border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000]">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-md bg-[#FFE600] text-black border-[1.5px] sm:border-[2px] border-black shadow-[1.5px_1.5px_0px_#000000] sm:shadow-[2px_2px_0px_#000000] text-[11px] sm:text-xs font-mono font-black uppercase">
                  Nov 2024 – Nov 2028
                </span>
                <h4 className="font-sans font-extrabold text-base sm:text-lg text-white mt-2 tracking-tight">
                  B.Tech in Computer Science & Engineering
                </h4>
                <p className="text-xs font-mono font-bold text-[#00F0FF]">
                  Sri Venkateshwaraa College of Engg & Tech (SVCET)
                </p>
                <p className="text-xs sm:text-sm text-neutral-200 mt-2 sm:mt-3 leading-relaxed">
                  Core focus on Autonomous Agents, Concurrent Java Enterprise Architectures, and Distributed Data Infrastructure.
                </p>
              </div>

              <div className="comic-card p-4 sm:p-6 rounded-2xl bg-[#13131A] border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000000] sm:shadow-[4px_4px_0px_#000000]">
                <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-md bg-[#FF2A55] text-white border-[1.5px] sm:border-[2px] border-black shadow-[1.5px_1.5px_0px_#000000] sm:shadow-[2px_2px_0px_#000000] text-[11px] sm:text-xs font-mono font-black uppercase">
                  June 2022 – May 2024
                </span>
                <h4 className="font-sans font-extrabold text-base sm:text-lg text-white mt-2 tracking-tight">
                  Higher Secondary (Bio-Maths)
                </h4>
                <p className="text-xs font-mono font-bold text-[#FFE600]">
                  Kuyilappalayam Higher Secondary School
                </p>
                <p className="text-xs sm:text-sm text-neutral-200 mt-2 sm:mt-3 leading-relaxed">
                  Advanced foundational coursework in biological sciences and mathematics, guiding analytical modeling and bioinformatics exploration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

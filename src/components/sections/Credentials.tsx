"use client";

import { useRef } from "react";
import { Award, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#0B0B0F] text-white border-t-[3px] border-black overflow-hidden bg-halftone-dark"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-14 md:mb-18">
          <div className="cred-reveal inline-flex items-center gap-2 px-3.5 py-1 rounded-lg border-[3px] border-black bg-[#FFE600] text-black shadow-[3px_3px_0px_#000000] text-xs font-mono tracking-widest uppercase mb-4 font-black">
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            {"// 04 · CAREER ROADMAP & CERTIFICATIONS"}
          </div>

          <h2 className="cred-reveal font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase text-white -webkit-text-stroke-[2.5px_#000] drop-shadow-[5px_5px_0px_#000000]">
            CREDENTIALS <span className="text-[#FFE600]">&amp; PATH</span>
          </h2>
        </div>

        {/* Certifications Badge Grid with 3px black borders & 4px shadows */}
        <div className="cred-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {certs.map((c) => (
            <div
              key={c.title}
              className="comic-card p-5 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] flex items-start gap-4 group cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-[#FFE600] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <Award className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-syne font-black text-sm text-white group-hover:text-[#FFE600] transition-colors leading-snug">
                  {c.title}
                </h4>
                <p className="text-xs font-mono text-neutral-400 mt-1 font-bold">
                  {c.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Experience & Education Timelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 pt-10 border-t-[3px] border-black">
          {/* Experience Column */}
          <div className="cred-reveal space-y-6">
            <h3 className="font-display font-black text-2xl uppercase flex items-center gap-3 text-white">
              <span className="p-1.5 rounded-lg bg-[#FFE600] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000]">
                <Briefcase className="w-5 h-5 stroke-[2.5]" />
              </span>
              <span>WORK EXPERIENCE</span>
            </h3>

            <div className="space-y-4">
              <div className="comic-card p-6 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000]">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FFE600] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] text-xs font-mono font-black uppercase">
                  July 2026 – Present
                </span>
                <h4 className="font-syne font-black text-lg text-white mt-2">
                  Data Analyst
                </h4>
                <p className="text-xs font-mono font-bold text-[#00F0FF]">
                  NoviTech R&amp;D Pvt Ltd · Chennai
                </p>
                <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                  Immersed in practical analytics workflows, turning raw enterprise streams into meaningful statistical metrics and automated anomaly detection pipelines.
                </p>
              </div>

              <div className="comic-card p-6 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000]">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#00F0FF] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] text-xs font-mono font-black uppercase">
                  May 2024 – Present
                </span>
                <h4 className="font-syne font-black text-lg text-white mt-2">
                  Accountant
                </h4>
                <p className="text-xs font-mono font-bold text-[#FFE600]">
                  Jana Fibre Glass
                </p>
                <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                  Managing financial data integrity, operational ledger reconciliation, and reporting precision across manufacturing supply chains.
                </p>
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div className="cred-reveal space-y-6">
            <h3 className="font-display font-black text-2xl uppercase flex items-center gap-3 text-white">
              <span className="p-1.5 rounded-lg bg-[#00F0FF] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000]">
                <GraduationCap className="w-5 h-5 stroke-[2.5]" />
              </span>
              <span>ACADEMIC BACKGROUND</span>
            </h3>

            <div className="space-y-4">
              <div className="comic-card p-6 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000]">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FFE600] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] text-xs font-mono font-black uppercase">
                  Nov 2024 – Nov 2028
                </span>
                <h4 className="font-syne font-black text-lg text-white mt-2">
                  B.Tech in Computer Science &amp; Engineering
                </h4>
                <p className="text-xs font-mono font-bold text-[#00F0FF]">
                  Sri Venkateshwaraa College of Engg &amp; Tech (SVCET)
                </p>
                <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                  Core focus on Autonomous Agents, Concurrent Java Enterprise Architectures, and Distributed Data Infrastructure.
                </p>
              </div>

              <div className="comic-card p-6 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000]">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FF2A55] text-white border-[2px] border-black shadow-[2px_2px_0px_#000000] text-xs font-mono font-black uppercase">
                  June 2022 – May 2024
                </span>
                <h4 className="font-syne font-black text-lg text-white mt-2">
                  Higher Secondary (Bio-Maths)
                </h4>
                <p className="text-xs font-mono font-bold text-[#FFE600]">
                  Kuyilappalayam Higher Secondary School
                </p>
                <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
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

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
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  // Certifications strictly aligned to LinkedIn PDF (Part 9)
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
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#0A0A0A] text-[#F0F0F0] border-t border-[#C9AF7C]/15 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-14 md:mb-18">
          <div className="cred-reveal inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C9AF7C]/30 bg-[#C9AF7C]/10 text-[#C9AF7C] text-[11px] font-mono tracking-widest uppercase mb-4 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9AF7C]" />
            {"// 04 — ACCREDITATION & CAREER"}
          </div>

          <h2 className="cred-reveal font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase text-white">
            CREDENTIALS <span className="text-[#C9AF7C]">&amp; PATH</span>
          </h2>
        </div>

        {/* Certifications Badge Grid (Part 9) */}
        <div className="cred-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {certs.map((c) => (
            <div
              key={c.title}
              className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/50 transition-all flex items-start gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#C9AF7C]/10 text-[#C9AF7C] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-syne font-bold text-sm text-neutral-100 group-hover:text-[#C9AF7C] transition-colors">
                  {c.title}
                </h4>
                <p className="text-xs font-mono text-[#7A7A7A] mt-1">
                  {c.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Experience & Education Timelines (Part 9) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 pt-10 border-t border-white/10">
          {/* Experience Column */}
          <div className="cred-reveal space-y-6">
            <h3 className="font-syne text-2xl font-bold flex items-center gap-3 text-white">
              <Briefcase className="w-5 h-5 text-[#C9AF7C]" />
              Experience
            </h3>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/30 transition-all">
                <span className="text-xs font-mono text-[#C9AF7C] font-semibold">
                  July 2026 – Present
                </span>
                <h4 className="font-syne font-bold text-lg text-white mt-1">
                  Data Analyst
                </h4>
                <p className="text-xs font-mono text-[#7A7A7A]">
                  NoviTech R&amp;D Pvt Ltd · Chennai
                </p>
                <p className="text-sm text-[#CBD5E1] mt-3 leading-relaxed">
                  Immersed in practical analytics workflows, turning raw enterprise streams into meaningful statistical metrics and automated anomaly detection pipelines.
                </p>
              </div>

              {/* Explicitly "Accountant" per Part 9 instructions */}
              <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/30 transition-all">
                <span className="text-xs font-mono text-[#C9AF7C] font-semibold">
                  May 2024 – Present
                </span>
                <h4 className="font-syne font-bold text-lg text-white mt-1">
                  Accountant
                </h4>
                <p className="text-xs font-mono text-[#7A7A7A]">
                  Jana Fibre Glass
                </p>
                <p className="text-sm text-[#CBD5E1] mt-3 leading-relaxed">
                  Managing financial data integrity, operational ledger reconciliation, and reporting precision across manufacturing supply chains.
                </p>
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div className="cred-reveal space-y-6">
            <h3 className="font-syne text-2xl font-bold flex items-center gap-3 text-white">
              <GraduationCap className="w-5 h-5 text-[#C9AF7C]" />
              Education
            </h3>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/30 transition-all">
                <span className="text-xs font-mono text-[#C9AF7C] font-semibold">
                  Nov 2024 – Nov 2028
                </span>
                <h4 className="font-syne font-bold text-lg text-white mt-1">
                  B.Tech in Computer Science &amp; Engineering
                </h4>
                <p className="text-xs font-mono text-[#7A7A7A]">
                  Sri Venkateshwaraa College of Engg &amp; Tech (SVCET)
                </p>
                <p className="text-sm text-[#CBD5E1] mt-3 leading-relaxed">
                  Core focus on Autonomous Agents, Concurrent Java Enterprise Architectures, and Distributed Data Infrastructure.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/30 transition-all">
                <span className="text-xs font-mono text-[#C9AF7C] font-semibold">
                  June 2022 – May 2024
                </span>
                <h4 className="font-syne font-bold text-lg text-white mt-1">
                  Higher Secondary (Bio-Maths)
                </h4>
                <p className="text-xs font-mono text-[#7A7A7A]">
                  Kuyilappalayam Higher Secondary School
                </p>
                <p className="text-sm text-[#CBD5E1] mt-3 leading-relaxed">
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

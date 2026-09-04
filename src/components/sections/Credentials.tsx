"use client";

import { useRef } from "react";
import { Award, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Credentials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".cred-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
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
      issuer: "Information Protection & Compliance",
    },
    {
      title: "Data Analytics",
      issuer: "Quantitative Modeling & Business Insights",
    },
    {
      title: "Digital Productivity Certificate",
      issuer: "High-Efficiency Automated Workflows",
    },
    {
      title: "Executive Communication Skill",
      issuer: "Team Leadership & Executive Presentation",
    },
  ];

  return (
    <section
      id="credentials"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-[#090a0e] text-white border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-14 md:mb-18">
          <div className="cred-reveal inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#FFDF73] text-[11px] font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            {"// 04 — ACCREDITATION & CAREER"}
          </div>

          <h2 className="cred-reveal font-syne text-4xl sm:text-6xl font-extrabold tracking-tight uppercase text-white">
            CREDENTIALS <span className="text-[#FFDF73]">&amp; PATH</span>
          </h2>
        </div>

        {/* Certifications Badge Grid */}
        <div className="cred-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {certs.map((c) => (
            <div
              key={c.title}
              className="p-5 rounded-2xl bg-[#0e121a] border border-white/10 hover:border-[#D4AF37]/50 transition-all flex items-start gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#E5C583] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-syne font-bold text-sm text-neutral-100 group-hover:text-white transition-colors">
                  {c.title}
                </h4>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  {c.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Experience & Education Timelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 pt-10 border-t border-white/10">
          {/* Experience Column */}
          <div className="cred-reveal space-y-6">
            <h3 className="font-syne text-2xl font-bold flex items-center gap-3 text-white">
              <Briefcase className="w-5 h-5 text-[#D4AF37]" />
              Experience
            </h3>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-[#0e121a] border border-white/10 hover:border-[#D4AF37]/30 transition-all">
                <span className="text-xs font-mono text-[#D4AF37] font-semibold">
                  July 2026 – Present
                </span>
                <h4 className="font-syne font-bold text-lg text-white mt-1">
                  Data Analyst
                </h4>
                <p className="text-xs font-mono text-neutral-400">
                  NoviTech R&amp;D Pvt Ltd · Chennai
                </p>
                <p className="text-sm text-[#CBD5E1] mt-3 leading-relaxed">
                  Immersed in practical analytics workflows, turning raw enterprise data into meaningful metrics and automated anomaly detection.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0e121a] border border-white/10 hover:border-[#D4AF37]/30 transition-all">
                <span className="text-xs font-mono text-[#D4AF37] font-semibold">
                  May 2024 – Present
                </span>
                <h4 className="font-syne font-bold text-lg text-white mt-1">
                  Accountant &amp; Data Operations
                </h4>
                <p className="text-xs font-mono text-neutral-400">
                  Jana Fibre Glass
                </p>
                <p className="text-sm text-[#CBD5E1] mt-3 leading-relaxed">
                  Led financial data integrity, operational accounting, and reporting precision across manufacturing supply chains.
                </p>
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div className="cred-reveal space-y-6">
            <h3 className="font-syne text-2xl font-bold flex items-center gap-3 text-white">
              <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
              Education
            </h3>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-[#0e121a] border border-white/10 hover:border-[#D4AF37]/30 transition-all">
                <span className="text-xs font-mono text-[#D4AF37] font-semibold">
                  Nov 2024 – Nov 2028
                </span>
                <h4 className="font-syne font-bold text-lg text-white mt-1">
                  B.Tech in Computer Science &amp; Engineering
                </h4>
                <p className="text-xs font-mono text-neutral-400">
                  Sri Venkateshwaraa College of Engg &amp; Tech (SVCET)
                </p>
                <p className="text-sm text-[#CBD5E1] mt-3 leading-relaxed">
                  Focusing on Artificial Intelligence, Multi-Agent Architectures, Java Enterprise Systems, and Distributed Computing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0e121a] border border-white/10 hover:border-[#D4AF37]/30 transition-all">
                <span className="text-xs font-mono text-[#D4AF37] font-semibold">
                  June 2022 – May 2024
                </span>
                <h4 className="font-syne font-bold text-lg text-white mt-1">
                  Higher Secondary (Bio-Maths)
                </h4>
                <p className="text-xs font-mono text-neutral-400">
                  Kuyilappalayam Higher Secondary School
                </p>
                <p className="text-sm text-[#CBD5E1] mt-3 leading-relaxed">
                  Advanced foundational coursework in biological sciences and mathematics, guiding subsequent specialization in bioinformatics agents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

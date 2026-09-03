"use client";

import { useState, useRef } from "react";
import { EXPERTISE_ITEMS } from "@/lib/project-data";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Expertise() {
  const [activeItem, setActiveItem] = useState<string>(EXPERTISE_ITEMS[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".expertise-reveal", {
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

  const techTags = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React 19",
    "Next.js 16",
    "GSAP",
    "ScrollTrigger",
    "Lenis",
    "Tailwind CSS v4",
    "Node.js",
    "Zod",
    "Motion",
  ];

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#0C0C0C] text-white border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left Column: Headline & Tech Stack Pills (Reference Video 00:58 - 01:05) */}
        <div className="lg:col-span-5 flex flex-col justify-between sticky top-28">
          <div>
            <div className="expertise-reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-subtle bg-amber-400/5 text-[#FFDF73] text-[11px] font-mono tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              CAPABILITIES & SKILLS
            </div>

            <h2 className="expertise-reveal font-syne text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[0.95]">
              MY <br />
              <span className="text-gold-gradient">EXPERTISE</span>
            </h2>

            <p className="expertise-reveal mt-6 text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md">
              I design and build digital experiences where typography, code, and
              motion work as one cohesive ecosystem. Every project is crafted for
              maximum speed, fluid physics, and unforgettable visual impact.
            </p>
          </div>

          {/* Interactive Floating Tech Tags */}
          <div className="expertise-reveal mt-10 pt-8 border-t border-white/10">
            <span className="text-[11px] font-mono text-neutral-500 tracking-widest uppercase block mb-4">
              TECHNOLOGIES & TOOLKIT
            </span>
            <div className="flex flex-wrap gap-2">
              {techTags.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/40 border border-white/10 text-xs font-mono text-neutral-300 hover:text-[#FFDF73] transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Domain Accordion Cards (Reference Video 01:00 - 01:14) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {EXPERTISE_ITEMS.map((item) => {
            const isOpen = activeItem === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`expertise-reveal p-6 md:p-8 rounded-2xl border transition-all duration-500 cursor-pointer group relative overflow-hidden ${
                  isOpen
                    ? "bg-[#141414] border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    : "bg-[#0E0E0E] border-white/5 hover:border-white/20 hover:bg-[#121212]"
                }`}
              >
                {/* Accent glow on active */}
                {isOpen && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#FFDF73] via-[#D4AF37] to-amber-700" />
                )}

                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#D4AF37] tracking-widest">
                      {item.num}
                    </span>
                    <h3 className="font-syne text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#FFDF73] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "border-[#D4AF37] bg-[#D4AF37] text-black rotate-45"
                        : "border-white/10 text-neutral-400 group-hover:border-white/30"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-xs font-mono text-neutral-400 mt-2 tracking-wide">
                  {item.subtitle}
                </p>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FFDF73] bg-amber-400/10 px-2.5 py-1 rounded-md border border-[#D4AF37]/20"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

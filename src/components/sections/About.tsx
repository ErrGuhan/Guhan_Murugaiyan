"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax scroll on portrait image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -40,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Staggered reveal of text elements
      gsap.from(".about-reveal", {
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

  const facts = [
    { label: "BASED", value: "India (Tamil Nadu)" },
    { label: "FOCUS", value: "AI & Motion Systems" },
    { label: "ROLE", value: "Creative Developer" },
    { label: "MINDSET", value: "Always Learning" },
    { label: "EDUCATION", value: "B.Tech CSE (2024–2028)" },
    { label: "LEADERSHIP", value: "NSS Representative" },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#090a0e] text-white overflow-hidden border-t border-white/5"
    >
      {/* Subtle Section Tag Header (Video 00:40) */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-20 flex flex-col items-center text-center">
        <div className="about-reveal inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#FFDF73] text-[11px] font-mono tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          {"// 01 — THE PERSON BEHIND THE CODE"}
        </div>

        <h2 className="about-reveal font-syne text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase">
          ABOUT <span className="text-[#FFDF73]">ME</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Portrait & Badge (Video 00:48) */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
          <div
            ref={imageRef}
            className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
            data-cursor="view"
          >
            {/* Dark gradient overlay with hover reveal */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

            <Image
              src="/images/profile.jpg"
              alt="Guhan Murugaiyan"
              fill
              className="object-cover object-center grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 450px"
              priority
            />

            {/* Inset Portrait Label (Video 00:48) */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-mono text-[#D4AF37] tracking-widest uppercase">
                  AI AGENT ARCHITECT
                </p>
                <h3 className="font-syne text-xl font-bold text-white tracking-tight">
                  GUHAN MURUGAIYAN
                </h3>
              </div>
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Statement & Metrics (Video 00:48 - 00:56) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
          <div>
            <div className="about-reveal text-xs font-mono text-[#D4AF37] tracking-widest uppercase mb-4">
              WHO AM I ?
            </div>

            <h3 className="about-reveal font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] uppercase text-neutral-100">
              I BUILD <span className="text-white">DIGITAL WORLDS</span> WHERE{" "}
              <span className="text-gold-gradient">DESIGN MEETS CODE</span>.
            </h3>

            <div className="about-reveal mt-6 space-y-4 text-neutral-300 font-normal leading-relaxed text-sm sm:text-base">
              <p>
                I am an <strong>AI Developer and Computer Science Engineer</strong> deeply
                passionate about building autonomous agent frameworks, motion design, and
                high-performance web architecture that feel truly alive.
              </p>
              <p className="text-neutral-400">
                I care about the architectural details that elevate software: tactile micro-interactions,
                fault-tolerant execution, and turning raw code into memorable digital experiences.
                Beyond development, I proudly represent the <strong>National Service Scheme (NSS)</strong>,
                championing community leadership and disciplined execution.
              </p>
            </div>
          </div>

          {/* Quick Facts Grid (6 Box Grid from Video 00:54) */}
          <div className="about-reveal grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-colors"
              >
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                  {fact.label}
                </span>
                <span className="font-syne font-bold text-sm sm:text-base text-[#FFDF73] block">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

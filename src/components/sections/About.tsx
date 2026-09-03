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

  const metrics = [
    { label: "ORIGIN", value: "India" },
    { label: "ROLE", value: "Creative Engineer" },
    { label: "FOCUS", value: "AI & Motion Systems" },
    { label: "EXPERIENCE", value: "4+ Years" },
    { label: "MINDSET", value: "Always Learning" },
    { label: "PROJECTS", value: "25+ Shipped" },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#0A0A0A] text-white overflow-hidden"
    >
      {/* Subtle Section Tag */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24 flex flex-col items-center text-center">
        <div className="about-reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-subtle bg-amber-400/5 text-[#FFDF73] text-[11px] font-mono tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          WHO AM I? · THE PERSON BEHIND THE CODE
        </div>

        <h2 className="about-reveal font-syne text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase">
          ABOUT <span className="text-[#FFDF73]">ME</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Portrait & Badge (Reference Video 00:48) */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
          <div
            ref={imageRef}
            className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
            data-cursor="view"
          >
            {/* Dark glass overlay with hover effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

            <Image
              src="/images/profile.jpg"
              alt="Guhan Murugaiyan"
              fill
              className="object-cover object-center grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 450px"
              priority
            />

            {/* Inset Portrait Label */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-mono text-[#D4AF37] tracking-widest uppercase">
                  LEAD DEVELOPER
                </p>
                <h3 className="font-syne text-xl font-bold text-white tracking-tight">
                  GUHAN MURUGAIYAN
                </h3>
              </div>
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Statement & Metrics (Reference Video 00:48 - 00:56) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
          <div>
            <div className="about-reveal text-xs font-mono text-[#D4AF37] tracking-widest uppercase mb-4">
              01 — PHILOSOPHY
            </div>

            <h3 className="about-reveal font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] uppercase text-neutral-100">
              I BUILD <span className="text-white">DIGITAL WORLDS</span> WHERE{" "}
              <span className="text-gold-gradient">DESIGN MEETS CODE</span>.
            </h3>

            <div className="about-reveal mt-6 space-y-4 text-neutral-400 font-normal leading-relaxed text-sm sm:text-base">
              <p>
                I am a creative developer who bridges the gap between artistic vision and
                engineering rigor. I obsess over the nuances most people don&apos;t consciously
                register: the exact easing curves of a transition, the balance of negative space,
                and the invisible performance optimizations that make an interface feel instantaneous.
              </p>
              <p>
                My work centers on combining modern front-end architecture (Next.js, React 19,
                TypeScript) with fluid motion choreography (GSAP, Lenis) and AI-driven capabilities
                to create unforgettable web products.
              </p>
            </div>
          </div>

          {/* Metrics Grid (Reference Video 00:49) */}
          <div className="about-reveal grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
            {metrics.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-[11px] font-mono text-neutral-500 tracking-widest uppercase">
                  {item.label}
                </span>
                <span className="font-syne text-lg sm:text-xl font-bold text-neutral-200 mt-1">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

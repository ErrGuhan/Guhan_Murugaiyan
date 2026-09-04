"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Mail } from "lucide-react";

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

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Horizontal divider line draws in on scroll-into-view (Part 5)
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.inOut",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 2. Photo card slides in from left with slight scale (0.95 -> 1) (Part 5)
      gsap.from(".about-photo-card", {
        x: -45,
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-photo-card",
          start: "top 80%",
        },
      });

      // 3. Headline + body paragraphs staggered fade/slide up
      gsap.from(".about-text-reveal", {
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text-wrapper",
          start: "top 80%",
        },
      });

      // 4. Stats grid items staggered entrance (~0.06s stagger) (Part 5)
      gsap.from(".about-stat-item", {
        y: 25,
        opacity: 0,
        stagger: 0.06,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-stats-grid",
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  const facts = [
    { label: "BASED", value: "India (Tamil Nadu)" },
    { label: "FOCUS", value: "AI & Data Systems" },
    { label: "ROLE", value: "AI Developer" },
    { label: "MINDSET", value: "Always Learning" },
    { label: "EDUCATION", value: "B.Tech CSE (2024–2028)" },
    { label: "LEADERSHIP", value: "NSS Representative" },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#0A0A0A] text-[#F0F0F0] overflow-hidden border-t border-[#C9AF7C]/15"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading & Eyebrow (Part 5) */}
        <div className="mb-14 md:mb-18 flex flex-col items-start">
          <span className="text-xs font-mono tracking-[0.2em] text-[#C9AF7C] uppercase mb-3 font-semibold">
            — 02 · THE PERSON BEHIND THE CODE
          </span>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase text-[#F0F0F0]">
            ABOUT ME
          </h2>

          {/* Thin Horizontal Divider Line Drawing in on Scroll (Part 5) */}
          <div
            ref={dividerRef}
            className="w-full h-[1px] bg-gradient-to-r from-[#C9AF7C] via-[#C9AF7C]/40 to-transparent mt-6"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Profile Card with Grayscale/Duotone Tint, Overlay & Links (Part 5) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div
              className="about-photo-card relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-[#C9AF7C]/20 shadow-2xl group bg-[#111111]"
              data-cursor="view"
            >
              {/* Subtle duotone gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

              <Image
                src="/images/profile.jpg"
                alt="Guhan Murugaiyan"
                fill
                className="object-cover object-center grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 450px"
                priority
              />

              {/* Name Overlay Top-Left (Part 5) */}
              <div className="absolute top-4 left-4 z-20 bg-black/75 px-3 py-1.5 rounded-md border border-[#C9AF7C]/30 backdrop-blur-sm">
                <span className="text-[10px] font-mono tracking-widest text-[#C9AF7C] uppercase font-bold">
                  GUHAN MURUGAIYAN
                </span>
              </div>

              {/* Bottom Edge: 3 Icon Links (Code, Resume, Contact) (Part 5) */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-black/80 px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur-md">
                <span className="text-[11px] font-mono text-[#F0F0F0] font-medium tracking-wider">
                  QUICK CONNECT
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/ErrGuhan"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white/10 text-[#C9AF7C] hover:bg-[#C9AF7C] hover:text-black transition-colors"
                    title="GitHub Profile"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white/10 text-[#C9AF7C] hover:bg-[#C9AF7C] hover:text-black transition-colors"
                    title="Download Resume"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#contact"
                    className="p-1.5 rounded-lg bg-white/10 text-[#C9AF7C] hover:bg-[#C9AF7C] hover:text-black transition-colors"
                    title="Send Message"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bio Statement & 3x2 Stats Grid (Part 5) */}
          <div className="about-text-wrapper lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              <span className="about-text-reveal text-xs font-mono text-[#C9AF7C] tracking-widest uppercase mb-3 block font-semibold">
                — WHO AM I?
              </span>

              {/* Large headline with selectively gold-highlighted keywords (Part 5) */}
              <h3 className="about-text-reveal font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.2] uppercase text-[#F0F0F0]">
                I BUILD{" "}
                <span className="text-[#C9AF7C]">INTELLIGENT SYSTEMS</span> WHERE{" "}
                <span className="text-[#C9AF7C]">DATA MEETS AUTONOMY</span>.
              </h3>

              {/* 2-Column Body Paragraph (Part 5) */}
              <div className="about-text-reveal mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-[#CBD5E1] text-sm leading-relaxed">
                <p>
                  I am an <strong>AI Developer and Computer Science Engineer</strong> deeply
                  passionate about constructing autonomous multi-agent networks,
                  concurrent backends, and high-throughput data workflows that scale
                  reliably without manual intervention.
                </p>
                <p className="text-[#A0AEC0]">
                  I care about the architectural details that elevate software: autonomous
                  collaboration, fault-tolerant execution, and turning raw data into
                  meaningful business intelligence. Beyond code, I proudly represent the{" "}
                  <strong>National Service Scheme (NSS)</strong>, championing community
                  leadership and disciplined execution.
                </p>
              </div>
            </div>

            {/* Stats Grid: 3 columns x 2 rows (Part 5) */}
            <div className="about-stats-grid grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-6 border-t border-white/10">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="about-stat-item p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/50 transition-colors"
                >
                  <span className="text-[10px] font-mono text-[#C9AF7C] uppercase tracking-widest block mb-1 font-bold">
                    {fact.label}
                  </span>
                  <span className="font-syne font-bold text-sm sm:text-base text-[#F0F0F0] block">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

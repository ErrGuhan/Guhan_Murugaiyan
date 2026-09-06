"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Mail, ShieldCheck, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
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
      // 1. Horizontal divider line draws in on scroll
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.inOut",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // 2. Photo card slides in from left with comic spring
      gsap.from(".about-photo-card", {
        x: -45,
        rotation: -4,
        scale: 0.95,
        opacity: 0,
        duration: 0.85,
        ease: "back.out(1.4)",
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
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text-wrapper",
          start: "top 80%",
        },
      });

      // 4. Stats grid items staggered entrance
      gsap.from(".about-stat-item", {
        y: 25,
        scale: 0.95,
        opacity: 0,
        stagger: 0.07,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".about-stats-grid",
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  const facts = [
    { label: "BASE LOCATION", value: "India (Tamil Nadu)", icon: "📍" },
    { label: "SPECIALTY", value: "AI & Autonomous Systems", icon: "⚡" },
    { label: "PRIMARY CLASS", value: "AI Developer / Engineer", icon: "⚔️" },
    { label: "PASSIVE TRAIT", value: "Always Leveling Up", icon: "🔥" },
    { label: "ACADEMY", value: "B.Tech CSE (2024–2028)", icon: "🎓" },
    { label: "GUILD ROLE", value: "NSS Representative", icon: "🛡️" },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#0B0B0F] text-white overflow-hidden border-t-[3px] border-black bg-halftone-dark"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Heading & Manga Eyebrow */}
        <div className="mb-14 md:mb-18 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFE600] text-black border-[3px] border-black shadow-[3px_3px_0px_#000000] rounded-lg text-xs font-mono font-black tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span>— 02 · CHARACTER PROFILE &amp; ORIGIN</span>
          </div>

          <h2
            data-text="ABOUT ME"
            className="comic-glitch-text text-4xl sm:text-6xl md:text-7xl leading-tight tracking-tight uppercase text-white drop-shadow-[5px_5px_0px_#000000]"
          >
            ABOUT <span className="text-[#FFE600]">ME</span>
          </h2>

          {/* Solid 3px Manga Divider Line */}
          <div
            ref={dividerRef}
            className="w-full h-[3px] bg-[#FFE600] border-y border-black mt-6"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Manga Character Card with 3px border and 4px shadow */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div
              className="about-photo-card comic-card relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_#000000] group bg-[#17171C]"
              data-cursor="view"
            >
              {/* Halftone Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />

              <Image
                src="/images/profile.jpg"
                alt="Guhan Murugaiyan"
                fill
                className="object-cover object-center grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, 450px"
                priority
              />

              {/* Manga Name Badge Top-Left with 3px border */}
              <div className="absolute top-4 left-4 z-20 bg-[#FFE600] text-black px-3 py-1.5 rounded-lg border-[2.5px] border-black shadow-[3px_3px_0px_#000000] -rotate-2">
                <span className="text-[11px] font-mono tracking-wider uppercase font-black block">
                  GUHAN MURUGAIYAN
                </span>
                <span className="text-[9px] font-mono tracking-widest text-neutral-800 uppercase block font-bold">
                  CREATIVE ARCHITECT // LVL 99
                </span>
              </div>

              {/* Bottom Edge: Manga Action Quick Connect with 3px borders */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-black/90 px-4 py-2.5 rounded-xl border-[2.5px] border-black shadow-[3px_3px_0px_#000000]">
                <span className="text-[11px] font-mono text-[#FFE600] font-black tracking-wider uppercase">
                  QUICK CONNECT ⚡
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/ErrGuhan"
                    target="_blank"
                    rel="noreferrer"
                    className="comic-btn p-2 rounded-lg bg-white text-black hover:bg-[#FFE600] transition-colors"
                    title="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="comic-btn p-2 rounded-lg bg-white text-black hover:bg-[#00F0FF] transition-colors"
                    title="Download Resume"
                  >
                    <FileText className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="comic-btn p-2 rounded-lg bg-white text-black hover:bg-[#FF2A55] hover:text-white transition-colors"
                    title="Send Message"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Comic Box & RPG Attribute Grid */}
          <div className="about-text-wrapper lg:col-span-7 flex flex-col justify-between space-y-8">
            {/* Comic Speech/Narrative Dialogue Box */}
            <div className="comic-card p-6 sm:p-8 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000] relative">
              <span className="about-text-reveal text-xs font-mono text-[#FFE600] tracking-widest uppercase mb-3 block font-black">
                // MANIFESTO &amp; CREED
              </span>

              {/* Large headline with comic font styling */}
              <h3 className="about-text-reveal font-syne text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.2] uppercase text-white">
                I BUILD{" "}
                <span className="text-[#FFE600] drop-shadow-[2px_2px_0px_#000000]">
                  INTELLIGENT SYSTEMS
                </span>{" "}
                WHERE{" "}
                <span className="text-[#00F0FF] drop-shadow-[2px_2px_0px_#000000]">
                  DATA MEETS AUTONOMY
                </span>
                .
              </h3>

              {/* 2-Column Body Narrative */}
              <div className="about-text-reveal mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-300 text-sm leading-relaxed">
                <p>
                  I am an <strong className="text-white font-black">AI Developer and Computer Science Engineer</strong> deeply
                  passionate about constructing autonomous multi-agent networks,
                  concurrent backends, and high-throughput data workflows that scale
                  reliably without manual intervention.
                </p>
                <p className="text-neutral-400">
                  I care about the architectural details that elevate software: autonomous
                  collaboration, fault-tolerant execution, and turning raw data into
                  meaningful business intelligence. Beyond code, I proudly represent the{" "}
                  <strong className="text-[#FFE600] font-black">National Service Scheme (NSS)</strong>, championing community
                  leadership and disciplined execution.
                </p>
              </div>
            </div>

            {/* Character RPG Stats Grid (3 cols x 2 rows) with 3px black borders & 4px shadows */}
            <div className="about-stats-grid grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="about-stat-item comic-card p-4 rounded-xl bg-[#17171C] border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:bg-[#FFE600] hover:text-black group transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-[#FFE600] group-hover:text-black uppercase tracking-widest font-black block">
                      {fact.label}
                    </span>
                    <span className="text-sm">{fact.icon}</span>
                  </div>
                  <span className="font-syne font-bold text-sm sm:text-base text-white group-hover:text-black block leading-snug">
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

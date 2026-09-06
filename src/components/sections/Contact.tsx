"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useGSAP(
    () => {
      gsap.from(".contact-card-reveal", {
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

      gsap.from(".contact-form-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form-reveal",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  const onSubmit = async (data: ContactFormData) => {
    void data;
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("mguhan6383@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#0B0B0F] text-white border-t-[3px] border-black overflow-hidden scroll-mt-16 bg-halftone-dark"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg border-[3px] border-black bg-[#FFE600] text-black shadow-[3px_3px_0px_#000000] text-xs font-mono tracking-widest uppercase mb-4 font-black">
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span>COMMUNICATION HUB // DISPATCH TERMINAL</span>
          </div>

          <h2 className="font-display text-[clamp(2.5rem,7.5vw,4.8rem)] font-black tracking-tight uppercase leading-[1.05] max-w-3xl text-white -webkit-text-stroke-[2px_#000] drop-shadow-[5px_5px_0px_#000000]">
            LET&apos;S CREATE <br />
            <span className="text-[#FFE600]">SOMETHING MEANINGFUL.</span>
          </h2>

          <p className="mt-6 text-neutral-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            Have a project in mind, an internship opening in AI or Data Engineering,
            or simply want to talk about autonomous multi-agent systems? Connect directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Info Cards with 3px borders and 4px shadows */}
          <div className="lg:col-span-5 space-y-4">
            {/* Copy Email Card */}
            <div
              onClick={copyEmail}
              className="contact-card-reveal comic-card w-full p-5 sm:p-6 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#FFE600] text-black border-[2.5px] border-black shadow-[2.5px_2.5px_0px_#000000] flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                  <Mail className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#FFE600] uppercase tracking-widest block font-black">
                    EMAIL DISPATCH
                  </span>
                  <span className="font-mono text-sm sm:text-base text-white font-bold truncate block">
                    mguhan6383@gmail.com
                  </span>
                </div>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  copyEmail();
                }}
                className="comic-btn w-10 h-10 rounded-xl bg-white text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] hover:bg-[#FFE600] flex items-center justify-center flex-shrink-0 ml-3"
                title={copied ? "Copied!" : "Copy email address"}
                aria-label="Copy email address"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                ) : (
                  <Copy className="w-4 h-4 stroke-[2.5]" />
                )}
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/guhanmurugaiyan"
              target="_blank"
              rel="noreferrer"
              className="contact-card-reveal comic-card w-full p-5 sm:p-6 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] flex items-center justify-between group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#00F0FF] text-black border-[2.5px] border-black shadow-[2.5px_2.5px_0px_#000000] flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63c0-.9-.73-1.63-1.63-1.63Z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-widest block font-black">
                    LINKEDIN CHANNEL
                  </span>
                  <span className="font-syne font-bold text-sm sm:text-base text-white truncate block">
                    LinkedIn / guhanmurugaiyan
                  </span>
                </div>
              </div>

              <div className="comic-btn w-10 h-10 rounded-xl bg-white text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] hover:bg-[#00F0FF] flex items-center justify-center flex-shrink-0 ml-3">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </a>

            {/* Location Card */}
            <div className="contact-card-reveal comic-card w-full p-5 sm:p-6 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000] flex items-center justify-between">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#FF2A55] text-white border-[2.5px] border-black shadow-[2.5px_2.5px_0px_#000000] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#FF2A55] uppercase tracking-widest block font-black">
                    HOME COORDINATES
                  </span>
                  <span className="font-syne font-bold text-sm sm:text-base text-white truncate block">
                    Vanur, Tamil Nadu, India
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00E676] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] text-[10px] font-mono font-black tracking-wider uppercase flex-shrink-0 ml-3">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span>IST (UTC+5:30)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with 3px black borders & 4px offset shadows */}
          <div className="contact-form-reveal lg:col-span-7 rounded-3xl bg-[#13131A] border-[3px] border-black p-6 sm:p-10 shadow-[6px_6px_0px_#000000]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-black tracking-wider uppercase text-[#FFE600] mb-2">
                  // YOUR NAME / ALIAS
                </label>
                <input
                  {...register("name")}
                  placeholder="Enter your name or organization"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#08080C] border-[3px] border-black shadow-[3px_3px_0px_#000000] text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FFE600] focus:shadow-[5px_5px_0px_#FFE600] transition-all font-mono text-sm"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-[#FF2A55] font-mono font-bold">
                    ⚠️ {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-black tracking-wider uppercase text-[#00F0FF] mb-2">
                  // YOUR EMAIL ADDRESS
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your.email@domain.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#08080C] border-[3px] border-black shadow-[3px_3px_0px_#000000] text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#00F0FF] focus:shadow-[5px_5px_0px_#00F0FF] transition-all font-mono text-sm"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-[#FF2A55] font-mono font-bold">
                    ⚠️ {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-black tracking-wider uppercase text-[#FFE600] mb-2">
                  // TRANSMISSION MESSAGE
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Describe your mission, internship opening, or architectural query..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#08080C] border-[3px] border-black shadow-[3px_3px_0px_#000000] text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FFE600] focus:shadow-[5px_5px_0px_#FFE600] transition-all font-mono text-sm resize-none"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-[#FF2A55] font-mono font-bold">
                    ⚠️ {errors.message.message}
                  </p>
                )}
              </div>

              {/* Tactile Comic Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`comic-btn w-full py-4 rounded-xl text-xs font-mono font-black tracking-widest uppercase flex items-center justify-center gap-2 text-black ${
                  submitted
                    ? "bg-[#00E676] shadow-[4px_4px_0px_#000000]"
                    : "bg-[#FFE600] hover:bg-[#00F0FF]"
                }`}
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 stroke-[3]" /> TRANSMISSION SENT!
                  </span>
                ) : isSubmitting ? (
                  <span>TRANSMITTING DATA...</span>
                ) : (
                  <span className="flex items-center gap-2">
                    SEND TRANSMISSION <Send className="w-4 h-4 stroke-[2.5]" />
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

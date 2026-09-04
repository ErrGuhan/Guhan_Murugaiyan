"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
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
      // Staggered reveal for contact cards and form (Part 10)
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
        duration: 0.9,
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
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#0A0A0A] text-[#F0F0F0] border-t border-[#C9AF7C]/15 overflow-hidden scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Tag Header */}
        <div className="mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            CONTACT &amp; INQUIRIES
          </div>

          {/* Headline with gold highlight */}
          <h2 className="font-display text-[clamp(2.4rem,7.5vw,4.5rem)] font-bold tracking-tight uppercase leading-[1.05] max-w-3xl text-white">
            LET&apos;S CREATE <br />
            <span className="text-[#C9AF7C]">SOMETHING MEANINGFUL.</span>
          </h2>

          <p className="mt-6 text-[#CBD5E1] text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            Have a project in mind, an internship opening in AI or Data Engineering,
            or simply want to talk about autonomous agents? I&apos;d love to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Info Cards (Part 10) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Copy Email Card */}
            <div
              onClick={copyEmail}
              className="contact-card-reveal w-full p-5 sm:p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/60 transition-all duration-300 cursor-pointer group flex items-center justify-between shadow-xl"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#C9AF7C]/10 border border-[#C9AF7C]/20 flex items-center justify-center text-[#C9AF7C] group-hover:scale-105 group-hover:bg-[#C9AF7C]/20 transition-all flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#7A7A7A] uppercase tracking-widest block transition-colors group-hover:text-neutral-400">
                    EMAIL ME
                  </span>
                  <span className="font-mono text-sm sm:text-base text-[#F0F0F0] font-medium truncate block">
                    mguhan6383@gmail.com
                  </span>
                </div>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  copyEmail();
                }}
                className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#C9AF7C]/20 border border-white/10 group-hover:border-[#C9AF7C]/40 text-[#A8986E] group-hover:text-[#C9AF7C] flex items-center justify-center transition-all flex-shrink-0 ml-3"
                title={copied ? "Copied!" : "Copy email address"}
                aria-label="Copy email address"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/guhanmurugaiyan"
              target="_blank"
              rel="noreferrer"
              className="contact-card-reveal w-full p-5 sm:p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/60 transition-all duration-300 flex items-center justify-between group shadow-xl"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#C9AF7C]/10 border border-[#C9AF7C]/20 flex items-center justify-center text-[#C9AF7C] group-hover:scale-105 group-hover:bg-[#C9AF7C]/20 transition-all flex-shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63c0-.9-.73-1.63-1.63-1.63Z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#7A7A7A] uppercase tracking-widest block transition-colors group-hover:text-neutral-400">
                    CONNECT
                  </span>
                  <span className="font-syne font-bold text-sm sm:text-base text-[#F0F0F0] truncate block">
                    LinkedIn / guhanmurugaiyan
                  </span>
                </div>
              </div>

              <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#C9AF7C]/20 border border-white/10 group-hover:border-[#C9AF7C]/40 text-[#A8986E] group-hover:text-[#C9AF7C] flex items-center justify-center transition-all flex-shrink-0 ml-3">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* Location Card */}
            <div className="contact-card-reveal w-full p-5 sm:p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#C9AF7C]/40 transition-all duration-300 flex items-center justify-between shadow-xl group">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#C9AF7C]/10 border border-[#C9AF7C]/20 flex items-center justify-center text-[#C9AF7C] group-hover:scale-105 group-hover:bg-[#C9AF7C]/20 transition-all flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#7A7A7A] uppercase tracking-widest block transition-colors group-hover:text-neutral-400">
                    LOCATION
                  </span>
                  <span className="font-syne font-bold text-sm sm:text-base text-[#F0F0F0] truncate block">
                    Vanur, Tamil Nadu, India
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono tracking-wider uppercase flex-shrink-0 ml-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>IST (UTC+5:30)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (Part 10) */}
          <div className="contact-form-reveal lg:col-span-7 rounded-3xl bg-[#111111] border border-white/10 p-6 sm:p-10 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-[#7A7A7A] mb-2">
                  YOUR NAME
                </label>
                <input
                  {...register("name")}
                  placeholder="Your name or company"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#C9AF7C] transition-colors font-mono text-sm"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-[#7A7A7A] mb-2">
                  YOUR EMAIL
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#C9AF7C] transition-colors font-mono text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-[#7A7A7A] mb-2">
                  YOUR MESSAGE
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project, internship opportunity, or idea..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#C9AF7C] transition-colors font-mono text-sm resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button with Expanding Circle Hover */}
              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`circle-hover-parent w-full py-4 rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  submitted
                    ? "bg-emerald-400 text-black shadow-lg"
                    : "bg-[#C9AF7C] text-black hover:text-white [--circle-bg:#0A0A0A] shadow-xl"
                }`}
              >
                {submitted ? (
                  <span className="z-10 flex items-center gap-2">
                    <Check className="w-4 h-4" /> MESSAGE SENT!
                  </span>
                ) : isSubmitting ? (
                  <span className="z-10">SENDING...</span>
                ) : (
                  <span className="z-10 flex items-center gap-2">
                    SEND MESSAGE <ArrowUpRight className="w-4 h-4" />
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

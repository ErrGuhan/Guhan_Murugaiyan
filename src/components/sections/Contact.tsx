"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  botCheck: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [msgFocused, setMsgFocused] = useState(false);
  const [typewriterPlaceholder, setTypewriterPlaceholder] = useState("");

  // Typewriter cycling placeholder messages
  const placeholderMessages = [
    "Hi Guhan! I'd love to discuss an AI project...",
    "I'm hiring for a backend engineering role at...",
    "Let's build something awesome together!",
    "Got a cool idea and want to collaborate?",
  ];

  // Canvas confetti burst (yellow/black palette, no dependency)
  const triggerConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; rotation: number; rotSpeed: number;
    }[] = [];

    const colors = ["#FFE600", "#000000", "#00F0FF", "#00E676", "#FF2A55"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.3,
      });
    }

    let frame = 0;
    const maxFrames = 90;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - frame / maxFrames);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.rotation += p.rotSpeed;
      }
      frame++;
      if (frame < maxFrames) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (canvas) canvas.style.display = "none";
      }
    };
    requestAnimationFrame(animate);
  }, []);

  // Typewriter effect — only runs when textarea is empty and unfocused
  useEffect(() => {
    if (msgFocused) return;
    let msgIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = placeholderMessages[msgIdx];
      if (!isDeleting) {
        setTypewriterPlaceholder(current.slice(0, charIdx + 1));
        charIdx++;
        if (charIdx === current.length) {
          isDeleting = true;
          timer = setTimeout(tick, 1800); // pause at full message
          return;
        }
      } else {
        setTypewriterPlaceholder(current.slice(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          msgIdx = (msgIdx + 1) % placeholderMessages.length;
        }
      }
      timer = setTimeout(tick, isDeleting ? 40 : 70);
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgFocused]);

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
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.error || "Failed to send message.");
      }

      setSubmitted(true);
      reset();
      triggerConfetti();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to send. Please reach out via direct email.";
      setSubmitError(message);
    }
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
      className="relative min-h-screen py-20 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#0B0B0F] text-white border-t-[3px] border-black overflow-hidden scroll-mt-16 bg-halftone-dark"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12 sm:mb-14 md:mb-18">
          <div className="flex items-center justify-between w-full mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border-[3px] border-black bg-[#FFE600] text-black shadow-[3px_3px_0px_#000000] text-xs font-mono tracking-widest uppercase font-black">
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              <span>{"— 05 · CONTACT & INQUIRIES"}</span>
            </div>
          </div>

          <h2
            className="font-display text-[clamp(2.1rem,7.5vw,4.8rem)] font-black tracking-tight uppercase leading-[1.05] max-w-3xl text-white drop-shadow-[5px_5px_0px_#000000]"
            style={{ WebkitTextStroke: "1px #000", paintOrder: "stroke fill" }}
          >
            LET&apos;S CREATE <br />
            <span className="text-[#FFE600]">SOMETHING MEANINGFUL.</span>
          </h2>

          <p className="mt-5 sm:mt-6 text-neutral-200 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            Have a project in mind, an opportunity in AI or Backend Engineering,
            or want to connect directly? Send a note below or reach out via email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Info Cards with 3px borders and 4px shadows */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4 lg:sticky lg:top-28">
            {/* Copy Email Card */}
            <div
              onClick={copyEmail}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  copyEmail();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Copy email address mguhan6383@gmail.com"
              className="contact-card-reveal comic-card w-full p-4 sm:p-6 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] cursor-pointer group flex items-center justify-between gap-3 outline-none focus-visible:ring-2 focus-visible:ring-[#FFE600]"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FFE600] text-black border-[2.5px] border-black shadow-[2.5px_2.5px_0px_#000000] flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                  <Mail className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#FFE600] uppercase tracking-widest block font-black">
                    EMAIL
                  </span>
                  <span className="font-mono text-xs sm:text-base text-white font-bold truncate block">
                    mguhan6383@gmail.com
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  copyEmail();
                }}
                className="comic-btn w-10 h-10 rounded-xl bg-white text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] hover:bg-[#FFE600] flex items-center justify-center flex-shrink-0"
                title={copied ? "Copied!" : "Copy email address"}
                aria-label="Copy email address"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                ) : (
                  <Copy className="w-4 h-4 stroke-[2.5]" />
                )}
              </button>
            </div>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/guhanmurugaiyan"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-reveal comic-card w-full p-4 sm:p-6 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:shadow-[7px_7px_0px_#000000] flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#00F0FF] text-black border-[2.5px] border-black shadow-[2.5px_2.5px_0px_#000000] flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63 1.63-.73 1.63-1.63c0-.9-.73-1.63-1.63-1.63Z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-widest block font-black">
                    LINKEDIN
                  </span>
                  <span className="font-sans font-bold text-xs sm:text-base text-white tracking-tight truncate block">
                    LinkedIn / guhanmurugaiyan
                  </span>
                </div>
              </div>

              <div className="comic-btn w-10 h-10 rounded-xl bg-white text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] hover:bg-[#00F0FF] flex items-center justify-center flex-shrink-0">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </a>

            {/* Location Card */}
            <div className="contact-card-reveal comic-card w-full p-4 sm:p-6 rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[4px_4px_0px_#000000] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FF2A55] text-white border-[2.5px] border-black shadow-[2.5px_2.5px_0px_#000000] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#FF2A55] uppercase tracking-widest block font-black">
                    LOCATION
                  </span>
                  <span className="font-sans font-bold text-xs sm:text-base text-white tracking-tight truncate block">
                    Vanur, Tamil Nadu, India
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#00E676] text-black border-[2px] border-black shadow-[2px_2px_0px_#000000] text-[9px] sm:text-[10px] font-mono font-black tracking-wider uppercase flex-shrink-0">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-black animate-pulse" />
                <span className="hidden min-[360px]:inline">IST (UTC+5:30)</span>
                <span className="min-[360px]:hidden">IST</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with 3px black borders & responsive padding */}
          <div className="contact-form-reveal lg:col-span-7 rounded-2xl sm:rounded-3xl bg-[#13131A] border-[3px] border-black p-4 sm:p-8 md:p-10 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000]">
            <form onSubmit={(e) => { void handleSubmit(onSubmit)(e); }} className="space-y-6">
              {/* Anti-spam honeypot field - hidden from humans */}
              <div className="hidden" aria-hidden="true">
                <input
                  {...register("botCheck")}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-black tracking-wider uppercase text-[#FFE600] mb-2">
                  {"// YOUR NAME"}
                </label>
                <input
                  {...register("name")}
                  placeholder="Enter your name or organization"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#08080C] border-[3px] border-black shadow-[3px_3px_0px_#000000] text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#FFE600] focus:shadow-[5px_5px_0px_#FFE600] transition-all font-mono text-sm"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-[#FF2A55] font-mono font-bold">
                    ⚠️ {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-black tracking-wider uppercase text-[#00F0FF] mb-2">
                  {"// YOUR EMAIL"}
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your.email@domain.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#08080C] border-[3px] border-black shadow-[3px_3px_0px_#000000] text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#00F0FF] focus:shadow-[5px_5px_0px_#00F0FF] transition-all font-mono text-sm"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-[#FF2A55] font-mono font-bold">
                    ⚠️ {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-black tracking-wider uppercase text-[#FFE600] mb-2">
                  {"// YOUR MESSAGE"}
                </label>
                {/* Confetti canvas — hidden until success */}
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full pointer-events-none z-10 rounded-xl"
                    style={{ display: "none" }}
                  />
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder={msgFocused ? "Describe your project, role, or inquiry..." : typewriterPlaceholder || "Describe your project, role, or inquiry..."}
                    onFocus={() => setMsgFocused(true)}
                    onBlur={() => setMsgFocused(false)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#08080C] border-[3px] border-black shadow-[3px_3px_0px_#000000] text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#FFE600] focus:shadow-[5px_5px_0px_#FFE600] transition-all font-mono text-sm resize-none"
                  />
                </div>
                {errors.message && (
                  <p className="mt-1.5 text-xs text-[#FF2A55] font-mono font-bold">
                    ⚠️ {errors.message.message}
                  </p>
                )}
              </div>

              {submitError && (
                <div className="p-3.5 rounded-xl bg-[#FF2A55]/10 border-[2px] border-[#FF2A55] text-white font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span>⚠️ {submitError}</span>
                  <a
                    href="mailto:mguhan6383@gmail.com?subject=Portfolio%20Inquiry"
                    className="comic-btn px-2.5 py-1 rounded bg-[#FFE600] text-black font-black uppercase text-[10px] w-fit"
                  >
                    Open in Mail App ↗
                  </a>
                </div>
              )}

              {/* Tactile Comic Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={cn(
                  "comic-btn w-full py-4 rounded-xl text-xs font-mono font-black tracking-widest uppercase flex items-center justify-center gap-2 text-black",
                  submitted
                    ? "bg-[#00E676] shadow-[4px_4px_0px_#000000]"
                    : "bg-[#FFE600] hover:bg-[#00F0FF]"
                )}
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 stroke-[3]" /> MESSAGE SENT!
                  </span>
                ) : isSubmitting ? (
                  <span>SENDING MESSAGE...</span>
                ) : (
                  <span className="flex items-center gap-2">
                    SEND MESSAGE <Send className="w-4 h-4 stroke-[2.5]" />
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

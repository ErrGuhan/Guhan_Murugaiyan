"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const contactSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
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

  const onSubmit = async (data: ContactFormData) => {
    // Simulated smooth submission with validated payload
    void data;
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("dev@campuscart.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 bg-[#0A0A0A] text-white border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-subtle bg-amber-400/5 text-[#FFDF73] text-[11px] font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            INITIATE COLLABORATION
          </div>

          <h2 className="font-syne text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[1.05] max-w-4xl">
            LET&apos;S CREATE <br />
            <span className="text-gold-gradient">SOMETHING MEANINGFUL.</span>
          </h2>

          <p className="mt-6 text-neutral-400 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            Have a project in mind, a vision to bring to life, or looking to build
            an elite creative web product? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info Cards (Reference Video 01:54) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div
              onClick={copyEmail}
              className="p-6 rounded-2xl bg-[#121212] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block">
                    EMAIL ME
                  </span>
                  <span className="font-mono text-sm sm:text-base text-neutral-200 group-hover:text-white transition-colors">
                    dev@campuscart.com
                  </span>
                </div>
              </div>

              <div className="text-neutral-500 group-hover:text-[#FFDF73] transition-colors">
                {copied ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-[#121212] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 flex items-center justify-between group block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block">
                    CONNECT
                  </span>
                  <span className="font-syne font-bold text-sm sm:text-base text-neutral-200 group-hover:text-white transition-colors">
                    LinkedIn / Professional
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-[#FFDF73] transition-colors" />
            </a>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block">
                  LOCATION & TIMEZONE
                </span>
                <span className="font-syne font-bold text-sm sm:text-base text-neutral-200">
                  Tamil Nadu, India · IST (UTC+5:30)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (Reference Video 01:54) */}
          <div className="lg:col-span-7 bg-[#121212] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-in fade-in duration-500">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-syne text-2xl font-bold text-white uppercase">
                  Message Sent Successfully
                </h3>
                <p className="text-sm font-mono text-neutral-400 max-w-sm mx-auto">
                  Thank you for reaching out! I will review your inquiry and get back to you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400 font-mono">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your.email@domain.com"
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400 font-mono">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Tell me about your project, goals, or timeline..."
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-400 font-mono">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <MagneticButton type="submit" strength={0.25}>
                    <span className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#D4AF37] text-black font-mono font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
                      {isSubmitting ? (
                        "SENDING..."
                      ) : (
                        <>
                          SEND MESSAGE <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </span>
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";

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
      className="relative min-h-screen py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-[#090a0e] text-white border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Tag Header (Video 01:52) */}
        <div className="mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            CONTACT
          </div>

          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-[1.05] max-w-3xl text-white">
            LET&apos;S CREATE <br />
            <span className="text-gold-gradient font-cinzel italic">
              SOMETHING MEANINGFUL.
            </span>
          </h2>

          <p className="mt-6 text-[#CBD5E1] text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            Have a project in mind, an internship opening in AI or Data Science, or
            simply want to talk about autonomous agents? I&apos;d love to hear
            from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Quick Cards (Video 01:54) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Copy Email Pill Card */}
            <div
              onClick={copyEmail}
              className="p-5 sm:p-6 rounded-2xl bg-[#0e121a] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 cursor-pointer group flex items-center justify-between shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                    EMAIL ME
                  </span>
                  <span className="font-mono text-sm sm:text-base text-neutral-200 group-hover:text-white transition-colors font-medium">
                    mguhan6383@gmail.com
                  </span>
                </div>
              </div>

              <div className="text-neutral-400 group-hover:text-[#FFDF73] transition-colors pr-2">
                {copied ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* LinkedIn Pill Card */}
            <a
              href="https://www.linkedin.com/in/guhan-murugaiyan"
              target="_blank"
              rel="noreferrer"
              className="p-5 sm:p-6 rounded-2xl bg-[#0e121a] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 flex items-center justify-between group block shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                    CONNECT
                  </span>
                  <span className="font-syne font-bold text-sm sm:text-base text-neutral-200 group-hover:text-white transition-colors">
                    LinkedIn / guhan-murugaiyan
                  </span>
                </div>
              </div>

              <div className="text-neutral-400 group-hover:text-[#FFDF73] transition-colors pr-2">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* Location Pill Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0e121a] border border-white/10 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                    BASED IN
                  </span>
                  <span className="font-syne font-bold text-sm sm:text-base text-neutral-200">
                    Vanur, Tamil Nadu, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Dark Contact Form (Video 01:54) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0e121a] border border-white/10 p-6 sm:p-10 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-neutral-400 mb-2">
                  NAME
                </label>
                <input
                  {...register("name")}
                  placeholder="Your Name"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#06080d] border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors font-mono text-sm"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-neutral-400 mb-2">
                  EMAIL
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#06080d] border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors font-mono text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-neutral-400 mb-2">
                  MESSAGE
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#06080d] border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors font-mono text-sm resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-rose-400 font-mono">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`w-full py-4 rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  submitted
                    ? "bg-emerald-400 text-black shadow-lg"
                    : "bg-[#D4AF37] text-black hover:bg-[#FFDF73] shadow-xl"
                }`}
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" /> MESSAGE SENT!
                  </>
                ) : isSubmitting ? (
                  "SENDING..."
                ) : (
                  <>
                    SEND MESSAGE <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

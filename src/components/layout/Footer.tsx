"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#F0F0F0] border-t border-[#C9AF7C]/15 px-6 md:px-12 py-10 select-none">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Side: Cursive Monogram & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-script text-3xl sm:text-4xl text-[#C9AF7C]">
            guhan
          </span>
          <p className="text-xs font-mono text-[#7A7A7A]">
            © 2026 Guhan Murugaiyan. All rights reserved.
          </p>
        </div>

        {/* Right Side: Back to Top with Expanding Circle Hover */}
        <div>
          <button
            onClick={scrollToTop}
            className="circle-hover-parent px-5 py-2.5 rounded-full border border-[#C9AF7C]/30 text-xs font-mono tracking-widest uppercase text-[#F0F0F0] hover:text-[#0A0A0A] [--circle-bg:#C9AF7C] transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span className="z-10">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform z-10" />
          </button>
        </div>
      </div>
    </footer>
  );
}

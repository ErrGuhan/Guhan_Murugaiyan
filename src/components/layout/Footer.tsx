"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#090a0e] text-white border-t border-white/10 px-6 md:px-12 py-10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Side: Cursive Signature & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-script text-3xl sm:text-4xl text-[#E5C583]">
            guhan
          </span>
          <p className="text-xs font-mono text-neutral-400">
            © 2026 Guhan Murugaiyan. All rights reserved.
          </p>
        </div>

        {/* Right Side: Back to Top */}
        <div>
          <button
            onClick={scrollToTop}
            className="px-5 py-2.5 rounded-full border border-white/15 hover:border-[#D4AF37] hover:text-[#FFDF73] text-xs font-mono tracking-widest uppercase transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}

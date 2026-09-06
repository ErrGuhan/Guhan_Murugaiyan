"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B0B0F] text-white border-t-[3px] border-black px-6 md:px-12 py-10 select-none bg-halftone-dark relative">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Side: Manga Volume Fin Stamp & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FFE600] text-black font-display font-black text-sm border-[2px] border-black shadow-[2px_2px_0px_#000000] -rotate-2">
              FIN
            </span>
            <span className="font-display font-black text-xl text-white tracking-wider">
              TO BE CONTINUED...
            </span>
          </div>
          <p className="text-xs font-mono text-neutral-400">
            © 2026 Guhan Murugaiyan. All rights reserved.
          </p>
        </div>

        {/* Right Side: Back to Top with Comic Button */}
        <div>
          <button
            onClick={scrollToTop}
            className="comic-btn px-5 py-2.5 rounded-xl bg-[#FFE600] text-black font-mono font-black text-xs tracking-widest uppercase flex items-center gap-2 hover:bg-[#00F0FF]"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </footer>
  );
}

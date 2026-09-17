import Link from "next/link";
import { ArrowLeft, Compass, ShieldAlert, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 sm:p-12 bg-[#0B0B0F] text-white bg-halftone-dark overflow-hidden select-none">
      {/* Film grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Comic Anomaly Card */}
      <div className="relative z-10 w-full max-w-xl comic-card rounded-3xl bg-[#13131A] border-[3px] border-black shadow-[8px_8px_0px_#000000] p-6 sm:p-10 flex flex-col items-center text-center">
        {/* Top Status Header */}
        <div className="w-full flex items-center justify-between pb-4 mb-6 border-b-[2.5px] border-black">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FF2A55] text-white border-[2px] border-black shadow-[2px_2px_0px_#000000] text-[11px] font-mono font-black tracking-wider uppercase">
            <ShieldAlert className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>SECTOR VOID</span>
          </div>

          <span className="font-mono text-xs text-[#FFE600] font-black tracking-widest uppercase">
            [ERR // 404_PAGE_MISSING]
          </span>
        </div>

        {/* Comic Glitch Title */}
        <div className="relative my-2">
          <span className="inline-block px-3.5 py-1 rounded-lg bg-[#00F0FF] text-black border-[2px] border-black shadow-[3px_3px_0px_#000000] text-xs font-mono font-black uppercase mb-3 -rotate-1">
            MISSION INTERRUPTED
          </span>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white drop-shadow-[5px_5px_0px_#000000] leading-none">
            ARC NOT FOUND <span className="text-[#FFE600] block mt-1">{"// 404"}</span>
          </h1>
        </div>

        {/* Comic Monologue Dialogue Box */}
        <div className="w-full my-6 p-4 sm:p-5 rounded-2xl bg-[#1A1A24] border-[2.5px] border-black shadow-[4px_4px_0px_#000000] text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFE600] border border-black" />
            <span className="text-[10px] font-mono font-black tracking-widest text-neutral-400 uppercase">
              TRANSMISSION LOG · REASON
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-200 font-mono leading-relaxed">
            The coordinates you navigated to do not exist in this mission arc. The page may have been
            decommissioned, restructured, or lost in a warp anomaly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full pt-2">
          <Link
            href="/"
            className="comic-btn px-6 py-3.5 rounded-xl bg-[#FFE600] text-black font-mono font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-[#00F0FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>RETURN TO BASE</span>
          </Link>

          <Link
            href="/#projects"
            className="comic-btn px-5 py-3.5 rounded-xl bg-[#1C1C26] text-white border-[2.5px] border-black shadow-[4px_4px_0px_#000000] font-mono font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-white hover:text-black transition-colors"
          >
            <Compass className="w-4 h-4 stroke-[2.5]" />
            <span>CASE STUDIES</span>
          </Link>
        </div>

        {/* Bottom Comic Footer Note */}
        <div className="mt-8 pt-4 border-t-[2px] border-black/50 w-full flex items-center justify-center gap-2 text-[10px] font-mono font-black text-neutral-500 uppercase">
          <Sparkles className="w-3 h-3 text-[#FFE600]" />
          <span>GUHAN MURUGAIYAN · ARC &apos;26 SYSTEM</span>
        </div>
      </div>
    </main>
  );
}

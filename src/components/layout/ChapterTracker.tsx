"use client";

import { useState, useEffect } from "react";
import { playHoverTick } from "@/lib/sound-effects";

interface Chapter {
  id: string;
  num: string;
  name: string;
}

const CHAPTERS: Chapter[] = [
  { id: "hero", num: "01", name: "HERO ARC" },
  { id: "about", num: "02", name: "ORIGIN & EXP" },
  { id: "expertise", num: "03", name: "ARSENAL" },
  { id: "credentials", num: "04", name: "VERIFIED CREDS" },
  { id: "projects", num: "05", name: "CASE STUDIES" },
  { id: "contact", num: "06", name: "TRANSMISSION" },
];

export default function ChapterTracker() {
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(CHAPTERS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="Chapter Progress Tracker"
      className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-2.5 select-none"
    >
      <div className="text-[9px] font-mono font-black text-neutral-400 tracking-widest uppercase mb-1 pr-1 rotate-90 origin-bottom-right">
        {"// MISSION RADAR"}
      </div>

      {CHAPTERS.map((ch) => {
        const isActive = activeId === ch.id;
        return (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            onClick={() => playHoverTick()}
            className={`comic-card group flex items-center gap-2 px-2.5 py-1 rounded-xl transition-all duration-300 border-[2px] border-black ${
              isActive
                ? "bg-[#FFE600] text-black shadow-[3px_3px_0px_#000000] scale-105"
                : "bg-[#14141E]/90 text-neutral-300 shadow-[2px_2px_0px_#000000] hover:bg-white hover:text-black"
            }`}
          >
            <span className="font-mono text-[10px] font-black tracking-wider">
              {ch.num}
            </span>
            <span
              className={`font-mono text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? "inline-block max-w-[120px] opacity-100"
                  : "max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 overflow-hidden"
              }`}
            >
              {ch.name}
            </span>
          </a>
        );
      })}
    </aside>
  );
}

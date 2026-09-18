"use client";

import { useEffect, useState, useRef } from "react";
import { Trophy, X, Zap } from "lucide-react";
import { playSuccessChime } from "@/lib/sound-effects";

interface AchievementDetail {
  title: string;
  desc: string;
  xp?: string;
}

export default function AchievementToast() {
  const [achievement, setAchievement] = useState<AchievementDetail | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleAchievement = (e: Event) => {
      const customEvent = e as CustomEvent<AchievementDetail>;
      if (!customEvent.detail) return;

      playSuccessChime();
      setAchievement(customEvent.detail);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setAchievement(null);
      }, 5500);
    };

    window.addEventListener("achievement-unlocked", handleAchievement);
    return () => {
      window.removeEventListener("achievement-unlocked", handleAchievement);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!achievement) return null;

  return (
    <aside
      aria-label="Achievement notification"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 max-w-sm w-auto sm:w-[calc(100vw-3rem)] sm:max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-300"
    >
      <div className="relative rounded-2xl bg-[#13131A] border-[3px] border-black shadow-[6px_6px_0px_#000000] overflow-hidden">
        {/* Banner Header */}
        <div className="bg-[#FFE600] px-4 py-2 border-b-[3px] border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-black fill-black" />
            <span className="font-mono text-xs font-black tracking-widest text-black uppercase">
              ACHIEVEMENT UNLOCKED!
            </span>
          </div>
          <button
            onClick={() => setAchievement(null)}
            aria-label="Close notification"
            className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center hover:bg-[#FF2A55] transition-colors"
          >
            <X className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#00F0FF] border-[2px] border-black shadow-[2px_2px_0px_#000000] flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-black fill-black" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-syne text-sm font-black uppercase text-white tracking-wide truncate">
                {achievement.title}
              </h4>
              {achievement.xp && (
                <span className="px-2 py-0.5 rounded-md bg-[#00E676] text-black border border-black font-mono font-black text-[10px] tracking-wider">
                  {achievement.xp}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-neutral-300 font-sans leading-snug">
              {achievement.desc}
            </p>
          </div>
        </div>

        {/* Comic Progress Bar Footer */}
        <div className="h-1.5 w-full bg-black">
          <div className="h-full bg-[#00F0FF] animate-[marquee-left_5.5s_linear_infinite]" />
        </div>
      </div>
    </aside>
  );
}

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { playBattleSiren } from "@/lib/sound-effects";
import { ShieldAlert, Zap, X } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function BattleModeManager() {
  const [isActive, setIsActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(8);
  const keySequence = useRef<string[]>([]);
  const countdownTimer = useRef<NodeJS.Timeout | null>(null);

  const disengageBattleMode = useCallback(() => {
    setIsActive(false);
    document.documentElement.classList.remove("battle-mode");
    if (countdownTimer.current) clearInterval(countdownTimer.current);
  }, []);

  const triggerBattleMode = useCallback(() => {
    setIsActive(true);
    setSecondsRemaining(8);
    document.documentElement.classList.add("battle-mode");
    playBattleSiren();

    window.dispatchEvent(
      new CustomEvent("achievement-unlocked", {
        detail: {
          title: "BATTLE OVERDRIVE UNLOCKED",
          desc: "Konami protocol override engaged! All reactors operating at 200% capacity.",
          xp: "+1,000 XP",
        },
      })
    );

    if (countdownTimer.current) clearInterval(countdownTimer.current);
    countdownTimer.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          disengageBattleMode();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [disengageBattleMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore inputs in text boxes or textareas
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") {
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = KONAMI_CODE[keySequence.current.length];

      if (key === expectedKey || (expectedKey.length === 1 && key.toLowerCase() === expectedKey)) {
        keySequence.current.push(key);
        if (keySequence.current.length === KONAMI_CODE.length) {
          triggerBattleMode();
          keySequence.current = [];
        }
      } else {
        // Reset or restart sequence if first key matches
        if (key === "ArrowUp") {
          keySequence.current = ["ArrowUp"];
        } else {
          keySequence.current = [];
        }
      }
    };

    const handleCustomTrigger = () => {
      triggerBattleMode();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("trigger-battle-mode", handleCustomTrigger);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("trigger-battle-mode", handleCustomTrigger);
      if (countdownTimer.current) clearInterval(countdownTimer.current);
      document.documentElement.classList.remove("battle-mode");
    };
  }, [triggerBattleMode]);

  if (!isActive) return null;

  return (
    <aside
      aria-label="Battle Mode HUD indicator"
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[calc(100vw-2rem)] w-max"
    >
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-[#FF2A55] text-white border-[3px] border-black shadow-[4px_4px_0px_#000000] sm:shadow-[5px_5px_0px_#000000] rounded-xl animate-pulse">
        <ShieldAlert className="w-4 sm:w-5 h-4 sm:h-5 fill-white text-black flex-shrink-0 animate-spin" />
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="font-mono text-[10px] sm:text-xs md:text-sm font-black tracking-wider sm:tracking-widest uppercase truncate">
            ⚠️ BATTLE MODE // REVERTING IN {secondsRemaining}S
          </span>
          <Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#FFE600] fill-[#FFE600] flex-shrink-0" />
        </div>
        <button
          onClick={disengageBattleMode}
          aria-label="Disengage Battle Mode"
          className="ml-1 sm:ml-2 w-6 h-6 rounded-md bg-black text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center font-mono font-black text-xs flex-shrink-0"
        >
          <X className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      </div>
    </aside>
  );
}

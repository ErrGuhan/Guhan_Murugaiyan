"use client";

import { useEffect, useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-white/10 px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-xs font-mono text-neutral-400">
        {/* Brand statement */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <span>GUHAN MURUGAIYAN · ARCHITECT & DEVELOPER</span>
        </div>

        {/* Live Clock Ticker */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-500 uppercase">LOCAL TIME (IST):</span>
          <span className="text-white font-bold tracking-widest min-w-[85px]">
            {timeString || "12:00:00 AM"}
          </span>
        </div>

        {/* Back to Top */}
        <div>
          <MagneticButton onClick={scrollToTop} strength={0.3}>
            <span className="px-4 py-2 rounded-full border border-white/10 hover:border-[#D4AF37] hover:text-[#FFDF73] transition-all flex items-center gap-1.5 uppercase">
              BACK TO TOP <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}

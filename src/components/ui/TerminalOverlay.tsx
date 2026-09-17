"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, Terminal } from "lucide-react";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string;
}

const ASCII_BANNER = `
 ██████╗ ██╗   ██╗██╗  ██╗ █████╗ ███╗   ██╗
██╔════╝ ██║   ██║██║  ██║██╔══██╗████╗  ██║
██║  ███╗██║   ██║███████║███████║██╔██╗ ██║
██║   ██║██║   ██║██╔══██║██╔══██║██║╚██╗██║
╚██████╔╝╚██████╔╝██║  ██║██║  ██║██║ ╚████║
 ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
`.trim();

const COMMANDS: Record<string, () => string[]> = {
  whoami: () => [
    "┌─────────────────────────────────────────┐",
    "│  GUHAN MURUGAIYAN // AI & SYSTEMS ENG   │",
    "└─────────────────────────────────────────┘",
    "",
    "  B.Tech CSE (2024–2028) · Tamil Nadu, India",
    "  Building autonomous multi-agent networks,",
    "  concurrent Java backends, and high-throughput",
    "  data workflows that scale without intervention.",
    "",
    "  NSS Representative · Production-Grade Craft",
    "  Currently: Data Analyst @ NoviTech R&D Pvt Ltd",
  ],
  skills: () => [
    "┌─ TECH STACK ──────────────────────────────┐",
    "│                                           │",
    "│  ⚡ AGENTIC AI    LLM Orchestration       │",
    "│  ☕ JAVA 21       Spring Boot             │",
    "│  ⚛  NEXT.JS 16   React 19 / TypeScript   │",
    "│  🗄  PostgreSQL   Supabase / Prisma ORM   │",
    "│  🎨 Three.js     GSAP / Lenis / CSS       │",
    "│  🔧 Git          Vercel / CI-CD           │",
    "│                                           │",
    "└───────────────────────────────────────────┘",
  ],
  projects: () => [
    "┌─ SELECTED WORK ───────────────────────────────────────────┐",
    "│                                                           │",
    "│  01. CampusCart01     → campus-cart01.vercel.app         │",
    "│      Next.js · Supabase · Admin verification workflow    │",
    "│                                                           │",
    "│  02. PersonalTracker  → personaltracker-psi.vercel.app   │",
    "│      Next.js · Supabase · Habit & productivity metrics   │",
    "│                                                           │",
    "│  03. TransferHub      → transfer-hub-neon.vercel.app     │",
    "│      Java 21 · Spring Boot · Banking transfer UI         │",
    "│                                                           │",
    "│  04. JanaFibreGlass   → janafibre.vercel.app             │",
    "│      React 19 · Three.js · 3D parametric configurator    │",
    "│                                                           │",
    "│  05. TharikaDecors    → tharikadecors.vercel.app         │",
    "│      Next.js · Prisma · Luxury event styling platform    │",
    "│                                                           │",
    "└───────────────────────────────────────────────────────────┘",
    "",
    "  Type a URL to visit, or scroll to #work for interactive cards.",
  ],
  contact: () => [
    "┌─ CONTACT ─────────────────────────────────┐",
    "│                                           │",
    "│  EMAIL    mguhan6383@gmail.com            │",
    "│  LINKEDIN /in/guhanmurugaiyan             │",
    "│  GITHUB   github.com/ErrGuhan             │",
    "│  LOCATION Vanur, Tamil Nadu, India        │",
    "│  TIMEZONE IST (UTC+5:30)                  │",
    "│                                           │",
    "└───────────────────────────────────────────┘",
    "",
    '  Or scroll to #contact to send a message directly.',
  ],
  "sudo hire-me": () => [
    "",
    "  [sudo] password for root: ••••••••••••",
    "  Authenticating...",
    "  ✓ Access granted. Initiating HIRE protocol.",
    "",
    "  ██╗  ██╗██╗██████╗ ███████╗██████╗     ██╗",
    "  ██║  ██║██║██╔══██╗██╔════╝██╔══██╗    ██║",
    "  ███████║██║██████╔╝█████╗  ██║  ██║    ██║",
    "  ██╔══██║██║██╔══██╗██╔══╝  ██║  ██║    ╚═╝",
    "  ██║  ██║██║██║  ██║███████╗██████╔╝    ██╗",
    "  ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═════╝     ╚═╝",
    "",
    "  Sending offer letter to mguhan6383@gmail.com...",
    "  +1000 XP · ACHIEVEMENT UNLOCKED: HIRED",
    "",
    '  (Just kidding — but seriously, reach out! → #contact)',
  ],
  help: () => [
    "┌─ AVAILABLE COMMANDS ──────────────────────┐",
    "│                                           │",
    "│  whoami        Short bio & background     │",
    "│  skills        Tech stack & capabilities  │",
    "│  projects      Live projects & links      │",
    "│  contact       Email, LinkedIn, GitHub    │",
    "│  sudo hire-me  🚀 Try it...               │",
    "│  clear         Clear the terminal         │",
    "│  exit          Close this terminal        │",
    "│  help          Show this help menu        │",
    "│                                           │",
    "│  ↑ / ↓         Navigate command history   │",
    "│                                           │",
    "└───────────────────────────────────────────┘",
  ],
};

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TerminalOverlay({ isOpen, onClose }: TerminalOverlayProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Boot sequence lines
  const bootLines: TerminalLine[] = [
    { type: "system", content: ASCII_BANNER },
    { type: "system", content: "" },
    { type: "system", content: "  GUHAN MURUGAIYAN PORTFOLIO v2026 — INTERACTIVE TERMINAL" },
    { type: "system", content: '  Type "help" for available commands. Press ESC or type "exit" to close.' },
    { type: "system", content: "" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Save previous focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Initialize with boot lines
      setLines(bootLines);
      setInputValue("");
      setHistory([]);
      setHistoryIndex(-1);

      // Stop Lenis scroll
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      lenis?.stop();

      // Focus input
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    } else {
      // Restore Lenis
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      lenis?.start();
      // Restore focus
      previousFocusRef.current?.focus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Scroll to bottom on new lines
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Keep focus inside — Tab cycles back to input
      if (e.key === "Tab") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const executeCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Add to history
    setHistory((prev) => [raw.trim(), ...prev].slice(0, 50));
    setHistoryIndex(-1);

    // Echo input
    setLines((prev) => [...prev, { type: "input", content: `$ ${raw.trim()}` }]);

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (cmd === "exit") {
      setLines((prev) => [...prev, { type: "system", content: "  Closing terminal. Goodbye! 👋" }]);
      setTimeout(onClose, 600);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      const outputLines = handler();
      setLines((prev) => [
        ...prev,
        ...outputLines.map((l) => ({ type: "output" as const, content: l })),
        { type: "output", content: "" },
      ]);
    } else {
      setLines((prev) => [
        ...prev,
        { type: "error", content: `  bash: ${raw.trim()}: command not found` },
        { type: "error", content: '  Type "help" for available commands.' },
        { type: "output", content: "" },
      ]);
    }
  }, [onClose]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
      setInputValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIndex((prev) => {
        const next = Math.min(prev + 1, history.length - 1);
        setInputValue(history[next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIndex((prev) => {
        const next = Math.max(prev - 1, -1);
        setInputValue(next === -1 ? "" : history[next] ?? "");
        return next;
      });
    }
  };

  if (!isMounted) return null;
  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Terminal"
      className="fixed inset-0 z-[99980] flex flex-col bg-black"
      style={{ fontFamily: "var(--font-mono), 'JetBrains Mono', monospace" }}
    >
      {/* Terminal Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0A0A0A] border-b-[3px] border-[#FFE600] flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Mac-style traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF2A55] border border-black" />
            <div className="w-3 h-3 rounded-full bg-[#FFE600] border border-black" />
            <div className="w-3 h-3 rounded-full bg-[#00E676] border border-black" />
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#FFE600]" />
            <span className="text-[#FFE600] font-mono text-xs font-black tracking-widest uppercase">
              GUHAN@PORTFOLIO:~$
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-[10px] font-mono text-neutral-500 font-bold tracking-wider uppercase">
            [ ESC or type &quot;exit&quot; to close ]
          </span>
          <button
            onClick={onClose}
            aria-label="Close terminal"
            className="comic-btn w-8 h-8 rounded-lg bg-[#FF2A55] text-white border-[2px] border-black flex items-center justify-center hover:bg-[#FFE600] hover:text-black transition-colors"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Output Area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-0.5 no-scrollbar"
        onClick={() => inputRef.current?.focus()}
        aria-live="polite"
        aria-atomic="false"
      >
        {lines.map((line, i) => (
          <pre
            key={i}
            className={`font-mono text-[11px] sm:text-xs leading-relaxed whitespace-pre-wrap break-words ${
              line.type === "input"
                ? "text-[#FFE600] font-bold"
                : line.type === "error"
                ? "text-[#FF2A55] font-bold"
                : line.type === "system"
                ? "text-[#00F0FF]"
                : "text-[#00E676]"
            }`}
          >
            {line.content}
          </pre>
        ))}
      </div>

      {/* Input Row */}
      <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-t-[3px] border-[#FFE600] bg-[#0A0A0A] flex-shrink-0">
        <span className="text-[#FFE600] font-mono text-xs font-black tracking-wider flex-shrink-0">
          GUHAN@PORTFOLIO:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal command input"
          className="flex-1 bg-transparent text-white font-mono text-xs font-bold outline-none caret-[#FFE600] placeholder:text-neutral-600"
          placeholder='type a command or "help"'
        />
        {/* Blinking cursor block */}
        <span
          aria-hidden="true"
          className="w-2 h-4 bg-[#FFE600] animate-[blink_1s_step-end_infinite] flex-shrink-0"
        />
      </div>
    </div>
  );
}

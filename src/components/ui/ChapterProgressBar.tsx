"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const emptySubscribe = () => () => {};

export default function ChapterProgressBar() {
  const [progress, setProgress] = useState(0);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {

    const updateProgress = (scrollY: number) => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      setProgress(pct);
    };

    // Try to hook into Lenis scroll events first
    const tryLenis = () => {
      const lenis = (
        window as unknown as {
          __lenis?: {
            on: (
              event: string,
              cb: (data: { scroll: number }) => void
            ) => void;
            off: (
              event: string,
              cb: (data: { scroll: number }) => void
            ) => void;
            scroll: number;
          };
        }
      ).__lenis;

      if (lenis) {
        const onScroll = (data: { scroll: number }) => {
          updateProgress(data.scroll);
        };
        lenis.on("scroll", onScroll);
        // Set initial value
        updateProgress(lenis.scroll ?? window.scrollY);
        return () => lenis.off("scroll", onScroll);
      }
      return null;
    };

    // Lenis may not be initialized at mount time (SmoothScroll sets it up asynchronously)
    // Try immediately, then fall back to a raw listener + retry
    const cleanup = tryLenis();
    if (cleanup) return cleanup;

    // Fallback: raw scroll listener, also retry for Lenis after 500ms
    const handleRawScroll = () => updateProgress(window.scrollY);
    window.addEventListener("scroll", handleRawScroll, { passive: true });
    updateProgress(window.scrollY);

    const retryTimer = setTimeout(() => {
      const lenisCleanup = tryLenis();
      if (lenisCleanup) {
        // Lenis is now available; remove the raw listener
        window.removeEventListener("scroll", handleRawScroll);
      }
    }, 500);

    return () => {
      clearTimeout(retryTimer);
      window.removeEventListener("scroll", handleRawScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="xp-bar-track"
      aria-hidden="true"
      role="presentation"
      title={`Page progress: ${Math.round(progress)}%`}
    >
      <div
        className="xp-bar-fill"
        style={{
          width: `${progress}%`,
          // Skip transition animation if reduced motion
          transition: prefersReducedMotion ? "none" : undefined,
        }}
      />
    </div>
  );
}

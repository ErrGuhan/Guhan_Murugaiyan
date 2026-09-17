"use client";

import { useEffect, useRef } from "react";

/**
 * Custom hook to execute a callback throttled by requestAnimationFrame on window scroll events.
 * Prevents unnecessary re-renders or heavy computations from running more than once per browser animation frame.
 *
 * @param callback Function called with current window.scrollY on each throttled scroll frame.
 * @param triggerInitial Whether to immediately invoke the callback once on mount.
 */
export function useThrottledScroll(
  callback: (scrollY: number) => void,
  triggerInitial = false
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          callbackRef.current(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (triggerInitial) {
      handleScroll();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [triggerInitial]);
}

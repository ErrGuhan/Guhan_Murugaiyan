"use client";

import { useState, useEffect } from "react";

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Sync initial state on mount in case SSR differed
    setPrefersReducedMotion(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      // Compatibility fallback for older browsers
      (mediaQueryList as unknown as { addListener: (cb: typeof listener) => void }).addListener(listener);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        (mediaQueryList as unknown as { removeListener: (cb: typeof listener) => void }).removeListener(listener);
      }
    };
  }, []);

  return prefersReducedMotion;
}

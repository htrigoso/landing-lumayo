"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query. Returns `false` on the server and during hydration,
 * so markup that depends on it must render a safe default first.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Touch-first devices (phones, tablets): skip heavy per-frame effects there. */
export const useCoarsePointer = () => useMediaQuery("(pointer: coarse)");

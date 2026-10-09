"use client";

import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

// three.js is only downloaded when a LiveLines block first scrolls near the viewport.
const FloatingLines = dynamic(() => import("@/components/reactbits/FloatingLines"), { ssr: false });

const brandGradient = ["#19b2d6", "#7fd6ec", "#0b3a66"];
const waves: Array<"top" | "middle" | "bottom"> = ["top", "middle", "bottom"];
const counts = [4, 6, 4];
const distances = [6, 4, 7];

/**
 * Animated WebGL lines in the brand colors. Mounts only while visible (the renderer is
 * disposed when it leaves the viewport) and falls back to the static wash for reduced motion.
 */
export function LiveLines({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-auto absolute inset-0 bg-white ${className}`}>
      {inView && !reduceMotion && (
        <FloatingLines
          lightMode
          linesGradient={brandGradient}
          enabledWaves={waves}
          lineCount={counts}
          lineDistance={distances}
          animationSpeed={0.6}
          bendRadius={4}
          bendStrength={-0.4}
          parallaxStrength={0.12}
        />
      )}
    </div>
  );
}

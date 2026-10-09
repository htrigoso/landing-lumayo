"use client";

import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useCoarsePointer } from "@/lib/useMediaQuery";

// three.js is only downloaded when a LiveLines block first scrolls near the viewport.
const FloatingLines = dynamic(() => import("@/components/reactbits/FloatingLines"), { ssr: false });

const lightGradient = ["#2ac8e1", "#85cedf", "#024474"];
// On Azul profundo the lines glow (screen blend) in the manual's light blues.
const darkGradient = ["#2ac8e1", "#85cedf", "#02acb5"];
const waves: Array<"top" | "middle" | "bottom"> = ["top", "middle", "bottom"];
const counts = [4, 6, 4];
const distances = [6, 4, 7];


/** Static stand-in for the animated lines, drawn once as SVG. */
function StaticLines({ tone }: { tone: "light" | "dark" }) {
  const colors = tone === "light" ? lightGradient : darkGradient;
  return (
    <svg viewBox="0 0 400 800" preserveAspectRatio="none" className="absolute inset-0 size-full opacity-60">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M-20 ${180 + i * 26} C 120 ${80 + i * 30}, 260 ${320 + i * 18}, 420 ${150 + i * 28}`}
          fill="none"
          stroke={colors[i % colors.length]}
          strokeWidth="1.2"
          strokeOpacity={0.5 - i * 0.05}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={`b${i}`}
          d={`M-20 ${560 + i * 30} C 140 ${660 + i * 20}, 240 ${470 + i * 26}, 420 ${600 + i * 22}`}
          fill="none"
          stroke={colors[(i + 1) % colors.length]}
          strokeWidth="1.2"
          strokeOpacity={0.4 - i * 0.06}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/**
 * Animated WebGL lines in the brand colors. Mounts only while visible (the renderer is
 * disposed when it leaves the viewport). Touch devices and reduced motion get static SVG lines.
 */
export function LiveLines({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });
  const reduceMotion = useReducedMotion();
  // Touch devices get static lines: a full-screen shader every frame makes phone scrolling stutter.
  const coarse = useCoarsePointer();

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-auto absolute inset-0 ${tone === "light" ? "bg-white" : ""} ${className}`}>
      {(coarse || reduceMotion) && <StaticLines tone={tone} />}
      {inView && !reduceMotion && !coarse && (
        <FloatingLines
          lightMode={tone === "light"}
          mixBlendMode="screen"
          linesGradient={tone === "light" ? lightGradient : darkGradient}
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

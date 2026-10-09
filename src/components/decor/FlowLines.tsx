"use client";

import { motion } from "motion/react";

const ease = [0.65, 0, 0.35, 1] as const;

type FlowLinesProps = {
  className?: string;
  /** Mirror horizontally so the sweep runs the other way. */
  flip?: boolean;
  /** "light" for pale backgrounds, "dark" for navy ones. */
  tone?: "light" | "dark";
};

/**
 * Thin sweeping brand lines (as in the Lumayo artwork) that draw themselves the first
 * time they scroll into view. Purely decorative.
 */
export function FlowLines({ className = "", flip = false, tone = "light" }: FlowLinesProps) {
  const thread = tone === "light" ? "#0b3a66" : "#7fd6ec";
  const accent = tone === "light" ? "#19b2d6" : "#3fc1e0";
  const band = tone === "light" ? "#7fd6ec" : "#19b2d6";
  // On navy the lines need more presence to read as clearly as on light backgrounds.
  const o = tone === "light" ? { band: 0.18, thread: 0.28, accent: 0.45 } : { band: 0.22, thread: 0.55, accent: 0.75 };

  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 2.4, ease, delay },
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 240"
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none ${flip ? "-scale-x-100" : ""} ${className}`}
    >
      <motion.path {...draw(0)} d="M-20 190 C 300 40, 620 230, 940 120 S 1300 30, 1460 70" stroke={band} strokeOpacity={o.band} strokeWidth="34" strokeLinecap="round" />
      <motion.path {...draw(0.2)} d="M-20 170 C 320 30, 640 210, 960 104 S 1310 20, 1460 54" stroke={thread} strokeOpacity={o.thread} strokeWidth="1.4" />
      <motion.path {...draw(0.35)} d="M-20 206 C 280 70, 600 246, 920 140 S 1290 50, 1460 92" stroke={accent} strokeOpacity={o.accent} strokeWidth="1.6" />
    </svg>
  );
}

"use client";

import { motion } from "motion/react";
import { useId } from "react";

type RibbonsProps = {
  /** Which edge the ribbons sweep along. */
  side?: "left" | "right";
  className?: string;
  delay?: number;
};

const ease = [0.65, 0, 0.35, 1] as const;

/**
 * Brand ribbons from the Lumayo artwork: wide translucent cyan bands with a thin navy
 * thread. They draw themselves in, then drift slowly. Purely decorative.
 */
export function Ribbons({ side = "right", className = "", delay = 0 }: RibbonsProps) {
  const uid = `rb${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const flip = side === "left" ? "scale(-1 1) translate(-600 0)" : undefined;
  const draw = (d: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 2.2, ease, delay: delay + d },
  });

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 600 900"
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none ${className}`}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id={`${uid}-a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fd6ec" stopOpacity="0" />
          <stop offset="35%" stopColor="#7fd6ec" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#19b2d6" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={`${uid}-b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8e9f5" stopOpacity="0.1" />
          <stop offset="60%" stopColor="#3fc1e0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#c8e9f5" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform={flip}>
        <motion.path
          {...draw(0)}
          d="M430 -40 C 400 160, 610 300, 590 500 S 470 760, 560 960"
          stroke={`url(#${uid}-a)`}
          strokeWidth="70"
          strokeLinecap="round"
        />
        <motion.path
          {...draw(0.25)}
          d="M520 -40 C 470 200, 650 380, 620 560 S 520 800, 600 960"
          stroke={`url(#${uid}-b)`}
          strokeWidth="38"
          strokeLinecap="round"
        />
        <motion.path
          {...draw(0.4)}
          d="M400 -40 C 380 170, 600 320, 575 510 S 440 770, 520 960"
          stroke="#0b3a66"
          strokeOpacity="0.55"
          strokeWidth="1.6"
        />
        <motion.path
          {...draw(0.55)}
          d="M470 -40 C 440 190, 640 360, 612 545 S 500 790, 585 960"
          stroke="#0a7699"
          strokeOpacity="0.35"
          strokeWidth="1.2"
        />
      </g>
    </motion.svg>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

const SEAL_TEXT = "LUMAYO · CENTRO ODONTOLÓGICO · TARAPOTO · ";
const RADIUS = 74;

/**
 * Circular brand seal (replaces the reference's "15+ years" badge with a true statement):
 * the name runs around the white isotype on an Azul profundo disc and turns slowly.
 */
export function BrandSeal({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const pathId = `seal-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  // Position comes from the caller (e.g. "absolute ..."), so there is no base positioning here
  return (
    <div className={`grid aspect-square place-items-center rounded-full bg-navy-700 ring-[6px] ring-white ${className}`}>
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id={pathId} d={`M 100 ${100 - RADIUS} a ${RADIUS} ${RADIUS} 0 1 1 0 ${RADIUS * 2} a ${RADIUS} ${RADIUS} 0 1 1 0 ${-RADIUS * 2}`} />
        </defs>
        <text fill="#fff" fontSize="12.5" fontWeight="500" letterSpacing="1.5">
          {/* textLength makes the phrase close the circle exactly */}
          <textPath href={`#${pathId}`} textLength={2 * Math.PI * RADIUS - 2} lengthAdjust="spacing">
            {SEAL_TEXT}
          </textPath>
        </text>
      </motion.svg>
      {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG */}
      <img src="/brand/lumayo-isotipo-white.svg" alt="" aria-hidden="true" className="relative w-[36%]" />
      <span className="sr-only">Lumayo, centro odontológico en Tarapoto</span>
    </div>
  );
}

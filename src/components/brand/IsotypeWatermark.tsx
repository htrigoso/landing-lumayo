type IsotypeWatermarkProps = {
  className?: string;
  tone?: "light" | "dark";
  /** Turns and drifts slightly while a parent `.group` is hovered (cards). */
  animated?: boolean;
};

/**
 * Large, faint crop of the Lumayo isotype used as a background pattern, as on the
 * brandbook's letterhead, ID badges and social posts. Decorative only. Uses the original vector.
 * Tailwind v4 rotate/translate utilities use the standalone `rotate`/`translate` properties,
 * so those (not `transform`) are the ones transitioned.
 */
export function IsotypeWatermark({ className = "", tone = "light", animated = false }: IsotypeWatermarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative SVG, no optimization needed
    <img
      src={tone === "dark" ? "/brand/lumayo-isotipo-white.svg" : "/brand/lumayo-isotipo.svg"}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none absolute select-none ${tone === "dark" ? "opacity-[0.07]" : "opacity-[0.06]"} ${
        animated
          ? "transition-[translate,rotate,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:-rotate-6"
          : ""
      } ${className}`}
    />
  );
}

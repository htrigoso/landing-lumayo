/**
 * Large, faint crop of the Lumayo isotype used as a background pattern, as on the
 * manual's letterhead and business card. Decorative only. Uses the original vector.
 */
export function IsotypeWatermark({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative SVG, no optimization needed
    <img
      src={tone === "dark" ? "/brand/lumayo-isotipo-white.svg" : "/brand/lumayo-isotipo.svg"}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none absolute select-none ${tone === "dark" ? "opacity-[0.07]" : "opacity-[0.06]"} ${className}`}
    />
  );
}

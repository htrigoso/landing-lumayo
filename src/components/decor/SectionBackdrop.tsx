type Corner = "tl" | "tr" | "bl" | "br";

type SectionBackdropProps = {
  /** Corner the flowing lines sweep through. */
  lines?: Corner;
  /** Corner the soft tonal light sits in. */
  glow?: Corner;
  /** Background the section sits on: white, light mist, or a deep brand blue (white lines, darker light). */
  surface?: "white" | "mist" | "deep";
};

// One corner drawing, anchored flush to the corner and mirrored for the other three
const linePlacement: Record<Corner, string> = {
  tl: "left-0 top-0",
  tr: "right-0 top-0 -scale-x-100",
  bl: "bottom-0 left-0 -scale-y-100",
  br: "bottom-0 right-0 -scale-100",
};

const glowPlacement: Record<Corner, string> = {
  tl: "-left-56 -top-56",
  tr: "-right-56 -top-56",
  bl: "-bottom-56 -left-56",
  br: "-bottom-56 -right-56",
};

/**
 * Three parallel strokes that sweep like the crown contour of the isotype. Each one enters
 * through the side edge and leaves through the top edge, so it stays in the corner yet
 * never ends in mid-air.
 */
const curves = [0, 1, 2].map(
  (i) =>
    `M -20 ${330 - i * 38} C ${90 + i * 6} ${250 - i * 34}, ${150 + i * 4} ${130 - i * 26}, ${290 - i * 24} ${95 - i * 22} S ${470 - i * 40} ${60 - i * 20}, ${560 - i * 48} -20`,
);

/**
 * Quiet section background from the brandbook: thin flowing lines (letterhead and social
 * pieces) plus a soft tonal light (web mockup). Static SVG and CSS only, so it costs nothing
 * while scrolling. The section must be `relative isolate overflow-hidden`.
 */
export function SectionBackdrop({ lines, glow, surface = "white" }: SectionBackdropProps) {
  const glowColor =
    surface === "white" ? "var(--color-sky-100)" : surface === "mist" ? "var(--color-celeste-100)" : "var(--color-navy-700)";
  const lineColor = surface === "deep" ? "#fff" : "var(--color-navy-700)";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {glow && (
        <div
          className={`absolute size-[38rem] rounded-full opacity-80 ${glowPlacement[glow]}`}
          style={{ background: `radial-gradient(closest-side, ${glowColor}, transparent)` }}
        />
      )}
      {lines && (
        <svg viewBox="0 0 600 400" fill="none" className={`absolute w-[22rem] sm:w-[32rem] lg:w-[38rem] ${linePlacement[lines]}`}>
          {curves.map((d, i) => (
            <path
              key={d}
              d={d}
              stroke={lineColor}
              strokeOpacity={0.14 - i * 0.03}
              strokeWidth={1.25}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      )}
    </div>
  );
}

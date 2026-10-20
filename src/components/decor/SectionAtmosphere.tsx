import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { SectionBackdrop } from "./SectionBackdrop";

type Corner = "tl" | "tr" | "bl" | "br";
type Tone = "white" | "mist";

type SectionAtmosphereProps = {
  /** Corner the flowing lines sweep through. */
  lines?: Corner;
  /** Corner the soft tonal light sits in. */
  glow?: Corner;
  /** Corner the large faint isotype is cropped into. Omit for no isotype. */
  isotype?: "bl" | "br";
  /** Base tone of the section body. */
  tone?: Tone;
  /** Colour the gradient starts from at the top edge. */
  washTop?: Tone;
  /** Colour the gradient ends on at the bottom edge. */
  washBottom?: Tone;
};

type Colour = string;

const edge: Record<Tone, Colour> = {
  white: "var(--color-bg)",
  mist: "var(--color-surface)",
};

// Light veil used behind the flowing lines on white sections
const tintWhite: Colour = "color-mix(in srgb, var(--color-surface) 45%, transparent)";

/** Halfway colour between two stops, as a colour-mix of the two tokens. */
function midpoint(a: Colour, b: Colour): string {
  return `color-mix(in srgb, ${a} 50%, ${b})`;
}

const isotypePlacement: Record<"bl" | "br", string> = {
  bl: "-bottom-20 -left-16 lg:-bottom-28 lg:-left-12 -z-10 w-[20rem] !opacity-[0.035] sm:w-[26rem] lg:w-[32rem]",
  br: "-bottom-20 -right-16 lg:-bottom-28 lg:-right-12 -z-10 w-[20rem] !opacity-[0.035] sm:w-[26rem] lg:w-[32rem]",
};

/**
 * Decorative background for a section: a vertical wash that blends into the neighbouring
 * sections, the flowing lines and glow, and the isotype. Must be rendered inside a parent
 * `<section className="relative isolate overflow-hidden bg-white ...">`.
 */
export function SectionAtmosphere({
  lines,
  glow,
  isotype,
  tone = "white",
  washTop = "white",
  washBottom = "white",
}: SectionAtmosphereProps) {
  const tint: Colour = tone === "mist" ? edge.mist : tintWhite;
  const top = edge[washTop];
  const bottom = edge[washBottom];
  // Staged stops: midpoints between edge and tint let each section boundary ease in and out.
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background: `linear-gradient(to bottom, ${top} 0%, ${midpoint(top, tint)} 12%, ${tint} 38%, ${tint} 62%, ${midpoint(tint, bottom)} 88%, ${bottom} 100%)`,
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
        <SectionBackdrop lines={lines} glow={glow} surface={tone === "mist" ? "mist" : "white"} />
      </div>
      {isotype && <IsotypeWatermark className={isotypePlacement[isotype]} />}
    </>
  );
}

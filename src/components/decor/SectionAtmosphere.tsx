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

type Colour = { css: string; rgba: [number, number, number, number] | null };

const edge: Record<Tone, Colour> = {
  white: { css: "#ffffff", rgba: [255, 255, 255, 1] },
  mist: { css: "var(--color-sky-50)", rgba: null },
};

const tintWhite: Colour = { css: "rgb(243 248 252 / 0.45)", rgba: [243, 248, 252, 0.45] };

/** Halfway colour between two stops: rgb average when both are literal, otherwise color-mix. */
function midpoint(a: Colour, b: Colour): string {
  if (a.rgba && b.rgba) {
    const [ar, ag, ab, aa] = a.rgba;
    const [br, bg, bb, ba] = b.rgba;
    return `rgb(${(ar + br) / 2} ${(ag + bg) / 2} ${(ab + bb) / 2} / ${(aa + ba) / 2})`;
  }
  return `color-mix(in srgb, ${a.css} 50%, ${b.css})`;
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
          background: `linear-gradient(to bottom, ${top.css} 0%, ${midpoint(top, tint)} 12%, ${tint.css} 38%, ${tint.css} 62%, ${midpoint(tint, bottom)} 88%, ${bottom.css} 100%)`,
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
        <SectionBackdrop lines={lines} glow={glow} surface={tone === "mist" ? "mist" : "white"} />
      </div>
      {isotype && <IsotypeWatermark className={isotypePlacement[isotype]} />}
    </>
  );
}

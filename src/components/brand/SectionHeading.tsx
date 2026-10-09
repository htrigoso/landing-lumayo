import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  /** Section number shown as "01 — Label", as in the brand manual. */
  number: string;
  label: string;
  id: string;
  /** Title using the manual's 400 + 800 pairing: wrap the emphasis in <strong>. */
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  /** "split": title left, description bottom-right (manual layout). "stack": everything left. */
  layout?: "split" | "stack";
  className?: string;
};

/** Editorial section header modeled on the Lumayo brand manual pages. */
export function SectionHeading({ number, label, id, title, description, tone = "light", layout = "split", className = "" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={`grid gap-5 ${layout === "split" ? "lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16" : ""} ${className}`}
    >
      <div>
        <p className={`flex items-center gap-3 text-sm font-medium tabular-nums ${dark ? "text-sky-100/80" : "text-navy-700"}`}>
          {number}
          <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-sky-100/50" : "bg-navy-700/40"}`} />
          {label}
        </p>
        <h2 id={id} className={`section-title mt-4 ${dark ? "!text-white" : ""}`}>
          {title}
        </h2>
      </div>
      {description && (
        <p className={`max-w-md text-pretty text-base leading-relaxed sm:text-lg ${dark ? "text-sky-100/85" : "text-ink-600"} ${layout === "split" ? "lg:justify-self-end lg:pb-1" : ""}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}

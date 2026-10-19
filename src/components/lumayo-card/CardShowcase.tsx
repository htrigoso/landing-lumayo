"use client";

import type { ReactNode } from "react";
import { CardFlip } from "@/components/lumayo-card/CardFlip";
import { useCardPlan } from "@/components/lumayo-card/CardPlanContext";
import type { CardPlanKey } from "@/lib/site";

type Faces = { front: ReactNode; back: ReactNode };

const variants: { value: CardPlanKey; label: string }[] = [
  { value: "classic", label: "Clásica" },
  { value: "gold", label: "Dorada" },
];

/** Switches between the classic and gold Lumayo Card. Faces are rendered by the server and passed in. */
export function CardShowcase({ classic, gold }: { classic: Faces; gold: Faces }) {
  const { variant, setVariant } = useCardPlan();
  const faces = variant === "gold" ? gold : classic;
  const isGold = variant === "gold";

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-xl pt-4">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-[10%] -bottom-2 -z-10 h-1/3 rounded-full blur-2xl transition-colors duration-500 motion-reduce:transition-none ${
          isGold ? "bg-amber-300/30" : "bg-cyan-400/20"
        }`}
      />

      <div role="group" aria-label="Versión de la tarjeta" className="mb-6 flex justify-center">
        <div className="inline-flex rounded-full border border-line bg-white p-1 shadow-[0_12px_30px_-20px_color-mix(in_srgb,var(--color-azul-950)_35%,transparent)]">
          {variants.map((option) => {
            const active = variant === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => setVariant(option.value)}
                className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors duration-300 motion-reduce:transition-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 ${
                  active ? "bg-navy-700 text-white" : "text-navy-700 hover:bg-cyan-100/70"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <CardFlip key={variant} front={faces.front} back={faces.back} />
    </div>
  );
}

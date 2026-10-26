"use client";

import { useId, type ReactNode } from "react";
import { motion } from "motion/react";
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
  const uid = useId();
  const faces = variant === "gold" ? gold : classic;
  const isGold = variant === "gold";

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-xl pt-4">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-[10%] -bottom-2 -z-10 h-1/3 rounded-full blur-2xl transition-colors duration-500 motion-reduce:transition-none ${
          isGold ? "bg-card-gold-accent/30" : "bg-accent/20"
        }`}
      />

      <div role="group" aria-label="Versión de la membresía" className="mb-6 flex justify-center">
        <div className="inline-flex rounded-full border border-border bg-white p-1 shadow-[0_12px_30px_-20px_color-mix(in_srgb,var(--color-azul-950)_35%,transparent)]">
          {variants.map((option) => {
            const active = variant === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => setVariant(option.value)}
                className={`relative min-h-11 rounded-full px-5 text-sm font-semibold transition-colors duration-300 motion-reduce:transition-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus ${
                  active ? "text-white" : "text-primary hover:bg-surface-mint/70"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId={`${uid}-variant-pill`}
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
                <span className="relative">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <CardFlip key={variant} front={faces.front} back={faces.back} />
    </div>
  );
}

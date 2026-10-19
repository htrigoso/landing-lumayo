"use client";

import { CheckIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { NOVIAS_PRESET_EVENT, treatmentLabels, type TreatmentKey } from "@/lib/novias";

type WhoOption = "Novia" | "Novio" | "Ambos";

type Persona = {
  id: "novia" | "novio" | "pareja";
  title: string;
  description: string;
  treatments: readonly TreatmentKey[];
};

const whoByPersona: Record<Persona["id"], WhoOption> = {
  novia: "Novia",
  novio: "Novio",
  pareja: "Ambos",
};

/** Persona cards that preset the wedding planner through a window event, then scroll to it. */
export function PersonaCards({ personas }: { personas: readonly Persona[] }) {
  function handlePick(persona: Persona) {
    window.dispatchEvent(
      new CustomEvent(NOVIAS_PRESET_EVENT, {
        detail: { who: whoByPersona[persona.id], treatments: [...persona.treatments] },
      }),
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("cronograma")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {personas.map((persona, i) => (
        <Reveal key={persona.id} className="h-full" delay={i * 0.08}>
          <article className="relative h-full rounded-[2rem] border border-navy-700/20 p-2">
            <div className="flex h-full flex-col rounded-[1.5rem] border border-navy-700/10 bg-white p-7 shadow-[0_18px_40px_-28px_color-mix(in_srgb,var(--color-azul-950)_40%,transparent)]">
              <h3 className="font-display text-2xl font-extrabold text-navy-700">{persona.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">{persona.description}</p>
              <ul className="mt-6 grid gap-3">
                {persona.treatments.map((key) => (
                  <li key={key} className="flex gap-3 text-sm font-semibold text-navy-700">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-cyan-700" />
                    {treatmentLabels[key]}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handlePick(persona)}
                className="btn btn-outline mt-8 w-full min-h-11 cursor-pointer text-base focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:outline-none"
              >
                Armar mi plan
              </button>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

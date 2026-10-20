"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type Faq = { q: string; a: string };

const ease = [0.65, 0, 0.35, 1] as const;

/**
 * FAQ list whose answers glide open (height + fade) instead of snapping like native <details>.
 * Answers are always rendered in the HTML (closed panels are hidden with inert/aria-hidden),
 * so crawlers that do not run JavaScript can still read them.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <div className="mt-4 divide-y divide-line">
      {items.map((f, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={f.q} className="py-1">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 rounded-lg text-left font-semibold text-heading"
              >
                {f.q}
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease }}
                  className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                    isOpen ? "bg-primary text-text-inverse" : "bg-surface-soft text-heading"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </motion.span>
              </button>
            </h3>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={false}
              animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { height: { duration: 0.55, ease }, opacity: { duration: 0.4, ease: "easeOut" } }
              }
              inert={!isOpen}
              aria-hidden={!isOpen}
              className="overflow-hidden"
            >
              <motion.p
                initial={false}
                animate={{ y: isOpen ? 0 : -6 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease }}
                className="pb-4 pr-10 leading-relaxed text-text"
              >
                {f.a}
              </motion.p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

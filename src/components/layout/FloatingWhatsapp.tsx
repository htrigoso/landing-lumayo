"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { WhatsappIcon } from "@/components/icons";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/site";

/**
 * Floating WhatsApp button (desktop; phones already have the bottom contact bar).
 * A greeting bubble slides in after a short pause and stays next to the button.
 * Brand colours instead of WhatsApp green: Azul profundo button, white bubble.
 */
export function FloatingWhatsapp() {
  const reduceMotion = useReducedMotion();
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setBubble(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  const href = whatsappUrl(defaultWhatsappMessage);

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden items-center gap-3 lg:flex">
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 16, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative rounded-2xl bg-white px-4 py-2.5 text-navy-700 shadow-[0_12px_32px_-12px_rgb(1_42_72/0.35)] ring-1 ring-navy-700/10"
          >
            <a href={href} target="_blank" rel="noopener" className="text-sm leading-snug">
              <span className="block font-bold">¡Hola! ¿Tienes alguna duda?</span>
              <span className="text-ink-600">Escríbenos y te ayudamos a agendar.</span>
            </a>
            {/* Tail pointing at the button */}
            <span aria-hidden="true" className="absolute -right-1.5 top-1/2 size-3 -translate-y-1/2 rotate-45 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={href}
        target="_blank"
        rel="noopener"
        aria-label="Escríbenos por WhatsApp"
        className="relative grid size-14 shrink-0 place-items-center rounded-full bg-navy-700 text-white shadow-[0_12px_28px_-10px_rgb(1_42_72/0.6)] transition-colors hover:bg-navy-500"
      >
        {/* Soft halo that breathes with transform/opacity only (no repaint) */}
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-cyan-400"
            initial={{ opacity: 0.45, scale: 1 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", repeatDelay: 1.2 }}
          />
        )}
        <WhatsappIcon className="relative size-7" />
      </a>
    </div>
  );
}

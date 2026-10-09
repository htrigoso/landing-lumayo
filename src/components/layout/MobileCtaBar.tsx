"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CalendarIcon, WhatsappIcon } from "@/components/icons";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/site";

/** Sticky contact bar for phones; appears once the visitor scrolls past the hero CTAs. */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label="Contacto rápido"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%", transition: { duration: 0.18 } }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 lg:hidden"
        >
          <div className="mx-auto grid max-w-xl grid-cols-[auto_1fr] gap-2">
            <a href="#reservar" className="btn btn-outline px-4">
              <CalendarIcon />
              Reservar
            </a>
            <a href={whatsappUrl(defaultWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-wa">
              <WhatsappIcon />
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

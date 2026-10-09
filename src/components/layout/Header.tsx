"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, PhoneIcon, WhatsappIcon } from "@/components/icons";
import { defaultWhatsappMessage, site, whatsappUrl } from "@/lib/site";

const links = [
  { href: "#ortodoncia", label: "Brackets" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "border-line shadow-[0_6px_20px_-12px_rgb(7_42_76/0.25)]" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <a href="#top" className="shrink-0 rounded-lg" aria-label="Lumayo Centro Odontológico, ir al inicio">
          <Image
            src="/brand/lumayo-logo-small.svg"
            alt="Lumayo Centro Odontológico"
            width={1380}
            height={450}
            preload
            unoptimized
            className="h-12 w-auto md:h-14"
          />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink-600 transition-colors hover:bg-sky-50 hover:text-navy-700"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneE164}`}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-navy-700 hover:bg-sky-50 md:inline-flex"
          >
            <PhoneIcon className="size-4 text-cyan-700" />
            {site.phoneDisplay}
          </a>
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener"
            className="btn btn-wa hidden !min-h-11 !py-2 text-sm sm:inline-flex"
          >
            <WhatsappIcon />
            Agendar cita
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-navy-700 hover:bg-sky-50 lg:hidden"
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Principal"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-line bg-white lg:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-3 text-base font-semibold text-navy-700 hover:bg-sky-50"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={`tel:${site.phoneE164}`}
                  className="flex min-h-12 items-center gap-2 rounded-xl px-3 text-base font-semibold text-navy-700 hover:bg-sky-50"
                >
                  <PhoneIcon className="size-5 text-cyan-700" />
                  Llamar al {site.phoneDisplay}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

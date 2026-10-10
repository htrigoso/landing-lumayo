"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { ArrowRightIcon, CloseIcon, MenuIcon, PhoneIcon, PinIcon, WhatsappIcon } from "@/components/icons";
import { defaultWhatsappMessage, fullAddress, site, whatsappUrl } from "@/lib/site";

// Home anchors are prefixed with "/" so they also work from inner pages (e.g. /servicios);
// on the home page they still scroll in place because the path is the same.
const links = [
  { href: "/#ortodoncia", label: "Brackets" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const ease = [0.22, 1, 0.36, 1] as const;
const noopSubscribe = () => () => {};

/**
 * Mobile navigation drawer that slides in from the right. Rendered in a portal because
 * the header's backdrop-filter would otherwise make `position: fixed` relative to it.
 */
function MobileDrawer({ open, onClose, returnFocusTo }: { open: boolean; onClose: () => void; returnFocusTo: RefObject<HTMLButtonElement | null> }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const trigger = returnFocusTo.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-navy-950/45 backdrop-blur-sm"
          />
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute inset-y-0 right-0 flex w-[min(21rem,86vw)] flex-col overflow-y-auto bg-white shadow-[-20px_0_60px_-20px_rgb(7_42_76/0.45)]"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Image src="/brand/lumayo-logo.svg" alt="Lumayo Centro Odontológico" width={997} height={200} unoptimized className="h-6 w-auto" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className="grid size-11 cursor-pointer place-items-center rounded-full bg-sky-50 text-navy-700 transition hover:bg-sky-100"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <nav aria-label="Principal" className="px-3 py-4">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } }}
              >
                {[...links, { href: "#reservar", label: "Reservar cita" }].map((l) => (
                  <motion.li
                    key={l.href}
                    variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } } }}
                  >
                    <Link
                      href={l.href}
                      onClick={onClose}
                      aria-current={l.href === pathname ? "page" : undefined}
                      className="group flex min-h-13 items-center justify-between rounded-2xl px-4 py-3 text-lg font-semibold text-navy-700 transition-colors hover:bg-sky-50 aria-[current=page]:bg-sky-50"
                    >
                      {l.label}
                      <ArrowRightIcon className="size-4 text-cyan-700 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.35 }}
              className="mt-auto space-y-3 border-t border-line bg-sky-50 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5"
            >
              <a href={whatsappUrl(defaultWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-wa w-full text-base">
                <WhatsappIcon />
                Agendar por WhatsApp
              </a>
              <a href={`tel:${site.phoneE164}`} className="btn btn-outline w-full text-base">
                <PhoneIcon />
                Llamar al {site.phoneDisplay}
              </a>
              <p className="flex gap-2 pt-1 text-sm leading-snug text-ink-600">
                <PinIcon className="mt-0.5 size-4 shrink-0 text-cyan-700" />
                {fullAddress}
              </p>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // The drawer portals into <body>, which only exists on the client.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white md:bg-white/90 md:backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "border-line shadow-[0_6px_20px_-12px_rgb(7_42_76/0.25)]" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" className="shrink-0 rounded-lg" aria-label="Lumayo Centro Odontológico, ir al inicio">
          <Image
            src="/brand/lumayo-logo.svg"
            alt="Lumayo Centro Odontológico"
            width={997}
            height={200}
            preload
            unoptimized
            className="h-7 w-auto md:h-8"
          />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={l.href === pathname ? "page" : undefined}
                  className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink-600 transition-colors hover:bg-sky-50 hover:text-navy-700 aria-[current=page]:bg-sky-100 aria-[current=page]:text-navy-700"
                >
                  {l.label}
                </Link>
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
            <span aria-hidden="true" className="btn-shine" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Abrir menú"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-navy-700 hover:bg-sky-50 lg:hidden"
          >
            <MenuIcon className="size-6" />
          </button>
        </div>
      </div>

      {mounted && <MobileDrawer open={open} onClose={close} returnFocusTo={menuButtonRef} />}
    </header>
  );
}

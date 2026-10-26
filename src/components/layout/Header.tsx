"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { ArrowRightIcon, CloseIcon, MenuIcon, PhoneIcon, PinIcon, WhatsappIcon } from "@/components/icons";
import { ServicesMegaMenu, isServicesSectionPath } from "@/components/layout/ServicesMegaMenu";
import { categoryPath, defaultWhatsappMessage, fullAddress, programPaths, serviceCategories, site, whatsappUrl } from "@/lib/site";

type NavLink = { href: string; label: string; mega?: boolean; badge?: string };
type MobileLink = NavLink & { children?: { href: string; label: string }[] };

// Short form of site.heroHighlight ("Hasta 20% de descuento") that fits inside a small nav tag.
const membershipBadge = "Hasta 20% dto.";

// Every entry is a page route. "Inicio" is dropped: the logo already links home.
const links: NavLink[] = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios", mega: true },
  { href: programPaths.card, label: "Membresía", badge: membershipBadge },
  { href: programPaths.kids, label: "Kids" },
  { href: programPaths.novias, label: "Novias" },
  { href: "/blog", label: "Blog" },
];

// Mobile lists the service categories under "Servicios" instead of every service.
const mobileLinks: MobileLink[] = [
  ...links.map((l): MobileLink =>
    l.mega ? { ...l, children: serviceCategories.map((c) => ({ href: categoryPath(c), label: c.label })) } : l,
  ),
  { href: "#reservar", label: "Reservar cita" },
];

const isActivePath = (pathname: string | null, href: string) => {
  if (href === "/") return pathname === "/";
  if (href === "/servicios") return isServicesSectionPath(pathname);
  return pathname === href || (pathname?.startsWith(`${href}/`) ?? false);
};

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
            className="absolute inset-0 bg-azul-950/45 backdrop-blur-sm"
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
            className="absolute inset-y-0 right-0 flex w-[min(21rem,86vw)] flex-col overflow-y-auto bg-bg shadow-[-20px_0_60px_-20px_color-mix(in_srgb,var(--color-azul-950)_45%,transparent)]"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Image src="/images/lumayo-logo.svg" alt="Lumayo Centro Odontológico" width={580} height={118} unoptimized className="h-6 w-auto" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className="grid size-11 cursor-pointer place-items-center rounded-full bg-surface text-primary transition hover:bg-surface-soft"
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
                {mobileLinks.map((l) => (
                  <motion.li
                    key={l.href}
                    variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } } }}
                  >
                    <Link
                      href={l.href}
                      onClick={onClose}
                      aria-current={isActivePath(pathname, l.href) ? "page" : undefined}
                      className="group flex min-h-13 items-center justify-between rounded-2xl px-4 py-3 text-lg font-semibold text-primary transition-colors hover:bg-surface aria-[current=page]:bg-surface"
                    >
                      <span className="flex items-center">
                        {l.label}
                        {l.badge && <span aria-hidden="true" className="ml-1.5 inline-block size-1.5 rounded-full bg-accent" />}
                      </span>
                      <ArrowRightIcon className="size-4 text-accent-text transition-transform group-hover:translate-x-1" />
                    </Link>
                    {l.children && (
                      <ul className="mb-1 ml-6 border-l border-border pl-3">
                        {l.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={onClose}
                              aria-current={isActivePath(pathname, c.href) ? "page" : undefined}
                              className="flex min-h-11 items-center rounded-xl px-3 py-2 text-base font-medium text-text transition-colors hover:bg-surface hover:text-primary aria-[current=page]:text-primary"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.35 }}
              className="mt-auto space-y-3 border-t border-border bg-surface px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5"
            >
              <a href={whatsappUrl(defaultWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-wa w-full text-base">
                <WhatsappIcon />
                Agendar por WhatsApp
              </a>
              <a href={`tel:${site.phoneE164}`} className="btn btn-outline w-full text-base">
                <PhoneIcon />
                Llamar al {site.phoneDisplay}
              </a>
              <p className="flex gap-2 pt-1 text-sm leading-snug text-text">
                <PinIcon className="mt-0.5 size-4 shrink-0 text-accent-text" />
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
      className={`sticky top-0 z-40 border-b bg-bg shadow-[0_4px_16px_-8px_color-mix(in_srgb,var(--color-azul-950)_20%,transparent)] md:bg-bg/90 md:backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "border-border shadow-[0_6px_20px_-12px_color-mix(in_srgb,var(--color-azul-950)_25%,transparent)]" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" className="shrink-0 rounded-lg" aria-label="Lumayo Centro Odontológico, ir al inicio">
          <Image
            src="/images/lumayo-logo.svg"
            alt="Lumayo Centro Odontológico"
            width={997}
            height={200}
            preload
            unoptimized
            className="h-7 w-auto md:h-8"
          />
        </Link>

        <nav aria-label="Principal" className="hidden self-stretch lg:flex">
          <ul className="flex h-full items-stretch gap-1">
            {links.map((l) =>
              l.mega ? (
                <ServicesMegaMenu key={l.href} label={l.label} href={l.href} pathname={pathname} />
              ) : (
                <li key={l.href} className="flex items-center">
                  <Link
                    href={l.href}
                    aria-current={isActivePath(pathname, l.href) ? "page" : undefined}
                    className="rounded-full px-3 py-2 text-[0.95rem] font-semibold text-heading transition-colors hover:bg-surface hover:text-primary aria-[current=page]:bg-surface-soft aria-[current=page]:text-primary xl:px-4"
                  >
                    {l.label}
                    {/* Hidden below xl so the nav does not overflow at 1024 px */}
                    {l.badge && <span aria-hidden="true" className="ml-1.5 hidden size-1.5 rounded-full bg-accent xl:inline-block" />}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
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
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-primary hover:bg-surface lg:hidden"
          >
            <MenuIcon className="size-6" />
          </button>
        </div>
      </div>

      {mounted && <MobileDrawer open={open} onClose={close} returnFocusTo={menuButtonRef} />}
    </header>
  );
}

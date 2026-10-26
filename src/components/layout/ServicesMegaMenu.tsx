"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRightIcon, ChevronDownIcon, serviceIcons } from "@/components/icons";
import {
  categoryPath,
  defaultWhatsappMessage,
  serviceCategories,
  servicePath,
  servicesInCategory,
  whatsappUrl,
  type ServiceCategoryId,
} from "@/lib/site";

/** True on /servicios and on category or service pages. */
export const isServicesSectionPath = (pathname: string | null) =>
  !!pathname && (pathname === "/servicios" || pathname.startsWith("/servicios/"));

/** The category whose page the pathname is on, else the first one. Used as the panel's starting focus. */
function defaultCategoryId(pathname: string | null): ServiceCategoryId {
  const match = serviceCategories.find((c) => {
    const path = categoryPath(c);
    return pathname === path || pathname?.startsWith(`${path}/`);
  });
  return (match ?? serviceCategories[0]).id;
}

/**
 * Desktop "Servicios" trigger with a full-width mega panel: categories on the left, the active
 * category's services in the middle, and its cover photo on the right.
 * The <li> is not `relative`, so the panel anchors to the sticky <header> and spans its full width.
 */
export function ServicesMegaMenu({ label, href, pathname }: { label: string; href: string; pathname: string | null }) {
  const [open, setOpen] = useState(false);
  // Category highlighted in the panel. Reset to the route's category each time the panel opens.
  const [activeId, setActiveId] = useState<ServiceCategoryId>(() => defaultCategoryId(pathname));
  // Close the panel when the route changes: reset during render instead of syncing in an effect.
  const [renderedPath, setRenderedPath] = useState(pathname);
  const ref = useRef<HTMLLIElement>(null);
  // Short grace period on mouse leave, so crossing the gap toward the panel doesn't close it
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const active = isServicesSectionPath(pathname);
  const offsetY = reduceMotion ? 0 : -6;
  const contentOffsetY = reduceMotion ? 0 : 4;

  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  useEffect(() => () => clearTimeout(closeTimer.current ?? undefined), []);

  useEffect(() => {
    if (!open) return;
    const dismiss = () => {
      clearTimeout(closeTimer.current ?? undefined);
      setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) dismiss();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const close = () => {
    cancelClose();
    setOpen(false);
  };

  const openPanel = () => {
    cancelClose();
    setActiveId(defaultCategoryId(pathname));
    setOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const activeCategory = serviceCategories.find((c) => c.id === activeId) ?? serviceCategories[0];
  const activeServices = servicesInCategory(activeCategory);

  return (
    <li
      ref={ref}
      className="flex items-center"
      onPointerEnter={(e) => e.pointerType === "mouse" && openPanel()}
      onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
    >
      {/* One pill, two targets: the label navigates to the hub, the chevron toggles the panel */}
      <div className={`inline-flex items-center rounded-full transition-colors hover:bg-surface ${active ? "bg-surface-soft" : ""}`}>
        <Link
          href={href}
          onClick={close}
          aria-current={active ? "page" : undefined}
          className="rounded-full py-2 pl-3 text-[0.95rem] font-semibold text-heading transition-colors hover:text-primary aria-[current=page]:text-primary xl:pl-4"
        >
          {label}
        </Link>
        <button
          type="button"
          // Mouse hover already opens the panel, so a mouse click keeps it open; keyboard Enter/Space (detail 0) toggles
          onClick={(e) => (open && e.detail === 0 ? close() : openPanel())}
          aria-label="Abrir submenú de servicios"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={panelId}
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-heading transition-colors hover:text-primary xl:mr-1"
        >
          <ChevronDownIcon className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="services-panel"
            id={panelId}
            initial={{ opacity: 0, y: offsetY }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: offsetY }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full z-50"
          >
            <div className="border-t border-border bg-bg shadow-[0_18px_40px_-16px_color-mix(in_srgb,var(--color-azul-950)_35%,transparent)]">
              <div className="container-page py-8">
                <div className="grid min-h-[22rem] gap-8 lg:grid-cols-[15rem_minmax(0,1fr)_17rem] xl:grid-cols-[17rem_minmax(0,1fr)_20rem]">
                  {/* Left: category list. Hovering or focusing a row switches the center and right columns */}
                  <ul className="space-y-1 border-r border-border pr-6">
                    {serviceCategories.map((c) => {
                      const services = servicesInCategory(c);
                      const lead = services[0];
                      const LeadIcon = lead ? serviceIcons[lead.icon] : undefined;
                      const isActive = c.id === activeId;
                      return (
                        <li key={c.id}>
                          <Link
                            href={categoryPath(c)}
                            onClick={close}
                            onPointerEnter={() => setActiveId(c.id)}
                            onFocus={() => setActiveId(c.id)}
                            data-active={isActive || undefined}
                            className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface data-[active]:bg-surface before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-primary before:opacity-0 data-[active]:before:opacity-100"
                          >
                            {LeadIcon && (
                              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-soft text-primary">
                                <LeadIcon className="size-5" />
                              </span>
                            )}
                            <span className="flex-1 min-w-0">
                              <span className="block text-[0.95rem] font-semibold text-heading group-data-[active]:text-primary">{c.label}</span>
                              <span className="block text-xs text-text-muted">
                                {services.length} servicio{services.length === 1 ? "" : "s"}
                              </span>
                            </span>
                            <ArrowRightIcon className="size-4 text-primary opacity-0 transition-opacity group-data-[active]:opacity-100" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Center: the active category. Keyed so the content cross-fades on change */}
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, y: contentOffsetY }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="min-w-0"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent-text">Categoría</p>
                    <p className="mt-1 font-display text-2xl font-bold text-heading">{activeCategory.label}</p>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-text">{activeCategory.seo.intro}</p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {activeServices.map((s) => {
                        const Icon = serviceIcons[s.icon];
                        const path = servicePath(s);
                        return (
                          <li key={s.id}>
                            <Link
                              href={path}
                              onClick={close}
                              aria-current={pathname === path ? "page" : undefined}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface aria-[current=page]:bg-surface-soft"
                            >
                              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-soft text-primary transition-colors group-hover:bg-primary group-hover:text-text-inverse">
                                <Icon className="size-5" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-heading group-hover:text-primary">{s.name}</span>
                                <span className="mt-0.5 line-clamp-2 text-xs text-text-muted">{s.description}</span>
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>

                  {/* Right: cover photos for every category are stacked; only the active one is visible */}
                  <Link
                    href={categoryPath(activeCategory)}
                    onClick={close}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-surface"
                  >
                    {serviceCategories.map((c) => {
                      const services = servicesInCategory(c);
                      const cover = services.find((s) => s.featured) ?? services[0];
                      if (!cover) return null;
                      return (
                        <Image
                          key={c.id}
                          src={cover.image}
                          // Only the visible cover is exposed to assistive tech; stacked hidden ones are decorative
                          alt={c.id === activeId ? `${c.label} en Lumayo, centro odontológico en Tarapoto` : ""}
                          aria-hidden={c.id === activeId ? undefined : true}
                          fill
                          sizes="320px"
                          className={`object-cover transition-[opacity,transform] duration-500 group-hover:scale-105 ${
                            c.id === activeId ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      );
                    })}
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-azul-950/80 via-azul-950/10 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5 text-text-inverse">
                      <span className="font-display text-lg font-semibold">Ver {activeCategory.label}</span>
                      <span className="grid size-9 place-items-center rounded-full bg-bg text-primary transition-transform group-hover:translate-x-1">
                        <ArrowRightIcon className="size-4" />
                      </span>
                    </span>
                  </Link>
                </div>

                {/* Bottom bar: evaluation CTA on the left, full catalog link on the right */}
                <div className="mt-6 flex items-center justify-between gap-6 border-t border-border pt-5 text-sm">
                  <p className="text-text">
                    ¿No sabes qué tratamiento necesitas?{" "}
                    <a
                      href={whatsappUrl(defaultWhatsappMessage)}
                      target="_blank"
                      rel="noopener"
                      className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4"
                    >
                      Agenda una evaluación
                    </a>
                  </p>
                  <Link
                    href={href}
                    onClick={close}
                    className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary hover:underline"
                  >
                    Ver todos los servicios
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

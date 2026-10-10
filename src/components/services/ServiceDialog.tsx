"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { CalendarIcon, CheckIcon, CloseIcon, serviceIcons, WhatsappIcon } from "@/components/icons";
import { serviceCategories, whatsappUrl, type Service } from "@/lib/site";

type Props = {
  service: Service | null;
  onClose: () => void;
};

const categoryLabel = Object.fromEntries(serviceCategories.map((c) => [c.id, c.label]));

/**
 * Service detail sheet built on the native <dialog>: the browser handles the focus trap,
 * Escape and the inert page behind it. Bottom sheet on phones, centered card from `sm` up.
 */
export function ServiceDialog({ service, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (service && !dialog.open) {
      dialog.showModal();
      // Start on the close button, not on the scrollable body the browser would pick
      closeRef.current?.focus();
      document.documentElement.style.overflow = "hidden";
    } else if (!service && dialog.open) {
      dialog.close();
    }
  }, [service]);

  // Restore page scrolling however the dialog closes (button, Escape or backdrop)
  const handleClose = () => {
    document.documentElement.style.overflow = "";
    onClose();
  };

  const Icon = service ? serviceIcons[service.icon] : null;

  return (
    <dialog
      ref={ref}
      aria-labelledby="service-dialog-title"
      onClose={handleClose}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className="service-dialog fixed inset-x-0 bottom-0 top-auto m-0 max-h-[92dvh] w-full max-w-none overflow-hidden rounded-t-2xl bg-white p-0 text-ink-900 shadow-lift backdrop:bg-navy-950/60 backdrop:backdrop-blur-sm sm:inset-0 sm:m-auto sm:max-h-[88dvh] sm:w-[min(100%-3rem,44rem)] sm:rounded-2xl"
    >
      {service && Icon && (
        <div className="relative isolate flex max-h-[inherit] flex-col">
          <div className="overflow-y-auto overscroll-contain">
            {/* Photo header */}
            <div className="relative h-48 shrink-0 sm:h-60">
              <Image src={service.image} alt="" fill sizes="(min-width: 640px) 44rem, 100vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-navy-950/10 to-transparent" />
              <span className="pill pill-outline absolute left-5 top-5 !px-3 !py-1 text-[0.62rem]">
                {categoryLabel[service.category]}
              </span>
            </div>

            <div className="relative px-6 pb-6 sm:px-8">
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative brand SVG */}
              <img
                src="/brand/lumayo-isotipo.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 -right-12 -z-10 w-64 select-none opacity-[0.07]"
              />
              <span className="relative -mt-8 grid size-16 place-items-center rounded-full bg-navy-700 text-white ring-4 ring-white">
                <Icon className="size-8" />
              </span>

              <h2 id="service-dialog-title" className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-navy-700 sm:text-3xl">
                {service.name}
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-ink-600 sm:text-lg">{service.details.summary}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <section className="card-panel p-5">
                  <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-cyan-700">¿Para quién es?</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-ink-900">{service.details.idealFor}</p>
                </section>
                <section className="rounded-2xl border border-sky-200 bg-white p-5">
                  <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-cyan-700">¿Qué incluye?</h3>
                  <ul className="mt-3 space-y-2.5">
                    {service.details.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 leading-snug text-ink-900">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cyan-500 text-white">
                          <CheckIcon className="size-3" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <p className="mt-5 text-sm text-ink-600">
                El plan final y el costo se definen en tu evaluación, según tu caso.
              </p>
            </div>
          </div>

          {/* Actions stay visible while the content scrolls */}
          <div className="flex shrink-0 flex-col gap-2 border-t border-sky-200 bg-white px-6 py-4 sm:flex-row sm:px-8">
            <a
              href={whatsappUrl(`Hola Lumayo, quisiera información sobre ${service.name.toLowerCase()}.`)}
              target="_blank"
              rel="noopener"
              className="btn btn-wa flex-1"
            >
              <WhatsappIcon />
              Consultar por WhatsApp
            </a>
            <a href="#reservar" onClick={() => ref.current?.close()} className="btn btn-outline flex-1">
              <CalendarIcon />
              Reservar cita
            </a>
          </div>

          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Cerrar"
            ref={closeRef}
            className="absolute right-4 top-4 grid size-11 cursor-pointer place-items-center rounded-full bg-white text-navy-700 transition-colors hover:bg-sky-100"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>
      )}
    </dialog>
  );
}

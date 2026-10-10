"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type FormEvent } from "react";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { CheckIcon, WhatsappIcon } from "@/components/icons";
import { bookingServiceOptions, whatsappUrl } from "@/lib/site";

type Shift = "Mañana" | "Tarde";
type Errors = Partial<Record<"name" | "service", string>>;

type BookingFormProps = {
  defaultService?: (typeof bookingServiceOptions)[number];
  /** Title in the brandbook's 400 + 800 pairing: `title` regular, `titleEmphasis` extra bold. */
  title?: string;
  titleEmphasis?: string;
  subtitle?: string;
  /** Id of an external heading; when set, the form's own header is not rendered. */
  headingId?: string;
  className?: string;
};

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function validate(name: string, service: string): Errors {
  const errors: Errors = {};
  if (name.trim().length < 2) errors.name = "Escribe tu nombre para saber cómo llamarte.";
  if (!service) errors.service = "Elige el servicio que te interesa.";
  return errors;
}

export function BookingForm({
  defaultService = "Ortodoncia con brackets",
  title = "Reserva",
  titleEmphasis = "tu cita",
  subtitle = "Completa tus datos y te confirmamos el horario por WhatsApp.",
  headingId,
  className = "",
}: BookingFormProps) {
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    service: `${uid}-service`,
    date: `${uid}-date`,
    title: `${uid}-title`,
  };

  const [name, setName] = useState("");
  const [service, setService] = useState<string>(defaultService);
  const [date, setDate] = useState("");
  const [shift, setShift] = useState<Shift>("Mañana");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);

  const onBlur = (field: keyof Errors) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(name, service));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate(name, service);
    setErrors(next);
    setTouched({ name: true, service: true });
    if (next.name) return nameRef.current?.focus();
    if (next.service) return serviceRef.current?.focus();

    const lines = [
      `Hola Lumayo, soy ${name.trim()}.`,
      `Quisiera agendar una cita para: ${service}.`,
      date ? `Fecha preferida: ${formatDate(date)}, turno ${shift.toLowerCase()}.` : `Turno preferido: ${shift.toLowerCase()}.`,
    ];
    const url = whatsappUrl(lines.join("\n"));
    // "noopener" in the features string makes window.open return null, so detach the opener manually.
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    setSent(true);
  };

  const showError = (field: keyof Errors) => touched[field] && errors[field];

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={headingId ?? ids.title}
      className={`overflow-hidden rounded-2xl bg-white ${headingId ? "p-5 sm:p-6" : ""} ${className}`}
    >
      {!headingId && <FormHeader titleId={ids.title} title={title} emphasis={titleEmphasis} subtitle={subtitle} />}

      <div className={`space-y-3 ${headingId ? "" : "px-6 pb-6 pt-0 sm:px-7"}`}>
        <div>
          <label htmlFor={ids.name} className="mb-1 block text-sm font-semibold text-navy-700">
            Nombre{" "}
            <span className="text-cyan-700" aria-hidden="true">
              *
            </span>
          </label>
          <input
            ref={nameRef}
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => onBlur("name")}
            aria-invalid={Boolean(showError("name"))}
            aria-describedby={showError("name") ? `${ids.name}-err` : undefined}
            className="field-input !min-h-11 !py-2"
            placeholder="Tu nombre y apellido"
          />
          {showError("name") && (
            <p id={`${ids.name}-err`} role="alert" className="mt-1.5 text-sm font-medium text-orange-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={ids.service} className="mb-1 block text-sm font-semibold text-navy-700">
            Servicio{" "}
            <span className="text-cyan-700" aria-hidden="true">
              *
            </span>
          </label>
          {/* Custom chevron: the native arrow sits flush against the edge and can't be inset */}
          <div className="relative">
            <select
              ref={serviceRef}
              id={ids.service}
              name="service"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              onBlur={() => onBlur("service")}
              aria-invalid={Boolean(showError("service"))}
              aria-describedby={showError("service") ? `${ids.service}-err` : undefined}
              className="field-input !min-h-11 cursor-pointer appearance-none !py-2 !pr-11"
            >
              <option value="">Selecciona un servicio</option>
              {bookingServiceOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-navy-700"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          {showError("service") && (
            <p id={`${ids.service}-err`} role="alert" className="mt-1.5 text-sm font-medium text-orange-700">
              {errors.service}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={ids.date} className="mb-1 block text-sm font-semibold text-navy-700">
            Fecha preferida <span className="font-normal text-ink-600">(opcional)</span>
          </label>
          <input
            id={ids.date}
            name="date"
            type="date"
            onFocus={(e) => (e.currentTarget.min = todayISO())}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="field-input !min-h-11 !py-2"
          />
        </div>

        <fieldset>
          <legend className="mb-1 block text-sm font-semibold text-navy-700">Turno</legend>
          {/* Pill toggle, like the brandbook's pill controls */}
          <div className="grid grid-cols-2 gap-1 rounded-full bg-sky-50 p-1">
            {(["Mañana", "Tarde"] as const).map((s) => (
              <label
                key={s}
                className="relative flex min-h-9 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-semibold text-ink-600 transition-colors has-[:checked]:text-white has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-cyan-500"
              >
                <input
                  type="radio"
                  name={`${uid}-shift`}
                  value={s}
                  checked={shift === s}
                  onChange={() => setShift(s)}
                  className="sr-only"
                />
                {shift === s && (
                  <motion.span
                    layoutId={`${uid}-shift-pill`}
                    className="absolute inset-0 rounded-full bg-navy-700"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
                <span className="relative">{s}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="btn btn-wa !mt-5 w-full text-base">
          <WhatsappIcon />
          Enviar por WhatsApp
        </button>

        <div aria-live="polite" className="empty:hidden">
          <AnimatePresence>
            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2 rounded-xl bg-sky-50 px-3 py-2 text-sm text-navy-700"
              >
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-cyan-500" />
                Abrimos WhatsApp con tu solicitud. Solo presiona enviar y te responderemos pronto.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}

/** Three thin strokes sweeping like the isotype contour, as in the brandbook's social pieces. */
const headerCurves = [0, 1, 2].map(
  (i) =>
    `M ${-10 + i * 18} 150 C ${40 + i * 14} 70, ${120 + i * 10} 30, ${210 + i * 6} ${48 + i * 12} S ${330 - i * 6} ${96 + i * 10}, 420 ${30 + i * 16}`,
);

/**
 * Card cap in Azul profundo: label, Titular (400 + 800) and a short description over thin
 * isotype lines. Its lower edge is the crown of the Lumayo tooth (two cusps, soft middle dip),
 * so the white form body rises into it like the "muelita".
 */
function FormHeader({ titleId, title, emphasis, subtitle }: { titleId: string; title: string; emphasis: string; subtitle: string }) {
  return (
    <div className="relative isolate overflow-hidden bg-navy-700 px-6 pb-11 pt-6 text-white sm:px-7">
      <IsotypeWatermark tone="dark" className="-right-12 -top-8 -z-10 w-52 !opacity-[0.16]" />
      <svg aria-hidden="true" viewBox="0 0 400 160" preserveAspectRatio="none" fill="none" className="absolute inset-0 -z-10 size-full">
        {headerCurves.map((d, i) => (
          <path key={d} d={d} stroke="#fff" strokeOpacity={0.22 - i * 0.05} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      <p className="text-xs font-medium uppercase tracking-[0.12em] text-sky-100/85">Reserva en línea</p>
      <h3 id={titleId} className="mt-2 font-display text-3xl font-normal leading-[0.98] tracking-[-0.045em]">
        {title} <strong className="font-extrabold">{emphasis}</strong>
      </h3>
      <p className="mt-2 max-w-xs text-pretty text-sm leading-[1.5] text-sky-100/90">{subtitle}</p>

      {/* Crown edge: the white body's top follows the tooth's two cusps */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-px h-7 w-full text-white"
      >
        <path d="M0 20 V15 C 5 5, 18 2, 30 6 C 38 9, 44 12, 50 12 C 56 12, 62 9, 70 6 C 82 2, 95 5, 100 15 V20 Z" fill="currentColor" />
      </svg>
    </div>
  );
}

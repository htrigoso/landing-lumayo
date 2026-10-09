"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type FormEvent } from "react";
import { CalendarIcon, CheckIcon, LockIcon, WhatsappIcon } from "@/components/icons";
import { bookingServiceOptions, whatsappUrl } from "@/lib/site";

type Shift = "Mañana" | "Tarde";
type Errors = Partial<Record<"name" | "service", string>>;

type BookingFormProps = {
  defaultService?: (typeof bookingServiceOptions)[number];
  title?: string;
  subtitle?: string;
  /** "card" stacks every field; "split" places them in two columns from sm up. */
  layout?: "card" | "split";
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
  title = "Reserva tu cita",
  subtitle = "Te confirmamos el horario por WhatsApp.",
  layout = "card",
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
  const split = layout === "split";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={headingId ?? ids.title}
      className={`rounded-[1.75rem] border border-white/70 bg-white/95 p-5 shadow-lift backdrop-blur-md sm:p-6 ${className}`}
    >
      {!headingId && (
        <div className="mb-5 flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky-100 text-cyan-700">
            <CalendarIcon className="size-6" />
          </span>
          <div>
            <h2 id={ids.title} className="font-display text-xl font-extrabold text-navy-700">
              {title}
            </h2>
            <p className="text-sm text-ink-600">{subtitle}</p>
          </div>
        </div>
      )}

      <div
        className={
          split ? "grid gap-4 sm:grid-cols-2 sm:items-start" : "space-y-4"
        }
      >
        <div>
          <label htmlFor={ids.name} className="mb-1.5 block text-sm font-semibold text-navy-700">
            Nombre <span className="text-cyan-700" aria-hidden="true">*</span>
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
            className="field-input"
            placeholder="Tu nombre y apellido"
          />
          {showError("name") && (
            <p id={`${ids.name}-err`} role="alert" className="mt-1.5 text-sm font-medium text-orange-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={ids.service} className="mb-1.5 block text-sm font-semibold text-navy-700">
            Servicio <span className="text-cyan-700" aria-hidden="true">*</span>
          </label>
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
            className="field-input cursor-pointer"
          >
            <option value="">Selecciona un servicio</option>
            {bookingServiceOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          {showError("service") && (
            <p id={`${ids.service}-err`} role="alert" className="mt-1.5 text-sm font-medium text-orange-700">
              {errors.service}
            </p>
          )}
        </div>

        <div className={`grid gap-4 sm:grid-cols-[1fr_auto] ${split ? "sm:contents" : ""}`}>
          <div>
            <label htmlFor={ids.date} className="mb-1.5 block text-sm font-semibold text-navy-700">
              Fecha preferida <span className="font-normal text-ink-600">(opcional)</span>
            </label>
            <input
              id={ids.date}
              name="date"
              type="date"
              onFocus={(e) => (e.currentTarget.min = todayISO())}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="field-input"
            />
          </div>
          <fieldset>
            <legend className="mb-1.5 block text-sm font-semibold text-navy-700">Turno</legend>
            <div className="grid grid-cols-2 gap-1 rounded-[0.875rem] bg-sky-50 p-1">
              {(["Mañana", "Tarde"] as const).map((s) => (
                <label
                  key={s}
                  className="relative flex min-h-10 cursor-pointer items-center justify-center rounded-[0.7rem] px-4 text-sm font-semibold text-ink-600 has-[:checked]:text-navy-700 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-cyan-500"
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
                      className="absolute inset-0 rounded-[0.7rem] bg-white shadow-soft"
                      transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    />
                  )}
                  <span className="relative">{s}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <button type="submit" className={`btn btn-wa w-full text-base ${split ? "sm:col-span-2" : ""}`}>
          <WhatsappIcon />
          Enviar por WhatsApp
        </button>

        <div aria-live="polite" className={split ? "sm:col-span-2" : ""}>
          <AnimatePresence>
            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2 rounded-xl bg-sky-50 px-3 py-2 text-sm text-navy-700"
              >
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-wa-600" />
                Abrimos WhatsApp con tu solicitud. Solo presiona enviar y te responderemos pronto.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <p className={`flex items-center justify-center gap-1.5 text-xs text-ink-600 ${split ? "sm:col-span-2" : ""}`}>
          <LockIcon className="size-3.5" />
          No guardamos tus datos en esta página.
        </p>
      </div>
    </form>
  );
}

"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type FormEvent } from "react";
import { CheckIcon, WhatsappIcon } from "@/components/icons";
import { whatsappUrl } from "@/lib/site";

const subjects = ["Consulta general", "Agendar una cita", "Precios y presupuestos", "Otro"] as const;

type Errors = Partial<Record<"name" | "message", string>>;

function validate(name: string, message: string): Errors {
  const errors: Errors = {};
  if (name.trim().length < 2) errors.name = "Escribe tu nombre para saber cómo llamarte.";
  if (message.trim().length < 5) errors.message = "Cuéntanos brevemente tu consulta.";
  return errors;
}

/** Contact form that composes the inquiry and opens it in WhatsApp (the site has no backend). */
export function ContactForm() {
  const uid = useId();
  const ids = { name: `${uid}-name`, phone: `${uid}-phone`, subject: `${uid}-subject`, message: `${uid}-message` };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState<string>(subjects[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const onBlur = (field: keyof Errors) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(name, message));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate(name, message);
    setErrors(next);
    setTouched({ name: true, message: true });
    if (next.name) return nameRef.current?.focus();
    if (next.message) return messageRef.current?.focus();

    const lines = [`Hola Lumayo, soy ${name.trim()}.`, `Asunto: ${subject}.`, message.trim()];
    if (phone.trim()) lines.push(`Mi teléfono: ${phone.trim()}`);
    const url = whatsappUrl(lines.join("\n"));
    // "noopener" in the features string makes window.open return null, so detach the opener manually.
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    setSent(true);
  };

  const showError = (field: keyof Errors) => touched[field] && errors[field];
  const labelClass = "mb-1 block text-sm font-semibold text-navy-700";

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Formulario de contacto" className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className={labelClass}>
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
          <label htmlFor={ids.phone} className={labelClass}>
            Teléfono <span className="font-normal text-ink-600">(opcional)</span>
          </label>
          <input
            id={ids.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="field-input !min-h-11 !py-2"
            placeholder="999 999 999"
          />
        </div>
      </div>

      <div>
        <label htmlFor={ids.subject} className={labelClass}>
          Asunto
        </label>
        {/* Custom chevron: the native arrow sits flush against the edge and can't be inset */}
        <div className="relative">
          <select
            id={ids.subject}
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="field-input !min-h-11 cursor-pointer appearance-none !py-2 !pr-11"
          >
            {subjects.map((s) => (
              <option key={s}>{s}</option>
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
      </div>

      <div>
        <label htmlFor={ids.message} className={labelClass}>
          Mensaje <span className="text-cyan-700" aria-hidden="true">*</span>
        </label>
        <textarea
          ref={messageRef}
          id={ids.message}
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => onBlur("message")}
          aria-invalid={Boolean(showError("message"))}
          aria-describedby={showError("message") ? `${ids.message}-err` : undefined}
          className="field-input resize-y !py-3"
          placeholder="Cuéntanos en qué podemos ayudarte"
        />
        {showError("message") && (
          <p id={`${ids.message}-err`} role="alert" className="mt-1.5 text-sm font-medium text-orange-700">
            {errors.message}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-wa !mt-6 w-full text-base sm:w-auto sm:px-8">
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
              Abrimos WhatsApp con tu mensaje. Solo presiona enviar y te responderemos pronto.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

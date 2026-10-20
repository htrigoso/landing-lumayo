"use client";

import { useEffect, useId, useState } from "react";
import { CalendarIcon, WhatsappIcon } from "@/components/icons";
import { HappyCoupleIllustration } from "@/components/lumayo-novias/HappyCoupleIllustration";
import { BrandDatePicker } from "@/components/ui/BrandDatePicker";
import {
  NOVIAS_PRESET_EVENT,
  formatPlanDate,
  getSmilePlan,
  treatmentLabels,
  type PlanStatus,
  type TimeBucket,
  type TreatmentKey,
} from "@/lib/novias";
import { noviasWhatsappMessage, whatsappUrl } from "@/lib/site";

type WhoOption = "Novia" | "Novio" | "Ambos";

type PresetDetail = { who: WhoOption; treatments: TreatmentKey[] };

const whoOptions: WhoOption[] = ["Novia", "Novio", "Ambos"];
const treatmentOptions = Object.keys(treatmentLabels) as TreatmentKey[];

const bucketOptions: { value: TimeBucket; label: string }[] = [
  { value: "12plus", label: "Más de 12 meses" },
  { value: "6to12", label: "6 a 12 meses" },
  { value: "3to6", label: "3 a 6 meses" },
  { value: "1to3", label: "1 a 3 meses" },
  { value: "lt1", label: "Menos de 1 mes" },
];

const statusPill: Record<PlanStatus, { label: string; className: string }> = {
  ok: { label: "Hay tiempo", className: "bg-aqua-100 text-azul-800" },
  tight: { label: "Justo a tiempo", className: "border border-border bg-azul-100 text-azul-800" },
  short: { label: "Poco tiempo", className: "bg-azul-700 text-white" },
};

const DEFAULT_SELECTED: TreatmentKey[] = ["limpieza", "blanqueamiento"];

/** Parses a `YYYY-MM-DD` value as a local date, avoiding the UTC shift of `new Date(string)`. */
function parseDateValue(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

type WeddingPlannerProps = {
  defaultFor?: WhoOption;
  defaultSelected?: TreatmentKey[];
};

export function WeddingPlanner({ defaultFor = "Ambos", defaultSelected = DEFAULT_SELECTED }: WeddingPlannerProps) {
  const id = useId();
  const [dateValue, setDateValue] = useState("");
  const [bucket, setBucket] = useState<TimeBucket | null>(null);
  const [who, setWho] = useState<WhoOption>(defaultFor);
  const [selected, setSelected] = useState<TreatmentKey[]>(defaultSelected);

  useEffect(() => {
    function handlePreset(event: Event) {
      const detail = (event as CustomEvent<PresetDetail>).detail;
      if (!detail) return;
      setWho(detail.who);
      setSelected(detail.treatments);
    }
    window.addEventListener(NOVIAS_PRESET_EVENT, handlePreset);
    return () => window.removeEventListener(NOVIAS_PRESET_EVENT, handlePreset);
  }, []);

  const weddingDate = parseDateValue(dateValue);
  const plan = getSmilePlan({ weddingDate, bucket, selected });
  const bucketLabel = bucketOptions.find((b) => b.value === bucket)?.label ?? null;
  const dateText = weddingDate ? formatPlanDate(weddingDate) : bucketLabel;

  const selectedLabels = treatmentOptions.filter((key) => selected.includes(key)).map((key) => treatmentLabels[key]);
  const message =
    selectedLabels.length > 0
      ? `Hola Lumayo, quisiera armar mi plan Lumayo Novias. Para: ${who}. Boda: ${dateText ?? "por definir"}. Tratamientos: ${selectedLabels.join(", ")}.`
      : noviasWhatsappMessage;

  function toggleTreatment(key: TreatmentKey) {
    setSelected((current) => (current.includes(key) ? current.filter((x) => x !== key) : [...current, key]));
  }

  function handleDateChange(value: string) {
    setDateValue(value);
    if (value) setBucket(null);
  }

  function handleBucketChange(value: TimeBucket) {
    setBucket(value);
    setDateValue("");
  }

  return (
    <div className="rounded-[2rem] border border-azul-700/20 p-2">
      <div className="rounded-[1.5rem] border border-azul-700/10 bg-white p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid content-start gap-8">
            <div className="grid gap-2">
              <label htmlFor={`${id}-date`} id={`${id}-date-label`} className="text-sm font-semibold text-azul-700">
                Fecha de tu boda
              </label>
              <BrandDatePicker
                id={`${id}-date`}
                name="weddingDate"
                labelId={`${id}-date-label`}
                value={dateValue}
                onChange={handleDateChange}
                disablePast
                className="w-full max-w-xs"
              />
            </div>

            <fieldset className="grid gap-3">
              <legend className="mb-3 text-sm font-semibold text-azul-700">¿No tienes fecha? Cuánto falta</legend>
              <div className="flex flex-wrap gap-2">
                {bucketOptions.map((option) => {
                  const checked = bucket === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold text-azul-700 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-azul-600 ${
                        checked ? "border-aqua-400 bg-aqua-50" : "border-border bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${id}-bucket`}
                        value={option.value}
                        checked={checked}
                        onChange={() => handleBucketChange(option.value)}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="grid gap-3">
              <legend className="mb-3 text-sm font-semibold text-azul-700">Para</legend>
              <div className="flex flex-wrap gap-3">
                {whoOptions.map((option) => {
                  const checked = who === option;
                  return (
                    <label
                      key={option}
                      className={`inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full border px-5 text-sm font-semibold text-azul-700 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-azul-600 ${
                        checked ? "border-aqua-400 bg-aqua-50" : "border-border bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${id}-for`}
                        value={option}
                        checked={checked}
                        onChange={() => setWho(option)}
                        className="size-4 accent-aqua-600"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="grid gap-2">
              <legend className="mb-3 text-sm font-semibold text-azul-700">Tratamientos</legend>
              {treatmentOptions.map((key) => {
                const checked = selected.includes(key);
                return (
                  <label
                    key={key}
                    className={`flex min-h-11 cursor-pointer items-center gap-4 rounded-2xl border p-3 text-base text-azul-700 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-azul-600 ${
                      checked ? "border-aqua-400 bg-aqua-50" : "border-border bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={key}
                      checked={checked}
                      onChange={() => toggleTreatment(key)}
                      className="size-4 accent-aqua-600"
                    />
                    {treatmentLabels[key]}
                  </label>
                );
              })}
            </fieldset>
          </div>

          <div aria-live="polite" className="flex flex-col gap-6">
            {!plan && (
              <div className="flex min-h-full flex-col items-center gap-5 rounded-2xl bg-azul-50 p-6 text-center sm:p-8">
                <HappyCoupleIllustration />
                <div className="grid gap-2">
                  <h4 className="font-display text-xl font-extrabold text-azul-700">Tu cronograma aparecerá aquí</h4>
                  <p className="text-pretty text-base text-text">
                    Elige la fecha de tu boda y tus tratamientos para ver tu cronograma.
                  </p>
                </div>
                <ol className="flex flex-wrap justify-center gap-3">
                  {["Fecha de boda", "Tratamientos", "Tu cronograma"].map((label, index) => (
                    <li
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-sm font-semibold text-azul-700"
                    >
                      <span className="grid size-6 place-items-center rounded-full bg-azul-700 text-xs font-extrabold text-white">
                        {index + 1}
                      </span>
                      {label}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {plan?.isPast && (
              <p className="rounded-2xl bg-azul-50 p-6 text-pretty text-base text-text">
                Esa fecha ya pasó. Elige una fecha futura.
              </p>
            )}

            {plan && !plan.isPast && (
              <ol className="relative grid gap-6 pl-2">
                <span aria-hidden="true" className="absolute top-3 bottom-3 left-[1.1rem] w-px bg-azul-700/20" />
                {plan.steps.map((step, index) => {
                  const pill = statusPill[step.status];
                  return (
                    <li key={step.key} className="relative grid grid-cols-[2.5rem_1fr] gap-4">
                      <span className="z-10 grid size-9 place-items-center rounded-full border border-azul-700/20 bg-white font-display text-sm font-extrabold text-azul-700">
                        {index + 1}
                      </span>
                      <div className="grid gap-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="text-base font-semibold text-azul-700">{step.label}</p>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${pill.className}`}>{pill.label}</span>
                        </div>
                        {step.startDate && (
                          <p className="text-sm font-semibold text-aqua-700">
                            Empieza el {formatPlanDate(step.startDate)}
                          </p>
                        )}
                        {!step.startDate && step.status === "tight" && (
                          <p className="text-sm font-semibold text-aqua-700">Empieza lo antes posible</p>
                        )}
                        <p className="text-sm leading-relaxed text-text">{step.note}</p>
                      </div>
                    </li>
                  );
                })}

                <li className="relative grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="z-10 grid size-9 place-items-center rounded-full bg-azul-700 text-white">
                    <CalendarIcon className="size-4" />
                  </span>
                  <div className="grid gap-1">
                    <p className="text-base font-semibold text-azul-700">Tu boda</p>
                    {dateText && <p className="text-sm text-text">{dateText}</p>}
                  </div>
                </li>

                {plan.touchUpDate && (
                  <li className="relative grid grid-cols-[2.5rem_1fr] gap-4">
                    <span className="z-10 grid size-9 place-items-center rounded-full border border-aqua-400 bg-aqua-100 text-azul-700">
                      <span aria-hidden="true" className="size-2 rounded-full bg-azul-700" />
                    </span>
                    <div className="grid gap-1">
                      <p className="text-base font-semibold text-azul-700">
                        Retoque · {formatPlanDate(plan.touchUpDate)}
                      </p>
                      <p className="text-sm leading-relaxed text-text">{plan.touchUpNote}</p>
                    </div>
                  </li>
                )}
              </ol>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-pretty text-sm text-text">
            Tu cronograma es una guía. El especialista confirma los tiempos en tu evaluación.
          </p>
          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa w-full shrink-0 text-base sm:w-fit"
          >
            <WhatsappIcon />
            Solicitar mi plan por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

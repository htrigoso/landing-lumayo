"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { CheckIcon, ImplantIcon, SparkleIcon, ToothIcon } from "@/components/icons";
import { useCardPlan } from "@/components/lumayo-card/CardPlanContext";
import { lumayoCard } from "@/lib/site";

const DEFAULT_AMOUNT = "500";
const QUICK_AMOUNTS = [200, 500, 1000, 2000] as const;
const SLIDER_MAX = 3000;
const SLIDER_STEP = 50;
const TIER_ICONS = [ToothIcon, SparkleIcon, ImplantIcon] as const;

const RING_RADIUS = 44;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const inputClass =
  "min-h-11 rounded-xl border border-line bg-white text-base text-azul-700 outline-none focus-visible:ring-2 focus-visible:ring-azul-600";

/** "S/ 125.00" -> 125, "50%" -> 50. Returns 0 when nothing numeric can be read. */
function parseNumber(value: string): number {
  const n = parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/** Negative or empty input counts as 0. */
function parseAmount(value: string): number {
  const n = parseFloat(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Count-up for a money value. Animates through a motion value; no setState involved. */
function AnimatedNumber({ value }: { value: number }) {
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(value);
  const text = useTransform(motionValue, (v) => v.toFixed(2));

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(motionValue, value, { duration: 0.6, ease: "easeOut" });
    return () => controls.stop();
  }, [motionValue, value, reduceMotion]);

  if (reduceMotion) {
    return <span className="tabular-nums">{value.toFixed(2)}</span>;
  }
  return <motion.span className="tabular-nums">{text}</motion.span>;
}

/** Circular savings gauge: the arc length represents the tier percent. */
function SavingsRing({ rate }: { rate: number }) {
  const dashOffset = RING_CIRCUMFERENCE * (1 - rate);

  return (
    <div className="relative size-32 shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          style={{ stroke: "var(--color-aqua-300)", strokeDashoffset: dashOffset }}
          className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-extrabold tabular-nums">
        {Math.round(rate * 100)}%
      </span>
    </div>
  );
}

export function SavingsCalculator() {
  const id = useId();
  const { plan } = useCardPlan();
  const annualFee = parseNumber(plan.annualFee);
  const [amountInput, setAmountInput] = useState(DEFAULT_AMOUNT);
  const [tierIndex, setTierIndex] = useState(0);

  const amount = parseAmount(amountInput);
  const tier = lumayoCard.tiers[tierIndex];
  const rate = parseNumber(tier.percent) / 100;
  const discount = amount * rate;
  const paid = amount - discount;
  const breakEven = rate > 0 ? Math.ceil(annualFee / rate) : 0;
  const breakEvenProgress = breakEven > 0 ? Math.min(amount / breakEven, 1) : 0;
  const paysItself = discount > annualFee;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
      {/* Controls */}
      <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_18px_40px_-28px_color-mix(in_srgb,var(--color-azul-950)_40%,transparent)] sm:p-8">
        <div className="flex items-center gap-3">
          <Image src="/brand/lumayo-isotipo.svg" alt="" width={28} height={28} unoptimized className="size-7" />
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-azul-700">Simulador</span>
        </div>

        <div className="mt-8 grid gap-3">
          <label htmlFor={`${id}-amount`} className="text-sm font-semibold text-azul-700">
            Monto del tratamiento
          </label>
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-xl font-extrabold text-azul-700"
            >
              S/
            </span>
            <input
              id={`${id}-amount`}
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              className={`${inputClass} h-14 w-full pl-12 pr-4 font-display text-2xl font-extrabold tabular-nums`}
            />
          </div>

          <input
            type="range"
            min={0}
            max={SLIDER_MAX}
            step={SLIDER_STEP}
            value={amount}
            onChange={(e) => setAmountInput(e.target.value)}
            aria-label="Monto del tratamiento en soles"
            className="mt-2 h-11 w-full cursor-pointer accent-azul-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul-600"
          />

          <div className="flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((value) => {
              const pressed = amount === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setAmountInput(String(value))}
                  className={`min-h-11 rounded-full border px-4 text-sm font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul-600 motion-reduce:transition-none ${
                    pressed
                      ? "border-azul-700 bg-azul-50 text-azul-700"
                      : "border-line bg-white text-ink-600 hover:border-azul-300"
                  }`}
                >
                  S/ {value}
                </button>
              );
            })}
          </div>
        </div>

        <fieldset className="mt-8 grid gap-3">
          <legend className="mb-3 text-sm font-semibold text-azul-700">Nivel de descuento</legend>
          {lumayoCard.tiers.map((t, i) => {
            const checked = tierIndex === i;
            const Icon = TIER_ICONS[i] ?? ToothIcon;
            return (
              <label
                key={t.percent}
                className={`relative flex min-h-11 cursor-pointer flex-col gap-3 rounded-2xl border-2 p-4 transition-colors motion-reduce:transition-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-azul-600 has-[:focus-visible]:ring-offset-2 ${
                  checked ? "border-azul-700 bg-azul-50" : "border-line bg-white hover:border-azul-300"
                }`}
              >
                <input
                  type="radio"
                  name={`${id}-tier`}
                  value={t.percent}
                  checked={checked}
                  onChange={() => setTierIndex(i)}
                  className="sr-only"
                />
                <span className="flex items-center gap-4">
                  <Icon className="size-8 shrink-0 text-azul-700" />
                  <span className="font-display text-3xl font-extrabold tabular-nums text-azul-700">{t.percent}</span>
                </span>
                <span className="text-sm font-semibold text-azul-700">{t.title}</span>
                <span className="text-sm text-ink-600">{t.items.slice(0, 2).join(" · ")}</span>
                {checked && (
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 inline-flex size-6 items-center justify-center rounded-full bg-azul-700 text-white"
                  >
                    <CheckIcon className="size-3.5" />
                  </span>
                )}
              </label>
            );
          })}
        </fieldset>
      </div>

      {/* Result */}
      <div className="relative isolate order-first overflow-hidden rounded-3xl bg-azul-700 p-6 text-white sm:p-8 lg:order-none">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_10%,color-mix(in_srgb,var(--color-aqua-400)_30%,transparent),transparent_60%)]"
        />
        <IsotypeWatermark tone="dark" className="-bottom-16 -right-16 h-64 w-auto" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-6 left-0 hidden border-l-2 border-dashed border-white/15 lg:block"
        />

        <div aria-hidden="true" className="relative flex flex-col gap-8">
          <div className="flex items-center gap-6">
            <SavingsRing rate={rate} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-azul-100">Ahorras</p>
              <p className="mt-1 font-display text-4xl font-extrabold tabular-nums text-aqua-300">
                <span>S/ </span>
                <AnimatedNumber value={discount} />
              </p>
            </div>
          </div>

          <div className="grid gap-3 text-sm">
            <div className="grid gap-1.5">
              <div className="flex justify-between tabular-nums">
                <span className="text-azul-100">Sin tarjeta</span>
                <span>S/ {amount.toFixed(2)}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white/25 transition-[width] duration-700 ease-out motion-reduce:transition-none"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <div className="flex justify-between tabular-nums">
                <span className="text-azul-100">Con Lumayo Card</span>
                <span className="text-white font-semibold">S/ {paid.toFixed(2)}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-aqua-300 transition-[width] duration-700 ease-out motion-reduce:transition-none"
                  style={{ width: `${(1 - rate) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {breakEven > 0 && (
            <div className="grid gap-3 border-t border-white/15 pt-6">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-aqua-300 transition-[width] duration-700 ease-out motion-reduce:transition-none"
                  style={{ width: `${breakEvenProgress * 100}%` }}
                />
              </div>
              <p className="text-base leading-relaxed">
                {paysItself ? (
                  <>
                    ¡Tu tarjeta ya se pagó sola! Ahorro neto <strong className="tabular-nums">S/ {(discount - annualFee).toFixed(2)}</strong>
                  </>
                ) : (
                  <>
                    Te faltan <strong className="tabular-nums">S/ {(annualFee - discount).toFixed(2)}</strong> de ahorro para recuperar el costo anual
                  </>
                )}
              </p>
              <p className="text-xs text-azul-100/90">
                Tu tarjeta se paga sola con <span className="tabular-nums">S/ {breakEven.toFixed(2)}</span> en este nivel
              </p>
            </div>
          )}
        </div>

        <p aria-live="polite" className="sr-only">
          Pagas S/ {paid.toFixed(2)}. Ahorras S/ {discount.toFixed(2)}. Tu tarjeta se paga sola con S/ {breakEven.toFixed(2)} en este nivel.
        </p>
      </div>
    </div>
  );
}

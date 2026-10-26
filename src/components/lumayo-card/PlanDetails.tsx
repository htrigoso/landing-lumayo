"use client";

import { CheckIcon } from "@/components/icons";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { FamilyOrbit } from "@/components/lumayo-card/FamilyOrbit";
import { useCardPlan } from "@/components/lumayo-card/CardPlanContext";

/** Annual fee, re-affiliation fee and the additional-members chip for the selected plan. */
export function PlanFees() {
  const { plan } = useCardPlan();

  return (
    <>
      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_12px_30px_-20px_color-mix(in_srgb,var(--color-azul-950)_35%,transparent)]">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-text">Costo único anual</dt>
          <dd className="mt-2 font-display text-3xl font-extrabold text-primary">{plan.annualFee}</dd>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_12px_30px_-20px_color-mix(in_srgb,var(--color-azul-950)_35%,transparent)]">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-text">Re-afiliación</dt>
          <dd className="mt-2 font-display text-3xl font-extrabold text-primary">{plan.reaffiliationFee}</dd>
        </div>
      </dl>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-surface-mint/70 px-4 py-2 text-sm font-semibold text-primary">
        <CheckIcon className="size-4 text-accent-text" />
        Titular + hasta {plan.maxAdditional} adicionales
      </p>
    </>
  );
}

/** Family section heading and member count for the selected plan. The perks and CTA stay on the server. */
export function PlanFamilyCopy() {
  const { plan } = useCardPlan();
  const people = plan.maxAdditional + 1;

  return (
    <>
      <SectionHeading
        number="04"
        label="Para toda la familia"
        id="familia-title"
        layout="stack"
        title={<>Titular y <strong>{plan.maxAdditional} adicionales</strong></>}
        description="Una sola membresía para tu familia: protege a quienes más quieres con un solo plan."
      />
      <p className="mt-8 font-display text-6xl font-extrabold leading-none text-primary">1 + {plan.maxAdditional}</p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent-text">{people} personas, una sola membresía</p>
    </>
  );
}

/** Family orbit sized to the selected plan. */
export function PlanFamilyOrbit() {
  const { plan } = useCardPlan();

  return <FamilyOrbit count={plan.maxAdditional} />;
}

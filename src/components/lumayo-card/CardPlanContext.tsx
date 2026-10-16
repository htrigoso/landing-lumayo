"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { lumayoCard, type CardPlanKey } from "@/lib/site";

type CardPlan = (typeof lumayoCard.plans)[CardPlanKey];

type CardPlanContextValue = {
  variant: CardPlanKey;
  setVariant: (variant: CardPlanKey) => void;
  plan: CardPlan;
};

const CardPlanContext = createContext<CardPlanContextValue | null>(null);

/** Shares the selected Lumayo Card plan (classic or gold) with every component on the page that depends on it. */
export function CardPlanProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CardPlanKey>("classic");

  return (
    <CardPlanContext.Provider value={{ variant, setVariant, plan: lumayoCard.plans[variant] }}>
      {children}
    </CardPlanContext.Provider>
  );
}

export function useCardPlan(): CardPlanContextValue {
  const context = useContext(CardPlanContext);
  if (!context) {
    throw new Error("useCardPlan debe usarse dentro de <CardPlanProvider>.");
  }
  return context;
}

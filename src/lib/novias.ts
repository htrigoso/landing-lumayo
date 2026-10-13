export type TreatmentKey = "limpieza" | "ortodoncia" | "carillas" | "diseno" | "blanqueamiento";
export type PlanStatus = "ok" | "tight" | "short";
export type TimeBucket = "12plus" | "6to12" | "3to6" | "1to3" | "lt1";

export type PlanStep = {
  key: TreatmentKey;
  label: string;
  status: PlanStatus;
  weeksBefore: number | null;
  startDate: Date | null;
  note: string;
};

export type SmilePlan = {
  weeksLeft: number;
  steps: PlanStep[];
  touchUpDate: Date | null;
  touchUpNote: string;
  isPast: boolean;
};

/** Weeks represented by each "how much time is left" option when no date is known. */
export const bucketWeeks: Record<TimeBucket, number> = {
  "12plus": 56,
  "6to12": 39,
  "3to6": 20,
  "1to3": 9,
  lt1: 3,
};

export const treatmentLabels: Record<TreatmentKey, string> = {
  limpieza: "Limpieza dental",
  ortodoncia: "Ortodoncia con brackets",
  carillas: "Carillas de porcelana",
  diseno: "Diseño de sonrisa",
  blanqueamiento: "Blanqueamiento dental",
};

/** Window event used by page links to preset the planner (who + treatments). */
export const NOVIAS_PRESET_EVENT = "novias:preset";

// TODO: confirmar con la clínica
const treatmentWeeks: Record<TreatmentKey, { ideal: number; min: number }> = {
  limpieza: { ideal: 8, min: 1 },
  ortodoncia: { ideal: 52, min: 26 },
  carillas: { ideal: 12, min: 8 },
  diseno: { ideal: 12, min: 8 },
  blanqueamiento: { ideal: 4, min: 2 },
};

const DAY_MS = 86_400_000;
const TOUCH_UP_DAYS_BEFORE = 4;

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Calendar-day arithmetic on local midnights, so DST changes do not shift dates. */
function addDays(d: Date, days: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
}

export function getSmilePlan(input: {
  weddingDate?: Date | null;
  bucket?: TimeBucket | null;
  selected: TreatmentKey[];
  today?: Date;
}): SmilePlan | null {
  const { weddingDate, bucket, today: todayInput } = input;
  const selected = Array.from(new Set(input.selected));
  if (selected.length === 0) return null;
  if (!weddingDate && !bucket) return null;

  const today = startOfDay(todayInput ?? new Date());
  const wedding = weddingDate ? startOfDay(weddingDate) : null;

  if (wedding && wedding.getTime() < today.getTime()) {
    return { isPast: true, steps: [], touchUpDate: null, touchUpNote: "", weeksLeft: 0 };
  }

  const weeksLeft = wedding
    ? Math.floor(Math.round((wedding.getTime() - today.getTime()) / DAY_MS) / 7)
    : bucketWeeks[bucket as TimeBucket];

  const steps: PlanStep[] = selected.map((key) => {
    const label = treatmentLabels[key];
    const { ideal, min } = treatmentWeeks[key];

    if (weeksLeft >= ideal) {
      return {
        key,
        label,
        status: "ok",
        weeksBefore: ideal,
        startDate: wedding ? addDays(wedding, -ideal * 7) : null,
        note: "Es el momento ideal para empezar.",
      };
    }
    if (weeksLeft >= min) {
      return {
        key,
        label,
        status: "tight",
        weeksBefore: weeksLeft,
        startDate: wedding ? today : null,
        note: "Hay que empezar pronto para llegar con calma.",
      };
    }
    return {
      key,
      label,
      status: "short",
      weeksBefore: null,
      startDate: null,
      note: "El tiempo es corto: consúltanos alternativas en tu evaluación.",
    };
  });

  steps.sort((a, b) => {
    if (a.weeksBefore === null && b.weeksBefore === null) return 0;
    if (a.weeksBefore === null) return 1;
    if (b.weeksBefore === null) return -1;
    return b.weeksBefore - a.weeksBefore;
  });

  const needsTouchUp = wedding !== null && selected.includes("blanqueamiento");

  return {
    isPast: false,
    weeksLeft,
    steps,
    touchUpDate: needsTouchUp ? addDays(wedding, -TOUCH_UP_DAYS_BEFORE) : null,
    touchUpNote: needsTouchUp
      ? "Retoque de blanqueamiento unos 3 o 4 días antes, si tu odontólogo lo indica."
      : "",
  };
}

export function formatPlanDate(d: Date): string {
  return d.toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });
}

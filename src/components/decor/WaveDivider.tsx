type WaveDividerProps = {
  /** Background of the section above (Tailwind bg class). */
  from: string;
  /** Fill color of the section below (CSS color). */
  to: string;
  /** Mirror horizontally for variety between consecutive dividers. */
  flip?: boolean;
};

/** Soft wave transition between two sections of different colors. */
export function WaveDivider({ from, to, flip = false }: WaveDividerProps) {
  return (
    <div aria-hidden="true" className={`relative -mb-px ${from}`}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={`block h-12 w-full sm:h-16 lg:h-20 ${flip ? "-scale-x-100" : ""}`}>
        <path d="M0 52 C 240 92, 480 92, 720 58 S 1200 6, 1440 40 V90 H0Z" fill={to} opacity="0.35" />
        <path d="M0 64 C 260 100, 520 96, 760 66 S 1220 22, 1440 54 V90 H0Z" fill={to} />
      </svg>
    </div>
  );
}

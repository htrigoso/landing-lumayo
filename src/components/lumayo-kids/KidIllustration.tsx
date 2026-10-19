const palette = {
  navy: "var(--color-azul-700)",
  deepNavy: "var(--color-azul-950)",
  turquoise: "var(--color-aqua-500)",
  water: "var(--color-aqua-300)",
  celeste: "var(--color-azul-100)",
  ground: "var(--color-azul-200)",
  skin: "#f1c9a5",
  skinDeep: "#d9a37c",
  white: "#ffffff",
} as const;

const SPARKLE_PATH = "M0 -8 Q1 -1 8 0 Q1 1 0 8 Q-1 1 -8 0 Q-1 -1 0 -8 Z";
const TOOTH_PATH =
  "M0 -10 C-10 -18 -24 -16 -24 2 C-24 18 -16 34 -9 38 C-5 40 -3 28 0 28 C3 28 5 40 9 38 C16 34 24 18 24 2 C24 -16 10 -18 0 -10 Z";

const ANIMATION_CSS = `
.kids-bounce { animation: kids-bounce 1.8s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
.kids-float { animation: kids-float 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
.kids-wave { animation: kids-wave 2.4s ease-in-out infinite; transform-box: fill-box; transform-origin: 0% 100%; }
@keyframes kids-bounce { 0%, 100% { transform: translateY(0); } 20% { transform: translateY(-8px); } 40% { transform: translateY(0); } }
@keyframes kids-float { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(-6px); opacity: 0.6; } }
@keyframes kids-wave { 0%, 100% { transform: rotate(0deg); } 35%, 60% { transform: rotate(-30deg); } }
@media (prefers-reduced-motion: reduce) { .kids-bounce, .kids-float, .kids-wave { animation: none; } }
`;

type ChildProps = {
  x: number;
  hair: string;
  shirt: string;
  animated?: boolean;
  waving?: boolean;
};

/** Simple flat child: head, hair cap, smile with teeth, and a shirt. Origin is the neck. */
function Child({ x, hair, shirt, animated = false, waving = false }: ChildProps) {
  return (
    <g transform={`translate(${x} 0)`}>
      <g className={animated ? "kids-bounce" : undefined}>
        <path d="M-30 210 V168 Q-30 150 0 150 Q30 150 30 168 V210 Z" style={{ fill: shirt }} />
        <rect x={-6} y={140} width={12} height={14} fill={palette.skinDeep} />
        <circle cx={0} cy={118} r={30} fill={palette.skin} />
        <path d="M-30 116 Q-32 84 0 84 Q32 84 30 116 Q22 100 8 98 Q-6 98 -30 116 Z" style={{ fill: hair }} />
        <circle cx={-11} cy={120} r={3} style={{ fill: palette.deepNavy }} />
        <circle cx={11} cy={120} r={3} style={{ fill: palette.deepNavy }} />
        <circle cx={-18} cy={130} r={4} fill={palette.skinDeep} opacity={0.5} />
        <circle cx={18} cy={130} r={4} fill={palette.skinDeep} opacity={0.5} />
        <path d="M-12 128 Q0 142 12 128 Z" fill={palette.white} style={{ stroke: palette.deepNavy }} strokeWidth={1.5} strokeLinejoin="round" />
        {waving && (
          <g transform="translate(28 176)">
            <g className="kids-wave">
              <path d="M0 0 L24 -26" style={{ stroke: shirt }} strokeWidth={12} strokeLinecap="round" />
              <circle cx={26} cy={-30} r={7} fill={palette.skin} />
            </g>
          </g>
        )}
      </g>
    </g>
  );
}

/** Flat illustration of two children smiling at a dental clinic, with a tooth and sparkles. */
export function KidIllustration() {
  return (
    <svg viewBox="0 0 400 320" role="img" aria-label="Ilustración de niños sonriendo en el consultorio dental" className="h-auto w-full max-w-sm">
      <style>{ANIMATION_CSS}</style>

      <ellipse cx={200} cy={290} rx={170} ry={14} style={{ fill: palette.ground }} />
      <circle cx={200} cy={150} r={130} style={{ fill: palette.celeste }} />

      <Child x={130} hair={palette.navy} shirt={palette.turquoise} waving />
      <Child x={270} hair={palette.deepNavy} shirt={palette.water} animated />

      <g transform="translate(200 40)">
        <g className="kids-float">
          <path d={TOOTH_PATH} fill={palette.white} style={{ stroke: palette.navy }} strokeWidth={2} strokeLinejoin="round" />
          <path d="M-8 -2 Q-4 -6 0 -2" fill="none" style={{ stroke: palette.water }} strokeWidth={2} strokeLinecap="round" />
        </g>
      </g>

      <g className="kids-float">
        <path d={SPARKLE_PATH} transform="translate(72 70) scale(1.2)" style={{ fill: palette.water }} />
      </g>
      <g className="kids-float">
        <path d={SPARKLE_PATH} transform="translate(330 60) scale(1)" style={{ fill: palette.turquoise }} />
      </g>
      <g className="kids-float">
        <path d={SPARKLE_PATH} transform="translate(340 200) scale(0.8)" style={{ fill: palette.water }} />
      </g>
      <circle cx={60} cy={200} r={3} style={{ fill: palette.turquoise }} />
      <circle cx={345} cy={250} r={3} style={{ fill: palette.navy }} opacity={0.7} />
    </svg>
  );
}

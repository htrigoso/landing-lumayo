const palette = {
  navy: "var(--color-azul-700)",
  deepNavy: "var(--color-azul-950)",
  clinical: "var(--color-azul-800)",
  turquoise: "var(--color-aqua-500)",
  water: "var(--color-aqua-300)",
  celeste: "var(--color-azul-100)",
  ground: "var(--color-azul-200)",
  leaf: "#2f9e8f",
  skinBride: "#f1c9a5",
  skinGroom: "#d9a37c",
  hairBride: "#2b2330",
  hairGroom: "#3a2a24",
  ink: "#2b2330",
  blush: "#f6c4b3",
  white: "#ffffff",
} as const;

const HEART_PATH = "M0 3 C-5 -1 -3 -5 0 -2 C3 -5 5 -1 0 3 Z";
const SPARKLE_PATH = "M0 -8 Q1 -1 8 0 Q1 1 0 8 Q-1 1 -8 0 Q-1 -1 0 -8 Z";
const ISOTYPE_PATHS: readonly string[] = [
  "M 746.542969 580.785156 C 744.914062 577.324219 742.738281 570.878906 741.503906 567.230469 C 735.28125 549.082031 731.085938 530.300781 728.996094 511.234375 C 727.675781 498.394531 726.214844 471.792969 735.027344 461.332031 C 746.078125 448.214844 770.265625 448.5625 784.21875 456.476562 C 788.222656 458.75 792.316406 461.375 796.351562 463.832031 C 801.421875 466.957031 806.597656 469.902344 811.875 472.667969 C 832.359375 483.4375 856.753906 492.253906 880.128906 486.515625 C 881.476562 486.183594 883.167969 485.675781 884.53125 485.539062 C 884.234375 485.695312 883.933594 485.84375 883.628906 485.988281 C 880.140625 487.628906 874.234375 489.496094 870.539062 490.460938 C 850.980469 495.714844 833.28125 492.488281 814.898438 485.011719 C 800.289062 479.066406 780.96875 466.207031 765.121094 473.960938 C 755.78125 478.527344 750.433594 486.632812 747.160156 496.152344 L 746.164062 499.632812 C 736.921875 538.207031 758.230469 600.761719 777.9375 634.183594 C 779.015625 636.011719 780.558594 638.039062 781.734375 639.847656 L 781.621094 640 C 768.996094 626.871094 753.769531 600.308594 747.535156 583.238281 Z M 746.542969 580.785156 ",
  "M 931.847656 440.28125 C 947.601562 437.75 953.816406 452.707031 954.738281 465.664062 C 956.5 490.449219 949.324219 534.628906 933.480469 554.035156 C 937.496094 543.34375 941.554688 523.933594 943.089844 512.199219 C 944.546875 501.042969 947.457031 474.871094 940.671875 464.917969 C 938.382812 461.558594 930.152344 459.910156 926.15625 459.4375 C 899.335938 457.082031 869.171875 471.707031 842.171875 472.910156 C 830.605469 473.421875 821.265625 472.625 812.367188 464.667969 C 842.292969 473.335938 872.820312 460.523438 900.292969 449.699219 C 909.972656 445.882812 921.496094 441.25 931.847656 440.28125 Z M 931.847656 440.28125 ",
];

const ANIMATION_CSS = `
.novias-float { animation: novias-float 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
.novias-twinkle { animation: novias-twinkle 3.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes novias-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes novias-twinkle { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
.novias-hop { animation: novias-jump 1.8s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
.novias-head { animation: novias-tilt 2.6s ease-in-out infinite; transform-box: view-box; transform-origin: 0px 18px; }
.novias-wave { animation: novias-wave 2.2s ease-in-out infinite; transform-box: view-box; transform-origin: 0px 0px; }
.novias-mouth { animation: novias-mouth 2.4s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 50%; }
.novias-veil { animation: novias-sway 3.2s ease-in-out infinite; transform-box: view-box; transform-origin: 0px -20px; }
.novias-bouquet { animation: novias-bounce 1.8s ease-in-out infinite; transform-box: view-box; transform-origin: -31px 94px; }
.novias-blush { animation: novias-blush 2s ease-in-out infinite; }
.novias-rise { animation: novias-rise 3.1s ease-in-out infinite; }
@keyframes novias-jump { 0%, 100% { transform: translateY(0) scaleY(1); } 20% { transform: translateY(-6px) scaleY(1); } 28% { transform: translateY(0) scaleY(0.98); } 36% { transform: translateY(0) scaleY(1); } }
@keyframes novias-tilt { 0%, 100% { transform: rotate(-3.5deg); } 50% { transform: rotate(3.5deg); } }
@keyframes novias-wave { 0%, 100% { transform: rotate(0deg); } 35%, 60% { transform: rotate(-35deg); } }
@keyframes novias-sway { 0%, 100% { transform: rotate(-2.5deg); } 50% { transform: rotate(2.5deg); } }
@keyframes novias-bounce { 0%, 100% { transform: rotate(0deg); } 20% { transform: rotate(6deg); } 40% { transform: rotate(-6deg); } 60% { transform: rotate(0deg); } }
@keyframes novias-blush { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
@keyframes novias-rise { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 1; } 100% { transform: translateY(-40px); opacity: 0; } }
@keyframes novias-mouth { 0%, 100% { transform: scaleX(1) scaleY(1); } 50% { transform: scaleX(1.05) scaleY(1.12); } }
@media (prefers-reduced-motion: reduce) { .novias-anim { animation: none; } }
`;

type MotionProps = { delay: number; duration: number };

function Heart({
  x,
  y,
  scale = 1,
  fill,
  stroke,
  delay,
  duration,
  motion = "novias-float",
}: MotionProps & { x: number; y: number; scale?: number; fill: string; stroke?: string; motion?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d={HEART_PATH}
        strokeWidth={1.2}
        className={`novias-anim ${motion}`}
        style={{ fill, stroke, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
      />
    </g>
  );
}

function Sparkle({
  x,
  y,
  scale = 1,
  fill,
  stroke,
  delay,
  duration,
}: MotionProps & { x: number; y: number; scale?: number; fill: string; stroke?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d={SPARKLE_PATH}
        strokeWidth={0.8}
        className="novias-anim novias-twinkle"
        style={{ fill, stroke, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
      />
    </g>
  );
}

function Arch() {
  return (
    <g>
      <path
        d="M75 310 V150 A125 125 0 0 1 325 150 V310"
        fill="none"
        style={{ stroke: palette.navy }}
        strokeOpacity={0.25}
        strokeWidth={1.5}
      />
      <path d="M85 300 V150 A115 115 0 0 1 315 150 V300 Z" style={{ fill: palette.celeste }} />
      <ellipse cx={200} cy={300} rx={165} ry={9} style={{ fill: palette.ground }} />
    </g>
  );
}

function Bride() {
  return (
    <g transform="translate(157 146)">
      <g className="novias-anim novias-hop">
        <g className="novias-anim novias-veil">
          <path
            d="M-7 -22 C-29 -22 -41 4 -43 44 C-45 84 -49 116 -61 152 L-29 152 C-25 116 -23 84 -19 50 C-15 18 -11 -4 3 -18 Z"
            fill={palette.white}
            opacity={0.85}
            style={{ stroke: palette.water }}
            strokeWidth={1}
          />
        </g>

        <path d="M-19 38 L-31 94" stroke={palette.skinBride} strokeWidth={8} strokeLinecap="round" />

        <path
          d="M-21 34 Q0 26 21 34 L17 72 L35 150 Q0 158 -37 150 L-17 72 Z"
          fill={palette.white}
        />
        <path d="M3 72 L17 72 L35 150 L3 150 Z" style={{ fill: palette.celeste }} />
        <path d="M-37 150 Q0 158 35 150" fill="none" style={{ stroke: palette.water }} strokeWidth={3} />
        <path d="M-17 72 Q0 76 17 72" fill="none" style={{ stroke: palette.water }} strokeWidth={2} />

        <g className="novias-anim novias-bouquet">
          <path d="M-31 94 L-37 120" style={{ stroke: palette.water }} strokeWidth={2} />
          <path d="M-43 122 Q-36 131 -29 125 Q-36 116 -43 122 Z" fill={palette.leaf} />
          <circle cx={-48} cy={110} r={7.5} style={{ fill: palette.turquoise }} />
          <circle cx={-35} cy={106} r={7.5} fill={palette.white} style={{ stroke: palette.water }} strokeWidth={1} />
          <circle cx={-41} cy={117} r={7} fill={palette.white} style={{ stroke: palette.water }} strokeWidth={1} />
          <circle cx={-43} cy={101} r={5} style={{ fill: palette.turquoise }} />
          <circle cx={-31} cy={94} r={6} fill={palette.skinBride} />
        </g>

        <path d="M-19 38 L-23 56" stroke={palette.white} strokeWidth={11} strokeLinecap="round" />
        <path d="M17 40 L38 78" stroke={palette.skinBride} strokeWidth={8} strokeLinecap="round" />
        <path d="M17 40 L23 58" stroke={palette.white} strokeWidth={11} strokeLinecap="round" />
        <circle cx={38} cy={78} r={6.5} fill={palette.skinBride} style={{ stroke: palette.water }} strokeWidth={0.8} />

        <rect x={-7} y={16} width={14} height={18} fill={palette.skinBride} />
        <g className="novias-anim novias-head">
          <circle cx={-19} cy={5} r={8.5} fill={palette.hairBride} />
          <circle cx={0} cy={0} r={20} fill={palette.skinBride} />
          <path
            d="M-20 0 Q-20 -24 0 -24 Q20 -24 20 0 Q13 -14 0 -15 Q-13 -14 -20 0 Z"
            fill={palette.hairBride}
          />
          <Face
            browY={-8}
            eyeY={2}
            eyeOffset={7}
            blushY={10}
            blushX={13}
            mouthTop={9}
            mouthDepth={15}
            mouthHalfWidth={8}
            hair={palette.hairBride}
          />
        </g>
      </g>
    </g>
  );
}

function Groom() {
  return (
    <g transform="translate(245 128)">
      <g className="novias-anim novias-hop">
        <path d="M-7 18 H7 V40 H-7 Z" fill={palette.skinGroom} />

        <rect x={-20} y={124} width={18} height={44} style={{ fill: palette.deepNavy }} />
        <rect x={2} y={124} width={18} height={44} style={{ fill: palette.deepNavy }} />
        <ellipse cx={-11} cy={169} rx={10} ry={4} fill={palette.ink} />
        <ellipse cx={11} cy={169} rx={10} ry={4} fill={palette.ink} />

        <path d="M-32 56 Q0 44 32 56 L36 130 L-36 130 Z" style={{ fill: palette.navy }} />
        <path d="M-12 46 L0 80 L12 46 Z" fill={palette.white} />
        <path d="M-9 46 L-19 90 L-1 82 Z" style={{ fill: palette.deepNavy }} />
        <path d="M9 46 L19 90 L1 82 Z" style={{ fill: palette.deepNavy }} />
        <path d="M0 52 L-7 47 L-7 57 Z M0 52 L7 47 L7 57 Z" style={{ fill: palette.turquoise }} />
        <circle cx={-9} cy={74} r={3.5} fill={palette.white} style={{ stroke: palette.water }} strokeWidth={1} />
        <circle cx={-9} cy={74} r={1.4} style={{ fill: palette.turquoise }} />
        <g transform="translate(14 104) scale(0.091) translate(-841.36 -538.88)" fill={palette.white}>
          {ISOTYPE_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        <g transform="translate(27 58)">
          <g className="novias-anim novias-wave">
            <path d="M0 0 L6 64" style={{ stroke: palette.deepNavy }} strokeWidth={11} strokeLinecap="round" />
            <circle cx={8} cy={68} r={6} fill={palette.skinGroom} />
          </g>
        </g>
        <path d="M-27 58 L-50 96" style={{ stroke: palette.deepNavy }} strokeWidth={11} strokeLinecap="round" />
        <circle cx={-50} cy={96} r={7} fill={palette.skinGroom} />
        <path d="M-48.5 88.5 L-43.5 91.5" stroke={palette.white} strokeWidth={3} strokeLinecap="round" />

        <g transform="translate(0 10)">
          <g className="novias-anim novias-head" style={{ animationDelay: "1.3s" }}>
            <circle cx={0} cy={0} r={22} fill={palette.skinGroom} />
            <path
              d="M-22 0 Q-25 -26 0 -27 Q25 -26 22 0 Q17 -12 5 -16 Q-9 -12 -22 0 Z"
              fill={palette.hairGroom}
            />
            <Face
              browY={-10}
              eyeY={0}
              eyeOffset={7}
              blushY={8}
              blushX={14}
              mouthTop={8}
              mouthDepth={16}
              mouthHalfWidth={9}
              mouthDelay="0.6s"
              hair={palette.hairGroom}
            />
          </g>
        </g>
      </g>
    </g>
  );
}

type FaceProps = {
  browY: number;
  eyeY: number;
  eyeOffset: number;
  blushY: number;
  blushX: number;
  mouthTop: number;
  mouthDepth: number;
  mouthHalfWidth: number;
  mouthDelay?: string;
  hair: string;
};

function Face({ browY, eyeY, eyeOffset, blushY, blushX, mouthTop, mouthDepth, mouthHalfWidth, mouthDelay = "0s", hair }: FaceProps) {
  const eyeArc = 4;
  const mouthBottomControl = mouthTop + mouthDepth;
  return (
    <g>
      <circle cx={-blushX} cy={blushY} r={3.5} fill={palette.blush} opacity={0.5} className="novias-anim novias-blush" />
      <circle cx={blushX} cy={blushY} r={3.5} fill={palette.blush} opacity={0.5} className="novias-anim novias-blush" />

      <path
        d={`M${-eyeOffset - eyeArc} ${eyeY} Q${-eyeOffset} ${eyeY - 5} ${-eyeOffset + eyeArc} ${eyeY} M${eyeOffset - eyeArc} ${eyeY} Q${eyeOffset} ${eyeY - 5} ${eyeOffset + eyeArc} ${eyeY}`}
        fill="none"
        stroke={palette.ink}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d={`M${-eyeOffset - eyeArc} ${browY} Q${-eyeOffset} ${browY - 3} ${-eyeOffset + eyeArc} ${browY} M${eyeOffset - eyeArc} ${browY} Q${eyeOffset} ${browY - 3} ${eyeOffset + eyeArc} ${browY}`}
        fill="none"
        style={{ stroke: hair }}
        strokeWidth={1.6}
        strokeLinecap="round"
      />

      <g className="novias-anim novias-mouth" style={{ animationDelay: mouthDelay }}>
        <path
          d={`M${-mouthHalfWidth} ${mouthTop} Q0 ${mouthBottomControl} ${mouthHalfWidth} ${mouthTop} Z`}
          fill={palette.white}
          style={{ stroke: palette.deepNavy }}
          strokeWidth={1.3}
          strokeLinejoin="round"
        />
        <path d={`M0 ${mouthTop + 0.5} L0 ${mouthTop + 6}`} style={{ stroke: palette.deepNavy }} strokeWidth={1} />
      </g>
    </g>
  );
}

function Decorations() {
  return (
    <g>
      <Heart x={62} y={96} scale={1.3} fill={palette.turquoise} delay={0} duration={4} />
      <Heart x={336} y={70} scale={1.1} fill={palette.clinical} delay={1.2} duration={4.5} />
      <Heart x={330} y={170} scale={1} fill={palette.white} stroke={palette.navy} delay={0.6} duration={3.6} />
      <Heart x={46} y={190} scale={0.9} fill={palette.clinical} delay={2} duration={3.8} />
      <Heart x={346} y={248} scale={1.2} fill={palette.turquoise} delay={1.6} duration={4.4} />
      <Heart x={268} y={62} scale={0.9} fill={palette.white} stroke={palette.navy} delay={2.6} duration={3.4} />

      <Sparkle x={96} y={58} scale={1.2} fill={palette.water} delay={0} duration={3.5} />
      <Sparkle x={120} y={30} scale={1} fill={palette.white} stroke={palette.water} delay={1.4} duration={4} />
      <Sparkle x={306} y={36} scale={1} fill={palette.water} delay={0.8} duration={3.2} />
      <Sparkle x={46} y={128} scale={0.9} fill={palette.water} delay={2.2} duration={4.2} />
      <Sparkle x={360} y={122} scale={1.1} fill={palette.turquoise} delay={1} duration={3.7} />
      <Sparkle x={300} y={288} scale={0.8} fill={palette.water} delay={0.4} duration={3.9} />
      <Sparkle x={40} y={262} scale={0.8} fill={palette.turquoise} delay={1.8} duration={3.3} />

      <circle cx={72} cy={230} r={2.5} style={{ fill: palette.turquoise }} />
      <circle cx={340} cy={200} r={3} style={{ fill: palette.navy }} opacity={0.7} />
      <circle cx={222} cy={16} r={2.5} style={{ fill: palette.water }} />
      <circle cx={30} cy={150} r={2} style={{ fill: palette.navy }} opacity={0.6} />
      <path d="M60 262 L70 254" style={{ stroke: palette.clinical }} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M326 96 L338 90" style={{ stroke: palette.water }} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M270 22 L282 28" style={{ stroke: palette.turquoise }} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M352 180 L358 194" style={{ stroke: palette.turquoise }} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={40} cy={226} r={6} fill="none" style={{ stroke: palette.clinical }} strokeWidth={1.5} />
      <circle cx={358} cy={216} r={5} fill="none" style={{ stroke: palette.turquoise }} strokeWidth={1.8} />
    </g>
  );
}

type HappyCoupleIllustrationProps = {
  className?: string;
};

export function HappyCoupleIllustration({ className = "h-auto w-full max-w-sm" }: HappyCoupleIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 320"
      role="img"
      aria-label="Ilustración de una pareja de novios sonriendo"
      className={className}
    >
      <style>{ANIMATION_CSS}</style>
      <Arch />
      <Decorations />
      <Bride />
      <Groom />
      <Heart x={196} y={222} scale={0.7} fill={palette.turquoise} delay={0} duration={3.1} motion="novias-rise" />
      <Heart x={203} y={226} scale={0.55} fill={palette.clinical} delay={1.1} duration={3.7} motion="novias-rise" />
      <Heart x={210} y={220} scale={0.6} fill={palette.water} delay={2.2} duration={2.9} motion="novias-rise" />
    </svg>
  );
}

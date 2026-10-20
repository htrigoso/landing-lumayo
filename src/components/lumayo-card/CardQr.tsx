import { useId } from "react";

// TODO: el QR real lo genera el sistema de la clínica por cliente; este SVG es ilustrativo, no codifica nada y no es escaneable.

const SIZE = 25;
const FINDER = 8; // 7x7 finder plus 1 module of separation
const CENTER = 12; // middle module of a 25x25 grid
const CENTER_HALF = 3; // reserved 7x7 square around the centre (CENTER +/- 3)
const DENSITY = 0.48;
const SEED = 0x1a2b3c;

/** Deterministic PRNG (mulberry32). Same seed, same sequence, on server and client. */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** True when (x, y) sits inside one of the three finder zones, separation included. */
function isInFinderZone(x: number, y: number): boolean {
  const inTopLeft = x < FINDER && y < FINDER;
  const inTopRight = x >= SIZE - FINDER && y < FINDER;
  const inBottomLeft = x < FINDER && y >= SIZE - FINDER;
  return inTopLeft || inTopRight || inBottomLeft;
}

/** True when (x, y) sits inside the reserved square behind the brand badge. */
function isInCenterZone(x: number, y: number): boolean {
  return Math.abs(x - CENTER) <= CENTER_HALF && Math.abs(y - CENTER) <= CENTER_HALF;
}

const random = mulberry32(SEED);
const dots: Array<{ x: number; y: number }> = [];
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    if (isInFinderZone(x, y) || isInCenterZone(x, y)) continue;
    if (random() < DENSITY) dots.push({ x, y });
  }
}

const finderOrigins = [
  { x: 0, y: 0 },
  { x: SIZE - FINDER + 1, y: 0 },
  { x: 0, y: SIZE - FINDER + 1 },
];

const BADGE_SIZE = 6;
const BADGE_X = SIZE / 2 - BADGE_SIZE / 2;
const BADGE_PAD = 1.2;
const LOGO_SIZE = BADGE_SIZE - BADGE_PAD * 2;

const DEFAULT_STOPS: [string, string] = ["var(--color-azul-700)", "var(--color-aqua-500)"];

export function CardQr({ className, stops = DEFAULT_STOPS }: { className?: string; stops?: [string, string] }) {
  // useId output can contain characters that are unsafe inside url(#...); keep only the safe ones.
  const gradientId = `qr-grad-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const fill = `url(#${gradientId})`;

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2={SIZE} y2={SIZE} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: stops[0] }} />
          <stop offset="1" style={{ stopColor: stops[1] }} />
        </linearGradient>
      </defs>

      {dots.map(({ x, y }) => (
        <circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r={0.42} fill={fill} />
      ))}

      {finderOrigins.map(({ x, y }) => (
        <g key={`${x}-${y}`}>
          <rect x={x + 0.5} y={y + 0.5} width="6" height="6" rx="2" fill="none" stroke={fill} strokeWidth="1" />
          <rect x={x + 2} y={y + 2} width="3" height="3" rx="1" fill={fill} />
        </g>
      ))}

      <rect
        x={BADGE_X}
        y={BADGE_X}
        width={BADGE_SIZE}
        height={BADGE_SIZE}
        rx={1.8}
        style={{ fill: "var(--color-bg)", stroke: "var(--color-azul-200)" }}
        strokeWidth={0.1}
      />
      <image
        href="/brand/lumayo-isotipo.svg"
        x={BADGE_X + BADGE_PAD}
        y={BADGE_X + BADGE_PAD}
        width={LOGO_SIZE}
        height={LOGO_SIZE}
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}

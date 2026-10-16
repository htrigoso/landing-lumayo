const SIZE = 23;
const FINDER = 7;
const CENTER = (SIZE - 1) / 2;
const LOGO_HALF = 3;

// TODO: the real QR is generated per client by the clinic's system; this is illustrative and encodes nothing.

/** True when (x, y) falls inside one of the three 7x7 finder "eyes". */
function isInFinder(x: number, y: number): boolean {
  const inTopLeft = x < FINDER && y < FINDER;
  const inTopRight = x >= SIZE - FINDER && y < FINDER;
  const inBottomLeft = x < FINDER && y >= SIZE - FINDER;
  return inTopLeft || inTopRight || inBottomLeft;
}

/** True when (x, y) falls inside the reserved center zone behind the brand mark. */
function isInLogoZone(x: number, y: number): boolean {
  return Math.abs(x - CENTER) <= LOGO_HALF && Math.abs(y - CENTER) <= LOGO_HALF;
}

const finderOrigins = [
  { x: 0, y: 0 },
  { x: SIZE - FINDER, y: 0 },
  { x: 0, y: SIZE - FINDER },
];

const dots: Array<{ x: number; y: number }> = [];
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    if (isInFinder(x, y) || isInLogoZone(x, y)) continue;
    if ((x * 7 + y * 13 + x * y) % 5 < 2) dots.push({ x, y });
  }
}

const logoInset = LOGO_HALF * 2 - 1.6;
const logoZoneSize = LOGO_HALF * 2 + 1.4;

export function CardQr({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lumayoCardQrGradient" x1="0" y1="0" x2={SIZE} y2={SIZE} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#02acb5" />
          <stop offset="1" stopColor="#024474" />
        </linearGradient>
      </defs>

      {dots.map(({ x, y }) => (
        <circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r={0.4} fill="url(#lumayoCardQrGradient)" />
      ))}

      {finderOrigins.map(({ x, y }) => (
        <g key={`${x}-${y}`}>
          <rect x={x + 0.4} y={y + 0.4} width={FINDER - 0.8} height={FINDER - 0.8} rx={2.1} fill="url(#lumayoCardQrGradient)" />
          <rect x={x + 1.5} y={y + 1.5} width={FINDER - 3} height={FINDER - 3} rx={1.4} fill="#fff" />
          <rect x={x + 2.6} y={y + 2.6} width={FINDER - 5.2} height={FINDER - 5.2} rx={0.9} fill="url(#lumayoCardQrGradient)" />
        </g>
      ))}

      <rect
        x={CENTER - LOGO_HALF - 0.2}
        y={CENTER - LOGO_HALF - 0.2}
        width={logoZoneSize}
        height={logoZoneSize}
        rx={1.8}
        fill="#fff"
      />
      <image
        href="/brand/lumayo-isotipo.svg"
        x={CENTER - logoInset / 2}
        y={CENTER - logoInset / 2}
        width={logoInset}
        height={logoInset}
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}

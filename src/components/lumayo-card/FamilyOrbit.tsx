import Image from "next/image";

type Variant = "holder" | "woman" | "man" | "senior" | "teen" | "girl" | "boy";
type AvatarSize = "sm" | "md" | "lg";

const ORBIT_RADIUS = 38;
type OrbitCount = 3 | 6;

const ORBIT_ANGLES: Record<OrbitCount, number[]> = {
  3: [-90, 30, 150],
  6: [-90, -30, 30, 90, 150, 210],
};

/** Precomputed once at module load: position of each member in percent of the square wrapper, per member count. */
const ORBIT_POSITIONS: Record<OrbitCount, { x: number; y: number }[]> = {
  3: ORBIT_ANGLES[3].map(toPosition),
  6: ORBIT_ANGLES[6].map(toPosition),
};

function toPosition(deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: Number((50 + ORBIT_RADIUS * Math.cos(rad)).toFixed(2)),
    y: Number((50 + ORBIT_RADIUS * Math.sin(rad)).toFixed(2)),
  };
}

const MEMBERS: { variant: Variant; size: AvatarSize; duration: number }[] = [
  { variant: "woman", size: "md", duration: 3.6 },
  { variant: "man", size: "md", duration: 4.2 },
  { variant: "senior", size: "md", duration: 4.8 },
  { variant: "teen", size: "sm", duration: 3.9 },
  { variant: "girl", size: "sm", duration: 4.5 },
  { variant: "boy", size: "sm", duration: 4.1 },
];

const SIZE_CLASS: Record<AvatarSize, string> = {
  sm: "size-8 sm:size-11",
  md: "size-10 sm:size-14",
  lg: "size-20 sm:size-28",
};

type Look = {
  bg: string;
  skin: string;
  hair: string;
  shirt: string;
  hairStyle: "long" | "short";
  /** Scale of the bust; children and teens get a smaller head and shoulders. */
  scale: number;
};

const LOOKS: Record<Variant, Look> = {
  holder: { bg: "#024474", skin: "#d9a37c", hair: "#2b2330", shirt: "#02acb5", hairStyle: "short", scale: 1 },
  woman: { bg: "#dbf1fe", skin: "#f1c9a5", hair: "#3a2a24", shirt: "#024474", hairStyle: "long", scale: 1 },
  man: { bg: "#85cedf", skin: "#d9a37c", hair: "#2b2330", shirt: "#024474", hairStyle: "short", scale: 1 },
  senior: { bg: "#85cedf", skin: "#f1c9a5", hair: "#e8edf2", shirt: "#02acb5", hairStyle: "short", scale: 1 },
  teen: { bg: "#dbf1fe", skin: "#d9a37c", hair: "#2b2330", shirt: "#02acb5", hairStyle: "short", scale: 0.84 },
  girl: { bg: "#02acb5", skin: "#f1c9a5", hair: "#3a2a24", shirt: "#ffffff", hairStyle: "long", scale: 0.78 },
  boy: { bg: "#85cedf", skin: "#f1c9a5", hair: "#3a2a24", shirt: "#024474", hairStyle: "short", scale: 0.78 },
};

function Avatar({ variant, size, className = "" }: { variant: Variant; size: AvatarSize; className?: string }) {
  const look = LOOKS[variant];
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full ${SIZE_CLASS[size]} ${className}`}
      style={{ backgroundColor: look.bg }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="size-full" aria-hidden="true">
        <g transform={`translate(32 64) scale(${look.scale}) translate(-32 -64)`}>
          {look.hairStyle === "long" && <path d="M19 30 C17 15 25 11 32 11 C39 11 47 15 45 30 L45 44 L19 44 Z" fill={look.hair} />}
          <path d="M11 64 C11 48 20 42 32 42 C44 42 53 48 53 64 Z" fill={look.shirt} />
          <circle cx="32" cy="27" r="11" fill={look.skin} />
          <path
            d={look.hairStyle === "long" ? "M21 26 C21 16 27 13 32 13 C38 13 43 16 43 26 C38 21 27 20 21 26 Z" : "M21 24 C21 14 27 11 32 11 C38 11 43 14 43 24 C39 19 26 19 21 24 Z"}
            fill={look.hair}
          />
          <path d="M27.5 31.5 Q32 35.5 36.5 31.5" fill="none" stroke="#024474" strokeWidth={2} strokeLinecap="round" />
        </g>
      </svg>
    </span>
  );
}

/** Decorative orbit: the holder in the centre, up to six additional members around. Server-safe. */
export function FamilyOrbit({ count = 6 }: { count?: OrbitCount }) {
  const positions = ORBIT_POSITIONS[count];
  const members = MEMBERS.slice(0, count);

  return (
    <div role="group" aria-label={`Titular y ${count} adicionales`} className="relative mx-auto aspect-square w-full max-w-md">
      <style>{`
        @keyframes fam-float { 0%, 100% { transform: translateY(-4px); } 50% { transform: translateY(4px); } }
        .fam-float { animation: fam-float 4.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .fam-float { animation: none; } }
      `}</style>

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
        <circle cx="50" cy="50" r={ORBIT_RADIUS} fill="none" stroke="#c4ebef" strokeWidth="1" strokeDasharray="1 2" vectorEffect="non-scaling-stroke" />
        {positions.map((pos, i) => (
          <line key={i} x1="50" y1="50" x2={pos.x} y2={pos.y} stroke="#93d9e0" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex w-[26%] -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div className="relative rounded-full ring-4 ring-cyan-500/30">
          <Avatar variant="holder" size="lg" />
          <span className="absolute -right-1 -top-1 grid size-8 place-items-center rounded-full bg-navy-900 ring-2 ring-white">
            <Image src="/brand/lumayo-isotipo-white.svg" alt="" width={230} height={202} unoptimized className="h-4 w-auto" />
          </span>
        </div>
        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-700 px-3 py-1 text-xs font-semibold text-white">
          Titular
        </span>
      </div>

      <ul className="absolute inset-0 m-0 list-none p-0">
        {members.map((member, i) => {
          const pos = positions[i];
          return (
            <li
              key={member.variant}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <span className="sr-only">Adicional {i + 1}</span>
              <div className="fam-float" style={{ animationDuration: `${member.duration}s`, animationDelay: `${-i * 0.7}s` }}>
                <div className="relative flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-1 group-focus-within:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                  <Avatar variant={member.variant} size={member.size} className="ring-2 ring-white" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-900 px-2.5 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                  >
                    Adicional {i + 1}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

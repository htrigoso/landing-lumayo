import Image from "next/image";
import type { SVGProps } from "react";
import { CardQr } from "@/components/lumayo-card/CardQr";
import { PinIcon, WhatsappIcon } from "@/components/icons";
import { lumayoCard, site } from "@/lib/site";

type IconProps = { className?: string };

export type CardVariant = "classic" | "gold";

type Arc = { stroke: string; strokeOpacity: number };
type ArcPalette = { rings: readonly [Arc, Arc, Arc]; wedge: { fill: string; fillOpacity: number } };

type FrontTheme = {
  surface: string;
  weight: string;
  glow: string;
  logoSrc: string;
  isotipoSrc: string;
  isotipoClass: string;
  accent: string;
  separator: string;
  subtitle: string;
  pill: string;
  divider: string;
  arcs: ArcPalette;
};

type BackTheme = {
  surface: string;
  accent: string;
  qrRing: string;
  qrStops: [string, string];
  arcs: ArcPalette;
};

// Class strings are written out in full so Tailwind can detect them.
const frontThemes: Record<CardVariant, FrontTheme> = {
  classic: {
    surface:
      "bg-[linear-gradient(118deg,var(--color-navy-950)_0%,var(--color-navy-700)_50%,var(--color-navy-500)_100%)] text-white",
    weight: "font-medium",
    glow: "bg-[radial-gradient(circle_at_100%_100%,rgb(42_200_225/0.22),transparent_35%)]",
    logoSrc: "/brand/lumayo-logo-descriptor-white.svg",
    isotipoSrc: "/brand/lumayo-isotipo-white.svg",
    isotipoClass:
      "pointer-events-none absolute -right-[6cqw] top-1/2 h-auto w-[46cqw] -translate-y-1/2 opacity-[0.22]",
    accent: "bg-cyan-400",
    separator: "bg-cyan-400",
    subtitle: "text-sky-100",
    pill: "border-white/70",
    divider: "bg-white/35",
    arcs: {
      rings: [
        { stroke: "#fff", strokeOpacity: 0.12 },
        { stroke: "#2ac8e1", strokeOpacity: 0.35 },
        { stroke: "#fff", strokeOpacity: 0.1 },
      ],
      wedge: { fill: "#2ac8e1", fillOpacity: 0.14 },
    },
  },
  gold: {
    surface:
      "bg-[linear-gradient(118deg,#c39c48_0%,#d4b25c_30%,#dcc070_52%,#d2ae55_76%,#c09744_100%)] text-white [text-shadow:0_0.15cqw_0.35cqw_rgb(60_40_5/0.55)]",
    weight: "font-semibold",
    glow: "bg-[linear-gradient(105deg,transparent_35%,rgb(255_255_255/0.07)_50%,transparent_65%)]",
    logoSrc: "/brand/lumayo-logo-descriptor-white.svg",
    isotipoSrc: "/brand/lumayo-isotipo-white.svg",
    isotipoClass:
      "pointer-events-none absolute -right-[6cqw] top-1/2 h-auto w-[46cqw] -translate-y-1/2 opacity-[0.10]",
    accent: "bg-[#f3dc9a]",
    separator: "bg-[#f3dc9a]",
    subtitle: "text-white",
    pill: "border-white/70",
    divider: "bg-white/40",
    arcs: {
      rings: [
        { stroke: "#f3dc9a", strokeOpacity: 0.25 },
        { stroke: "#f3dc9a", strokeOpacity: 0.35 },
        { stroke: "#f3dc9a", strokeOpacity: 0.2 },
      ],
      wedge: { fill: "#f3dc9a", fillOpacity: 0.12 },
    },
  },
};

const backThemes: Record<CardVariant, BackTheme> = {
  classic: {
    surface:
      "bg-[linear-gradient(115deg,#fff_0%,var(--color-sky-50)_55%,var(--color-teal-100)_100%)] text-navy-900",
    accent: "bg-cyan-500",
    qrRing: "ring-sky-200",
    qrStops: ["#024474", "#02acb5"],
    arcs: {
      rings: [
        { stroke: "#2ac8e1", strokeOpacity: 0.45 },
        { stroke: "#8ed5e8", strokeOpacity: 0.4 },
        { stroke: "#2ac8e1", strokeOpacity: 0.25 },
      ],
      wedge: { fill: "#8ed5e8", fillOpacity: 0.22 },
    },
  },
  gold: {
    surface:
      "bg-[linear-gradient(115deg,#fffaf0_0%,#f8eed6_55%,#ecd9a8_100%)] text-navy-950",
    accent: "bg-[#b8892b]",
    qrRing: "ring-[#e0c283]",
    qrStops: ["#012a48", "#b8892b"],
    arcs: {
      rings: [
        { stroke: "#c9a03f", strokeOpacity: 0.45 },
        { stroke: "#d9b45a", strokeOpacity: 0.4 },
        { stroke: "#c9a03f", strokeOpacity: 0.25 },
      ],
      wedge: { fill: "#d9b45a", fillOpacity: 0.22 },
    },
  },
};

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Glyph({ className, children, ...props }: IconProps & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

export function PeopleIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <g {...strokeProps}>
        <circle cx="9" cy="8.5" r="3" />
        <path d="M3.5 19.5c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
        <circle cx="16.5" cy="9.2" r="2.4" />
        <path d="M16 14.6c2.4.1 4.2 1.7 4.6 4.9" />
      </g>
    </Glyph>
  );
}

export function RenewIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <g {...strokeProps} strokeWidth={2}>
        <path d="M19.8 12A7.8 7.8 0 0 1 6.2 17.3" />
        <path d="M4.2 12A7.8 7.8 0 0 1 17.8 6.7" />
        <path d="M18.6 3.4v3.9h-3.9" />
        <path d="M5.4 20.6v-3.9h3.9" />
      </g>
    </Glyph>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20Zm-1.7 20V14.3H8.6V11.5h1.7V9.6c0-2 1.1-3.1 2.9-3.1h2v2.8h-1.2c-.7 0-1 .3-1 1v1.2h2.2l-.4 2.8h-1.8V21h-2.1Z"
      />
    </Glyph>
  );
}

export function TiktokIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path
        fill="currentColor"
        d="M16.5 3h-2.9v12.6a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.9a5.9 5.9 0 0 0-.8-.1 5.9 5.9 0 1 0 5.9 5.9V9.2a7.6 7.6 0 0 0 4.4 1.4V7.7A4.5 4.5 0 0 1 16.5 3Z"
      />
    </Glyph>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth={2} />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth={2} />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </Glyph>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <Glyph className={className}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6 5h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4Zm4 4.2v5.6l5-2.8-5-2.8Z"
      />
    </Glyph>
  );
}

/** Decorative arcs, colored by the variant palette. Purely visual, hidden from assistive tech. */
function Arcs({ palette }: { palette: ArcPalette }) {
  const radii = [560, 720, 880] as const;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1586 1000"
      preserveAspectRatio="xMaxYMid slice"
      className="absolute inset-0 size-full"
    >
      <g fill="none" strokeWidth={2}>
        {palette.rings.map((ring, i) => (
          <circle key={radii[i]} cx="1750" cy="620" r={radii[i]} stroke={ring.stroke} strokeOpacity={ring.strokeOpacity} />
        ))}
      </g>
      <path
        d="M1040 1000C1120 820 1300 720 1586 520V640C1380 780 1270 860 1220 1000Z"
        fill={palette.wedge.fill}
        fillOpacity={palette.wedge.fillOpacity}
      />
    </svg>
  );
}

export function CardFront({ variant = "classic" }: { variant?: CardVariant }) {
  const t = frontThemes[variant];
  const isGold = variant === "gold";

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[4.4cqw] px-[6.3cqw] pt-[6.5cqw] pb-[4.5cqw] ${t.surface}`}
    >
      <div aria-hidden="true" className={`absolute inset-0 ${t.glow}`} />
      <Arcs palette={t.arcs} />
      <Image
        src={t.isotipoSrc}
        alt=""
        aria-hidden="true"
        width={1}
        height={1}
        unoptimized
        className={t.isotipoClass}
      />

      <div className="relative flex h-full flex-col">
        <Image
          src={t.logoSrc}
          alt="Lumayo, centro odontológico"
          width={534}
          height={180}
          unoptimized
          className="h-auto w-[33cqw]"
        />

        <div className={`mt-[4.5cqw] h-[0.5cqw] w-[9.6cqw] rounded-full ${t.accent}`} />

        <h3 className="mt-[2.4cqw] text-[6.6cqw] leading-[1.05] font-extrabold tracking-[-0.01em]">
          Membresía familiar
        </h3>
        <p className={`mt-[0.6cqw] text-[3.9cqw] leading-tight ${t.weight} tracking-[0.35em] uppercase ${t.subtitle}`}>
          {isGold ? "Anual · Gold" : "Anual"}
        </p>

        <p
          className={`mt-[2.6cqw] self-start rounded-full border px-[3.2cqw] py-[1.4cqw] text-[2.4cqw] ${t.weight} tracking-[0.03em] whitespace-nowrap ${t.pill}`}
        >
          Tu sonrisa y la de tu familia, todo el año.
        </p>

        <div className={`mt-auto h-px w-full ${t.divider}`} />

        <div className={`flex items-center justify-between pt-[3cqw] text-[2.4cqw] ${t.weight} whitespace-nowrap`}>
          <div className="flex items-center gap-[2.6cqw]">
            <PeopleIcon className="size-[4cqw] shrink-0" />
            <span>1 titular + {lumayoCard.plans[variant].maxAdditional} beneficiarios</span>
          </div>
          <span aria-hidden="true" className={`h-[4.5cqw] w-[0.2cqw] ${t.separator}`} />
          <div className="flex items-center gap-[2.6cqw]">
            <RenewIcon className="size-[4cqw] shrink-0" />
            <span>Vigencia: 12 meses</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardBack({ variant = "classic" }: { variant?: CardVariant }) {
  const t = backThemes[variant];

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[4.4cqw] px-[6.3cqw] pt-[6.5cqw] pb-[4cqw] ${t.surface}`}
    >
      <Arcs palette={t.arcs} />

      <div className="relative flex h-full flex-col">
        <div className="grid grid-cols-[minmax(0,1fr)_23cqw] gap-x-[5cqw]">
          <div className="min-w-0">
            <Image
              src="/brand/lumayo-logo-descriptor.svg"
              alt="Lumayo, centro odontológico"
              width={534}
              height={180}
              unoptimized
              className="h-auto w-[31cqw]"
            />

            <div className={`mt-[4cqw] h-[0.5cqw] w-[9.6cqw] rounded-full ${t.accent}`} />

            <dl className="mt-[4cqw] grid gap-y-[3.2cqw]">
              <div className="flex items-start gap-[2.6cqw]">
                <PinIcon className="mt-[0.4cqw] size-[5.4cqw] shrink-0 text-navy-700" />
                <div className="min-w-0">
                  <dt className="text-[1.9cqw] font-medium tracking-[0.3em] text-navy-700 uppercase">Visítanos</dt>
                  <dd className="text-[3.2cqw] leading-tight font-extrabold whitespace-nowrap">
                    {site.address.street}
                  </dd>
                  <dd className="text-[2.5cqw] leading-tight whitespace-nowrap">
                    {site.address.district} | {site.address.city}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-[2.6cqw]">
                <WhatsappIcon className="mt-[0.4cqw] size-[5.4cqw] shrink-0 text-navy-700" />
                <div className="min-w-0">
                  <dt className="text-[1.9cqw] font-medium tracking-[0.3em] text-navy-700 uppercase">Reserva tu cita</dt>
                  <dd className="text-[3.2cqw] leading-tight font-extrabold whitespace-nowrap">
                    WhatsApp: {lumayoCard.card.whatsappDisplay}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="flex flex-col items-center self-end text-center">
            <div className={`w-full rounded-[2cqw] bg-white p-[1.3cqw] ring-1 ${t.qrRing}`}>
              <CardQr className="block size-full" stops={t.qrStops} />
            </div>
            <p className="mt-[1.6cqw] text-[2cqw] font-bold">Valida tu membresía</p>
            <p className="text-[1.7cqw] leading-snug">Escanea el código e ingresa tu DNI.</p>
            <p className="text-[1.7cqw] leading-snug">{lumayoCard.card.domain}</p>
          </div>
        </div>

        <div className="mt-auto h-px bg-navy-700/25" />

        <p className="mt-[2.4cqw] text-[1.9cqw] font-medium tracking-[0.3em] uppercase">Síguenos</p>
        <ul className="mt-[1.4cqw] grid grid-cols-4">
          <li className="flex items-center gap-[1.4cqw] text-[2.3cqw] font-medium whitespace-nowrap">
            <FacebookIcon className="size-[4cqw] shrink-0 text-navy-700" />
            Facebook
          </li>
          <li className="flex items-center gap-[1.4cqw] text-[2.3cqw] font-medium whitespace-nowrap">
            <TiktokIcon className="size-[4cqw] shrink-0 text-navy-900" />
            TikTok
          </li>
          <li className="flex items-center gap-[1.4cqw] text-[2.3cqw] font-medium whitespace-nowrap">
            <InstagramIcon className="size-[4cqw] shrink-0 text-navy-900" />
            Instagram
          </li>
          <li className="flex items-center gap-[1.4cqw] text-[2.3cqw] font-medium whitespace-nowrap">
            <YoutubeIcon className="size-[4cqw] shrink-0 text-navy-900" />
            YouTube
          </li>
        </ul>
      </div>
    </div>
  );
}

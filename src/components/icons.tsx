import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01Zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.17-.47-.29Z"
      />
    </Svg>
  );
}

const toothPath =
  "M7.5 3.5c-2.4 0-4 1.9-4 4.6 0 2.3 1 3.6 1.6 5.4.7 2.2.8 7 2.8 7 1.7 0 1.6-4.7 3.1-4.7h2c1.5 0 1.4 4.7 3.1 4.7 2 0 2.1-4.8 2.8-7 .6-1.8 1.6-3.1 1.6-5.4 0-2.7-1.6-4.6-4-4.6-1.8 0-2.6 1-4.5 1s-2.7-1-4.5-1Z";

export function ToothIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path {...stroke} d={toothPath} />
    </Svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <path d="M10 3.5 11.6 8a2 2 0 0 0 1.3 1.3L17.5 11l-4.6 1.6a2 2 0 0 0-1.3 1.3L10 18.5 8.4 13.9a2 2 0 0 0-1.3-1.3L2.5 11l4.6-1.7A2 2 0 0 0 8.4 8L10 3.5Z" />
        <path d="M19 3v4M17 5h4M19 16v4M17 18h4" />
      </g>
    </Svg>
  );
}

export function DentureIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <path d="M3 9.5c0-2.5 4-4.5 9-4.5s9 2 9 4.5" />
        <path d="M3 9.5V11c0 1 .8 1.5 1.8 1.5h14.4c1 0 1.8-.5 1.8-1.5V9.5" />
        <path d="M7.5 12.5V9.2M12 12.5V8.8M16.5 12.5V9.2" />
        <path d="M5 15.5c1.8 1.8 4.3 3 7 3s5.2-1.2 7-3" />
      </g>
    </Svg>
  );
}

export function BracesIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <rect x="2.5" y="7" width="5" height="10" rx="2" />
        <rect x="9.5" y="7" width="5" height="10" rx="2" />
        <rect x="16.5" y="7" width="5" height="10" rx="2" />
        <path d="M1.5 12h21" />
      </g>
      <g fill="currentColor">
        <rect x="4" y="10.5" width="2" height="3" rx=".5" />
        <rect x="11" y="10.5" width="2" height="3" rx=".5" />
        <rect x="18" y="10.5" width="2" height="3" rx=".5" />
      </g>
    </Svg>
  );
}

export function ImplantIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <path d="M7 3.5c1.4 0 2.5.7 5 .7s3.6-.7 5-.7c1.8 0 2.8 1.4 2.5 3.2-.3 1.6-1.7 2.8-3.4 2.8H7.9C6.2 9.5 4.8 8.3 4.5 6.7 4.2 4.9 5.2 3.5 7 3.5Z" />
        <path d="M9 12h6M9.5 15h5M10 18h4M11 21h2M9 9.5V12M15 9.5V12" />
      </g>
    </Svg>
  );
}

export function RootIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <path d={toothPath} />
        <path d="M12 7.5V13M9.5 9.5h5" />
      </g>
    </Svg>
  );
}

export function ChildIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 14.5c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8" />
        <path d="M9 9.5h.01M15 9.5h.01" />
        <path d="M10 3.3c.5 1 1.2 1.5 2 1.5 1.3 0 2-1 2-2" />
      </g>
    </Svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z" />
        <path d="m8.8 12.2 2.2 2.2 4.3-4.6" />
      </g>
    </Svg>
  );
}

export function ChipIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M9.5 9.5h5v5h-5zM9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
      </g>
    </Svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        {...stroke}
        d="M12 20.5s-8-4.6-8-10.6A4.4 4.4 0 0 1 8.4 5.5c1.5 0 2.8.8 3.6 2 .8-1.2 2.1-2 3.6-2A4.4 4.4 0 0 1 20 9.9c0 6-8 10.6-8 10.6Z"
      />
    </Svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </g>
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        {...stroke}
        d="M5 3.5h3.2l1.6 4.2-2 1.3a11 11 0 0 0 7.2 7.2l1.3-2 4.2 1.6V19a1.6 1.6 0 0 1-1.7 1.6C10.4 20.1 3.9 13.6 3.4 5.2A1.6 1.6 0 0 1 5 3.5Z"
      />
    </Svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </g>
    </Svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path {...stroke} d="M20.5 12a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1-4.4A8.5 8.5 0 1 1 20.5 12Z" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path {...stroke} strokeWidth={2.2} d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <rect x="5" y="10.5" width="14" height="10" rx="2" />
        <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      </g>
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path {...stroke} strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path {...stroke} strokeWidth={2} d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path {...stroke} strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

/** Smaller tooth outline, for icons that pair the tooth with a second mark. */
function SmallTooth({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return <path d={toothPath} transform={`translate(${x} ${y}) scale(0.78)`} vectorEffect="non-scaling-stroke" />;
}

export function VeneerIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <path d={toothPath} />
        <path d="M8 8.2c1.1-.9 2.4-1.3 4-1.3" />
      </g>
    </Svg>
  );
}

export function SmileIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <path d="M3.5 9.5c2.6 1.3 14.4 1.3 17 0-1 5.6-4.4 9-8.5 9s-7.5-3.4-8.5-9Z" />
        <path d="M8.5 10.6v2.6M12 10.9v2.8M15.5 10.6v2.6" />
      </g>
    </Svg>
  );
}

export function CleanIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <SmallTooth y={5} />
        <path d="M19 2.5v4M17 4.5h4M15 9v2M14 10h2" />
      </g>
    </Svg>
  );
}

export function DropIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <path d="M12 3.2s-6 6.6-6 11a6 6 0 0 0 12 0c0-4.4-6-11-6-11Z" />
        <path d="M9.2 14.6a2.9 2.9 0 0 0 2.6 2.8" />
      </g>
    </Svg>
  );
}

export function TrayIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <path d="M3.5 7c0 7.2 3.8 12 8.5 12s8.5-4.8 8.5-12" />
        <path d="M7.5 7c0 4.9 2 8 4.5 8s4.5-3.1 4.5-8M3.5 7h4M16.5 7h4" />
      </g>
    </Svg>
  );
}

export function FillingIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <path d={toothPath} />
        <path d="M10 9.2h4v2.6h-4z" />
      </g>
    </Svg>
  );
}

export function ExtractIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <SmallTooth y={5.5} />
        <path d="M18.5 9V2.5M16 5l2.5-2.5L21 5" />
      </g>
    </Svg>
  );
}

export function WisdomIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g {...stroke}>
        <SmallTooth x={0.5} y={5} />
        <path d="M16 3.5h4.5l-2.5 3a2 2 0 1 1-2 2.4" />
      </g>
    </Svg>
  );
}

export const serviceIcons = {
  braces: BracesIcon,
  sparkle: SparkleIcon,
  veneer: VeneerIcon,
  smile: SmileIcon,
  clean: CleanIcon,
  drop: DropIcon,
  tray: TrayIcon,
  shield: ShieldIcon,
  tooth: ToothIcon,
  filling: FillingIcon,
  root: RootIcon,
  extract: ExtractIcon,
  wisdom: WisdomIcon,
  implant: ImplantIcon,
  denture: DentureIcon,
  child: ChildIcon,
} as const;

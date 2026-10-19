/** Circumference of the text path (radius 46 in a 120 viewBox), so the text closes the ring. */
const RING_LENGTH = 289;

export function SealBadge({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative grid size-28 place-items-center rounded-full border border-navy-700 bg-white shadow-[0_18px_36px_-20px_color-mix(in_srgb,var(--color-azul-950)_55%,transparent)] ${className}`}
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full animate-[spin_40s_linear_infinite] motion-reduce:animate-none">
        <defs>
          <path id="seal-ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-navy-700 font-sans text-[9.5px] font-extrabold tracking-[0.12em]">
          <textPath href="#seal-ring" textLength={RING_LENGTH} lengthAdjust="spacing">
            LUMAYO NOVIAS · SU SONRISA, SU GRAN DÍA ·
          </textPath>
        </text>
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG, no optimization needed */}
      <img src="/brand/lumayo-isotipo.svg" alt="" draggable={false} className="h-9 w-auto" />
    </div>
  );
}

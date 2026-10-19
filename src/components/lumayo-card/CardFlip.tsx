"use client";

import { useState, type ReactNode } from "react";

/**
 * Two-sided card that flips on hover (devices with hover) or on click/tap and keyboard (Space or Enter).
 * The faces are rendered by the server and passed in as props.
 */
export function CardFlip({ front, back }: { front: ReactNode; back: ReactNode }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full">
      <div
        className="group relative aspect-[1.586] w-full [container-type:inline-size]"
        data-flipped={flipped}
      >
        <button
          type="button"
          aria-pressed={flipped}
          aria-label="Voltear la Lumayo Card"
          onClick={() => setFlipped((value) => !value)}
          className="absolute inset-0 z-10 cursor-pointer rounded-[4.4cqw] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-cyan-500"
        />

        <div className="absolute inset-0 [perspective:220cqw]">
          <div className="relative size-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-data-[flipped=true]:[transform:rotateY(180deg)] motion-reduce:![transform:none]">
            <div
              role="group"
              aria-label="Frente de la tarjeta"
              aria-hidden={flipped}
              inert={flipped}
              className="absolute inset-0 overflow-hidden rounded-[4.4cqw] shadow-[0_2.5cqw_5cqw_-1.5cqw_color-mix(in_srgb,var(--color-azul-950)_45%,transparent),0_0.6cqw_1.4cqw_color-mix(in_srgb,var(--color-azul-950)_20%,transparent)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] motion-reduce:group-hover:opacity-0 motion-reduce:group-data-[flipped=true]:opacity-0"
            >
              {front}
            </div>
            <div
              role="group"
              aria-label="Reverso de la tarjeta"
              aria-hidden={!flipped}
              inert={!flipped}
              className="absolute inset-0 overflow-hidden rounded-[4.4cqw] shadow-[0_2.5cqw_5cqw_-1.5cqw_color-mix(in_srgb,var(--color-azul-950)_45%,transparent),0_0.6cqw_1.4cqw_color-mix(in_srgb,var(--color-azul-950)_20%,transparent)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] motion-reduce:opacity-0 motion-reduce:[transform:none] motion-reduce:group-hover:opacity-100 motion-reduce:group-data-[flipped=true]:opacity-100"
            >
              {back}
            </div>
          </div>
        </div>
      </div>

      <p aria-hidden="true" className="mt-4 h-5 text-center text-sm text-ink-600">
        <span className="hidden [@media(hover:hover)]:inline">Pasa el cursor o haz clic para ver el reverso</span>
        <span className="[@media(hover:hover)]:hidden">
          Toca la tarjeta para ver el {flipped ? "frente" : "reverso"}
        </span>
      </p>
    </div>
  );
}

import Image from "next/image";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import type { TeamMember } from "@/lib/team";

/** Grid of team cards: photo, name, role, specialty and COP number. Rendered on /nosotros (#equipo). */
export function TeamGrid({ members }: { members: readonly TeamMember[] }) {
  return (
    // A single member is centered; a grid of one would pin the card to the left column
    <ul className={members.length === 1 ? "flex justify-center" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-4"}>
      {members.map((m) => (
        <li
          key={m.id}
          className={`group relative isolate h-full overflow-hidden rounded-2xl border border-border bg-white transition-colors duration-500 hover:border-primary-hover/50 hover:shadow-lift ${members.length === 1 ? "w-full max-w-xs" : ""}`}
        >
          <IsotypeWatermark animated className="-bottom-8 -right-10 -z-10 w-40 !opacity-0 group-hover:!opacity-[0.12]" />
          <div className="relative aspect-[600/616] overflow-hidden bg-surface">
            {m.photo ? (
              <Image
                src={m.photo}
                alt={`${m.name}, ${m.role}`}
                fill
                sizes="(min-width: 1024px) 18rem, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              // No portrait yet: a brand-colored panel with the name initials, so no face is assigned by mistake
              <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-primary font-display text-5xl font-extrabold text-text-inverse">
                {m.name.replace(/^(Dra?\.\s*)/, "").split(" ").slice(0, 2).map((w) => w[0]).join("")}
              </div>
            )}
          </div>
          <div className="p-5 text-center">
            <h3 className="font-display text-lg font-bold text-heading">{m.name}</h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-accent-text">{m.role}</p>
            {m.specialty && <p className="mt-2 text-sm text-text">{m.specialty}</p>}
            {m.cop && <p className="mt-1 text-xs text-text-muted">COP N° {m.cop}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

import Image from "next/image";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { team } from "@/lib/team";

/** Team grid; renders nothing until real team members are listed in src/lib/team.ts. */
export function TeamSection() {
  if (team.length === 0) return null;

  return (
    <section aria-labelledby="team-title" className="relative isolate overflow-hidden bg-white py-20 lg:py-28">
      <SectionBackdrop lines="tr" glow="bl" />
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="pill pill-solid mx-auto">Nuestro equipo</p>
          <h2 id="team-title" className="section-title mt-5">
            Las personas detrás de <strong>tu sonrisa</strong>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li
                key={m.name}
                className="group relative isolate h-full overflow-hidden rounded-2xl border border-sky-200 bg-white transition-colors duration-500 hover:border-navy-500/50"
              >
                <IsotypeWatermark animated className="-bottom-8 -right-10 -z-10 w-40 !opacity-0 group-hover:!opacity-[0.12]" />
                <div className="relative aspect-[600/616] overflow-hidden bg-sky-50">
                  <Image
                    src={m.photo}
                    alt={`${m.name}, ${m.role}`}
                    fill
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-display text-lg font-bold text-navy-700">{m.name}</h3>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-cyan-700">{m.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

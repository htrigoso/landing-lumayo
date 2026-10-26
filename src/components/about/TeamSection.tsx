import { SectionBackdrop } from "@/components/decor/SectionBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { team } from "@/lib/team";
import { TeamGrid } from "./TeamGrid";

/**
 * Team grid. While src/lib/team.ts is empty it shows a neutral placeholder instead of invented
 * names, so the section stays visible until the clinic provides real members.
 */
export function TeamSection() {
  return (
    <section id="equipo" aria-labelledby="team-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
      <SectionBackdrop lines="tr" glow="bl" />
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="pill pill-solid mx-auto">Nuestro equipo</p>
          <h2 id="team-title" className="section-title mt-5">
            Las personas detrás de <strong>tu sonrisa</strong>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          {team.length > 0 ? (
            <TeamGrid members={team} />
          ) : (
            <p className="mx-auto max-w-xl text-center text-lg leading-relaxed text-text">
              Pronto presentaremos a cada odontólogo de Lumayo, con su especialidad y su número de colegiatura.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

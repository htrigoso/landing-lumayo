import Image from "next/image";
import { BrandSeal } from "@/components/about/BrandSeal";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";
import { CalendarIcon, CheckIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";

const points = ["Equipo con experiencia", "Servicios completos", "Tecnología moderna", "Atención para toda la familia"];

/** "About us" intro, after the reference: photo collage with a brand seal, Titular, copy and four points. */
export function AboutIntro() {
  return (
    <section aria-labelledby="about-intro-title" className="relative isolate overflow-hidden bg-white py-20 lg:py-28">
      <SectionBackdrop lines="bl" glow="tr" />
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Collage: large HD photo, the reference's smaller clinic photo overlapping, and the seal */}
        <Reveal className="relative mx-auto w-full max-w-lg pb-16 pr-10 sm:pb-20 sm:pr-16 lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            {/* Unsplash License */}
            <Image
              src="https://images.unsplash.com/photo-1777331903190-341a3dd0441b?w=1400&q=85&fm=jpg"
              alt="Odontólogo conversando con una paciente en un consultorio moderno"
              fill
              unoptimized
              className="object-cover object-[60%_center]"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[55%] overflow-hidden rounded-2xl ring-[6px] ring-white">
            <Image src="/images/about/about-us-img-2.jpg" alt="Sala de atención con sillones dentales" width={384} height={270} className="h-auto w-full" />
          </div>
          <BrandSeal className="absolute -left-2 top-8 w-28 sm:-left-6 sm:w-36" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="pill pill-solid">Sobre nosotros</p>
          <h2 id="about-intro-title" className="section-title mt-5">
            Tu camino a una sonrisa sana <strong>empieza aquí</strong>
          </h2>
          <p className="section-sub mt-5 max-w-xl text-pretty">
            En Lumayo te atendemos sin apuros y con tecnología actual. Te explicamos tu diagnóstico, tus opciones y cada paso del
            tratamiento, para que decidas con tranquilidad y te sientas en confianza desde la primera visita.
          </p>
          <ul className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 font-semibold text-navy-700">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-navy-700 text-white">
                  <CheckIcon className="size-4" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <a href="#reservar" className="btn btn-wa mt-10 px-7 text-base sm:min-h-14">
            <CalendarIcon />
            Agendar evaluación
          </a>
        </Reveal>
      </div>
    </section>
  );
}

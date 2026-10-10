import Image from "next/image";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    img: "/images/about/dental-process-img-1.jpg",
    title: "Evaluación inicial",
    text: "Conocemos tu caso y lo que quieres lograr con tu sonrisa.",
  },
  {
    img: "/images/about/dental-process-img-2.jpg",
    title: "Plan a tu medida",
    text: "Te proponemos el tratamiento ideal, con tiempos y costos claros.",
  },
  {
    img: "/images/about/dental-process-img-3.jpg",
    title: "Tratamiento",
    text: "Realizamos cada procedimiento con cuidado y bioseguridad.",
  },
  {
    img: "/images/about/dental-process-img-4.jpg",
    title: "Controles y seguimiento",
    text: "Te acompañamos hasta ver y mantener el resultado.",
  },
];

/** Care process in four illustrated steps (the reference's "dental process" block, told in general). */
export function CareProcess() {
  return (
    <section aria-labelledby="process-title" className="relative isolate overflow-hidden bg-white py-20 lg:py-28">
      <SectionBackdrop lines="tl" glow="br" />
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="pill pill-solid mx-auto">Nuestro proceso</p>
          <h2 id="process-title" className="section-title mt-5">
            Tu tratamiento, <strong>paso a paso</strong>
          </h2>
          <p className="section-sub mt-4 text-pretty">Sabrás en todo momento en qué etapa estás y qué sigue.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white transition-colors duration-500 hover:border-navy-500/50"
              >
                <IsotypeWatermark animated className="-bottom-8 -right-10 -z-10 w-40 !opacity-0 group-hover:!opacity-[0.12]" />
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={s.img}
                    alt=""
                    width={302}
                    height={302}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-full bg-navy-700 font-display text-sm font-bold tabular-nums text-white ring-4 ring-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold leading-snug text-navy-700">{s.title}</h3>
                  <p className="mt-2 text-pretty text-[0.93rem] leading-relaxed text-ink-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

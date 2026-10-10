import Image from "next/image";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    icon: "/images/about/icon-how-it-work-1.svg",
    title: "Agenda tu cita",
    text: "Escríbenos por WhatsApp o deja tus datos en el formulario y te confirmamos el horario.",
  },
  {
    icon: "/images/about/icon-how-it-work-2.svg",
    title: "Evaluación y diagnóstico",
    text: "Revisamos tu caso con calma y te explicamos las opciones que tienes.",
  },
  {
    icon: "/images/about/icon-how-it-work-3.svg",
    title: "Tratamiento y seguimiento",
    text: "Iniciamos el plan acordado y te acompañamos con controles hasta el final.",
  },
];

// Brandbook highlight avatars: soft palette tints behind the two-tone icons
const avatarTones = ["bg-sky-100", "bg-celeste-100", "bg-teal-100"];

/** "How it works", after the reference: HD photo on the left, three illustrated steps on the right. */
export function HowWeWork() {
  return (
    <section aria-labelledby="how-title" className="relative isolate overflow-hidden bg-sky-50 py-20 lg:py-28">
      <SectionBackdrop lines="tr" glow="bl" surface="mist" />
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative isolate aspect-[5/6] overflow-hidden rounded-2xl bg-navy-700">
            {/* Unsplash License */}
            <Image
              src="https://images.unsplash.com/photo-1681939282781-341ac4f61996?w=1400&q=85&fm=jpg"
              alt="Odontóloga atendiendo a una paciente"
              fill
              unoptimized
              className="object-cover object-[35%_center]"
            />
          </div>
          <IsotypeWatermark className="-bottom-16 -right-12 -z-10 w-64 !opacity-[0.08]" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="pill pill-solid">Cómo trabajamos</p>
          <h2 id="how-title" className="section-title mt-5">
            Así cuidamos <strong>tu sonrisa</strong>
          </h2>
          <p className="section-sub mt-5 max-w-xl text-pretty">
            Un proceso simple y transparente, para que sepas qué esperar desde el primer mensaje hasta tu último control.
          </p>
          <ol className="mt-10 space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5 rounded-2xl border border-sky-200 bg-white p-5">
                <span className={`grid size-14 shrink-0 place-items-center rounded-full ${avatarTones[i]}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- small decorative SVG icon */}
                  <img src={s.icon} alt="" aria-hidden="true" width={30} height={30} className="size-[1.875rem]" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold leading-snug text-navy-700">
                    <span className="mr-2 tabular-nums text-cyan-700">{String(i + 1).padStart(2, "0")}.</span>
                    {s.title}
                  </h3>
                  <p className="mt-1 text-pretty leading-relaxed text-ink-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

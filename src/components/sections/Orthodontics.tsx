import { SectionHeading } from "@/components/brand/SectionHeading";
import { BracesIcon, WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/orthodontics/FaqAccordion";
import { orthodonticsFaqs } from "@/lib/orthodontics";
import { bracesWhatsappMessage, serviceName, whatsappUrl } from "@/lib/site";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";

const steps = [
  {
    title: "Evaluación",
    text: "Revisamos tus dientes, tu mordida y escuchamos lo que quieres lograr.",
  },
  {
    title: "Plan a tu medida",
    text: "Te explicamos las opciones, el tiempo estimado y el costo antes de empezar.",
  },
  {
    title: "Colocación de brackets",
    text: "Instalamos tus brackets con cuidado y te enseñamos cómo cuidarlos en casa.",
  },
  {
    title: "Controles periódicos",
    text: "Hacemos los ajustes necesarios hasta que luzcas la sonrisa que buscas.",
  },
];

export function Orthodontics() {
  return (
    <section id="ortodoncia" aria-labelledby="ortodoncia-title" className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,#ffffff_0%,var(--color-sky-50)_16%,var(--color-sky-50)_84%,#ffffff_100%)] pb-16 lg:pb-20">
      <SectionBackdrop lines="br" glow="tl" surface="mist" />
      <div className="container-page">
        <SectionHeading
          number="02"
          label={serviceName("ortodoncia")}
          id="ortodoncia-title"
          title={
            <>
              Tu tratamiento de <strong>brackets, paso a paso</strong>
            </>
          }
          description="Te acompañamos desde la primera consulta hasta el último control, con explicaciones claras en cada etapa."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Steps as an index list with hairline rules, like the manual */}
          <ol className="border-t border-navy-700/15">
            {steps.map((s, i) => (
              <li key={s.title} className="border-b border-navy-700/15">
                <Reveal delay={i * 0.06} className="group grid grid-cols-[3.5rem_1fr] gap-x-4 py-6 sm:grid-cols-[4.5rem_1fr_1.2fr] sm:items-baseline sm:gap-x-8">
                  <span className="font-display text-2xl font-normal tabular-nums text-cyan-700 sm:text-3xl">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <h3 className="font-display text-lg font-bold text-navy-700 sm:text-xl">{s.title}</h3>
                  <p className="col-start-2 mt-1 leading-relaxed text-ink-600 sm:col-start-3 sm:mt-0">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="h-fit rounded-2xl border border-sky-200 bg-white p-6 sm:p-8">
            <p className="pill pill-solid">
              <BracesIcon />
              Preguntas frecuentes
            </p>
            <FaqAccordion items={orthodonticsFaqs} />

            <a href={whatsappUrl(bracesWhatsappMessage)} target="_blank" rel="noopener" className="btn btn-wa mt-6 w-full text-base">
              <WhatsappIcon />
              Tengo otra pregunta
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { SectionHeading } from "@/components/brand/SectionHeading";
import { BracesIcon, WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/orthodontics/FaqAccordion";
import { bracesWhatsappMessage, whatsappUrl } from "@/lib/site";

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

const faqs = [
  {
    q: "¿Duele usar brackets?",
    a: "Es normal sentir una leve molestia los primeros días y después de cada ajuste. Suele pasar en poco tiempo y te damos recomendaciones para sobrellevarla.",
  },
  {
    q: "¿Cuánto dura el tratamiento?",
    a: "Depende de cada caso. En tu evaluación te damos un tiempo estimado según lo que necesites corregir.",
  },
  {
    q: "¿Puedo usar brackets si soy adulto?",
    a: "Sí. La ortodoncia funciona a cualquier edad, siempre que tus dientes y encías estén sanos.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "El costo depende de tu caso y del tipo de tratamiento. Escríbenos por WhatsApp y te orientamos sin compromiso.",
  },
];

export function Orthodontics() {
  return (
    <section id="ortodoncia" aria-labelledby="ortodoncia-title" className="bg-sky-50 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          number="02"
          label="Ortodoncia con brackets"
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

          <Reveal className="h-fit rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
            <p className="pill">
              <BracesIcon />
              Preguntas frecuentes
            </p>
            <FaqAccordion items={faqs} />

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

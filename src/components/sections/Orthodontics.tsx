import { BracesIcon, WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
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
    <section
      id="ortodoncia"
      aria-labelledby="ortodoncia-title"
      className="relative overflow-hidden bg-navy-700 py-20 text-white lg:py-28"
    >
      <div aria-hidden="true" className="absolute -left-32 top-10 size-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 right-0 size-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="container-page relative grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="pill !bg-white/10 !text-cyan-300">
              <BracesIcon />
              Ortodoncia con brackets
            </p>
            <h2 id="ortodoncia-title" className="section-title mt-4 !text-white">
              Tu tratamiento de brackets, paso a paso
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-sky-100">
              Te acompañamos desde la primera consulta hasta el último control, con explicaciones claras
              en cada etapa.
            </p>
          </Reveal>

          <ol className="relative mt-10 space-y-6 before:absolute before:bottom-6 before:left-[1.375rem] before:top-6 before:w-px before:bg-white/20">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.08} className="relative flex gap-5">
                  <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-cyan-400 font-display text-lg font-extrabold text-navy-900">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-display text-lg font-bold">{s.title}</h3>
                    <p className="mt-1 leading-relaxed text-sky-100">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:pt-6">
          <Reveal className="rounded-[2rem] bg-white p-6 text-ink-900 shadow-lift sm:p-8">
            <h3 className="font-display text-xl font-extrabold text-navy-700">Preguntas frecuentes</h3>
            <div className="mt-4 divide-y divide-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-1">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-lg font-semibold text-navy-700 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-sky-100 text-cyan-700 transition-transform duration-200 group-open:rotate-45"
                    >
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="pb-4 pr-10 leading-relaxed text-ink-600">{f.a}</p>
                </details>
              ))}
            </div>

            <a
              href={whatsappUrl(bracesWhatsappMessage)}
              target="_blank"
              rel="noopener"
              className="btn btn-wa mt-6 w-full text-base"
            >
              <WhatsappIcon />
              Tengo otra pregunta
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

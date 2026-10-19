import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { SectionAtmosphere } from "@/components/decor/SectionAtmosphere";
import { ArrowRightIcon, CalendarIcon, CheckIcon, serviceIcons, WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { BookingSection } from "@/components/sections/BookingSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { FaqAccordion } from "@/components/orthodontics/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, serviceDetailJsonLd, serviceHowToJsonLd } from "@/lib/seo/jsonld";
import { getServiceContent } from "@/lib/service-content";
import {
  categoryOf,
  categoryPath,
  getServiceBySlugs,
  servicePath,
  services,
  whatsappUrl,
} from "@/lib/site";

type PageProps = { params: Promise<{ categoria: string; servicio: string }> };

/** Program blocks linked from a service page; mirrors the Kids and Novias landing pages. */
const programs = {
  kids: {
    href: "/servicios/lumayo-kids",
    label: "Programa Lumayo Kids",
    text: "Atención dental para bebés, niños y adolescentes.",
  },
  novias: {
    href: "/servicios/lumayo-novias",
    label: "Programa Lumayo Novias",
    text: "Un plan por etapas para llegar a tu boda con la sonrisa que imaginaste.",
  },
} as const;

// Blocking route: unknown slugs must answer 404, which streaming cannot do after the shell is sent.
export const instant = false;

/** Pre-renders one page per service; `dynamicParams` is unavailable with cacheComponents. */
export function generateStaticParams() {
  return services.map((s) => ({ categoria: categoryOf(s).slug, servicio: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria, servicio } = await params;
  const service = getServiceBySlugs(categoria, servicio);
  if (!service) {
    return { title: "Servicio no encontrado · Lumayo Centro Odontológico" };
  }
  const path = servicePath(service);
  const title = `${service.name} · Lumayo Centro Odontológico`;
  return {
    title,
    description: service.details.summary,
    alternates: { canonical: path },
    openGraph: { type: "article", title, description: service.details.summary, url: path },
  };
}

export default function ServicePage({ params }: PageProps) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-navy-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main">
        <ServiceContent params={params} />

        <WaveDivider from="bg-sky-50" to="var(--color-navy-500)" />
        <BookingSection number="01" />
        <WaveDivider from="bg-navy-500" to="var(--color-navy-900)" flip />
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingWhatsapp />
    </>
  );
}

async function ServiceContent({ params }: PageProps) {
  const { categoria, servicio } = await params;
  const service = getServiceBySlugs(categoria, servicio);
  if (!service) notFound();

  const content = getServiceContent(service.id);
  // Content entries carry `todo` items that the dentist must confirm before publishing.
  if (!content) notFound();

  const category = categoryOf(service);
  const Icon = serviceIcons[service.icon];
  const relatedServices = content.related.flatMap((id) => {
    const related = services.find((s) => s.id === id);
    return related ? [related] : [];
  });
  const program = content.program ? programs[content.program] : undefined;
  const inquiry = whatsappUrl(`Hola Lumayo, quisiera información sobre ${service.name.toLowerCase()}.`);

  return (
    <>
      <JsonLd data={serviceDetailJsonLd(service)} />
      <JsonLd data={serviceHowToJsonLd(service, content.howItWorks)} />
      {content.faqs.length > 0 && <JsonLd data={faqJsonLd(content.faqs)} />}
      <PageHeader
        title={service.name}
        emphasis=""
        description={service.description}
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: category.label, href: categoryPath(category) },
          { label: service.name },
        ]}
      />

      <section aria-label="Resumen del servicio" className="relative isolate overflow-hidden bg-white pt-12 pb-16 lg:pt-16 lg:pb-20">
        <SectionAtmosphere washTop="mist" isotype="br" />

        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="min-w-0">
            <Link href={categoryPath(category)} className="pill w-fit">
              {category.label}
            </Link>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-600 sm:text-xl">{service.details.summary}</p>
            <p className="mt-5 text-pretty leading-relaxed text-ink-900">
              <span className="font-semibold text-navy-700">Ideal para: </span>
              {service.details.idealFor}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={inquiry} target="_blank" rel="noopener" className="btn btn-wa text-base">
                <WhatsappIcon />
                Consultar por WhatsApp
              </a>
              <a href="#reservar" className="btn btn-outline text-base">
                <CalendarIcon />
                Reservar cita
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sky-100">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-6 -left-4 grid size-16 place-items-center rounded-full bg-navy-700 text-white ring-4 ring-white"
            >
              <Icon className="size-8" />
            </span>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="cuando-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone="mist" glow="bl" />

        <div className="container-page">
          <SectionHeading
            number="01"
            label="Para ti"
            id="cuando-title"
            layout="stack"
            title={<>¿Cuándo <strong>te ayuda?</strong></>}
          />
          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
            <Reveal className="min-w-0 rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-navy-700">Cuándo te ayuda</h3>
              <ul className="mt-6 grid gap-4">
                {content.whenItHelps.map((item) => (
                  <li key={item} className="flex min-w-0 gap-3 leading-relaxed text-ink-600">
                    <CheckIcon className="mt-1 size-5 shrink-0 text-cyan-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="min-w-0 rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-navy-700">Qué incluye</h3>
              <ul className="mt-6 grid gap-4">
                {service.details.includes.map((item) => (
                  <li key={item} className="flex min-w-0 gap-3 leading-relaxed text-ink-600">
                    <CheckIcon className="mt-1 size-5 shrink-0 text-cyan-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="proceso-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere />

        <div className="container-page">
          <SectionHeading
            number="02"
            label="Proceso"
            id="proceso-title"
            layout="stack"
            title={<>Cómo <strong>funciona</strong></>}
          />
          <ol className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 border-l border-navy-700/20 pl-6 md:grid-cols-2 md:border-l-0 md:pl-0 lg:grid-cols-3">
            {content.howItWorks.map((step, i) => (
              <li key={step} className="min-w-0">
                <Reveal delay={i * 0.06} className="flex h-full gap-5 rounded-3xl border border-line bg-white p-6 md:flex-col">
                  <span className="-ml-12 grid size-12 shrink-0 place-items-center rounded-full bg-navy-700 font-display text-lg font-bold text-white md:ml-0">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed text-ink-900">{step}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="detalles-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone="mist" lines="tr" />

        <div className="container-page">
          <SectionHeading
            number="03"
            label="Detalles"
            id="detalles-title"
            layout="stack"
            title={<>Lo que <strong>debes saber</strong></>}
          />
          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
            <Reveal className="min-w-0 rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-navy-700">Beneficios</h3>
              <ul className="mt-6 grid gap-4">
                {content.benefits.map((item) => (
                  <li key={item} className="flex min-w-0 gap-3 leading-relaxed text-ink-600">
                    <CheckIcon className="mt-1 size-5 shrink-0 text-cyan-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="min-w-0 rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-navy-700">A considerar</h3>
              <ul className="mt-6 grid gap-4">
                {content.consider.map((item) => (
                  <li key={item} className="flex min-w-0 gap-3 leading-relaxed text-ink-600">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-navy-700/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="cuidados-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere lines="tr" />

        <div className="container-page">
          <SectionHeading
            number="04"
            label="Después"
            id="cuidados-title"
            layout="stack"
            title={<>Cuidados <strong>después</strong></>}
          />
          <Reveal className="mt-12">
            <div className="rounded-[2rem] border border-navy-700/20 p-2">
              <div className="rounded-[1.5rem] border border-navy-700/10 bg-white p-6 sm:p-10">
                <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
                  {content.aftercare.map((item) => (
                    <li key={item} className="flex min-w-0 gap-3 text-base leading-relaxed text-ink-600">
                      <CheckIcon className="mt-1 size-5 shrink-0 text-cyan-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone="mist" lines="tr" />

        <div className="container-page">
          <SectionHeading
            number="05"
            label="Preguntas"
            id="faq-title"
            layout="stack"
            title={<>Preguntas <strong>frecuentes</strong></>}
          />
          <Reveal className="mt-8 rounded-3xl border border-line bg-white p-6 sm:p-10">
            <FaqAccordion items={content.faqs} />
          </Reveal>
          <p className="mt-6 text-sm text-ink-600">
            Información orientativa. El plan final y el costo se definen en tu evaluación, según tu caso.
          </p>
        </div>
      </section>

      {program && (
        <section aria-label={program.label} className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
          <SectionAtmosphere />

          <div className="container-page">
            <Reveal>
              <div className="relative isolate overflow-hidden rounded-3xl bg-azul-700 p-8 text-white sm:p-12">
                <IsotypeWatermark tone="dark" className="-bottom-20 -right-16 w-80" />
                <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm font-medium uppercase tracking-[0.12em] text-azul-100">Parte de un programa</p>
                    <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">{program.label}</h2>
                    <p className="mt-3 text-pretty leading-relaxed text-azul-100">{program.text}</p>
                  </div>
                  <Link href={program.href} className="btn btn-light shrink-0 text-base">
                    Conocer el programa
                    <ArrowRightIcon className="size-5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section aria-labelledby="relacionados-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone="mist" glow="tr" />

        <div className="container-page">
          <SectionHeading
            number="06"
            label="Sigue leyendo"
            id="relacionados-title"
            layout="stack"
            title={<>Servicios <strong>relacionados</strong></>}
          />
          {relatedServices.length > 0 && (
            <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-3">
              {relatedServices.map((related, i) => (
                <Reveal key={related.id} delay={i * 0.06} className="min-w-0">
                  <Link
                    href={servicePath(related)}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-700">
                      {categoryOf(related).label}
                    </span>
                    <span className="mt-3 flex flex-1 items-start justify-between gap-4 font-display text-lg font-bold leading-snug text-navy-700">
                      {related.name}
                      <ArrowRightIcon className="mt-1 size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          <details className="mt-12 text-sm text-ink-600">
            <summary className="cursor-pointer font-semibold text-navy-700">Referencias</summary>
            <ul className="mt-3 grid gap-2">
              {content.sources.map((source) => (
                <li key={source.url} className="min-w-0 break-words">
                  <a href={source.url} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-navy-700">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>
    </>
  );
}

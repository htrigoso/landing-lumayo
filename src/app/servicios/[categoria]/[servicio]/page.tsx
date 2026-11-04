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
import { OrthoPriceBlock } from "@/components/services/OrthoPriceBlock";
import { ServiceGallery } from "@/components/services/ServiceGallery";
import { FaqAccordion } from "@/components/orthodontics/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { ReviewedBy } from "@/components/seo/ReviewedBy";
import { faqJsonLd, serviceDetailJsonLd, serviceHowToJsonLd } from "@/lib/seo/jsonld";
import { pageSocial } from "@/lib/seo/metadata";
import { getServiceContent } from "@/lib/service-content";
import { type DocBlock, getServiceDoc, type ServiceDoc } from "@/lib/service-doc";
import { defaultReviewerId, getTeamMember } from "@/lib/team";
import {
  categoryOf,
  categoryPath,
  getServiceBySlugs,
  programPaths,
  servicePath,
  services,
  whatsappUrl,
  type Service,
} from "@/lib/site";

type PageProps = { params: Promise<{ categoria: string; servicio: string }> };
type LegacyContent = NonNullable<ReturnType<typeof getServiceContent>>;

/** Program blocks linked from a service page; mirrors the Kids and Novias landing pages. */
const programs = {
  kids: {
    href: programPaths.kids,
    label: "Programa Lumayo Kids",
    text: "Atención dental para bebés, niños y adolescentes.",
  },
  novias: {
    href: programPaths.novias,
    label: "Programa Lumayo Novias",
    text: "Un plan por etapas para llegar a tu boda con la sonrisa que imaginaste.",
  },
} as const;

/**
 * Splits a service name into the brandbook's 400 + 800 pairing: the first word stays regular,
 * the rest is extra bold ("Brackets" + "convencionales"). One-word names get no emphasis.
 */
function splitServiceName(name: string) {
  const [firstWord, ...restWords] = name.split(" ");
  return { title: firstWord, emphasis: restWords.join(" ") };
}

/** Section numbers as in the brand manual: "01", "02", ... */
function sectionNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

/** Eyebrow label for a doc section, derived from its H2 title. First matching rule wins. */
function sectionLabel(title: string): string {
  if (title.startsWith("¿Qué es") || title.startsWith("¿Qué son")) return "Qué es";
  if (title.includes("Cuándo")) return "Indicaciones";
  if (title.startsWith("Antes y después")) return "Antes y después";
  if (title.includes("paso a paso") || title.startsWith("¿Cómo")) return "Proceso";
  if (title.startsWith("Ventajas")) return "Ventajas";
  if (title.includes("Cuánto cuest")) return "Precio";
  if (title.includes(" vs. ") || title.includes("cuál elegir") || title.includes("diferencia")) return "Comparativa";
  if (title.startsWith("Cuidados")) return "Cuidados";
  if (title.startsWith("¿Por qué")) return "Por qué Lumayo";
  return "Información";
}

/** Ordered steps of the first "paso a paso" subsection, for HowTo JSON-LD. */
function docSteps(doc: ServiceDoc): string[] | undefined {
  for (const section of doc.sections) {
    for (const sub of section.subsections) {
      if (!sub.title.toLowerCase().includes("paso a paso")) continue;
      const list = sub.blocks.find((b): b is { type: "ul" | "ol"; items: string[] } => b.type === "ol");
      if (list) return list.items;
    }
  }
  return undefined;
}

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
  // SEO-lead copy when available (see Service.seo); otherwise fall back to the service's own text.
  const title = service.seo?.title ?? `${service.name} · Lumayo Centro Odontológico`;
  const description = service.seo?.description ?? service.details.summary;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...pageSocial({
      title,
      description,
      path,
      image: { url: service.image, alt: service.name },
      type: "article",
    }),
  };
}

export default function ServicePage({ params }: PageProps) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main">
        <ServiceContent params={params} />

        <WaveDivider from="bg-surface" to="var(--color-surface-inverse)" />
        <BookingSection number="01" />
        <WaveDivider from="bg-surface-inverse" to="var(--color-surface-deep)" flip />
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

  // SEO-lead document when one exists for this service; otherwise the legacy content renders.
  const doc = getServiceDoc(service.id);
  const category = categoryOf(service);
  const Icon = serviceIcons[service.icon];
  const relatedServices = content.related.flatMap((id) => {
    const related = services.find((s) => s.id === id);
    return related ? [related] : [];
  });
  const program = content.program ? programs[content.program] : undefined;
  const inquiry = whatsappUrl(`Hola Lumayo, quisiera información sobre ${service.name.toLowerCase()}.`);
  const heading = splitServiceName(doc ? doc.h1 : service.name);
  const steps = doc ? docSteps(doc) : undefined;

  return (
    <>
      <JsonLd data={serviceDetailJsonLd(service)} />
      {doc ? (
        <>
          {steps && <JsonLd data={serviceHowToJsonLd(service, steps)} />}
          {doc.faqs.length > 0 && <JsonLd data={faqJsonLd(doc.faqs)} />}
        </>
      ) : (
        <>
          <JsonLd data={serviceHowToJsonLd(service, content.howItWorks)} />
          {content.faqs.length > 0 && <JsonLd data={faqJsonLd(content.faqs)} />}
        </>
      )}
      <PageHeader
        title={heading.title}
        emphasis={heading.emphasis}
        accent
        description={service.description}
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: category.label, href: categoryPath(category) },
          { label: doc ? doc.h1 : service.name },
        ]}
      />

      <section aria-label="Resumen del servicio" className="relative isolate overflow-hidden bg-white pt-12 pb-16 lg:pt-16 lg:pb-20">
        <SectionAtmosphere washTop="mist" isotype="br" />

        <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="min-w-0">
            <Link href={categoryPath(category)} className="pill w-fit">
              {category.label}
            </Link>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-text sm:text-xl">
              {doc ? doc.lead : service.details.summary}
            </p>
            <p className="mt-5 text-pretty leading-relaxed text-text">
              <span className="font-semibold text-primary">Ideal para: </span>
              {doc ? doc.idealFor : service.details.idealFor}
            </p>
            <div className="mt-6">
              <ReviewedBy member={getTeamMember(defaultReviewerId)} />
            </div>
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface-soft">
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
              className="absolute -bottom-6 -left-4 grid size-16 place-items-center rounded-full bg-primary text-white ring-4 ring-bg"
            >
              <Icon className="size-8" />
            </span>
          </Reveal>
        </div>
      </section>

      {doc ? (
        <DocSections doc={doc} />
      ) : (
        <LegacySections service={service} content={content} />
      )}

      {program && (
        <section aria-label={program.label} className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
          <SectionAtmosphere />

          <div className="container-page">
            <Reveal>
              <div className="relative isolate overflow-hidden rounded-3xl bg-surface-inverse p-8 text-text-inverse sm:p-12">
                <IsotypeWatermark tone="dark" className="-bottom-20 -right-16 w-80" />
                <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm font-medium uppercase tracking-[0.12em] text-text-inverse-muted">Parte de un programa</p>
                    <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-text-inverse sm:text-3xl">{program.label}</h2>
                    <p className="mt-3 text-pretty leading-relaxed text-text-inverse-muted">{program.text}</p>
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
                    className="group flex h-full flex-col rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
                      {categoryOf(related).label}
                    </span>
                    <span className="mt-3 flex flex-1 items-start justify-between gap-4 font-display text-lg font-bold leading-snug text-heading">
                      {related.name}
                      <ArrowRightIcon className="mt-1 size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          <details className="mt-12 text-sm text-text">
            <summary className="cursor-pointer font-semibold text-primary">Referencias</summary>
            <ul className="mt-3 grid gap-2">
              {content.sources.map((source) => (
                <li key={source.url} className="min-w-0 break-words">
                  <a href={source.url} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-primary">
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

/** Fixed sections used when no SEO-lead document exists for the service. */
function LegacySections({ service, content }: { service: Service; content: LegacyContent }) {
  return (
    <>
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
            <Reveal className="min-w-0 rounded-3xl border border-border bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-heading">Cuándo te ayuda</h3>
              <ul className="mt-6 grid gap-4">
                {content.whenItHelps.map((item) => (
                  <li key={item} className="flex min-w-0 gap-3 leading-relaxed text-text">
                    <CheckIcon className="mt-1 size-5 shrink-0 text-accent-text" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="min-w-0 rounded-3xl border border-border bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-heading">Qué incluye</h3>
              <ul className="mt-6 grid gap-4">
                {service.details.includes.map((item) => (
                  <li key={item} className="flex min-w-0 gap-3 leading-relaxed text-text">
                    <CheckIcon className="mt-1 size-5 shrink-0 text-accent-text" />
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
          <ol className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 border-l border-primary/20 pl-6 md:grid-cols-2 md:border-l-0 md:pl-0 lg:grid-cols-3">
            {content.howItWorks.map((step, i) => (
              <li key={step} className="min-w-0">
                <Reveal delay={i * 0.06} className="flex h-full gap-5 rounded-3xl border border-border bg-white p-6 md:flex-col">
                  <span className="-ml-12 grid size-12 shrink-0 place-items-center rounded-full bg-primary font-display text-lg font-bold text-white md:ml-0">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed text-text">{step}</p>
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
            <Reveal className="min-w-0 rounded-3xl border border-border bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-heading">Beneficios</h3>
              <ul className="mt-6 grid gap-4">
                {content.benefits.map((item) => (
                  <li key={item} className="flex min-w-0 gap-3 leading-relaxed text-text">
                    <CheckIcon className="mt-1 size-5 shrink-0 text-accent-text" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="min-w-0 rounded-3xl border border-border bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-heading">A considerar</h3>
              <ul className="mt-6 grid gap-4">
                {content.consider.map((item) => (
                  <li key={item} className="flex min-w-0 gap-3 leading-relaxed text-text">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/60" />
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
            <div className="rounded-[2rem] border border-primary/20 p-2">
              <div className="rounded-[1.5rem] border border-primary/10 bg-white p-6 sm:p-10">
                <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
                  {content.aftercare.map((item) => (
                    <li key={item} className="flex min-w-0 gap-3 text-base leading-relaxed text-text">
                      <CheckIcon className="mt-1 size-5 shrink-0 text-accent-text" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {service.ortho && <OrthoPriceBlock service={service} />}

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
          <Reveal className="mt-8 rounded-3xl border border-border bg-white p-6 sm:p-10">
            <FaqAccordion items={content.faqs} />
          </Reveal>
          <p className="mt-6 text-sm text-text">
            Información orientativa. El plan final y el costo se definen en tu evaluación, según tu caso.
          </p>
        </div>
      </section>
    </>
  );
}

/** SEO-lead document sections, rendered exactly as written. */
function DocSections({ doc }: { doc: ServiceDoc }) {
  const faqIndex = doc.sections.length;
  return (
    <>
      {doc.sections.map((section, i) => {
        const id = `doc-section-${i + 1}-title`;
        return (
          <section key={id} aria-labelledby={id} className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
            <SectionAtmosphere tone={i % 2 === 0 ? "white" : "mist"} />

            <div className="container-page">
              <SectionHeading
                number={sectionNumber(i)}
                label={sectionLabel(section.title)}
                id={id}
                layout="stack"
                title={section.title}
              />
              <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6">
                {section.blocks.length > 0 && (
                  <div className="grid min-w-0 gap-5">
                    <DocBlocks blocks={section.blocks} h1={doc.h1} />
                  </div>
                )}
                {section.subsections.map((sub, j) => (
                  <Reveal key={sub.title} delay={j * 0.06} className="min-w-0 rounded-3xl border border-border bg-white p-6 sm:p-8">
                    <h3 className="font-display text-xl font-bold text-heading">{sub.title}</h3>
                    <div className="mt-6 grid gap-5">
                      <DocBlocks blocks={sub.blocks} h1={doc.h1} />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="faq-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone={faqIndex % 2 === 0 ? "white" : "mist"} lines="tr" />

        <div className="container-page">
          <SectionHeading
            number={sectionNumber(faqIndex)}
            label="Preguntas"
            id="faq-title"
            layout="stack"
            title={doc.faqTitle}
          />
          <Reveal className="mt-8 rounded-3xl border border-border bg-white p-6 sm:p-10">
            <FaqAccordion items={doc.faqs} />
          </Reveal>
          <p className="mt-10 text-pretty leading-relaxed text-text">{doc.closing}</p>
        </div>
      </section>
    </>
  );
}

function DocBlocks({ blocks, h1 }: { blocks: DocBlock[]; h1: string }) {
  return (
    <>
      {blocks.map((block, i) => (
        <DocBlockView key={i} block={block} h1={h1} />
      ))}
    </>
  );
}

function DocBlockView({ block, h1 }: { block: DocBlock; h1: string }) {
  switch (block.type) {
    case "p":
      return <p className="leading-relaxed text-text">{block.text}</p>;

    case "ul":
    case "ol":
      if (block.type === "ol") {
        return (
          <ol className="grid gap-4">
            {block.items.map((item, i) => (
              <li key={i} className="flex min-w-0 gap-4 leading-relaxed text-text">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-display text-base font-bold text-white">
                  {i + 1}
                </span>
                <span className="min-w-0 pt-1.5">{item}</span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="grid gap-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex min-w-0 gap-3 leading-relaxed text-text">
              <CheckIcon className="mt-1 size-5 shrink-0 text-accent-text" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "prices":
      return (
        <dl className="divide-y divide-border">
          {block.items.map((item, i) => (
            <div
              key={i}
              className="flex min-w-0 flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <dt className="min-w-0 text-text">{item.label}</dt>
              <dd className="font-display text-lg font-bold text-heading sm:text-right">
                {"pending" in item ? <span className="pill pill-solid">Precio por validar</span> : item.value}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "sources":
    case "note":
      return <p className="text-sm text-text">{block.text}</p>;

    case "gallery":
      return <ServiceGallery cases={block.cases} placeholder={block.placeholder} aiGenerated={block.aiGenerated} serviceName={h1} />;
  }
}

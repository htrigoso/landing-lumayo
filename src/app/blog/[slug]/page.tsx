import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KeyTakeaways } from "@/components/blog/KeyTakeaways";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { SectionAtmosphere } from "@/components/decor/SectionAtmosphere";
import { WaveDivider } from "@/components/decor/WaveDivider";
import { ArrowRightIcon, WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { BookingSection } from "@/components/sections/BookingSection";
import { FaqAccordion } from "@/components/orthodontics/FaqAccordion";
import { getPost, getRelatedPosts, posts } from "@/lib/blog";
import { services, whatsappUrl } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

const dateFormat = new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const formatDate = (iso: string) => dateFormat.format(new Date(iso));
const REVIEWER: string | null = null; // TODO: set the dentist's name and COP once confirmed

// Blocking route: unknown slugs must answer 404, which streaming cannot do after the shell is sent.
export const instant = false;

/** Pre-renders one page per article; `dynamicParams` is unavailable with cacheComponents. */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return { title: "Artículo no encontrado · Lumayo Centro Odontológico" };
  }
  const title = `${post.title} · Lumayo Centro Odontológico`;
  return {
    title,
    description: post.excerpt,
    openGraph: { type: "article", title, description: post.excerpt },
  };
}

export default function BlogPostPage({ params }: PageProps) {
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
        <PostContent params={params} />

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

async function PostContent({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const cover = services.find((s) => s.id === post.coverServiceId)?.image;
  const related = getRelatedPosts(post.slug, 3);
  const consult = whatsappUrl(`Hola Lumayo, leí el artículo "${post.title}" y quisiera una evaluación.`);

  // The article title is the only h1 on the page. JSON-LD escapes "<" so content cannot close the script tag.
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: "Lumayo Centro Odontológico" },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <section aria-labelledby="post-title" className="relative isolate overflow-hidden bg-white pt-6 pb-10 lg:pt-8 lg:pb-12">
        <SectionAtmosphere tone="white" lines="tr" />

        <div className="container-page">
          <nav aria-label="Ruta">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-ink-600">
              <li>
                <Link href="/" className="rounded-sm underline-offset-4 hover:text-navy-700 hover:underline motion-reduce:transition-none">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true" className="text-navy-700/30">
                /
              </li>
              <li>
                <Link href="/blog" className="rounded-sm underline-offset-4 hover:text-navy-700 hover:underline motion-reduce:transition-none">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="text-navy-700/30">
                /
              </li>
              <li className="min-w-0 max-w-full truncate">
                <span aria-current="page" className="text-navy-700">
                  {post.title}
                </span>
              </li>
            </ol>
          </nav>

          <Reveal delay={0.1} className="mt-5 min-w-0">
            <div className="relative isolate flex min-h-[26rem] items-end overflow-hidden rounded-3xl bg-navy-900 shadow-[0_30px_60px_-30px_color-mix(in_srgb,var(--color-azul-950)_45%,transparent)] ring-1 ring-navy-900/5 sm:min-h-[30rem] lg:aspect-[2/1] lg:min-h-0">
              {cover && (
                <Image
                  src={cover}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1200px) 1104px, 100vw"
                  className="object-cover object-[50%_35%]"
                />
              )}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/10" />
              <div aria-hidden="true" className="absolute inset-0 bg-navy-900/25 lg:hidden" />

              <div className="relative z-10 w-full min-w-0 p-5 sm:p-8 lg:max-w-3xl lg:p-12">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill !bg-white !text-navy-700">{post.category}</span>
                  <span className="pill pill-outline">{post.readingMinutes} min de lectura</span>
                </div>
                <h1 id="post-title" className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white text-balance sm:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-sky-100/90 sm:text-lg">{post.excerpt}</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line pb-5">
            <p className="text-sm text-ink-600">
              Por <strong className="font-semibold text-navy-700">Equipo Lumayo</strong> · Actualizado{" "}
              <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              {REVIEWER ? (
                <>
                  {" "}· Revisado por <strong className="font-semibold text-navy-700">{REVIEWER}</strong>
                </>
              ) : null}
            </p>
            <a href={consult} target="_blank" rel="noopener" className="btn btn-wa text-sm">
              <WhatsappIcon />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section aria-label="Contenido del artículo" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere tone="mist" washTop="white" />

        <div className="container-page">
          <div className="mx-auto min-w-0">
            <TableOfContents sections={post.sections.map(({ id, title }) => ({ id, title }))} />

            <div className="mt-12 lg:mt-16">
              <KeyTakeaways items={post.keyTakeaways} />
            </div>
            <div className="mt-12 lg:mt-16">
              <PostBody sections={post.sections} />
            </div>

            <section aria-labelledby="faq-title" className="mt-12 lg:mt-16 rounded-3xl border border-line bg-white p-6 sm:p-10">
              <h2 id="faq-title" className="font-display text-2xl font-extrabold text-navy-700 sm:text-3xl">
                Preguntas frecuentes
              </h2>
              <FaqAccordion items={post.faqs} />
            </section>
          </div>
        </div>
      </section>

      <section aria-labelledby="servicios-relacionados-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere />

        <div className="container-page">
          {post.related.length > 0 && (
            <>
              <h2 id="servicios-relacionados-title" className="section-title">
                Servicios <strong>relacionados</strong>
              </h2>
              <ul className="mt-8 lg:mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
                {post.related.map((item) => (
                  <li key={item.href} className="min-w-0">
                    <Link
                      href={item.href}
                      className="group flex h-full items-center justify-between gap-4 rounded-3xl border border-line bg-white p-6 font-display text-lg font-bold leading-snug text-navy-700 transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      {item.label}
                      <ArrowRightIcon className="size-5 shrink-0 text-cyan-700 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="mt-8 text-sm text-ink-600">
            Este contenido es informativo y no reemplaza una consulta con tu odontólogo.
          </p>

          <details className="mt-4 text-sm text-ink-600">
            <summary className="cursor-pointer font-semibold text-navy-700">Referencias</summary>
            <ul className="mt-3 grid gap-2">
              {post.sources.map((source) => (
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

      {related.length > 0 && (
        <section aria-labelledby="sigue-leyendo-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
          <SectionAtmosphere tone="mist" glow="tr" />

          <div className="container-page">
            <h2 id="sigue-leyendo-title" className="section-title">
              Sigue <strong>leyendo</strong>
            </h2>
            <div className="mt-8 lg:mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="cta-blog-title" className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20">
        <SectionAtmosphere washBottom="mist" />

        <div className="container-page">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-3xl bg-navy-900 p-8 text-white sm:p-12">
              <IsotypeWatermark tone="dark" className="-bottom-20 -right-16 w-80" />
              <div className="relative max-w-2xl">
                <h2 id="cta-blog-title" className="section-title !text-white">
                  ¿Tienes dudas sobre tu sonrisa?
                </h2>
                <p className="mt-5 text-pretty text-base leading-relaxed text-sky-100/85 sm:text-lg">
                  Escríbenos por WhatsApp y coordinamos una evaluación según tu caso.
                </p>
                <a href={consult} target="_blank" rel="noopener" className="btn btn-wa mt-8 text-base">
                  <WhatsappIcon />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleLd, faqLd]).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

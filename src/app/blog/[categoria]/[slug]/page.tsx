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
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPostJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { getPost, getRelatedPosts, blogCategoryOf, blogCategoryPath, posts, postPath } from "@/lib/blog";
import { services, whatsappUrl } from "@/lib/site";

type PageProps = { params: Promise<{ categoria: string; slug: string }> };

const dateFormat = new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const formatDate = (iso: string) => dateFormat.format(new Date(iso));
const REVIEWER: string | null = null; // TODO: set the dentist's name and COP once confirmed

// Blocking route: unknown slugs must answer 404, which streaming cannot do after the shell is sent.
export const instant = false;

/** Pre-renders one page per article; `dynamicParams` is unavailable with cacheComponents. */
export function generateStaticParams() {
  return posts.map((post) => ({ categoria: blogCategoryOf(post).slug, slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria, slug } = await params;
  const post = getPost(slug);
  if (!post || blogCategoryOf(post).slug !== categoria) {
    return { title: "Artículo no encontrado · Lumayo Centro Odontológico" };
  }
  const path = postPath(post);
  const title = `${post.title} · Lumayo Centro Odontológico`;
  return {
    title,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: { type: "article", title, description: post.excerpt, url: path },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-semibold text-text-inverse focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main">
        <PostContent params={params} />

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

async function PostContent({ params }: PageProps) {
  const { categoria, slug } = await params;
  const post = getPost(slug);
  // A post only lives under its own category; any other category segment is not found.
  if (!post || blogCategoryOf(post).slug !== categoria) notFound();
  const category = blogCategoryOf(post);

  const cover = services.find((s) => s.id === post.coverServiceId)?.image;
  const related = getRelatedPosts(post.slug, 3);
  const consult = whatsappUrl(`Hola Lumayo, leí el artículo "${post.title}" y quisiera una evaluación.`);

  return (
    <>
      <JsonLd data={blogPostJsonLd(post)} />
      <JsonLd data={faqJsonLd(post.faqs)} />
      <section aria-labelledby="post-title" className="relative isolate overflow-hidden bg-white pt-6 pb-10 lg:pt-8 lg:pb-12">
        <SectionAtmosphere tone="white" lines="tr" />

        <div className="container-page">
          <nav aria-label="Ruta">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-text">
              <li>
                <Link href="/" className="rounded-sm underline-offset-4 hover:text-heading hover:underline motion-reduce:transition-none">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true" className="text-heading/30">
                /
              </li>
              <li>
                <Link href="/blog" className="rounded-sm underline-offset-4 hover:text-heading hover:underline motion-reduce:transition-none">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="text-heading/30">
                /
              </li>
              <li>
                <Link
                  href={blogCategoryPath(category)}
                  className="rounded-sm underline-offset-4 hover:text-heading hover:underline motion-reduce:transition-none"
                >
                  {category.label}
                </Link>
              </li>
              <li aria-hidden="true" className="text-heading/30">
                /
              </li>
              <li className="min-w-0 max-w-full truncate">
                <span aria-current="page" className="text-heading">
                  {post.title}
                </span>
              </li>
            </ol>
          </nav>

          <Reveal delay={0.1} className="mt-5 min-w-0">
            <div className="relative isolate flex min-h-[26rem] items-end overflow-hidden rounded-3xl bg-gradient-to-br from-surface-deep to-primary shadow-[0_30px_60px_-30px_color-mix(in_srgb,var(--color-azul-950)_45%,transparent)] ring-1 ring-surface-deep/5 sm:min-h-[30rem] lg:aspect-[2/1] lg:min-h-0">
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
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-surface-deep via-surface-deep/70 to-surface-deep/10" />
              <div aria-hidden="true" className="absolute inset-0 bg-surface-deep/25 lg:hidden" />

              <div className="relative z-10 w-full min-w-0 p-5 sm:p-8 lg:max-w-3xl lg:p-12">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={blogCategoryPath(category)} className="pill pill-outline">
                    {post.category}
                  </Link>
                  <span className="pill pill-outline">{post.readingMinutes} min de lectura</span>
                </div>
                <h1 id="post-title" className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-text-inverse text-balance sm:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-text-inverse-muted sm:text-lg">{post.excerpt}</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-border pb-5">
            <p className="text-sm text-text">
              Por <strong className="font-semibold text-heading">Equipo Lumayo</strong> · Actualizado{" "}
              <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              {REVIEWER ? (
                <>
                  {" "}· Revisado por <strong className="font-semibold text-heading">{REVIEWER}</strong>
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

            <section aria-labelledby="faq-title" className="mt-12 lg:mt-16 rounded-3xl border border-border bg-white p-6 sm:p-10">
              <h2 id="faq-title" className="font-display text-2xl font-extrabold text-heading sm:text-3xl">
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
                      className="group flex h-full items-center justify-between gap-4 rounded-3xl border border-border bg-white p-6 font-display text-lg font-bold leading-snug text-heading transition hover:-translate-y-1 hover:border-azul-200 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      {item.label}
                      <ArrowRightIcon className="size-5 shrink-0 text-accent-text transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="mt-8 text-sm text-text">
            Este contenido es informativo y no reemplaza una consulta con tu odontólogo.
          </p>

          <details className="mt-4 text-sm text-text">
            <summary className="cursor-pointer font-semibold text-heading">Referencias</summary>
            <ul className="mt-3 grid gap-2">
              {post.sources.map((source) => (
                <li key={source.url} className="min-w-0 break-words">
                  <a href={source.url} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-heading">
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
            <div className="relative isolate overflow-hidden rounded-3xl bg-surface-inverse p-8 text-text-inverse sm:p-12">
              <IsotypeWatermark tone="dark" className="-bottom-20 -right-16 w-80" />
              <div className="relative max-w-2xl">
                <h2 id="cta-blog-title" className="section-title !text-text-inverse">
                  ¿Tienes dudas sobre tu sonrisa?
                </h2>
                <p className="mt-5 text-pretty text-base leading-relaxed text-text-inverse-muted sm:text-lg">
                  Escríbenos por WhatsApp y coordinamos una evaluación según tu caso.
                </p>
                <a href={consult} target="_blank" rel="noopener" className="btn btn-light mt-8 text-base">
                  <WhatsappIcon />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}

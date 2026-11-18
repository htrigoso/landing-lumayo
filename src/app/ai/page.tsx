import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hoursText } from "@/lib/ai-resources/text";
import { pageSocial } from "@/lib/seo/metadata";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { SectionHeading } from "@/components/brand/SectionHeading";
import { PageHeader } from "@/components/sections/PageHeader";
import { defaultWhatsappMessage, programPaths, serviceCategories, categoryPath, site, siteUrl, whatsappUrl } from "@/lib/site";

const title = "Ficha para IA · Lumayo Centro Odontológico";
const description =
  "Datos oficiales del centro, enlaces a los archivos para asistentes de IA y un resumen de servicios y programas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ai" },
  ...pageSocial({ title, description, path: "/ai" }),
};

/** Files published for AI assistants and search crawlers. Paths only; each one is a route in src/app. */
const aiFiles: readonly { path: string; label: string; description: string }[] = [
  { path: "/llms.txt", label: "llms.txt", description: "Resumen del sitio y mapa de páginas." },
  { path: "/llms-full.txt", label: "llms-full.txt", description: "Servicios, programas, preguntas frecuentes y blog en un solo documento." },
  { path: "/ai-feed.jsonld", label: "ai-feed.jsonld", description: "Clínica, sitio y preguntas frecuentes en JSON-LD." },
  { path: "/knowledge-graph.json", label: "knowledge-graph.json", description: "El mismo grafo de datos, en JSON." },
  { path: "/ai.txt", label: "ai.txt", description: "Política de uso del contenido para sistemas de IA." },
  { path: "/agents.md", label: "agents.md", description: "Instrucciones para agentes: fuentes, cómo responder y qué no inferir." },
  { path: "/llm-training.txt", label: "llm-training.txt", description: "Hechos estables de la clínica, sin precios ni promociones." },
  { path: "/humans.txt", label: "humans.txt", description: "Organización, sede, contacto y redes." },
  { path: "/feed.xml", label: "feed.xml", description: "Feed RSS del blog." },
  { path: "/sitemap-ai.xml", label: "sitemap-ai.xml", description: "URL prioritarias para asistentes de IA." },
  { path: "/security.txt", label: "security.txt", description: "Contacto de seguridad (RFC 9116)." },
];

const factClass = "text-sm font-medium uppercase tracking-[0.12em] text-primary";
const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-azul-900";

/** Lightweight hub for AI assistants and people who want the clinic's facts in one place. Not in the header nav. */
export default function AiHubPage() {
  const facts: { label: string; value: ReactNode }[] = [
    { label: "Nombre", value: "Lumayo Centro Odontológico" },
    { label: "Razón social", value: site.legal.name },
    { label: "RUC", value: site.legal.ruc },
    { label: "Dirección", value: `${site.address.street}, ${site.address.district}, ${site.address.city}, ${site.address.region}, Perú` },
    { label: "Horario", value: hoursText() },
    {
      label: "Teléfono y WhatsApp",
      value: (
        <>
          {site.phoneDisplay} ·{" "}
          <a className={linkClass} href={whatsappUrl(defaultWhatsappMessage)}>
            escribir por WhatsApp
          </a>
        </>
      ),
    },
    { label: "Correo", value: <a className={linkClass} href={`mailto:${site.email}`}>{site.email}</a> },
    {
      label: "Redes",
      value: (
        <span className="flex flex-wrap gap-x-4 gap-y-1">
          <a className={linkClass} href={site.social.facebook}>Facebook</a>
          <a className={linkClass} href={site.social.instagram}>Instagram</a>
          <a className={linkClass} href={site.social.tiktok}>TikTok</a>
        </span>
      ),
    },
    { label: "Ubicación", value: <a className={linkClass} href={site.mapsUrl}>Ver en Google Maps</a> },
    { label: "Sitio oficial", value: <a className={linkClass} href={siteUrl}>{siteUrl}</a> },
  ];

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
        <PageHeader
          title="Ficha del centro"
          emphasis="para IA"
          description="Datos oficiales de Lumayo Centro Odontológico en Tarapoto, con enlaces a los archivos para asistentes de IA."
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Ficha para IA" }]}
        />

        <section aria-labelledby="ficha" className="container-page py-12 lg:py-16">
          <SectionHeading id="ficha" label="Datos del centro" title={<>Ficha <strong>general</strong></>} layout="stack" />
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-border bg-surface p-5">
                <dt className={factClass}>{fact.label}</dt>
                <dd className="mt-2 text-base text-text">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="servicios-ia" className="container-page pb-12 lg:pb-16">
          <SectionHeading id="servicios-ia" label="Servicios y programas" title={<>Lo que <strong>ofrecemos</strong></>} layout="stack" />
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-text">Categorías</h3>
              <ul className="mt-3 space-y-2">
                {serviceCategories.map((category) => (
                  <li key={category.id}>
                    <a className={linkClass} href={categoryPath(category)}>
                      {category.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text">Programas</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <a className={linkClass} href={programPaths.card}>Membresía Lumayo</a>
                </li>
                <li>
                  <a className={linkClass} href={programPaths.kids}>Lumayo Kids</a>
                </li>
                <li>
                  <a className={linkClass} href={programPaths.novias}>Lumayo Novias</a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="archivos-ia" className="container-page pb-20">
          <SectionHeading id="archivos-ia" label="Archivos" title={<>Recursos <strong>para IA</strong></>} layout="stack" />
          <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface">
            {aiFiles.map((file) => (
              <li key={file.path} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-baseline sm:gap-6">
                <a className={`${linkClass} sm:w-56 sm:shrink-0`} href={file.path}>
                  {file.label}
                </a>
                <span className="text-sm text-text-muted">{file.description}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingWhatsapp />
    </>
  );
}

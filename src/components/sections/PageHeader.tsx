import Link from "next/link";
import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { SectionBackdrop } from "@/components/decor/SectionBackdrop";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo/jsonld";

type PageHeaderProps = {
  /** Titular in the brandbook's 400 + 800 pairing: `title` regular, `emphasis` extra bold. */
  title: string;
  emphasis: string;
  description?: string;
  /** Breadcrumb trail; the last item is the current page. */
  crumbs: Crumb[];
};

/**
 * Inner-page header (as on the reference's "Our Services" page): light brand panel with corner
 * lines, the isotype cropped at the bottom edge, a breadcrumb and a centered Titular.
 */
export function PageHeader({ title, emphasis, description, crumbs }: PageHeaderProps) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,var(--color-bg)_0%,var(--color-surface)_16%,var(--color-surface)_84%,var(--color-bg)_100%)] pt-12 pb-16 lg:pt-16 lg:pb-20">
        <SectionBackdrop lines="tr" glow="bl" surface="mist" />
        {/* Crown stays whole; only the roots run off the bottom edge */}
        <IsotypeWatermark className="-bottom-36 -left-10 -z-10 w-72 !opacity-[0.06] sm:w-96 lg:-bottom-40 lg:left-[6%] lg:w-[22rem]" />

        <Reveal className="container-page text-center">
          <nav aria-label="Ruta">
            <ol className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-text">
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={c.label} className="flex items-center gap-2">
                    {last || !c.href ? (
                      <span aria-current={last ? "page" : undefined} className={last ? "text-primary" : undefined}>
                        {c.label}
                      </span>
                    ) : (
                      <Link href={c.href} className="rounded-sm underline-offset-4 transition-colors hover:text-primary hover:underline">
                        {c.label}
                      </Link>
                    )}
                    {!last && (
                      <span aria-hidden="true" className="text-primary/30">
                        /
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <h1
            id="page-title"
            className="mx-auto mt-4 max-w-3xl font-display text-[2.75rem] font-normal leading-[0.98] tracking-[-0.045em] text-heading sm:text-6xl lg:text-[3.5rem]"
          >
            {title}
            {emphasis ? <> <strong className="font-extrabold">{emphasis}</strong></> : null}
          </h1>
          {description && <p className="section-sub mx-auto mt-3 max-w-xl text-pretty">{description}</p>}
        </Reveal>
      </section>
    </>
  );
}

import { Reveal } from "@/components/motion/Reveal";
import { socialProof } from "@/lib/site";

type Stat = { key: string; value: string; href?: string };

/** Formats a number with a decimal comma, e.g. 4.9 → "4,9", as Spanish readers expect. */
function formatDecimal(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

/** Builds only the stats that have real data. Missing fields are skipped, never shown as placeholders. */
function buildStats(): Stat[] {
  const stats: Stat[] = [];

  if (socialProof.yearsOfExperience !== undefined) {
    stats.push({ key: "years", value: `+${socialProof.yearsOfExperience} años de experiencia` });
  }
  if (socialProof.patientsServed !== undefined) {
    stats.push({ key: "patients", value: `+${socialProof.patientsServed} pacientes atendidos` });
  }
  if (socialProof.googleRating !== undefined) {
    const reviews =
      socialProof.googleReviewsCount !== undefined ? ` (${socialProof.googleReviewsCount} reseñas)` : "";
    stats.push({
      key: "google",
      value: `${formatDecimal(socialProof.googleRating)} ★ en Google${reviews}`,
      href: socialProof.googleReviewsUrl,
    });
  }

  return stats;
}

/** Strip of real social-proof figures. Renders nothing until src/lib/site.ts `socialProof` has data. */
export function SocialProofStrip() {
  const stats = buildStats();
  if (stats.length === 0) return null;

  return (
    <section aria-label="Prueba social" className="bg-surface-soft py-10 lg:py-12">
      <Reveal className="container-page">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
          {stats.map((stat) => (
            <li key={stat.key} className="font-display text-lg font-bold text-heading">
              {stat.href ? (
                <a
                  href={stat.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center underline-offset-4 hover:text-accent-text hover:underline"
                >
                  {stat.value}
                </a>
              ) : (
                stat.value
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

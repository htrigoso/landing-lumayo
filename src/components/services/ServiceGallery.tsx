import Image from "next/image";

type ServiceGalleryProps = {
  cases: { before: string; after: string }[];
  placeholder: boolean;
  aiGenerated?: boolean;
  serviceName: string;
};

/** Before/after cases of a service page. Each case is one card with two photos side by side. */
export function ServiceGallery({ cases, placeholder, aiGenerated = false, serviceName }: ServiceGalleryProps) {
  const altFor = (side: "antes" | "después") => {
    if (aiGenerated) return `Imagen generada con IA de tratamiento dental (${side})`;
    if (placeholder) return `Imagen referencial de tratamiento dental (${side})`;
    return `Antes y después de ${serviceName} en Lumayo, Tarapoto (${side})`;
  };

  return (
    <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8">
      {cases.map((item, i) => (
        <figure
          key={i}
          className="mx-auto w-full max-w-4xl rounded-3xl bg-white p-3 sm:p-4 shadow-[0_18px_40px_-24px_color-mix(in_srgb,var(--color-azul-950)_45%,transparent)] ring-1 ring-border"
        >
          <div className="relative grid grid-cols-2 gap-2 sm:gap-3">
            {placeholder && !aiGenerated && (
              <span className="absolute left-1/2 top-3 z-10 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-azul-950/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-text-inverse backdrop-blur-sm">
                Imagen referencial
              </span>
            )}

            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-soft">
              <Image
                src={item.before}
                alt={altFor("antes")}
                fill
                sizes="(min-width: 896px) 28rem, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-semibold text-primary">
                Antes
              </span>
            </div>

            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-soft">
              <Image
                src={item.after}
                alt={altFor("después")}
                fill
                sizes="(min-width: 896px) 28rem, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-primary px-3.5 py-1.5 text-sm font-semibold text-text-inverse">
                Después
              </span>
            </div>
          </div>

          <figcaption className="mt-3 px-1 text-sm text-text">
            {placeholder ? "Caso referencial · Cada caso es distinto." : "Resultado de un caso real. Cada caso es distinto."}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

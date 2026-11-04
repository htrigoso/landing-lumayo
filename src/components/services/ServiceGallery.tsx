import Image from "next/image";

type ServiceGalleryProps = {
  cases: { before: string; during?: string; after: string }[];
  placeholder: boolean;
  aiGenerated?: boolean;
  serviceName: string;
};

type Stage = "antes" | "proceso" | "después";

/** Before/after cases of a service page. Each case is one card: two photos, or three when a treatment stage is given. */
export function ServiceGallery({ cases, placeholder, aiGenerated = false, serviceName }: ServiceGalleryProps) {
  const altFor = (stage: Stage) => {
    if (aiGenerated) return `Imagen generada con IA de tratamiento dental (${stage})`;
    if (placeholder) return `Imagen referencial de tratamiento dental (${stage})`;
    return `Antes y después de ${serviceName} en Lumayo, Tarapoto (${stage})`;
  };

  return (
    <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8">
      {cases.map((item, i) => {
        const stages: { stage: Stage; label: string; src: string; main: boolean }[] = [
          { stage: "antes", label: "Antes", src: item.before, main: false },
          ...(item.during ? [{ stage: "proceso" as const, label: "Proceso", src: item.during, main: false }] : []),
          { stage: "después", label: "Después", src: item.after, main: true },
        ];

        return (
          <figure
            key={i}
            className="mx-auto w-full max-w-4xl rounded-3xl bg-white p-3 sm:p-4 shadow-[0_18px_40px_-24px_color-mix(in_srgb,var(--color-azul-950)_45%,transparent)] ring-1 ring-border"
          >
            <div className={`relative grid gap-2 sm:gap-3 ${stages.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
              {placeholder && !aiGenerated && (
                <span className="absolute left-1/2 top-3 z-10 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-azul-950/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-text-inverse backdrop-blur-sm">
                  Imagen referencial
                </span>
              )}

              {stages.map(({ stage, label, src, main }) => (
                <div key={stage} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-soft">
                  <Image
                    src={src}
                    alt={altFor(stage)}
                    fill
                    sizes="(min-width: 896px) 14rem, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span
                    className={`absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold sm:px-3.5 sm:py-1.5 sm:text-sm ${
                      main ? "bg-primary text-text-inverse" : "bg-white/95 text-primary"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <figcaption className="mt-3 px-1 text-sm text-text">
              {placeholder ? "Caso referencial · Cada caso es distinto." : "Resultado de un caso real. Cada caso es distinto."}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

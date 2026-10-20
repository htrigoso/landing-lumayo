import { IsotypeWatermark } from "@/components/brand/IsotypeWatermark";
import { ChildIcon, CleanIcon, DropIcon, ToothIcon, WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { kidsWhatsappMessage, lumayoKids, whatsappUrl } from "@/lib/site";

// Maps the icon keys in site content to icon components.
const ICONS = {
  brush: CleanIcon,
  floss: ToothIcon,
  sugar: DropIcon,
  bottle: ChildIcon,
} as const;

type HomeCarePanelProps = {
  homeCare: typeof lumayoKids.homeCare;
};

/** Two-column "home care" block: a dark message panel beside a 2x2 grid of tip cards. */
export function HomeCarePanel({ homeCare }: HomeCarePanelProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="relative isolate overflow-hidden rounded-3xl bg-azul-700 p-8 text-white sm:p-10 lg:sticky lg:top-28">
        <IsotypeWatermark tone="dark" className="-bottom-20 -right-16 w-72" />
        <div
          aria-hidden="true"
          className="absolute -left-24 -top-24 -z-10 size-72 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-aqua-400)_30%,transparent),transparent)]"
        />
        <div className="relative">
          <p className="flex items-center gap-3 text-sm font-medium text-azul-100">
            <span aria-hidden="true" className="h-px w-8 bg-azul-100/40" />
            Para los papás
          </p>
          <h3 className="mt-4 font-display text-3xl font-extrabold">{homeCare.title}</h3>
          <p className="mt-4 text-pretty text-base leading-relaxed text-azul-100 sm:text-lg">{homeCare.intro}</p>
          <a
            href={whatsappUrl(kidsWhatsappMessage)}
            target="_blank"
            rel="noopener"
            className="btn btn-light mt-8 text-base"
          >
            <WhatsappIcon />
            Consultar al odontopediatra
          </a>
        </div>
      </div>

      <ul className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2">
        {homeCare.tips.map((tip, index) => {
          const Icon = ICONS[tip.icon];
          return (
            <li key={tip.title} className="min-w-0">
              <Reveal className="h-full" delay={index * 0.06}>
                <article className="group flex h-full gap-5 rounded-3xl border border-border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-azul-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <span
                    aria-hidden="true"
                    className="grid size-14 shrink-0 place-items-center rounded-2xl bg-azul-100 text-azul-700 transition group-hover:bg-azul-700 group-hover:text-white motion-reduce:transition-none"
                  >
                    <Icon className="size-7" />
                  </span>
                  <div className="min-w-0">
                    <span aria-hidden="true" className="font-display text-sm font-bold tracking-[0.12em] text-aqua-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="mt-1 text-lg font-bold text-azul-700">{tip.title}</h4>
                    <p className="mt-2 text-base leading-relaxed text-text">{tip.text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import { ChatIcon, CleanIcon, SmileIcon, ToothIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";

// Maps the icon keys in site content to icon components.
const ICONS = {
  smile: SmileIcon,
  tooth: ToothIcon,
  clean: CleanIcon,
  chat: ChatIcon,
} as const;

type FirstVisitStep = {
  title: string;
  description: string;
  icon: keyof typeof ICONS;
  /** Marks the step aimed at the parents. */
  forParents?: boolean;
};

type FirstVisitTimelineProps = {
  steps: ReadonlyArray<FirstVisitStep>;
};

/** Numbered first-visit steps: a vertical timeline on mobile, a four-column track on desktop. */
export function FirstVisitTimeline({ steps }: FirstVisitTimelineProps) {
  return (
    <div className="relative mt-12">
      <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-white/30 md:block" />
      <ol className="relative grid grid-cols-[minmax(0,1fr)] gap-10 border-l border-white/30 pl-6 md:grid-cols-4 md:gap-8 md:border-l-0 md:pl-0">
        {steps.map((step, index) => {
          const Icon = ICONS[step.icon];
          return (
            <li key={step.title} className="min-w-0">
              <Reveal className="flex h-full flex-col" delay={index * 0.08}>
                <span className="-ml-12 mb-4 grid size-12 place-items-center rounded-full bg-white font-display text-lg font-bold text-primary md:relative md:z-10 md:mx-auto">
                  {index + 1}
                </span>
                <article className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-[0_18px_40px_-28px_color-mix(in_srgb,var(--color-azul-950)_50%,transparent)] transition duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:text-center">
                  {step.forParents ? (
                    <span className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-accent-text">Para ti</span>
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="mx-0 grid size-14 place-items-center rounded-2xl bg-surface-soft text-primary md:mx-auto"
                  >
                    <Icon className="size-7" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-primary">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-text">{step.description}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

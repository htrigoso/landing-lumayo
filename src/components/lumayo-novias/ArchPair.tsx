import Image from "next/image";
import { CalendarIcon, SmileIcon } from "@/components/icons";
import { services } from "@/lib/site";
import { SealBadge } from "./SealBadge";

const primary = services.find((s) => s.id === "diseno-de-sonrisa");
const secondary = services.find((s) => s.id === "carillas-porcelana");

const ARCH_SIZES = "(min-width: 1024px) 26rem, 70vw";

const glassCard =
  "absolute left-4 max-w-44 rounded-2xl border border-white/60 bg-white/75 p-4 shadow-[0_18px_40px_-24px_color-mix(in_srgb,var(--color-azul-950)_50%,transparent)] backdrop-blur-md";

export function ArchPair() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full min-w-0 max-w-md">
      <div aria-hidden="true" className="absolute -inset-3 rounded-t-[999px] border border-navy-700/20" />

      <div className="absolute inset-y-0 left-0 w-[72%] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-sky-100">
        {primary && <Image src={primary.image} alt="" fill sizes={ARCH_SIZES} priority className="object-cover" />}
      </div>

      <div className="absolute right-0 bottom-[8%] aspect-[3/4] w-[52%] overflow-hidden rounded-t-[999px] rounded-b-3xl border-4 border-white bg-sky-100 shadow-[0_24px_48px_-28px_color-mix(in_srgb,var(--color-azul-950)_60%,transparent)]">
        {secondary && <Image src={secondary.image} alt="" fill sizes={ARCH_SIZES} className="object-cover" />}
      </div>

      <div className={`${glassCard} top-8`}>
        <SmileIcon className="size-6 text-cyan-700" />
        <p className="mt-2 text-sm font-semibold text-navy-700">Plan a tu medida</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-600">Diseñado según tu rostro y tu cronograma.</p>
      </div>

      <div className={`${glassCard} top-[42%]`}>
        <CalendarIcon className="size-6 text-cyan-700" />
        <p className="mt-2 text-sm font-semibold text-navy-700">Listo para tu gran día</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-600">Empezamos según la fecha de tu boda.</p>
      </div>

      <SealBadge className="absolute -bottom-6 -left-6" />
    </div>
  );
}

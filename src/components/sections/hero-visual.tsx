import Image from "next/image";
import { CompassRose } from "@/components/ornaments/compass-rose";
import { Insignia } from "@/components/ornaments/insignia";
import { PhoneFrame } from "@/components/ui/phone-frame";

/** The Crew Home screen on a compass rose, with a trade and a Captain card beside it. */
export function HeroVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[32rem] animate-rise justify-center [animation-delay:200ms]">
      <CompassRose className="absolute top-1/2 left-1/2 size-[min(34rem,120%)] -translate-x-1/2 -translate-y-1/2 text-brass/40" />

      <PhoneFrame className="h-[min(34rem,calc(100svh-12rem))] min-h-[28rem]">
        <Image
          src="/app/crew-home.webp"
          alt="Socially Crew Home with a sample portfolio of $10,502.20 and three Captain vaults"
          fill
          sizes="260px"
          loading="eager"
          className="object-cover"
        />
      </PhoneFrame>

      <div className="absolute top-[15%] left-0 hidden w-56 items-center gap-3 rounded-2xl px-4 py-3 panel sm:flex">
        <Image
          src="/captains/atlas.webp"
          alt=""
          width={34}
          height={34}
          className="size-8.5 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-ink">Atlas bought SOL</span>
          <span className="text-xs text-muted">Your vault · 2 min ago</span>
        </div>
      </div>

      <div className="absolute right-0 bottom-[13%] hidden w-56 flex-col gap-1 rounded-2xl p-4 panel sm:flex">
        <div className="flex items-center gap-3">
          <Image
            src="/captains/atlas.webp"
            alt=""
            width={34}
            height={34}
            className="size-8.5 rounded-xl object-cover"
          />
          <div className="flex flex-col">
            <span className="flex items-center gap-2 text-sm font-semibold text-ink">
              Atlas <Insignia rank="Admiral" className="size-5 text-[0.6rem]" />
            </span>
            <span className="text-xs text-muted">Solana Momentum</span>
          </div>
        </div>
        <span className="mt-1.5 font-display text-[1.75rem] leading-none text-mint">+42.8%</span>
        <span className="text-xs text-muted">90 days · worst drop −12.8%</span>
      </div>
    </div>
  );
}

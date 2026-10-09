"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { CompassRose } from "@/components/ornaments/compass-rose";
import { Insignia } from "@/components/ornaments/insignia";
import { PhoneFrame } from "@/components/ui/phone-frame";

const float = (delay: number) => ({
  animate: { y: [0, -8, 0] },
  transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const, delay },
});

/** The Crew Home screen on a slowly turning compass, with two live cards around it. */
export function HeroVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[34rem] animate-rise justify-center [animation-delay:200ms]">
      <CompassRose className="absolute top-1/2 left-1/2 size-[min(36rem,125%)] -translate-x-1/2 -translate-y-1/2 animate-turn text-brass/45" />

      <PhoneFrame className="h-[min(36rem,calc(100svh-12rem))] min-h-[28rem]">
        <Image
          src="/app/crew-home.webp"
          alt="Socially Crew Home with a sample portfolio of $10,502.20 and three Captain vaults"
          fill
          sizes="280px"
          loading="eager"
          className="object-cover"
        />
      </PhoneFrame>

      <motion.div
        {...float(0)}
        className="absolute top-[14%] left-0 hidden w-60 items-center gap-3 rounded-2xl px-4 py-3 panel sm:flex"
      >
        <Image
          src="/captains/atlas.webp"
          alt=""
          width={36}
          height={36}
          className="size-9 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-ink">Atlas bought SOL</span>
          <span className="text-xs text-muted">Your vault · 2 min ago</span>
        </div>
        <span aria-hidden className="ml-auto size-2 animate-pulse-dot rounded-full bg-mint" />
      </motion.div>

      <motion.div
        {...float(1.8)}
        className="absolute right-0 bottom-[12%] hidden w-60 flex-col gap-1.5 rounded-2xl p-4 panel sm:flex"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/captains/atlas.webp"
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-xl object-cover"
          />
          <div className="flex flex-col">
            <span className="flex items-center gap-2 text-sm font-semibold text-ink">
              Atlas <Insignia rank="Admiral" className="size-5 text-[0.6rem]" />
            </span>
            <span className="text-xs text-muted">Solana Momentum</span>
          </div>
        </div>
        <span className="mt-1 font-display text-[2rem] leading-none text-mint">+42.8%</span>
        <span className="text-xs text-muted">90 days · worst drop −12.8%</span>
      </motion.div>
    </div>
  );
}

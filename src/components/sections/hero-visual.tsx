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
    <div className="relative mx-auto flex w-full max-w-[36rem] animate-rise justify-center [animation-delay:200ms]">
      <CompassRose className="absolute top-1/2 left-1/2 size-[min(40rem,130%)] -translate-x-1/2 -translate-y-1/2 animate-turn text-brass/50" />

      <PhoneFrame className="h-[min(40rem,calc(100svh-12rem))] min-h-[30rem]">
        <Image
          src="/app/crew-home.webp"
          alt="Socially Crew Home with a sample portfolio of $10,502.20 and three Captain vaults"
          fill
          sizes="300px"
          loading="eager"
          className="object-cover"
        />
      </PhoneFrame>

      <motion.div
        {...float(0)}
        className="absolute top-[14%] left-0 hidden w-64 items-center gap-3 rounded-2xl px-4 py-3.5 panel-night sm:flex"
      >
        <Image
          src="/captains/atlas.webp"
          alt=""
          width={38}
          height={38}
          className="size-[38px] rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Atlas bought SOL</span>
          <span className="text-xs text-haze">Your vault · 2 min ago</span>
        </div>
        <span aria-hidden className="ml-auto size-2 animate-pulse-dot rounded-full bg-mint-glow" />
      </motion.div>

      <motion.div
        {...float(1.8)}
        className="absolute right-0 bottom-[12%] hidden w-64 flex-col gap-2 rounded-2xl p-4 panel-night sm:flex"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/captains/atlas.webp"
            alt=""
            width={38}
            height={38}
            className="size-[38px] rounded-xl object-cover"
          />
          <div className="flex flex-col">
            <span className="flex items-center gap-2 text-sm font-semibold">
              Atlas <Insignia rank="Admiral" className="size-5 text-[0.6rem]" />
            </span>
            <span className="text-xs text-haze">Solana Momentum</span>
          </div>
        </div>
        <span className="font-display text-[2.25rem] leading-none font-semibold text-mint-glow">
          +42.8%
        </span>
        <span className="text-xs text-haze">90 days · worst drop −12.8%</span>
      </motion.div>
    </div>
  );
}

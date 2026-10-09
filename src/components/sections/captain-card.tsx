"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import type { SampleCaptain } from "./captains-data";

const riskTone = {
  Lower: "bg-mint-glow/15 text-mint-glow",
  Moderate: "bg-[#ebaf54]/15 text-[#ebc07a]",
  Higher: "bg-coral-glow/15 text-coral-glow",
};

/** A navy Captain card that floats gently and turns over to show the vault's rules. */
export function CaptainCard({
  captain,
  className,
  floatDelay = 0,
}: {
  captain: SampleCaptain;
  className?: string;
  floatDelay?: number;
}) {
  const [showRules, setShowRules] = useState(false);
  const gradientId = useId();

  return (
    <motion.article
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      className={cn("flex flex-col gap-4 rounded-[24px] p-5 navy-plate", className)}
    >
      <div className="flex items-center justify-between text-[0.6875rem] font-semibold tracking-[0.14em] text-on-navy-muted uppercase">
        <span>{captain.top ? "✦ Top Captain · Sample" : "Sample"}</span>
        <span>{captain.crew} Crew</span>
      </div>

      <div className="flex items-center gap-3">
        <Image
          src={captain.portrait}
          alt={`Portrait of ${captain.name}`}
          width={52}
          height={52}
          className="size-13 flex-none rounded-[13px] object-cover"
        />
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">{captain.name}</h3>
          <span className="text-[0.8125rem] text-on-navy-muted">{captain.fund}</span>
        </div>
      </div>

      <div className="relative h-[8.5rem]">
        <AnimatePresence mode="wait" initial={false}>
          {showRules ? (
            <motion.dl
              key="rules"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-2 gap-x-4 gap-y-3"
            >
              {captain.rules.map((rule) => (
                <div key={rule.label} className="flex flex-col gap-0.5">
                  <dt className="text-xs text-on-navy-muted">{rule.label}</dt>
                  <dd className="text-[0.9375rem] font-semibold">{rule.value}</dd>
                </div>
              ))}
            </motion.dl>
          ) : (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="flex h-full flex-col gap-2"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[2rem] leading-none font-semibold text-mint-glow">
                  {captain.returnPct}
                </span>
                <span className="text-right text-xs text-on-navy-muted">
                  90D return ·{" "}
                  <span className="text-coral-glow">{captain.drawdownPct} max drawdown</span>
                </span>
              </div>
              <svg
                viewBox="0 0 300 64"
                preserveAspectRatio="none"
                aria-hidden
                className="h-full min-h-0 w-full flex-1"
              >
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#78B7FF" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#78B7FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${captain.chart} L300 64 L0 64 Z`} fill={`url(#${gradientId})`} />
                <path
                  d={captain.chart}
                  fill="none"
                  stroke="#78B7FF"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 text-[0.8125rem] text-on-navy-muted">
        <span>
          <b className="font-semibold text-on-navy">{captain.aum}</b> AUM
        </span>
        <span className="flex items-center gap-2">
          <span className={cn("rounded-full px-2.5 py-1 text-xs", riskTone[captain.risk])}>
            {captain.risk} risk
          </span>
          <button
            type="button"
            aria-pressed={showRules}
            onClick={() => setShowRules((value) => !value)}
            className="min-h-9 rounded-full border border-on-navy/20 px-3 text-xs font-semibold text-on-navy transition-colors hover:bg-on-navy/10"
          >
            {showRules ? "Performance" : "Rules"}
          </button>
        </span>
      </div>
    </motion.article>
  );
}

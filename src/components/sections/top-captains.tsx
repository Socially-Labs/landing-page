"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Insignia } from "@/components/ornaments/insignia";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sparkline } from "@/components/ui/sparkline";
import { cn } from "@/lib/cn";
import {
  captains,
  periods,
  series,
  shipsLog,
  signedPercent,
  type Captain,
  type Period,
} from "@/lib/sample-data";

const periodLabel: Record<Period, string> = {
  "7D": "7 days",
  "30D": "30 days",
  "90D": "90 days",
  All: "all time",
};

const riskTone: Record<Captain["risk"], string> = {
  Low: "bg-mint-tint text-mint",
  Medium: "bg-amber-tint text-amber",
  High: "bg-coral-tint text-coral",
};

function PeriodPicker({ value, onChange }: { value: Period; onChange: (p: Period) => void }) {
  return (
    <div
      role="group"
      aria-label="Time period"
      className="flex w-fit rounded-full bg-pearl p-1 ring-1 ring-line"
    >
      {periods.map((period) => (
        <button
          key={period}
          type="button"
          aria-pressed={value === period}
          onClick={() => onChange(period)}
          className="relative min-h-10 rounded-full px-4 text-sm font-semibold text-muted"
        >
          {value === period && (
            <motion.span
              layoutId="period-pill"
              transition={{ type: "spring", damping: 30, stiffness: 380 }}
              className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgb(24_43_67/0.15)]"
            />
          )}
          <span className={cn("relative", value === period && "text-ink")}>{period}</span>
        </button>
      ))}
    </div>
  );
}

export function TopCaptains() {
  const [period, setPeriod] = useState<Period>("90D");
  const ranked = [...captains].sort((a, b) => b.returns[period] - a.returns[period]);

  return (
    <Section id="captains" className="py-24 md:py-32">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Port of Captains"
            title={
              <>
                Top Captains, <em>side by side.</em>
              </>
            }
            lede="Every return sits beside its worst drop: the biggest fall from a high in the same period."
          />
          <Reveal className="flex flex-wrap items-center gap-5">
            <PeriodPicker value={period} onChange={setPeriod} />
            <a
              href="#join"
              className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ink hover:text-brass-deep"
            >
              Get early access <ArrowRight aria-hidden className="size-4" />
            </a>
          </Reveal>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
          <Reveal className="overflow-hidden rounded-panel panel">
            <div className="hidden md:block">
              <table className="w-full border-collapse text-left text-[0.9375rem]">
                <caption className="sr-only">
                  Top Captains ranked by return over {periodLabel[period]}
                </caption>
                <thead>
                  <tr className="border-b border-line eyebrow whitespace-nowrap text-muted">
                    <th scope="col" className="py-4 pr-2 pl-6 font-semibold">
                      #
                    </th>
                    <th scope="col" className="px-3 py-4 font-semibold">
                      Captain
                    </th>
                    <th scope="col" className="px-3 py-4 text-right font-semibold">
                      Return
                    </th>
                    <th scope="col" className="px-3 py-4 text-right font-semibold">
                      Worst drop
                    </th>
                    <th scope="col" className="px-3 py-4 font-semibold">
                      <span className="sr-only">Trend</span>
                    </th>
                    <th scope="col" className="px-3 py-4 text-right font-semibold">
                      In vault
                    </th>
                    <th scope="col" className="px-3 py-4 text-right font-semibold">
                      Crew
                    </th>
                    <th scope="col" className="py-4 pr-6 pl-3 font-semibold">
                      Risk
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ranked.map((captain, index) => {
                    const value = captain.returns[period];
                    return (
                      <motion.tr
                        key={captain.id}
                        layout
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="border-b border-line/70 last:border-b-0"
                      >
                        <td className="py-4 pr-2 pl-6 font-display text-xl text-muted italic">
                          {index + 1}
                        </td>
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={captain.portrait}
                              alt=""
                              width={40}
                              height={40}
                              className="size-10 rounded-xl object-cover"
                            />
                            <div className="flex flex-col">
                              <span className="flex items-center gap-2 font-semibold text-ink">
                                {captain.name}
                                <Insignia rank={captain.rank} className="size-5 text-[0.6rem]" />
                              </span>
                              <span className="text-[0.8125rem] text-muted">
                                {captain.style} · {captain.months} months
                              </span>
                            </div>
                          </div>
                        </td>
                        <td
                          className={cn(
                            "px-3 py-4 text-right font-semibold tabular-nums",
                            value >= 0 ? "text-mint" : "text-coral",
                          )}
                        >
                          {signedPercent(value)}
                        </td>
                        <td className="px-3 py-4 text-right text-coral tabular-nums">
                          {signedPercent(captain.worstDrop[period])}
                        </td>
                        <td className="px-3 py-4">
                          <Sparkline
                            values={series(captain.months + captain.crew, value, 20)}
                            className={cn("h-7 w-22", value >= 0 ? "text-mint" : "text-coral")}
                          />
                        </td>
                        <td className="px-3 py-4 text-right text-ink tabular-nums">
                          {captain.inVault}
                        </td>
                        <td className="px-3 py-4 text-right text-ink tabular-nums">
                          {captain.crew}
                        </td>
                        <td className="py-4 pr-6 pl-3">
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-xs font-semibold",
                              riskTone[captain.risk],
                            )}
                          >
                            {captain.risk}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <ul className="divide-y divide-line md:hidden">
              {ranked.map((captain) => {
                const value = captain.returns[period];
                return (
                  <li key={captain.id} className="flex items-center gap-3 p-4">
                    <Image
                      src={captain.portrait}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10 rounded-xl object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="flex items-center gap-2 font-semibold text-ink">
                        {captain.name}
                        <Insignia rank={captain.rank} className="size-5 text-[0.6rem]" />
                      </span>
                      <span className="truncate text-xs text-muted">
                        {captain.inVault} in vault · {captain.crew} Crew · {captain.risk} risk
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={cn(
                          "font-semibold tabular-nums",
                          value >= 0 ? "text-mint" : "text-coral",
                        )}
                      >
                        {signedPercent(value)}
                      </span>
                      <span className="text-xs text-coral tabular-nums">
                        {signedPercent(captain.worstDrop[period])} worst
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal
            delay={0.08}
            className="flex flex-col rounded-panel bg-pearl p-6 ring-1 ring-line"
          >
            <div className="flex items-center justify-between pb-4">
              <span className="eyebrow text-brass-deep">Ship’s log</span>
              <span className="flex items-center gap-2 text-xs text-muted">
                <span aria-hidden className="size-2 rounded-full bg-brass" />
                Sample
              </span>
            </div>
            <ul className="flex flex-col">
              {shipsLog.map((entry) => (
                <li
                  key={`${entry.captain}-${entry.when}`}
                  className="flex items-center gap-3 border-t border-line py-3 text-sm"
                >
                  <Image
                    src={entry.portrait}
                    alt=""
                    width={30}
                    height={30}
                    className="size-7.5 rounded-full object-cover"
                  />
                  <span className="flex-1 text-ink-soft">
                    <b className="font-semibold text-ink">{entry.captain}</b> {entry.text}
                  </span>
                  <span className="text-xs text-muted">{entry.when}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <p className="text-xs text-muted">
          Sample Captains and figures before launch. Past returns don’t predict future results.
        </p>
      </Container>
    </Section>
  );
}

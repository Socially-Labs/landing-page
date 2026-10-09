"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sparkline } from "@/components/ui/sparkline";
import { series, shipsLog, stats } from "@/lib/sample-data";

type Stat = (typeof stats)[number];

function format(stat: Stat, value: number) {
  const number = stat.suffix === "M" ? value.toFixed(1) : Math.round(value).toLocaleString("en-US");
  return `${stat.prefix}${number}${stat.suffix}`;
}

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => format(stat, v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, stat.value, { duration: 1.8, ease: [0.2, 0.9, 0.25, 1] });
    return () => controls.stop();
  }, [inView, stat.value, value]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {text}
    </motion.span>
  );
}

/** Headline numbers and the ship's log: proof the product is busy. */
export function Stats() {
  const log = [...shipsLog, ...shipsLog];

  return (
    <Section id="numbers" tone="abyss" className="relative border-y border-brass/15 py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="The ledger"
            title={
              <>
                Trading together, <em>in the open.</em>
              </>
            }
          />
          <Reveal className="flex w-fit items-center gap-2.5 rounded-full border border-foam/15 px-4 py-2 text-sm text-mist">
            <span aria-hidden className="size-2 animate-pulse-dot rounded-full bg-mint-glow" />
            Live · updated every minute
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-panel border border-brass/20 bg-brass/15 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.06}
              className="flex flex-col gap-3 bg-abyss p-7 md:p-8"
            >
              <span className="eyebrow text-[0.9375rem] text-haze">{stat.label}</span>
              <span className="font-display text-[clamp(3rem,4.6vw,4.25rem)] leading-none font-semibold text-foam">
                <CountUp stat={stat} />
              </span>
              <span className="text-sm text-mint-glow">{stat.note}</span>
              <Sparkline
                values={series(index + 3, 100, 20)}
                area
                className="mt-2 h-10 w-full text-chart"
              />
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <p className="eyebrow text-brass">Ship’s log</p>
          <div className="overflow-hidden border-y border-foam/10 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] py-4">
            <ul className="flex w-max animate-marquee gap-10">
              {log.map((entry, index) => (
                <li
                  key={`${entry.captain}-${entry.when}-${index}`}
                  aria-hidden={index >= shipsLog.length}
                  className="flex items-center gap-3 text-[0.9375rem] whitespace-nowrap text-mist"
                >
                  <Image
                    src={entry.portrait}
                    alt=""
                    width={28}
                    height={28}
                    className="size-7 rounded-full object-cover"
                  />
                  <span>
                    <b className="font-semibold text-foam">{entry.captain}</b> {entry.text}
                  </span>
                  <span className="text-haze">· {entry.when}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-haze">Illustrative figures before launch.</p>
        </div>
      </Container>
    </Section>
  );
}

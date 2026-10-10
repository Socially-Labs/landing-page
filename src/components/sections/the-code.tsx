"use client";

import { Check, Lock } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { WaxSeal } from "@/components/ornaments/wax-seal";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;
/** Each visual plays once, when most of it is on screen. */
const ONCE = { once: true, amount: 0.8 } as const;

/* ---------- One small picture per article ---------- */

function Trade() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="eyebrow text-[0.625rem] text-brass-deep">Atlas · Buy SOL</span>
        Inside the vault
      </div>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-line">
        <motion.span
          className="bg-brass"
          initial={{ width: "100%" }}
          whileInView={{ width: "60%" }}
          viewport={ONCE}
          transition={{ delay: 0.3, duration: 1.4, ease: EASE }}
        />
        <motion.span
          className="bg-navy"
          initial={{ width: "0%" }}
          whileInView={{ width: "40%" }}
          viewport={ONCE}
          transition={{ delay: 0.3, duration: 1.4, ease: EASE }}
        />
      </div>
      <div className="flex justify-between text-sm text-ink-soft tabular-nums">
        <span>
          USDC <b className="font-semibold text-ink">600</b>
        </span>
        <span>
          SOL <b className="font-semibold text-ink">400</b>
        </span>
      </div>
    </div>
  );
}

function Refused() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-line">
        <span className="relative text-sm text-ink">
          Send $1,000 to Atlas’s wallet
          <motion.span
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-px origin-left bg-coral"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={ONCE}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          />
        </span>
        <motion.span
          className="flex flex-none items-center gap-1.5 eyebrow text-[0.625rem] text-coral"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={ONCE}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <Lock aria-hidden className="size-3" />
          Refused
        </motion.span>
      </div>
      <p className="text-xs text-muted">Only Crew can take money out.</p>
    </div>
  );
}

function Limit() {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <svg viewBox="0 0 300 96" aria-hidden className="block h-auto w-full">
          <line
            x1="0"
            x2="300"
            y1="78"
            y2="78"
            stroke="#7a5226"
            strokeOpacity="0.55"
            strokeDasharray="4 4"
          />
          <motion.path
            d="M0 18 C40 14 62 30 92 32 C128 35 148 24 180 42 C210 59 238 58 300 78"
            fill="none"
            stroke="#8a6834"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={ONCE}
            transition={{ delay: 0.2, duration: 1.6, ease: EASE }}
          />
        </svg>
        <span className="absolute right-0 bottom-0 eyebrow text-[0.625rem] text-amber">Limit</span>
      </div>
      <motion.p
        className="eyebrow text-[0.625rem] text-amber"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={ONCE}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        Risky trades paused
      </motion.p>
    </div>
  );
}

const logRows = [
  { who: "Atlas", what: "sold JUP", when: "just now" },
  { who: "Atlas", what: "bought SOL", when: "2 min" },
  { who: "Atlas", what: "posted an update", when: "21 min" },
];

function Log() {
  return (
    <ul className="flex flex-col">
      {logRows.map((row, index) => (
        <motion.li
          key={row.what}
          className="flex items-center justify-between gap-3 border-b border-line py-2 text-sm last:border-b-0"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={ONCE}
          transition={{ delay: 0.2 + (logRows.length - index) * 0.18, duration: 0.6, ease: EASE }}
        >
          <span className="flex items-center gap-2 text-ink-soft">
            <span
              aria-hidden
              className={cn("size-1.5 rounded-full", index ? "bg-line" : "bg-brass")}
            />
            <b className="font-semibold text-ink">{row.who}</b> {row.what}
          </span>
          <span className="text-xs text-muted">{row.when}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function Leave() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-line">
        <span className="flex flex-col">
          <span className="text-xs text-muted">Your share</span>
          <span className="font-display text-xl leading-tight text-ink tabular-nums">$1,240</span>
        </span>
        <span className="rounded-full px-3 py-1 text-xs font-semibold text-ink-soft ring-1 ring-line">
          Leave vault
        </span>
      </div>
      <motion.p
        className="flex items-center gap-1.5 text-sm font-medium text-mint"
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={ONCE}
        transition={{ delay: 0.9, duration: 0.5, ease: EASE }}
      >
        <Check aria-hidden className="size-4" />
        Sent to your wallet
      </motion.p>
    </div>
  );
}

const articles: {
  numeral: string;
  title: string;
  body: string;
  visual: ReactNode;
  span: string;
}[] = [
  {
    numeral: "I",
    title: "The Captain may trade",
    body: "Captains buy and sell inside your vault, and nowhere else.",
    visual: <Trade />,
    span: "lg:col-span-3",
  },
  {
    numeral: "II",
    title: "The treasure stays in the vault",
    body: "No Captain can withdraw or move your money. Not even to themselves.",
    visual: <Refused />,
    span: "lg:col-span-3",
  },
  {
    numeral: "III",
    title: "Losses have limits",
    body: "If a vault falls too far, new risky trades are paused.",
    visual: <Limit />,
    span: "lg:col-span-2",
  },
  {
    numeral: "IV",
    title: "Every trade goes in the log",
    body: "Each trade is public the moment it happens.",
    visual: <Log />,
    span: "lg:col-span-2",
  },
  {
    numeral: "V",
    title: "Any Crew may leave",
    body: "Take your money out whenever you choose.",
    visual: <Leave />,
    span: "md:col-span-2 lg:col-span-2",
  },
];

/**
 * Safety, written as a pirate crew's articles: five tiles, each with a small picture of the
 * rule at work. Nothing to click; each picture plays once as it scrolls into view.
 */
export function TheCode() {
  return (
    <Section id="safety" tone="pearl" className="py-24 md:py-32">
      <Container className="flex flex-col gap-12">
        <div className="flex items-end justify-between gap-8">
          <SectionHeading
            eyebrow="The Ship’s Articles"
            title={
              <>
                Captains trade your money. <em>They can never take it.</em>
              </>
            }
            lede="You’re the Crew. A Captain is a vetted trader. Your money sits in a vault on Solana that obeys five articles, and no Captain can rewrite them."
          />
          <WaxSeal
            motto="SEALED IN CODE · SOCIALLY ·"
            className="hidden size-28 flex-none -rotate-12 md:block"
          />
        </div>

        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {articles.map((article, index) => (
            <li key={article.numeral} className={article.span}>
              <Reveal
                delay={(index % 3) * 0.06}
                className="flex h-full flex-col gap-6 rounded-panel bg-white p-6 shadow-soft ring-1 ring-brass/25 sm:p-7"
              >
                <div className="flex gap-4">
                  <span className="w-8 flex-none font-display text-[1.75rem] leading-none text-brass-deep italic">
                    {article.numeral}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-[1.375rem] leading-tight text-ink">
                      {article.title}
                    </h3>
                    <p className="text-[0.9375rem]/relaxed text-ink-soft">{article.body}</p>
                  </div>
                </div>
                <div className="mt-auto rounded-2xl bg-pearl p-4 ring-1 ring-line">
                  {article.visual}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <p className="text-xs text-muted">
          Sample amounts. An independent audit is under way; the report will be published before
          launch.
        </p>
      </Container>
    </Section>
  );
}

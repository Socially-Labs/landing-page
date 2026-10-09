"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { WaxSeal } from "@/components/ornaments/wax-seal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { VaultScene } from "./vault-scene";

/** Long enough to watch the coin travel twice and read the caption. */
const ARTICLE_MS = 7000;

const articles = [
  {
    numeral: "I",
    title: "The Captain may trade",
    body: "Captains buy and sell inside your vault, and nowhere else.",
  },
  {
    numeral: "II",
    title: "The treasure stays in the vault",
    body: "No Captain can withdraw or move your money. Not even to themselves.",
  },
  {
    numeral: "III",
    title: "Losses have limits",
    body: "If a vault falls too far, new risky trades are paused.",
  },
  {
    numeral: "IV",
    title: "Every trade goes in the log",
    body: "Each trade is public the moment it happens.",
  },
  {
    numeral: "V",
    title: "Any Crew may leave",
    body: "Take your money out whenever you choose.",
  },
];

/**
 * Safety, written as a pirate crew's articles. Each article plays out in the vault beside it:
 * you, the vault and the Captain, and what can and can't move between them.
 */
export function TheCode() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(areaRef, { amount: 0.4 });
  const autoplay = inView && !paused && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => setActive((index) => (index + 1) % articles.length), ARTICLE_MS);
    return () => clearTimeout(timer);
  }, [active, autoplay]);

  return (
    <Section id="safety" tone="pearl" className="py-24 md:py-32">
      <Container className="flex flex-col gap-12 lg:gap-14">
        <SectionHeading
          eyebrow="The Ship’s Articles"
          title={
            <>
              Captains trade your money. <em>They can never take it.</em>
            </>
          }
          lede="You’re the Crew. A Captain is a vetted trader. Your money sits in a vault on Solana that obeys five articles, and no Captain can rewrite them."
        />

        <div
          ref={areaRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12"
        >
          <div className="relative order-2 rounded-[28px] bg-[#fdfbf6] p-2 shadow-soft frame-brass lg:order-1">
            <WaxSeal
              motto="SEALED IN CODE · SOCIALLY ·"
              className="absolute -top-9 -right-3 z-10 size-22 -rotate-12 sm:-top-11 sm:-right-8 sm:size-26"
            />
            <ol className="px-3 py-2 sm:px-5">
              {articles.map((article, index) => {
                const current = index === active;
                return (
                  <li key={article.numeral} className="border-b border-brass/20 last:border-b-0">
                    <button
                      type="button"
                      aria-pressed={current}
                      onClick={() => setActive(index)}
                      className={cn(
                        "relative grid w-full grid-cols-[2.75rem_minmax(0,1fr)] gap-4 rounded-2xl px-3 py-5 text-left transition-colors duration-500 sm:grid-cols-[3.5rem_minmax(0,1fr)]",
                        current ? "bg-white" : "hover:bg-white/60",
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-[1.75rem] leading-none italic transition-colors duration-500",
                          current ? "text-brass-deep" : "text-brass/60",
                        )}
                      >
                        {article.numeral}
                      </span>
                      <span className="flex flex-col gap-1">
                        <span
                          className={cn(
                            "font-display text-[1.3125rem] leading-tight transition-colors duration-500",
                            current ? "text-ink" : "text-ink/70",
                          )}
                        >
                          {article.title}
                        </span>
                        <span className="text-[0.9375rem]/relaxed text-ink-soft">
                          {article.body}
                        </span>
                      </span>
                      {current && autoplay && (
                        <motion.span
                          key={`progress-${active}`}
                          aria-hidden
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: ARTICLE_MS / 1000, ease: "linear" }}
                          className="absolute inset-x-3 bottom-0 h-px origin-left bg-brass"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="order-1 flex flex-col gap-4 lg:sticky lg:top-24 lg:order-2">
            <VaultScene index={active} />
            <p className="px-2 text-xs text-muted">
              Sample amounts. An independent audit is under way; the report will be published before
              launch.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

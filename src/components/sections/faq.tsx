"use client";

import { ArrowRight, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { X_URL } from "@/lib/links";

/* Plain answers; the technical detail belongs in the docs. Review before launch. */
const questions = [
  {
    q: "Can a Captain take my money?",
    a: "No. A Captain can only buy and sell inside your vault. There is no way for a Captain to withdraw or send your money anywhere, including to themselves.",
  },
  {
    q: "What is a vault?",
    a: "A shared account that holds the Crew’s money for one Captain. It runs on Solana under the five articles: the Captain can trade inside it, and only Crew can take money out. You own a share of it in proportion to what you put in.",
  },
  {
    q: "What does “keep your keys” mean?",
    a: "Your money is never handed to Socially or to the Captain. When you sign up with email or Google, a wallet is created that only you control, and only you can approve taking money out of a vault.",
  },
  {
    q: "Can I lose money?",
    a: "Yes. Captains can make losing trades, which is why every return is shown next to its worst drop. Socially stops a Captain from taking your money, not from trading badly.",
  },
  {
    q: "Do I need a crypto wallet?",
    a: "No. Sign up with email or Google and Socially sets up a wallet for you. There’s no seed phrase to write down.",
  },
  {
    q: "How much does it cost?",
    a: "You pay 10% of new profit, and only when your vault grows past its last high. The Captain gets 8 of those 10 points and Socially gets 2. There are no joining, monthly or leaving fees.",
  },
  {
    q: "How do I take my money out?",
    a: "Leave a vault whenever you choose. Your share of its cash comes back straight away; any tokens are sold for you first, which can take a little longer.",
  },
  {
    q: "How are Captains chosen?",
    a: "Traders apply and we review their record before a vault opens. After that, their rank rises or falls with their public results.",
  },
  {
    q: "Who can use Socially?",
    a: "Socially will launch in selected countries. Join the waitlist and we’ll let you know when it’s available where you live.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Questions"
            title={
              <>
                Plain answers, <em>no fine print.</em>
              </>
            }
          />
          <div className="flex flex-col gap-3 text-[0.9375rem] font-semibold text-ink">
            <a href="#" className="inline-flex items-center gap-1.5 hover:text-brass-deep">
              Read the docs <ArrowRight aria-hidden className="size-4" />
            </a>
            <a
              href={X_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-brass-deep"
            >
              Ask us on X <ArrowRight aria-hidden className="size-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col border-t border-ink/15">
          {questions.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.q} className="border-b border-ink/15">
                <h3>
                  <button
                    type="button"
                    id={`faq-question-${index}`}
                    aria-expanded={expanded}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpen(expanded ? null : index)}
                    className="flex min-h-18 w-full items-center justify-between gap-6 py-5 text-left font-display text-[1.25rem] text-ink"
                  >
                    {item.q}
                    <motion.span
                      aria-hidden
                      animate={{ rotate: expanded ? 45 : 0 }}
                      transition={{ type: "spring", damping: 24, stiffness: 300 }}
                      className="grid size-9 flex-none place-items-center rounded-full border border-ink/20 text-brass-deep"
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.2, 0.9, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[40rem] pb-6 text-base/relaxed text-ink-soft">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

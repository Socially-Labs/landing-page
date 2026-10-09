"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/* Answers follow the product spec. Have them reviewed before launch. */
const questions = [
  {
    q: "Can my Captain withdraw my money?",
    a: "No. A Captain can only trade inside the vault, on approved venues, within the vault’s limits. The program has no instruction that lets a Captain send vault funds to a wallet, including their own.",
  },
  {
    q: "Is my money protected from losses?",
    a: "No. Captains can lose money through ordinary trading, and drawdowns are shown next to every return for that reason. Socially stops a Captain from taking the money, not from making bad trades.",
  },
  {
    q: "Do I need a crypto wallet?",
    a: "No. Sign in with email or Google and Socially creates a wallet for you through Privy. There’s no seed phrase or browser extension.",
  },
  {
    q: "What does it cost?",
    a: "10% of new profit, charged only when the vault passes its previous high. There are no joining, monthly or exit fees.",
  },
  {
    q: "What if a Captain’s phone or bot key is stolen?",
    a: "Whoever has the key gets the same limits the Captain had: approved venues, size and daily limits, and no way to withdraw. The Captain can revoke the key.",
  },
  {
    q: "What if my Captain disappears?",
    a: "You can still leave. Your cash share comes back straight away, and if the Captain doesn’t sell your share of the tokens by the deadline, the program sells them.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" tone="dark" className="py-28 md:py-40">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <SectionHeading
          tone="night"
          eyebrow="Hard questions"
          title="Plain answers before you come aboard."
        />
        <div className="flex flex-col gap-3">
          {questions.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.q} className="rounded-[20px] glass-dark">
                <h3>
                  <button
                    type="button"
                    id={`faq-question-${index}`}
                    aria-expanded={expanded}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpen(expanded ? null : index)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold text-on-navy"
                  >
                    {item.q}
                    <motion.span
                      aria-hidden
                      animate={{ rotate: expanded ? 45 : 0 }}
                      transition={{ type: "spring", damping: 24, stiffness: 300 }}
                      className="grid size-8 flex-none place-items-center rounded-full bg-on-navy/10"
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
                      <p className="max-w-[44rem] px-6 pb-6 text-base/relaxed text-on-navy-soft">
                        {item.a}
                      </p>
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

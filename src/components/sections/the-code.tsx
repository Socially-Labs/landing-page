import { ArrowRight, ShieldCheck } from "lucide-react";
import { EmblemMark } from "@/components/ornaments/emblem-mark";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

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

/** Safety, written as a pirate crew's articles: plain promises, no machinery. */
export function TheCode() {
  return (
    <Section id="safety" tone="pearl" className="relative overflow-hidden py-24 md:py-32">
      <EmblemMark className="pointer-events-none absolute top-1/2 -right-48 hidden size-[42rem] -translate-y-1/2 opacity-[0.06] lg:block" />
      <Container className="relative grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="The Code"
            title={
              <>
                Captains trade your money. <em>They can never take it.</em>
              </>
            }
            lede="Every vault on Socially sails under the same five articles. No Captain can rewrite them."
          />
          <Reveal className="flex items-center gap-5">
            <div className="grid size-20 flex-none place-items-center rounded-full bg-white frame-brass">
              <ShieldCheck aria-hidden className="size-7 text-brass-deep" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="eyebrow text-brass-deep">Independent audit</span>
              <span className="text-sm text-ink-soft">
                In progress. The report will be published here.
              </span>
              <a
                href="#faq"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brass-deep"
              >
                How protection works <ArrowRight aria-hidden className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="rounded-[28px] bg-white p-2 shadow-soft frame-brass">
          <ol className="px-6 py-1 md:px-10">
            {articles.map((article) => (
              <li
                key={article.numeral}
                className="grid grid-cols-[3rem_minmax(0,1fr)] gap-5 border-b border-brass/20 py-7 last:border-b-0 md:grid-cols-[4rem_minmax(0,1fr)]"
              >
                <span className="font-display text-[2.25rem] leading-none text-brass-deep italic">
                  {article.numeral}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-[1.5rem] leading-tight text-ink">
                    {article.title}
                  </h3>
                  <p className="text-[0.9375rem]/relaxed text-ink-soft">{article.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}

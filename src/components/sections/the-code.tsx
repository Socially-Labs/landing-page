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
    <Section id="safety" tone="deep" className="relative overflow-hidden py-28 md:py-40">
      <EmblemMark className="pointer-events-none absolute top-1/2 -right-48 hidden size-[46rem] -translate-y-1/2 opacity-[0.045] lg:block" />
      <Container className="relative grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
        <div className="flex flex-col gap-10 lg:sticky lg:top-32 lg:self-start">
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
            <div className="grid size-24 flex-none place-items-center rounded-full border border-brass/60 shadow-[inset_0_0_0_6px_rgb(7_23_44),inset_0_0_0_7px_rgb(201_166_107/0.35)]">
              <ShieldCheck aria-hidden className="size-8 text-brass" strokeWidth={1.4} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="eyebrow text-brass">Independent audit</span>
              <span className="text-sm text-mist">
                In progress. The report will be published here.
              </span>
              <a
                href="#faq"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-foam hover:text-brass-light"
              >
                How protection works <ArrowRight aria-hidden className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="rounded-[30px] border border-brass/35 p-2">
          <ol className="rounded-[24px] border border-brass/15 bg-navy/60 px-6 py-2 md:px-10">
            {articles.map((article) => (
              <li
                key={article.numeral}
                className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-5 border-b border-brass/12 py-8 last:border-b-0 md:grid-cols-[4.5rem_minmax(0,1fr)]"
              >
                <span className="font-display text-[2.75rem] leading-none font-medium text-brass italic">
                  {article.numeral}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[1.875rem] leading-tight font-semibold text-foam">
                    {article.title}
                  </h3>
                  <p className="text-base/relaxed text-mist">{article.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}

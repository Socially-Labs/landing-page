import { WaxSeal } from "@/components/ornaments/wax-seal";
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

/** Safety, written as a pirate crew's articles: five plain promises, read in one glance. */
export function TheCode() {
  return (
    <Section id="safety" tone="pearl" className="py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="The Ship’s Articles"
            title={
              <>
                Captains trade your money. <em>They can never take it.</em>
              </>
            }
            lede="You’re the Crew. A Captain is a vetted trader. Your money sits in a vault on Solana that obeys five articles, and no Captain can rewrite them."
          />
          <Reveal className="flex items-center gap-5">
            <WaxSeal motto="SEALED IN CODE · SOCIALLY ·" className="size-24 flex-none -rotate-12" />
            <p className="max-w-[16rem] text-sm text-ink-soft">
              The same articles bind every vault. An independent audit is under way and will be
              published before launch.
            </p>
          </Reveal>
        </div>

        <Reveal className="rounded-[28px] bg-[#fdfbf6] p-2 shadow-soft frame-brass">
          <ol className="px-6 py-1 md:px-10">
            {articles.map((article) => (
              <li
                key={article.numeral}
                className="grid grid-cols-[3rem_minmax(0,1fr)] gap-5 border-b border-brass/20 py-7 last:border-b-0 md:grid-cols-[4rem_minmax(0,1fr)]"
              >
                <span className="font-display text-[1.875rem] leading-none text-brass-deep italic">
                  {article.numeral}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-[1.375rem] leading-tight text-ink">
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

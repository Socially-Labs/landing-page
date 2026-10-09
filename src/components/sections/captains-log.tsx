import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

const entries = [
  {
    when: "Mon 09:12",
    kind: "Call",
    tone: "bg-steel-tint text-steel-deep",
    text: "“SOL looks stronger than the market this week. I’m moving a third of the vault into it.”",
    quote: true,
  },
  {
    when: "Mon 09:14",
    kind: "Trade",
    tone: "bg-ink text-on-navy",
    text: "Bought 18.4 SOL for 2,680 USDC on Jupiter. Passed all seven checks.",
  },
  {
    when: "Fri 17:30",
    kind: "Result",
    tone: "bg-mint-tint text-mint-deep",
    text: "Position up 6.2% since the call.",
  },
];

export function CaptainsLog() {
  return (
    <Section className="pb-28 md:pb-40">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <SectionHeading
          eyebrow="Captain’s log"
          title="Every call. Every trade. On the record."
          lede="Captains post their thinking to the Crew. Socially links each call to the trades that followed, so you can see whether a Captain did what they said. Trades come from the chain, so none can be hidden."
        />
        <Reveal className="rounded-[28px] p-6 shadow-lift glass md:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-5">
            <div className="flex items-center gap-3">
              <Image
                src="/captains/atlas.webp"
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-xl object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold">Atlas</span>
                <span className="text-[0.8125rem] text-ink-soft">
                  Solana Momentum · Captain’s log
                </span>
              </div>
            </div>
            <span className="text-xs text-ink-soft">Sample</span>
          </div>
          <ol className="mt-6 flex flex-col">
            {entries.map((entry, index) => (
              <li key={entry.when} className="relative flex gap-4 pb-7 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="mt-1.5 size-2.5 flex-none rounded-full bg-steel" />
                  {index < entries.length - 1 && (
                    <span aria-hidden className="mt-1.5 w-px flex-1 bg-ink/15" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", entry.tone)}
                    >
                      {entry.kind}
                    </span>
                    <time className="font-mono text-xs text-ink-soft">{entry.when}</time>
                  </div>
                  <p
                    className={cn(
                      entry.quote
                        ? "font-display text-[1.5rem] leading-snug font-semibold"
                        : "text-[0.9375rem] text-ink-soft",
                    )}
                  >
                    {entry.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}

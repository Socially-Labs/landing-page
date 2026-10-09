import { CompassRose } from "@/components/ornaments/compass-rose";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const noFees = ["Joining fee", "Monthly fee", "Leaving fee"];

export function CaptainsShare() {
  return (
    <Section id="fees" className="py-24 md:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="flex flex-col gap-9">
          <SectionHeading
            eyebrow="The Captain’s share"
            title={
              <>
                One fee. <em>Only when you profit.</em>
              </>
            }
            lede="Captains earn 10% of the new profit they make for you. If your vault doesn’t grow past its last high, they earn nothing."
          />
          <Reveal className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-card bg-pearl p-6 ring-1 ring-line">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted">Your vault grows</span>
              <span className="font-display text-[1.5rem] text-ink tabular-nums">
                $1,000 → $1,100
              </span>
            </div>
            <span aria-hidden className="h-12 w-px bg-line" />
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted">The Captain earns</span>
              <span className="font-display text-[1.5rem] text-brass-deep tabular-nums">$10</span>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative overflow-hidden rounded-panel bg-white p-8 shadow-lift frame-brass md:p-11">
          <CompassRose className="pointer-events-none absolute -top-20 -right-20 size-72 text-brass/25" />
          <div className="relative flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <span className="font-display text-[clamp(3.75rem,6vw,5rem)] leading-[0.9] text-brass-deep">
                10%
              </span>
              <span className="eyebrow text-muted">of new profit, nothing else</span>
            </div>
            <ul className="flex flex-col">
              {noFees.map((fee) => (
                <li
                  key={fee}
                  className="flex items-baseline justify-between border-t border-line py-3.5"
                >
                  <span className="text-ink-soft">{fee}</span>
                  <span className="font-display text-xl text-ink">$0</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted">
              Paid to the Captain in vault shares, never taken as cash.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

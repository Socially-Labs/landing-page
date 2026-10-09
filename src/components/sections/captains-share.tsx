import { CompassRose } from "@/components/ornaments/compass-rose";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const noFees = ["Joining fee", "Monthly fee", "Leaving fee"];

export function CaptainsShare() {
  return (
    <Section id="fees" tone="pearl" className="py-28 md:py-40">
      <Container className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
        <div className="flex flex-col gap-10">
          <SectionHeading
            tone="light"
            eyebrow="The Captain’s share"
            title={
              <>
                One fee. <em>Only when you profit.</em>
              </>
            }
            lede="Captains earn 10% of the new profit they make for you. If your vault doesn’t grow past its last high, they earn nothing."
          />
          <Reveal className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-card border border-line bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted">Your vault grows</span>
              <span className="font-display text-3xl font-semibold text-ink tabular-nums">
                $1,000 → $1,100
              </span>
            </div>
            <span aria-hidden className="h-12 w-px bg-line" />
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted">The Captain earns</span>
              <span className="font-display text-3xl font-semibold text-brass-deep tabular-nums">
                $10
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative overflow-hidden rounded-panel bg-deep p-8 text-foam shadow-lift md:p-12">
          <CompassRose className="pointer-events-none absolute -top-24 -right-24 size-80 text-brass/25" />
          <div className="relative flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-display text-[clamp(6rem,12vw,9.5rem)] leading-[0.85] font-semibold text-brass-light">
                10%
              </span>
              <span className="eyebrow text-mist">of new profit, nothing else</span>
            </div>
            <ul className="flex flex-col">
              {noFees.map((fee) => (
                <li
                  key={fee}
                  className="flex items-baseline justify-between border-t border-foam/10 py-4 text-lg"
                >
                  <span className="text-mist">{fee}</span>
                  <span className="font-display text-2xl font-semibold">$0</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-haze">
              Paid to the Captain in vault shares, never taken as cash.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

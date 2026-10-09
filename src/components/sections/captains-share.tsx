import { CompassRose } from "@/components/ornaments/compass-rose";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeeCalculator } from "./fee-calculator";

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
            lede="You pay 10% of the new profit a Captain makes for you. If your vault doesn’t grow past its last high, nobody is paid."
          />
          <Reveal>
            <FeeCalculator />
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
            <div className="flex flex-col gap-2">
              <div className="flex h-2.5 overflow-hidden rounded-full">
                <span className="w-4/5 bg-brass" />
                <span className="w-1/5 bg-steel/60" />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink">
                  <b className="font-semibold">8%</b> to the Captain
                </span>
                <span className="text-ink-soft">
                  <b className="font-semibold text-ink">2%</b> to Socially
                </span>
              </div>
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
              Paid in vault shares, never taken out as cash. If your vault dips and recovers, no fee
              is due until it passes its last high.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

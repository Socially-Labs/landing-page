import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeeChart } from "./fee-chart";

const noFees = ["Joining fee", "Monthly fee", "Exit fee"];

export function Fees() {
  return (
    <Section id="fees" className="py-28 md:py-40">
      <Container>
        <SectionHeading
          eyebrow="Fees"
          title="Captains get paid on new highs. Only new highs."
          lede="The performance fee is 10% of new profit above the vault’s previous high. If a vault falls and then recovers, the recovery is free."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <Reveal className="rounded-[28px] p-5 shadow-soft glass md:p-7">
            <FeeChart />
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal delay={0.08} className="flex flex-col gap-5 rounded-card p-6 shadow-soft glass">
              <ul className="flex flex-col gap-3">
                {noFees.map((fee) => (
                  <li
                    key={fee}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3"
                  >
                    <span className="text-ink-soft line-through decoration-ink/40">{fee}</span>
                    <span className="text-sm font-semibold text-ink">None</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-ink-soft">Performance fee</span>
                <span className="font-display text-[2.75rem] leading-none font-semibold">
                  10% of new profit
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.16} className="flex flex-col gap-4 rounded-card p-6 navy-plate">
              <p className="eyebrow text-on-navy-muted">How it’s paid</p>
              <p className="text-[0.9375rem]/relaxed text-on-navy-soft">
                In new vault shares, never as cash taken out of the vault.
              </p>
              <div className="flex h-3 overflow-hidden rounded-full" aria-hidden>
                <span className="w-4/5 bg-brass" />
                <span className="w-1/5 bg-chart" />
              </div>
              <div className="flex justify-between text-sm">
                <span>
                  <b className="font-semibold text-on-navy">80%</b>{" "}
                  <span className="text-on-navy-muted">to the Captain</span>
                </span>
                <span>
                  <b className="font-semibold text-on-navy">20%</b>{" "}
                  <span className="text-on-navy-muted">to the protocol</span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

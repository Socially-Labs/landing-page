import { SkyScene } from "@/components/sky/sky-scene";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaptainCard } from "./captain-card";
import { sampleCaptains } from "./captains-data";
import { scenes } from "./scenes";

/** Brass threads between the cards, as in the app's Discover artwork. */
function Threads() {
  const paths = ["M23 46 Q 48 22 77 19", "M23 46 Q 46 72 74 78", "M77 19 Q 90 50 74 78"];
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden size-full lg:block"
    >
      {paths.map((d) => (
        <g key={d}>
          <path
            d={d}
            fill="none"
            stroke="rgb(243 221 176 / 0.35)"
            strokeWidth="7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={d}
            fill="none"
            stroke="#C9A468"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  );
}

export function Captains() {
  const { atlas, solstice, northstar } = sampleCaptains;
  return (
    <SkyScene id="captains" scene={scenes.captains} className="py-28 md:py-40">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Port of Captains"
            title="Captains you can check before you join."
            lede="Every return sits beside its worst drawdown. Every trade is on the record, losing ones included. Turn a card over to see the vault’s rules."
          />
          <Reveal className="flex flex-col items-start gap-3">
            <ButtonLink href="#berth" variant="glass">
              Join the waitlist
            </ButtonLink>
            <p className="text-[0.8125rem] text-ink-soft">
              Sample Captains from the app preview. Not live vaults.
            </p>
          </Reveal>
        </div>

        <div className="relative flex flex-col gap-4 lg:h-[680px]">
          <Threads />
          <CaptainCard captain={solstice} className="lg:absolute lg:top-0 lg:right-0 lg:w-[45%]" />
          <CaptainCard
            captain={northstar}
            floatDelay={1.6}
            className="lg:absolute lg:top-[24%] lg:left-0 lg:w-[46%]"
          />
          <CaptainCard
            captain={atlas}
            floatDelay={3.2}
            className="lg:absolute lg:right-0 lg:bottom-0 lg:w-[51%]"
          />
        </div>
      </Container>
    </SkyScene>
  );
}

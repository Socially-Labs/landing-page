import { ArrowRight, BadgeCheck, Coins, Compass, Users } from "lucide-react";
import Image from "next/image";
import { Insignia } from "@/components/ornaments/insignia";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Rank } from "@/lib/sample-data";

const benefits = [
  { Icon: Coins, title: "Earn on every new high", body: "Keep 80% of the Captain’s share." },
  { Icon: Users, title: "Grow a following", body: "Your Crew sees every update you post." },
  {
    Icon: BadgeCheck,
    title: "A record anyone can check",
    body: "Every trade, public and permanent.",
  },
  { Icon: Compass, title: "Trade your way", body: "From the app or your own tools." },
];

const ranks: Rank[] = ["New Captain", "Proven Captain", "Admiral"];

/** The Captain pitch over the app's daylight helm painting, washed out to white on the left. */
export function ForCaptains() {
  return (
    <Section id="captain" tone="pearl" className="relative overflow-hidden">
      <Image
        src="/art/captain-helm.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[80%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(245_247_251/0.98)_0%,rgb(245_247_251/0.94)_42%,rgb(245_247_251/0.35)_72%,rgb(245_247_251/0.05)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(245_247_251/0.9)_0%,transparent_18%,transparent_82%,rgb(245_247_251/0.95)_100%)]"
      />

      <Container className="relative py-24 md:py-36">
        <div className="flex max-w-[38rem] flex-col gap-10">
          <SectionHeading
            eyebrow="For traders"
            title={
              <>
                Take the <em>helm.</em>
              </>
            }
            lede="Trade for a Crew and keep 80% of the Captain’s share every time your vault reaches a new high."
          />

          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {benefits.map(({ Icon, title, body }, index) => (
              <Reveal key={title} delay={index * 0.06} className="flex gap-4">
                <Icon
                  aria-hidden
                  className="mt-0.5 size-5.5 flex-none text-brass-deep"
                  strokeWidth={1.6}
                />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-ink">{title}</span>
                  <span className="text-[0.9375rem] text-ink-soft">{body}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="flex flex-col gap-3">
            <span className="eyebrow text-brass-deep">Rise through the ranks</span>
            <ol className="flex flex-wrap items-center gap-2.5">
              {ranks.map((rank, index) => (
                <li key={rank} className="flex items-center gap-2.5">
                  <span className="flex items-center gap-2 rounded-full bg-white/90 py-1 pr-3.5 pl-1 text-sm text-ink ring-1 ring-brass/35">
                    <Insignia rank={rank} className="size-7 text-xs" />
                    {rank}
                  </span>
                  {index < ranks.length - 1 && (
                    <ArrowRight aria-hidden className="size-4 text-brass" />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="#join" size="md">
              Apply to captain
            </ButtonLink>
            <span className="text-sm text-ink-soft">
              We review every application before a vault opens.
            </span>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

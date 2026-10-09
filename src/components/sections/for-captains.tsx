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

export function ForCaptains() {
  return (
    <Section id="captain" tone="abyss" className="relative overflow-hidden">
      <Image
        src="/art/captain-helm.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[78%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(4_12_24/0.97)_0%,rgb(4_12_24/0.92)_40%,rgb(4_12_24/0.4)_72%,rgb(4_12_24/0.6)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_12_24/0.7)_0%,transparent_22%,transparent_78%,rgb(4_12_24/0.95)_100%)]"
      />

      <Container className="relative py-28 md:py-44">
        <div className="flex max-w-[40rem] flex-col gap-12">
          <SectionHeading
            eyebrow="For traders"
            title={
              <>
                Take the <em>helm.</em>
              </>
            }
            lede="Trade for a Crew and keep 80% of the Captain’s share every time your vault reaches a new high."
          />

          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {benefits.map(({ Icon, title, body }, index) => (
              <Reveal key={title} delay={index * 0.06} className="flex gap-4">
                <Icon
                  aria-hidden
                  className="mt-0.5 size-6 flex-none text-brass"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{title}</span>
                  <span className="text-[0.9375rem] text-mist">{body}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="flex flex-col gap-4">
            <span className="eyebrow text-brass">Rise through the ranks</span>
            <ol className="flex flex-wrap items-center gap-3">
              {ranks.map((rank, index) => (
                <li key={rank} className="flex items-center gap-3">
                  <span className="flex items-center gap-2.5 rounded-full border border-brass/30 bg-abyss/60 py-1.5 pr-4 pl-1.5 text-sm">
                    <Insignia rank={rank} className="size-7 text-xs" />
                    {rank}
                  </span>
                  {index < ranks.length - 1 && (
                    <ArrowRight aria-hidden className="size-4 text-brass/60" />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="#join">Apply to captain</ButtonLink>
            <span className="text-sm text-mist">
              We review every application before a vault opens.
            </span>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

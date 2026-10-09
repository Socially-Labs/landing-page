import { Bot, Coins, Link2, MessagesSquare } from "lucide-react";
import Image from "next/image";
import { SkyScene } from "@/components/sky/sky-scene";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { scenes } from "./scenes";

const points = [
  {
    Icon: Coins,
    title: "80% of the performance fee",
    body: "Paid in vault shares each time the vault reaches a new high.",
  },
  {
    Icon: Bot,
    title: "Trade by phone, bot or AI",
    body: "Each trading key has its own size, pace and venue limits, and you can revoke any of them.",
  },
  {
    Icon: Link2,
    title: "A record from the chain",
    body: "Returns, drawdowns and every trade come from on-chain events. Nothing is self-reported.",
  },
  {
    Icon: MessagesSquare,
    title: "Your Crew, in real time",
    body: "Post calls and updates. Your Crew sees each trade as it happens.",
  },
];

const ranks = [
  { mark: "I", name: "New Captain" },
  { mark: "II", name: "Proven Captain" },
  { mark: "✦", name: "Admiral" },
];

export function Lead() {
  return (
    <SkyScene id="lead" scene={scenes.lead} className="py-28 md:py-40">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
        <div className="flex flex-col gap-10">
          <SectionHeading
            tone="night"
            eyebrow="For Captains"
            title="Lead the voyage. Build a record no one can edit."
            lede="Trade a pooled vault inside clear rules. Your Crew can watch every trade, and your track record builds itself from the chain."
          />

          <div className="grid gap-3 sm:grid-cols-2">
            {points.map(({ Icon, title, body }, index) => (
              <Reveal
                key={title}
                delay={index * 0.06}
                className="flex flex-col gap-2 rounded-[20px] p-5 text-on-navy glass-dark"
              >
                <Icon aria-hidden className="size-5 text-brass" />
                <span className="font-semibold">{title}</span>
                <span className="text-[0.9375rem]/snug text-on-navy-soft">{body}</span>
              </Reveal>
            ))}
          </div>

          <Reveal className="flex flex-col gap-5 rounded-[20px] p-5 text-on-navy glass-dark sm:flex-row sm:items-center sm:justify-between">
            <ol className="flex items-center gap-4">
              {ranks.map((rank, index) => (
                <li key={rank.name} className="flex items-center gap-4">
                  <span className="flex flex-col items-center gap-1.5">
                    <span className="grid size-11 place-items-center rounded-full border-2 border-brass bg-[#fbf7f0]/10 font-display text-lg font-semibold text-brass">
                      {rank.mark}
                    </span>
                    <span className="text-xs font-medium whitespace-nowrap">{rank.name}</span>
                  </span>
                  {index < ranks.length - 1 && (
                    <span aria-hidden className="mb-5 h-px w-6 bg-brass/60" />
                  )}
                </li>
              ))}
            </ol>
            <p className="max-w-[16rem] text-[0.8125rem] text-on-navy-muted">
              Ranks come from your on-chain history, losing trades included.
            </p>
          </Reveal>

          <Reveal>
            <ButtonLink href="#berth" variant="light">
              Apply as Captain
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal className="hidden flex-col items-center gap-3 justify-self-center lg:flex">
          <PhoneFrame className="h-[min(40rem,calc(100svh-10rem))]">
            <Image
              src="/app/captain-home.webp"
              alt="Socially Captain Home with $648,000 in sample assets under management"
              fill
              sizes="300px"
              className="object-cover"
            />
          </PhoneFrame>
          <p className="text-xs text-on-navy-muted">App preview · Sample data</p>
        </Reveal>
      </Container>
    </SkyScene>
  );
}

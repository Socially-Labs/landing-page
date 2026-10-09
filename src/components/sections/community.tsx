import { ArrowUpRight } from "lucide-react";
import { DiscordLogo, Porthole, TelegramLogo, XLogo } from "@/components/ornaments/social-icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

/* Counts are placeholders until the channels launch; links go live with them. */
const channels = [
  {
    Logo: XLogo,
    name: "X",
    count: "12.4K",
    unit: "followers",
    note: "Launch news and Captain spotlights.",
    cta: "Follow on X",
    href: "#",
  },
  {
    Logo: DiscordLogo,
    name: "Discord",
    count: "3.1K",
    unit: "members",
    note: "Talk strategy with Captains and Crew.",
    cta: "Join the Discord",
    href: "#",
  },
  {
    Logo: TelegramLogo,
    name: "Telegram",
    count: "2.2K",
    unit: "members",
    note: "Announcements, straight to your phone.",
    cta: "Join on Telegram",
    href: "#",
  },
];

/** Three gentle swells; the front one is white so the section runs straight into the next. */
function Swells() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-28 w-full md:h-36"
    >
      <path
        d="M0 56 C 240 18 480 96 720 56 C 960 16 1200 96 1440 56 L1440 140 L0 140 Z"
        fill="#d3e3f2"
      />
      <path
        d="M0 84 C 260 52 500 116 760 84 C 1000 54 1220 112 1440 84 L1440 140 L0 140 Z"
        fill="#e9f1f8"
      />
      <path
        d="M0 112 C 240 94 520 132 780 110 C 1020 92 1240 128 1440 110 L1440 140 L0 140 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function Community() {
  return (
    <Section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef3f9_45%,#e4edf5_100%)] pt-24 pb-44 md:pt-28 md:pb-52">
      <Container className="relative flex flex-col gap-12">
        <SectionHeading
          align="center"
          className="mx-auto"
          eyebrow="The crew"
          title={
            <>
              Join the crew <em>before we set sail.</em>
            </>
          }
          lede="Launch news, Captain spotlights and early access. Pick the channel you like best."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {channels.map(({ Logo, name, count, unit, note, cta, href }, index) => (
            <Reveal key={name} delay={index * 0.06}>
              <a
                href={href}
                className="group flex h-full flex-col gap-7 rounded-panel bg-white/90 p-7 ring-1 ring-line backdrop-blur transition-shadow hover:shadow-lift hover:ring-brass/50"
              >
                <div className="flex items-start justify-between">
                  <Porthole>
                    <Logo className="size-6" />
                  </Porthole>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass-deep"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[2.25rem] leading-none text-ink">
                      {count}
                    </span>
                    <span className="text-sm text-muted">{unit}</span>
                  </div>
                  <span className="text-[0.9375rem] text-ink-soft">
                    <b className="font-semibold text-ink">{name}.</b> {note}
                  </span>
                </div>
                <span className="mt-auto text-sm font-semibold text-brass-deep">{cta} →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
      <Swells />
    </Section>
  );
}

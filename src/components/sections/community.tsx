import { ArrowUpRight, AtSign, MessagesSquare, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

/* Follower counts are placeholders until the channels launch. */
const channels = [
  {
    Icon: AtSign,
    name: "X",
    detail: "12.4K followers",
    note: "News and launch updates",
    href: "#",
  },
  {
    Icon: MessagesSquare,
    name: "Discord",
    detail: "3.1K members",
    note: "Talk with Captains and Crew",
    href: "#",
  },
  { Icon: Send, name: "Telegram", detail: "2.2K members", note: "Announcements only", href: "#" },
];

export function Community() {
  return (
    <Section tone="pearl" className="py-24 md:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="The crew"
          title={
            <>
              Join the crew <em>before we set sail.</em>
            </>
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {channels.map(({ Icon, name, detail, note, href }, index) => (
            <Reveal key={name} delay={index * 0.06}>
              <a
                href={href}
                className="group flex h-full flex-col gap-8 rounded-card bg-white p-7 ring-1 ring-line transition-shadow hover:shadow-lift hover:ring-brass/40"
              >
                <div className="flex items-center justify-between">
                  <Icon aria-hidden className="size-5.5 text-brass-deep" strokeWidth={1.6} />
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-[1.75rem] text-ink">{name}</span>
                  <span className="text-sm text-muted">
                    {detail} · {note}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

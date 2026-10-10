import { ArrowUpRight } from "lucide-react";
import { Porthole, XLogo } from "@/components/ornaments/social-icons";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { X_HANDLE, X_URL } from "@/lib/links";

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
    <Section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef3f9_55%,#e4edf5_100%)] pt-24 pb-40 md:pt-28 md:pb-44">
      <Container className="relative flex flex-col items-center gap-8 text-center">
        <Reveal>
          <Porthole className="size-16">
            <XLogo className="size-6.5" />
          </Porthole>
        </Reveal>
        <SectionHeading
          align="center"
          eyebrow="The crew"
          title={
            <>
              Follow the voyage <em>on X.</em>
            </>
          }
          lede="Launch news, Captain spotlights and early-access invites go out there first."
        />
        <Reveal>
          <ButtonLink href={X_URL} target="_blank" rel="noreferrer" size="md">
            Follow {X_HANDLE}
            <ArrowUpRight aria-hidden className="size-4" />
          </ButtonLink>
        </Reveal>
      </Container>
      <Swells />
    </Section>
  );
}

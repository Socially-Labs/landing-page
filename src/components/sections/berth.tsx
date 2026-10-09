import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SiteFooter } from "@/components/site-footer";
import { WaitlistForm } from "./waitlist-form";

export function Berth() {
  return (
    <Section id="berth" tone="dark" className="flex min-h-svh flex-col">
      <Container className="flex flex-1 flex-col items-center justify-start pt-32 pb-28 text-center md:pt-40">
        <Reveal className="flex flex-col items-center gap-5">
          <p className="eyebrow text-on-navy-muted">The first voyage</p>
          <h2 className="font-display text-[clamp(3rem,6vw,5.25rem)] leading-none font-semibold text-on-navy">
            Your berth is waiting.
          </h2>
          <p className="max-w-[34rem] text-lg/relaxed text-on-navy-soft">
            Join the waitlist for launch. Captains can apply for early access now.
          </p>
          <WaitlistForm />
        </Reveal>
      </Container>
      <SiteFooter />
    </Section>
  );
}

import { SkyScene } from "@/components/sky/sky-scene";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SiteFooter } from "@/components/site-footer";
import { scenes } from "./scenes";
import { WaitlistForm } from "./waitlist-form";

/** Night over the cloud sea, with room left below the form for the boat and its lantern. */
export function Berth() {
  return (
    <SkyScene id="berth" scene={scenes.night} className="flex min-h-svh flex-col">
      <Container className="flex flex-1 flex-col items-center justify-start pt-32 pb-[34svh] text-center md:pt-40">
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
    </SkyScene>
  );
}

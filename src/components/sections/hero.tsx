import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { captains } from "@/lib/sample-data";
import { HeroVisual } from "./hero-visual";

/*
 * The entrance uses CSS animation rather than Motion so it plays on first paint, before
 * hydration, and the headline counts toward LCP straight away.
 */
export function Hero() {
  return (
    <Section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(50%_55%_at_76%_42%,#e4edf5_0%,rgb(238_243_249/0.6)_45%,transparent_75%)]"
      />

      <Container className="relative grid min-h-svh items-center gap-14 pt-32 pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pt-24">
        <div className="flex flex-col gap-7">
          <p className="flex animate-rise items-center gap-3 eyebrow text-brass-deep">
            <span aria-hidden className="h-px w-8 bg-brass" />
            Social trading on Solana
          </p>
          <h1 className="animate-rise font-display text-[clamp(2.75rem,5.4vw,5rem)] leading-[1] tracking-[-0.015em] text-ink [animation-delay:80ms]">
            Pick a Captain.
            <br />
            Join the Crew.
            <br />
            <em className="text-brass-deep">Keep your keys.</em>
          </h1>
          <p className="max-w-[28rem] animate-rise text-[1.0625rem]/relaxed text-ink-soft [animation-delay:160ms] md:text-lg/relaxed">
            Put money in a vault run by a proven trader. They can trade it. They can never take it.
          </p>
          <div className="flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <ButtonLink href="#join" size="md">
              Join the waitlist
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="#captain" variant="outline" size="md">
              Become a Captain
            </ButtonLink>
          </div>
          <div className="flex animate-rise items-center gap-3.5 [animation-delay:320ms]">
            <div className="flex">
              {captains.slice(0, 4).map((captain, index) => (
                <Image
                  key={captain.id}
                  src={captain.portrait}
                  alt=""
                  width={36}
                  height={36}
                  className={`size-9 rounded-full object-cover ring-2 ring-white ${index ? "-ml-2.5" : ""}`}
                />
              ))}
            </div>
            <p className="text-sm text-ink-soft">
              <b className="font-semibold text-ink">5,420</b> people already on the waitlist
            </p>
          </div>
        </div>

        <HeroVisual />
      </Container>
    </Section>
  );
}

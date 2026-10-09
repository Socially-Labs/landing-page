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
    <Section id="top" tone="deep" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(55%_55%_at_74%_40%,rgb(38_74_124/0.55),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-abyss"
      />

      <Container className="relative grid min-h-svh items-center gap-16 pt-36 pb-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pt-28">
        <div className="flex flex-col gap-8">
          <p className="flex animate-rise items-center gap-3 eyebrow text-brass">
            <span aria-hidden className="h-px w-10 bg-brass/60" />
            Social trading on Solana
          </p>
          <h1 className="animate-rise font-display text-[clamp(3.4rem,7.2vw,7rem)] leading-[0.92] font-semibold tracking-[-0.015em] [animation-delay:80ms]">
            Pick a Captain.
            <br />
            Join the Crew.
            <br />
            <em className="font-medium text-brass-light">Keep your keys.</em>
          </h1>
          <p className="max-w-[30rem] animate-rise text-lg/relaxed text-mist [animation-delay:160ms] md:text-xl/relaxed">
            Put money in a vault run by a proven trader. They can trade it. They can never take it.
          </p>
          <div className="flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <ButtonLink href="#join">
              Join the waitlist
              <ArrowRight aria-hidden className="size-[18px]" />
            </ButtonLink>
            <ButtonLink href="#captain" variant="ghost">
              Become a Captain
            </ButtonLink>
          </div>
          <div className="flex animate-rise items-center gap-4 [animation-delay:320ms]">
            <div className="flex">
              {captains.slice(0, 4).map((captain, index) => (
                <Image
                  key={captain.id}
                  src={captain.portrait}
                  alt=""
                  width={40}
                  height={40}
                  className={`size-10 rounded-full object-cover ring-2 ring-deep ${index ? "-ml-3" : ""}`}
                />
              ))}
            </div>
            <p className="text-[0.9375rem] text-mist">
              <b className="font-semibold text-foam">5,420</b> people already on the waitlist
            </p>
          </div>
        </div>

        <HeroVisual />
      </Container>
    </Section>
  );
}

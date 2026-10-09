import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { SkyScene } from "@/components/sky/sky-scene";
import { ButtonLink } from "@/components/ui/button-link";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { HeroUpdates } from "./hero-updates";
import { scenes } from "./scenes";
import { ScrollCue } from "./scroll-cue";

/*
 * The entrance uses CSS animation rather than Motion so it plays on first paint, before
 * hydration, and the headline counts toward LCP straight away.
 */
export function Hero() {
  return (
    <SkyScene id="top" scene={scenes.hero} className="relative min-h-svh">
      <div className="mx-auto grid min-h-svh max-w-[1440px] gap-12 px-6 pt-32 pb-32 md:px-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:pt-40 xl:px-24">
        <div className="flex max-w-[680px] flex-col gap-6">
          <p className="animate-rise eyebrow text-steel-deep">Join the voyage</p>
          <h1 className="animate-rise font-display text-[clamp(3rem,6.2vw,5.5rem)] leading-[0.96] font-semibold tracking-[-0.005em] [animation-delay:80ms]">
            Pick a Captain. Join the Crew. Keep your keys.
          </h1>
          <p className="max-w-[31rem] animate-rise text-lg/relaxed text-ink-soft [animation-delay:160ms] md:text-[1.1875rem]">
            Back skilled traders on Solana. They trade your vault inside on-chain rules, and they
            can never withdraw it.
          </p>
          <div className="mt-1 flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:items-center">
            <ButtonLink href="#berth">
              Join as Crew
              <ArrowRight aria-hidden className="size-[18px]" />
            </ButtonLink>
            <ButtonLink href="#lead" variant="glass">
              Apply as Captain
            </ButtonLink>
          </div>
          <p className="animate-rise text-sm text-ink-soft [animation-delay:320ms]">
            No seed phrase. Sign in with email or Google.
          </p>
        </div>

        <div className="relative hidden animate-rise justify-self-end [animation-delay:200ms] lg:block">
          <PhoneFrame className="h-[min(40.5rem,calc(100svh-15rem))]">
            <Image
              src="/app/crew-home.webp"
              alt="Socially Crew Home showing a sample portfolio of $10,502.20 and three Captain vaults"
              width={780}
              height={1688}
              sizes="300px"
              loading="eager"
              className="size-full object-cover"
            />
          </PhoneFrame>
          <p className="mt-3 text-center text-xs text-ink-soft">App preview · Sample data</p>
          <HeroUpdates />
        </div>
      </div>
      <ScrollCue />
    </SkyScene>
  );
}

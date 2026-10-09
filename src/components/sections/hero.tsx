import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { captains } from "@/lib/sample-data";

/*
 * The entrance uses CSS animation rather than Motion so it plays on first paint, before
 * hydration, and the headline counts toward LCP straight away.
 */
export function Hero() {
  return (
    <Section id="top" className="relative overflow-hidden">
      <Container className="flex min-h-svh flex-col justify-center gap-10 pt-28 pb-14 md:pt-32 md:pb-24">
        <div className="relative z-10 flex flex-col gap-7">
          <p className="flex animate-rise items-center gap-3 eyebrow text-brass-deep">
            <span aria-hidden className="h-px w-8 bg-brass" />
            Social trading on Solana
          </p>
          <h1 className="animate-rise font-display text-[clamp(2.5rem,4.4vw,4rem)] leading-[1.04] tracking-[-0.015em] text-ink [animation-delay:80ms]">
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

        {/* A framed picture under the copy on phones; from md up, the backdrop of the hero */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-panel shadow-soft md:absolute md:inset-0 md:aspect-auto md:rounded-none md:shadow-none">
          <Image
            src="/art/captain-helm.webp"
            alt="A captain at the helm of a ship, sailing into harbour"
            fill
            sizes="(min-width: 768px) 100vw, 92vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover object-[72%_center] md:object-[70%_center]"
          />
          {/* Pearl from the top left, where the copy sits, clearing toward the captain */}
          <div
            aria-hidden
            className="absolute inset-0 hidden bg-[linear-gradient(115deg,rgb(245_247_251/0.97)_0%,rgb(245_247_251/0.9)_30%,rgb(245_247_251/0.4)_52%,rgb(245_247_251/0)_70%)] md:block"
          />
          {/* Hands the picture over to the pearl section below */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 hidden h-28 bg-[linear-gradient(180deg,transparent,var(--color-pearl))] md:block"
          />
        </div>
      </Container>
    </Section>
  );
}

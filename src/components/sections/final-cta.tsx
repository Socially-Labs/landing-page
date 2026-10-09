import Image from "next/image";
import { EmblemMark } from "@/components/ornaments/emblem-mark";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { WaitlistForm } from "./waitlist-form";

export function FinalCta() {
  return (
    <Section id="join" tone="pearl" className="relative overflow-hidden">
      <Image
        src="/art/voyage-cover.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(65%_60%_at_50%_48%,rgb(245_247_251/0.94),rgb(245_247_251/0.82))]"
      />
      <EmblemMark className="pointer-events-none absolute top-1/2 left-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />

      <Container className="relative flex flex-col items-center gap-8 py-28 text-center md:py-36">
        <Reveal className="flex flex-col items-center gap-5">
          <p className="flex items-center gap-3 eyebrow text-brass-deep">
            <span aria-hidden className="h-px w-6 bg-brass" />
            The first voyage
            <span aria-hidden className="h-px w-6 bg-brass" />
          </p>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.015em] text-ink">
            Reserve your <em className="text-brass-deep">berth.</em>
          </h2>
          <p className="max-w-[30rem] text-[1.0625rem]/relaxed text-ink-soft">
            Join 5,420 people on the waitlist. Captains can apply for early access now.
          </p>
        </Reveal>
        <WaitlistForm />
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {["App Store", "Google Play"].map((store) => (
            <span
              key={store}
              className="flex h-11 items-center gap-2 rounded-xl bg-white/80 px-5 text-sm text-muted ring-1 ring-line"
            >
              <b className="font-semibold text-ink">{store}</b> · coming soon
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}

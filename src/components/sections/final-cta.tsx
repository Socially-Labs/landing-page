import Image from "next/image";
import { EmblemMark } from "@/components/ornaments/emblem-mark";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { WaitlistForm } from "./waitlist-form";

export function FinalCta() {
  return (
    <Section id="join" tone="abyss" className="relative overflow-hidden">
      <Image
        src="/art/voyage-cover.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[70%_center] opacity-40"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgb(7_23_44/0.75),rgb(4_12_24/0.97))]"
      />
      <EmblemMark className="pointer-events-none absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />

      <Container className="relative flex flex-col items-center gap-8 py-32 text-center md:py-44">
        <Reveal className="flex flex-col items-center gap-6">
          <p className="flex items-center gap-3 eyebrow text-brass">
            <span aria-hidden className="h-px w-8 bg-brass/60" />
            The first voyage
            <span aria-hidden className="h-px w-8 bg-brass/60" />
          </p>
          <h2 className="font-display text-[clamp(3.25rem,7vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.015em]">
            Reserve your <em className="font-medium text-brass-light">berth.</em>
          </h2>
          <p className="max-w-[32rem] text-lg/relaxed text-mist">
            Join 5,420 people on the waitlist. Captains can apply for early access now.
          </p>
        </Reveal>
        <WaitlistForm />
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {["App Store", "Google Play"].map((store) => (
            <span
              key={store}
              className="flex h-12 items-center gap-2 rounded-xl border border-foam/15 px-5 text-sm text-mist"
            >
              <b className="font-semibold text-foam">{store}</b> · coming soon
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import Image from "next/image";
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
        className="object-cover object-[64%_center]"
      />
      {/* Pearl from the top left, where the copy sits, clearing toward the ship */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(165deg,rgb(245_247_251/0.96)_0%,rgb(245_247_251/0.86)_48%,rgb(245_247_251/0.15)_100%)] md:bg-[linear-gradient(120deg,rgb(245_247_251/0.97)_0%,rgb(245_247_251/0.9)_30%,rgb(245_247_251/0.45)_54%,rgb(245_247_251/0)_78%)]"
      />

      <Container className="relative flex flex-col items-start gap-8 py-28 md:py-40">
        <Reveal className="flex flex-col items-start gap-5">
          <p className="flex items-center gap-3 eyebrow text-brass-deep">
            <span aria-hidden className="h-px w-6 bg-brass" />
            The first voyage
          </p>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.015em] text-ink">
            Reserve your <em className="text-brass-deep">berth.</em>
          </h2>
          <p className="max-w-[28rem] text-[1.0625rem]/relaxed text-ink-soft">
            Join 5,420 people on the waitlist. We’ll email you when the first vaults open.
          </p>
        </Reveal>
        <WaitlistForm />
        <div className="flex flex-wrap gap-3">
          {["App Store", "Google Play"].map((store) => (
            <span
              key={store}
              className="flex h-11 items-center gap-2 rounded-xl bg-white/85 px-5 text-sm text-muted ring-1 ring-line"
            >
              <b className="font-semibold text-ink">{store}</b> · coming soon
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    numeral: "I",
    title: "Sign up in a minute",
    body: "Use email or Google. No seed phrase and no browser extension.",
    src: "/app/sign-in.webp",
    alt: "Socially sign-in screen with email and Google options",
  },
  {
    numeral: "II",
    title: "Add money",
    body: "Top up your Socially wallet with USDC.",
    src: "/app/wallet.webp",
    alt: "Socially wallet with a sample balance and a Deposit button",
  },
  {
    numeral: "III",
    title: "Pick your Captain",
    body: "Compare returns, worst drops and trading styles side by side.",
    src: "/app/discover.webp",
    alt: "Discover screen showing the Top Captain card for Atlas",
  },
  {
    numeral: "IV",
    title: "Watch every trade",
    body: "Get an alert the moment your Captain makes a move.",
    src: "/app/crew-notifications.webp",
    alt: "Notifications with recent vault updates",
  },
];

export function HowItWorks() {
  return (
    <Section id="how" tone="pearl" className="py-28 md:py-40">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          tone="light"
          eyebrow="How it works"
          title={
            <>
              Aboard in <em>four steps.</em>
            </>
          }
          lede="No wallets to set up, no charts to learn. Choose who trades for you and follow along."
        />
        <ol className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.08} className="flex flex-col gap-6">
                <PhoneFrame className="mx-auto h-[28rem] lg:h-[26rem] xl:h-[30rem]">
                  <Image
                    src={step.src}
                    alt={step.alt}
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </PhoneFrame>
                <div className="flex flex-col gap-2">
                  <span className="font-display text-3xl leading-none font-medium text-brass-deep italic">
                    {step.numeral}
                  </span>
                  <h3 className="font-display text-[1.75rem] leading-tight font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="text-[0.9375rem]/relaxed text-ink-soft">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

type Tile = {
  eyebrow: string;
  title: string;
  body: string;
  src: string;
  alt: string;
  /** The tall tile shows its screen under the copy; the rest sit beside it */
  tall?: boolean;
  span: string;
};

const tiles: Tile[] = [
  {
    eyebrow: "Before you join",
    title: "See everything a Captain does",
    body: "Their return beside their worst drop, the size of the vault and its Crew, before you put in a dollar.",
    src: "/app/investment.webp",
    alt: "The Invest with Atlas screen: 42.8% return over 90 days, 12.8% drawdown, $482K in the vault",
    tall: true,
    span: "lg:col-span-3 lg:row-span-2",
  },
  {
    eyebrow: "Your portfolio",
    title: "Every vault, in one view",
    body: "Your share of each Captain’s vault and how it’s doing, updated as they trade.",
    src: "/app/crew-home.webp",
    alt: "The Crew home screen with a portfolio value and a list of Captain vaults",
    span: "lg:col-span-3",
  },
  {
    eyebrow: "Trade alerts",
    title: "Know the moment they move",
    body: "Every trade your Captain makes lands as an alert, with their note on why.",
    src: "/app/crew-notifications.webp",
    alt: "Notifications showing recent trades and updates from Captains",
    span: "lg:col-span-3",
  },
  {
    eyebrow: "For Captains",
    title: "Run your vault",
    body: "Your Crew, your earnings and your vaults, from one dashboard.",
    src: "/app/captain-home.webp",
    alt: "The Captain dashboard with assets under management, Crew and earnings",
    span: "lg:col-span-2",
  },
  {
    eyebrow: "Your wallet",
    title: "Sign in with email",
    body: "A wallet that’s yours, with no seed phrase to keep.",
    src: "/app/wallet.webp",
    alt: "The Socially wallet screen with a sample balance",
    span: "lg:col-span-2",
  },
  {
    eyebrow: "Come aboard",
    title: "Crew or Captain",
    body: "Follow a Captain, or build a record and lead your own Crew.",
    src: "/app/signup-role.webp",
    alt: "The sign-up screen asking whether to join as Crew or become a Captain",
    span: "lg:col-span-2",
  },
];

/** The app as it looks today, as a bento of screens with the features that matter. */
export function InsideApp() {
  return (
    <Section tone="ice" className="py-24 md:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Inside the app"
          title={
            <>
              Everything on deck, <em>in your pocket.</em>
            </>
          }
          lede="The Socially app as it looks today. Figures shown are samples before launch."
        />

        <div className="grid gap-4 lg:auto-rows-[19rem] lg:grid-cols-6">
          {tiles.map((tile, index) => (
            <Reveal
              key={tile.title}
              delay={(index % 3) * 0.06}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-panel bg-[linear-gradient(160deg,#ffffff_0%,#f5f7fb_100%)] shadow-soft ring-1 ring-line",
                tile.tall ? "h-[36rem] lg:h-auto" : "h-[26rem] sm:h-[19rem] sm:flex-row lg:h-auto",
                tile.span,
              )}
            >
              <div className="relative z-10 flex flex-col gap-2 p-7 sm:max-w-[24rem]">
                <span className="eyebrow text-[0.6875rem] text-brass-deep">{tile.eyebrow}</span>
                <h3 className="font-display text-[1.625rem] leading-tight text-ink">
                  {tile.title}
                </h3>
                <p className="text-[0.9375rem]/relaxed text-ink-soft">{tile.body}</p>
              </div>
              <div
                className={cn(
                  "relative",
                  tile.tall
                    ? "mx-auto mt-2 w-[min(64%,19rem)]"
                    : "mx-auto w-[min(62%,12rem)] sm:mx-0 sm:mt-7 sm:mr-7 sm:ml-auto sm:w-[40%] sm:max-w-[13rem] sm:flex-none",
                )}
              >
                <div className="relative aspect-[780/1688] overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-ink/10 transition-transform duration-700 ease-out group-hover:-translate-y-2">
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    sizes="(min-width: 1024px) 20rem, 60vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

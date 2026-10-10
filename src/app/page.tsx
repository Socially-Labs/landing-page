import { existsSync } from "node:fs";
import path from "node:path";
import { CaptainsShare } from "@/components/sections/captains-share";
import { Comparison } from "@/components/sections/comparison";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { ForCaptains } from "@/components/sections/for-captains";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { InsideApp } from "@/components/sections/inside-app";
import { TheCode } from "@/components/sections/the-code";
import { TopCaptains } from "@/components/sections/top-captains";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SoundToggle } from "@/components/sound-toggle";

/** A licensed track dropped here replaces the sea the sound button plays by default. */
const THEME = "/audio/theme.mp3";

export default function Home() {
  const hasTheme = existsSync(path.join(process.cwd(), "public", THEME));

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TheCode />
        <HowItWorks />
        <TopCaptains />
        <InsideApp />
        <CaptainsShare />
        <ForCaptains />
        <Comparison />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <SoundToggle src={hasTheme ? THEME : undefined} />
    </>
  );
}

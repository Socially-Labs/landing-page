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

/*
 * Music is switched off for now. To bring it back, import SoundToggle from
 * "@/components/sound-toggle" and render it after <SiteFooter />:
 *
 *   <SoundToggle src="/audio/theme.mp3" />
 *
 * With a licensed track at public/audio/theme.mp3 it plays that; leave `src` out and it plays
 * the sea it makes in the browser.
 */

export default function Home() {
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
    </>
  );
}

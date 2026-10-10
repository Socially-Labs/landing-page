import { CaptainsShare } from "@/components/sections/captains-share";
import { Community } from "@/components/sections/community";
import { Comparison } from "@/components/sections/comparison";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { ForCaptains } from "@/components/sections/for-captains";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { InsideApp } from "@/components/sections/inside-app";
import { Stats } from "@/components/sections/stats";
import { TheCode } from "@/components/sections/the-code";
import { TopCaptains } from "@/components/sections/top-captains";
import { Voyage } from "@/components/sections/voyage";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TheCode />
        <HowItWorks />
        <Stats />
        <TopCaptains />
        <InsideApp />
        <CaptainsShare />
        <Voyage />
        <ForCaptains />
        <Comparison />
        <Community />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

import { Berth } from "@/components/sections/berth";
import { CaptainsLog } from "@/components/sections/captains-log";
import { Captains } from "@/components/sections/captains";
import { ComeAboard } from "@/components/sections/come-aboard";
import { Compare } from "@/components/sections/compare";
import { Faq } from "@/components/sections/faq";
import { Fees } from "@/components/sections/fees";
import { Hero } from "@/components/sections/hero";
import { Lead } from "@/components/sections/lead";
import { Question } from "@/components/sections/question";
import { scenes } from "@/components/sections/scenes";
import { SevenLocks } from "@/components/sections/seven-locks";
import { Storm } from "@/components/sections/storm";
import { TheCode } from "@/components/sections/the-code";
import { SiteNav } from "@/components/site-nav";
import { SkyProvider } from "@/components/sky/sky-provider";

export default function Home() {
  return (
    <SkyProvider initialScene={scenes.hero}>
      <SiteNav />
      <main>
        <Hero />
        <Question />
        <TheCode />
        <ComeAboard />
        <SevenLocks />
        <Captains />
        <CaptainsLog />
        <Fees />
        <Storm />
        <Lead />
        <Compare />
        <Faq />
        <Berth />
      </main>
    </SkyProvider>
  );
}

import { CaptainsLog } from "@/components/sections/captains-log";
import { Captains } from "@/components/sections/captains";
import { ComeAboard } from "@/components/sections/come-aboard";
import { Fees } from "@/components/sections/fees";
import { Hero } from "@/components/sections/hero";
import { Question } from "@/components/sections/question";
import { scenes } from "@/components/sections/scenes";
import { SevenLocks } from "@/components/sections/seven-locks";
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
      </main>
    </SkyProvider>
  );
}

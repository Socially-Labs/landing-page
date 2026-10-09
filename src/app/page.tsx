import { ComeAboard } from "@/components/sections/come-aboard";
import { Hero } from "@/components/sections/hero";
import { Question } from "@/components/sections/question";
import { scenes } from "@/components/sections/scenes";
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
      </main>
    </SkyProvider>
  );
}

import { Hero } from "@/components/sections/hero";
import { scenes } from "@/components/sections/scenes";
import { SiteNav } from "@/components/site-nav";
import { SkyProvider } from "@/components/sky/sky-provider";

export default function Home() {
  return (
    <SkyProvider initialScene={scenes.hero}>
      <SiteNav />
      <main>
        <Hero />
      </main>
    </SkyProvider>
  );
}

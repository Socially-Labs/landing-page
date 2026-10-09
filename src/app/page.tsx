import { scenes } from "@/components/sections/scenes";
import { SkyProvider } from "@/components/sky/sky-provider";
import { SkyScene } from "@/components/sky/sky-scene";

export default function Home() {
  return (
    <SkyProvider initialScene={scenes.hero}>
      <main>
        <SkyScene
          scene={scenes.hero}
          className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center gap-6 px-6"
        >
          <p className="eyebrow text-steel">Join the voyage</p>
          <h1 className="font-display text-6xl leading-none font-semibold text-ink">
            Pick a Captain. Join the Crew. Keep your keys.
          </h1>
        </SkyScene>
      </main>
    </SkyProvider>
  );
}

import { SkyScene } from "@/components/sky/sky-scene";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { scenes } from "./scenes";

const oldAnswers = [
  {
    risk: "Custody risk",
    title: "Hand them your money",
    body: "They hold the keys. You trust them not to lose them, or leave with them.",
  },
  {
    risk: "Lag and slippage",
    title: "Copy their calls",
    body: "You place every trade yourself, late and at a worse price.",
  },
  {
    risk: "Exchange custody",
    title: "Exchange copy-trading",
    body: "The exchange holds your money and decides what the track record shows.",
  },
];

export function Question() {
  return (
    <SkyScene id="question" scene={scenes.question} className="py-28 md:py-40">
      <Container>
        <SectionHeading
          eyebrow="The question"
          title="“Can you trade for me?”"
          lede="People already ask skilled traders this. Until now, every answer meant giving something up."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {oldAnswers.map((answer, index) => (
            <Reveal
              key={answer.title}
              delay={index * 0.08}
              className="flex flex-col gap-3 rounded-card p-6 shadow-soft glass"
            >
              <span className="w-fit rounded-full bg-amber-tint px-2.5 py-1 text-xs font-semibold text-amber">
                {answer.risk}
              </span>
              <h3 className="font-display text-[1.75rem] leading-tight font-semibold">
                {answer.title}
              </h3>
              <p className="text-[0.9375rem]/relaxed text-ink-soft">{answer.body}</p>
            </Reveal>
          ))}
          <Reveal delay={0.24} className="flex flex-col gap-3 rounded-card p-6 navy-plate">
            <span className="w-fit rounded-full bg-mint-glow/15 px-2.5 py-1 text-xs font-semibold text-mint-glow">
              The fourth answer
            </span>
            <h3 className="font-display text-[1.75rem] leading-tight font-semibold">Socially</h3>
            <p className="text-[0.9375rem]/relaxed text-on-navy-soft">
              The Captain trades your vault. The program holds it. Every trade is on the record, and
              the Captain can never take the money.
            </p>
          </Reveal>
        </div>
      </Container>
    </SkyScene>
  );
}

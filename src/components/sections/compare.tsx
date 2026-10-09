import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

const columns = ["Hand over your money", "Copy their calls", "Exchange copy-trading", "Socially"];

const rows: { label: string; cells: [string, string, string, string] }[] = [
  {
    label: "Who holds the money",
    cells: [
      "The trader",
      "You",
      "The exchange",
      "A program-controlled vault. The Captain has no key to it.",
    ],
  },
  {
    label: "How trades happen",
    cells: [
      "However they like",
      "By hand, after the call",
      "Copied by the exchange",
      "The Captain trades the vault directly, inside on-chain rules",
    ],
  },
  {
    label: "Track record",
    cells: ["Screenshots", "Their word", "The exchange’s numbers", "Rebuilt from on-chain events"],
  },
  {
    label: "What you can see",
    cells: ["What they tell you", "The calls", "Some positions", "Every trade, as it happens"],
  },
  {
    label: "Leaving",
    cells: [
      "When they pay you back",
      "Sell everything yourself",
      "The exchange’s rules",
      "Cash straight away, tokens sold for you",
    ],
  },
];

export function Compare() {
  return (
    <Section id="compare" tone="dark" className="pb-28 md:pb-40">
      <Container>
        <SectionHeading
          tone="night"
          eyebrow="Side by side"
          title="Four ways to let someone trade for you."
        />
        <Reveal className="mt-12 overflow-x-auto rounded-[28px] shadow-lift glass">
          <table className="w-full min-w-[56rem] border-collapse text-left text-[0.9375rem]">
            <thead>
              <tr>
                <th scope="col" className="w-[16%] px-6 py-5">
                  <span className="sr-only">Question</span>
                </th>
                {columns.map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={cn(
                      "px-6 py-5 text-xs font-semibold tracking-[0.1em] uppercase",
                      index === 3 ? "bg-ink text-on-navy" : "text-ink-soft",
                    )}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-ink/10">
                  <th scope="row" className="px-6 py-5 align-top font-semibold text-ink">
                    {row.label}
                  </th>
                  {row.cells.map((cell, index) => (
                    <td
                      key={cell}
                      className={cn(
                        "px-6 py-5 align-top",
                        index === 3 ? "bg-ink font-medium text-on-navy" : "text-ink-soft",
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </Section>
  );
}

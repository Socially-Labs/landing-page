import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const columns = ["Give them the money", "Copy their calls", "Exchange copy-trading"];

const rows: { label: string; others: [string, string, string]; socially: string }[] = [
  {
    label: "Who holds your money",
    others: ["The trader", "You", "The exchange"],
    socially: "A protected vault",
  },
  {
    label: "How trades happen",
    others: ["Any way they like", "By hand, and late", "Copied, with delay"],
    socially: "Instantly, inside the vault",
  },
  {
    label: "Track record",
    others: ["Screenshots", "Their word", "The exchange’s numbers"],
    socially: "Public and checkable",
  },
  {
    label: "Leaving",
    others: ["When they pay you back", "Sell it all yourself", "The exchange’s rules"],
    socially: "Whenever you choose",
  },
];

export function Comparison() {
  return (
    <Section tone="pearl" className="pb-28 md:pb-40">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          tone="light"
          eyebrow="Why Socially"
          title={
            <>
              Four ways to let someone <em>trade for you.</em>
            </>
          }
        />
        <Reveal className="overflow-x-auto rounded-panel border border-line bg-white shadow-lift">
          <table className="w-full min-w-[52rem] border-collapse text-left">
            <thead>
              <tr>
                <th scope="col" className="w-[20%] px-6 py-5">
                  <span className="sr-only">Question</span>
                </th>
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-6 py-5 text-xs font-semibold tracking-[0.08em] text-muted uppercase"
                  >
                    {column}
                  </th>
                ))}
                <th scope="col" className="bg-deep px-6 py-5 eyebrow text-brass">
                  Socially
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <th scope="row" className="px-6 py-5 align-top font-semibold text-ink">
                    {row.label}
                  </th>
                  {row.others.map((cell) => (
                    <td key={cell} className="px-6 py-5 align-top text-ink-soft">
                      {cell}
                    </td>
                  ))}
                  <td className="border-t border-foam/10 bg-deep px-6 py-5 align-top font-medium text-foam">
                    <span className="flex items-start gap-2.5">
                      <Check
                        aria-hidden
                        className="mt-0.5 size-4 flex-none text-brass"
                        strokeWidth={2.5}
                      />
                      {row.socially}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </Section>
  );
}

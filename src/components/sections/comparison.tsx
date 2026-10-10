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
    <Section tone="pearl" className="py-24 md:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Why Socially"
          title={
            <>
              Four ways to let someone <em>trade for you.</em>
            </>
          }
        />
        <ul className="flex flex-col gap-4 md:hidden">
          {rows.map((row) => (
            <li key={row.label}>
              <Reveal className="rounded-card p-5 panel">
                <h3 className="font-semibold text-ink">{row.label}</h3>
                <div className="mt-3 flex flex-col gap-1 rounded-xl bg-ice px-4 py-3">
                  <span className="eyebrow text-brass-deep">Socially</span>
                  <span className="flex items-start gap-2 font-semibold text-ink">
                    <Check
                      aria-hidden
                      className="mt-1 size-4 flex-none text-brass-deep"
                      strokeWidth={2.5}
                    />
                    {row.socially}
                  </span>
                </div>
                <dl className="mt-4 flex flex-col gap-2 text-sm">
                  {columns.map((column, index) => (
                    <div key={column} className="flex justify-between gap-4">
                      <dt className="text-muted">{column}</dt>
                      <dd className="text-right text-ink-soft">{row.others[index]}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="hidden overflow-x-auto rounded-panel panel md:block">
          <table className="w-full min-w-[52rem] border-collapse text-left text-[0.9375rem]">
            <thead>
              <tr>
                <th scope="col" className="w-[20%] px-6 py-5">
                  <span className="sr-only">Question</span>
                </th>
                {columns.map((column) => (
                  <th key={column} scope="col" className="px-6 py-5 eyebrow text-muted">
                    {column}
                  </th>
                ))}
                <th scope="col" className="bg-ice px-6 py-5 eyebrow text-brass-deep">
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
                  <td className="bg-ice px-6 py-5 align-top font-semibold text-ink">
                    <span className="flex items-start gap-2.5">
                      <Check
                        aria-hidden
                        className="mt-0.5 size-4 flex-none text-brass-deep"
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

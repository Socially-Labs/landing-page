import Image from "next/image";
import { Container } from "@/components/ui/container";

const groups = [
  {
    title: "Product",
    links: ["How it works", "Captains", "Safety", "Fees"],
  },
  {
    title: "Resources",
    links: ["Docs", "Audits", "Status", "Brand kit"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Terms", "Privacy", "Risk disclosure", "Cookies"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-brass/15 bg-abyss text-foam">
      <Container className="flex flex-col gap-14 py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-3">
              <Image
                src="/brand/logo.webp"
                alt=""
                width={34}
                height={34}
                className="size-[34px] rounded-[9px]"
              />
              <span className="font-caps text-[1.375rem] font-semibold tracking-[0.18em]">
                Socially
              </span>
            </span>
            <p className="max-w-[16rem] text-sm text-mist">
              Social trading on Solana. Pick a Captain, join the Crew, keep your keys.
            </p>
          </div>
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-3">
              <span className="eyebrow text-[0.9375rem] text-brass">{group.title}</span>
              <ul className="flex flex-col gap-2.5 text-sm text-mist">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-foam">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-foam/10 pt-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[44rem] text-xs/relaxed text-haze">
            Trading crypto assets carries risk, including the loss of your money. Returns shown on
            this site are sample figures for illustration before launch. Past results don’t predict
            future results. Socially will be available in selected countries only.
          </p>
          <div className="flex flex-col items-start gap-1 md:items-end">
            <span className="font-display text-2xl font-medium text-brass-light italic">
              Fair winds.
            </span>
            <span className="text-xs text-haze">© 2026 Socially</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

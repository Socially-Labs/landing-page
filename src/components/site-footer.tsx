import Image from "next/image";
import { Porthole, XLogo } from "@/components/ornaments/social-icons";
import { Container } from "@/components/ui/container";
import { X_HANDLE, X_URL } from "@/lib/links";

const groups = [
  { title: "Product", links: ["How it works", "Captains", "Safety", "Fees"] },
  { title: "Resources", links: ["Docs"] },
  { title: "Company", links: ["About", "Contact"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white text-ink">
      <Container className="flex flex-col gap-12 py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-3">
              <Image
                src="/brand/logo.webp"
                alt=""
                width={32}
                height={32}
                className="size-8 rounded-[8px]"
              />
              <span className="font-display text-xl tracking-[0.18em] uppercase">Socially</span>
            </span>
            <p className="max-w-[16rem] text-sm text-ink-soft">
              Social trading on Solana. Pick a Captain, join the Crew, keep your keys.
            </p>
            <a
              href={X_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex w-fit items-center gap-3 text-sm font-semibold text-ink transition-colors hover:text-brass-deep"
            >
              <Porthole className="size-10 ring-2">
                <XLogo className="size-4.5" />
              </Porthole>
              {X_HANDLE}
            </a>
          </div>
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-3">
              <span className="eyebrow text-brass-deep">{group.title}</span>
              <ul className="flex flex-col gap-2.5 text-sm text-ink-soft">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-ink">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[44rem] text-xs/relaxed text-muted">
            Trading crypto assets carries risk, including the loss of your money. Returns shown on
            this site are sample figures for illustration before launch. Past results don’t predict
            future results. Socially will be available in selected countries only.
          </p>
          <div className="flex flex-col items-start gap-1 md:items-end">
            <span className="font-display text-xl text-brass-deep italic">Fair winds.</span>
            <span className="text-xs text-muted">© 2026 Socially</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

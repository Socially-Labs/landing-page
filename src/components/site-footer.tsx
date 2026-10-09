import { Container } from "@/components/ui/container";

const links = [
  { href: "#", label: "Terms" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Risk disclosure" },
];

export function SiteFooter() {
  return (
    <footer className="rounded-none border-x-0 border-b-0 text-[0.8125rem] text-on-navy-muted glass-dark">
      <Container className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="font-display text-lg font-semibold tracking-[0.16em] text-on-navy">
            SOCIALLY
          </span>
          <span>© 2026 Socially</span>
        </div>
        <nav aria-label="Legal" className="flex gap-5">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-on-navy">
              {link.label}
            </a>
          ))}
        </nav>
        <p>Performance shown on this site is sample data. Crypto trading can lose money.</p>
      </Container>
    </footer>
  );
}

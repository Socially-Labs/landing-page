"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#captains", label: "Captains" },
  { href: "#safety", label: "Safety" },
  { href: "#fees", label: "Fees" },
  { href: "#faq", label: "FAQ" },
];

/** Clear over the hero; turns to frosted white once the page scrolls. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled || open
            ? "border-line bg-white/85 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-18 items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-3">
            <Image
              src="/brand/logo.webp"
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-[8px]"
            />
            <span className="font-display text-xl tracking-[0.18em] text-ink uppercase">
              Socially
            </span>
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.9375rem] text-ink-soft">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#captain"
              className="hidden text-[0.9375rem] font-medium text-ink transition-colors hover:text-brass-deep md:inline"
            >
              For Captains
            </a>
            <ButtonLink href="#join" size="sm" className="hidden sm:inline-flex">
              Join the waitlist
            </ButtonLink>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
              className="grid size-11 place-items-center rounded-full border border-ink/15 bg-white text-ink lg:hidden"
            >
              {open ? (
                <X aria-hidden className="size-5" />
              ) : (
                <Menu aria-hidden className="size-5" />
              )}
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="border-b border-line bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {[...links, { href: "#captain", label: "For Captains" }].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 font-display text-2xl text-ink hover:bg-pearl"
                >
                  {link.label}
                </a>
              ))}
              <ButtonLink href="#join" onClick={() => setOpen(false)} className="mt-3">
                Join the waitlist
              </ButtonLink>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

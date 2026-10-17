"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/visuals";
import { SociallyWordmark } from "@/components/socially-brand";

export function PlutoNavigation() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  return (
    <header className="pluto-header">
      <div className="pluto-nav-inner">
        <SociallyWordmark />
        <nav
          aria-label="Main navigation"
          id="main-navigation"
          className={open ? "pluto-nav is-open" : "pluto-nav"}
          onClick={() => setOpen(false)}
        >
          <a href="#how-it-works">How it works</a>
          <a href="#captains">Captains</a>
          <a href="#fees">Fees</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="pluto-nav-actions">
          <a href="#early-access" className="pill-button nav-cta">
            Join the waitlist <Icon name="arrow" />
          </a>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

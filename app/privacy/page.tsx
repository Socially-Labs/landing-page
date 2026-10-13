import Link from "next/link";
import { Brand } from "@/components/visuals";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Website privacy — Socially" };
export default function Privacy() {
  return (
    <main className="legal">
      <Brand small />
      <h1>Website privacy</h1>
      <p>
        If you request early access, your email address is submitted to our
        database to register your interest and receive launch updates. This page
        does not ask you to create an account or connect a wallet. It does not
        include analytics or advertising trackers.
      </p>
      <p>
        Fonts and images are hosted with this website. Our hosting and database
        providers may process your submission and standard request logs. Contact
        us if you want your email removed from the early-access list.
      </p>
      <h2>Using the Socially app</h2>
      <p>
        This page describes this website only. Review the app’s privacy
        information and account settings separately before using the app.
      </p>
      <p>
        For questions, email{" "}
        <a className="text-link" href="mailto:support@socially.trade">
          support@socially.trade
        </a>
        .
      </p>
      <Link className="text-link" href="/">
        ← Back to Socially
      </Link>
    </main>
  );
}

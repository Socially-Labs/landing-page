import Link from "next/link";
import { Brand } from "@/components/visuals";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Preview terms and risk — Socially",
};
export default function Terms() {
  return (
    <main className="legal">
      <Brand small />
      <h1>Preview terms & risk</h1>
      <p>
        This website introduces Socially’s paper trading and investment preview
        experience. Screenshots show sample data, not verified live investment
        results.
      </p>
      <h2>Current availability</h2>
      <p>
        Live fund deposits and withdrawals are not connected to the investment
        preview. No real funds move through that preview. Availability may
        differ between app versions.
      </p>
      <h2>Understanding the risk</h2>
      <p>
        Trading can lose value. Simulated results do not predict future
        performance. Review the actual strategy, fee terms, permissions, and
        withdrawal conditions before making any future allocation. Nothing on
        this page is a guarantee of returns.
      </p>
      <h2>Questions</h2>
      <p>
        Email{" "}
        <a className="text-link" href="mailto:support@socially.trade">
          support@socially.trade
        </a>{" "}
        for current product information. App-specific terms should be reviewed
        separately before using the app.
      </p>
      <Link className="text-link" href="/">
        ← Back to Socially
      </Link>
    </main>
  );
}

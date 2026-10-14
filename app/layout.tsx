import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../public/fonts/Inter-Regular.ttf", weight: "400" },
    { path: "../public/fonts/Inter-Medium.ttf", weight: "500" },
    { path: "../public/fonts/Inter-SemiBold.ttf", weight: "600" },
    { path: "../public/fonts/Inter-Bold.ttf", weight: "700" },
  ],
  variable: "--font-inter",
  display: "swap",
});
const editorial = localFont({
  src: "../public/fonts/CormorantGaramond-SemiBold.ttf",
  variable: "--font-editorial",
  display: "swap",
  weight: "600",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://socially.trade"),
  title: "Socially — The Captain tells you why",
  description:
    "A chart tells you where. A Captain tells you why. Discover Solana strategies, review the risk, and follow your Crew portfolio. Join the early-access list.",
  openGraph: {
    title: "Socially — The chart tells you where. The Captain tells why.",
    description:
      "Pick a Captain. Join the Crew. Explore trading on Solana with the person, not just the positions.",
    images: [{ url: "/images/coastal-harbor.webp", width: 1536, height: 1024 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${editorial.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}

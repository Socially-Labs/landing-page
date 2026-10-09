import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Socially · Pick a Captain. Join the Crew. Keep your keys.",
  description:
    "Back skilled traders on Solana. They trade your vault inside on-chain rules, and they can never withdraw it.",
};

export const viewport: Viewport = {
  themeColor: "#e4edf5",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} antialiased`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}

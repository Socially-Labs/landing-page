import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Cormorant_SC, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorantSC = Cormorant_SC({
  variable: "--font-cormorant-sc",
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
    "Put money in a vault run by a proven trader. They can trade it. They can never take it.",
};

export const viewport: Viewport = {
  themeColor: "#07172c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cormorantSC.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-svh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

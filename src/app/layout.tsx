import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} ${inter.variable} antialiased`}>
      <body className="min-h-svh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://jordea.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JorDea — Data Scientist · Quant Risk",
  description:
    "Портфолио JorDea: Data Scientist с фокусом на квантовые риск-модели — VaR/ES, GARCH, кредитный скоринг и ML на Python/PyTorch.",
  openGraph: {
    title: "JorDea — Data Scientist · Quant Risk",
    description:
      "Минималистичное портфолио про риск-модели и Data Science: VaR/ES, GARCH, кредитный скоринг, ML-инженерия.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable}`} style={{ backgroundColor: "#000000" }}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

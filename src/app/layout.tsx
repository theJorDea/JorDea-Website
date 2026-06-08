import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://jordea.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JorDea - developer portfolio",
  description:
    "Портфолио разработчика JorDea: веб-приложения, fullstack-разработка, Telegram-боты и цифровые продукты.",
  openGraph: {
    title: "JorDea - developer portfolio",
    description:
      "Современное портфолио frontend/fullstack-разработчика, собранное на Next.js для Vercel.",
    type: "website",
    images: [
      {
        url: "/images/pretty_cat.png",
        width: 1200,
        height: 1200,
        alt: "JorDea portfolio visual",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

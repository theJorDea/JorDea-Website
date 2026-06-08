import type { Metadata } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
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
  title: "JorDea - Junior ML/NLP Engineer",
  description:
    "Портфолио JorDea: начинающий ML/NLP Engineer с фокусом на PyTorch, Deep Learning, RAG-системы и Audio ML.",
  openGraph: {
    title: "JorDea - Junior ML/NLP Engineer",
    description:
      "Минималистичное портфолио про ML-прототипы для текста, последовательностей и аудиоданных.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable}`}>
      <body>{children}</body>
    </html>
  );
}

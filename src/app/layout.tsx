import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Onest, Unbounded } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "@/styles/components.css";
import "@/styles/sections.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://jordea.vercel.app";

const title = "JorDea - Junior ML/NLP Engineer";
const description =
  "Портфолио JorDea: начинающий ML/NLP Engineer с фокусом на PyTorch, Deep Learning, RAG-системы и Audio ML.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description:
      "Минималистичное портфолио про ML-прототипы для текста, последовательностей и аудиоданных.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JorDea Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} ${onest.variable} ${unbounded.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

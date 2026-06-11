import type { Metadata, Viewport } from "next";
import { Geist_Mono, Geologica, Golos_Text } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const golosText = Golos_Text({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const geologica = Geologica({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://jordea.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JorDea — ML Engineer",
  description:
    "Я JorDea — ML-инженер. Собираю прототипы с PyTorch, NLP, RAG и Audio ML и довожу их до работающих сервисов.",
  openGraph: {
    title: "JorDea — ML Engineer",
    description:
      "ML-инженер: PyTorch, NLP, Transformers, RAG, Audio ML. От данных и обучения — до API и деплоя.",
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
    <html lang="ru" className={`${golosText.variable} ${geistMono.variable} ${geologica.variable}`} style={{ backgroundColor: "#000000" }}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

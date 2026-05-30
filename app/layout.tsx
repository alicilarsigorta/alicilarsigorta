import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import ConditionalLayout from "@/components/ConditionalLayout";
import LoadingScreen from "@/components/LoadingScreen";

// Inter Variable — the modern fintech default. Sharp at every weight.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

// JetBrains Mono — for data labels, stats, "live" tags.
// Gives the dashboard/fintech feel where numbers and short labels read as data.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1620" },
  ],
};

export const metadata: Metadata = {
  title: "Alıcılar Sigorta | Türkiye'nin En İyi Sigorta Platformu",
  description: "Türkiye'nin lider sigorta karşılaştırma platformu. Kasko, trafik, sağlık, konut ve daha fazlası için anında ücretsiz teklif alın. 20'den fazla şirket tek ekranda.",
  keywords: "sigorta, kasko, trafik sigortası, sağlık sigortası, dask, konut sigortası, en uygun sigorta",
  authors: [{ name: "Alıcılar Sigorta" }],
  openGraph: {
    title: "Alıcılar Sigorta | Türkiye'nin En İyi Sigorta Platformu",
    description: "Türkiye'nin lider sigorta karşılaştırma platformu. Kasko, trafik, sağlık, konut ve daha fazlası için anında ücretsiz teklif alın.",
    url: "https://alicilarsigorta.com.tr",
    siteName: "Alıcılar Sigorta",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alıcılar Sigorta",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AS Admin" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <Toaster position="top-right" richColors />
        </Providers>
        <LoadingScreen />
      </body>
    </html>
  );
}

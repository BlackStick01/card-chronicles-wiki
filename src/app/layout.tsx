import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const GA_MEASUREMENT_ID = "G-T20YDF09B4";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://card-chronicles-wiki.wiki"),
  title: {
    default: "Card Chronicles Wiki",
    template: "%s | Card Chronicles Wiki",
  },
  description: "Card Chronicles Wiki covers Roblox codes, card rolling, upgrades, lineups, waves, ranks, best cards, and beginner tips for the anime RNG game.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/google-favicon.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    url: "https://card-chronicles-wiki.wiki/",
    siteName: "Card Chronicles Wiki",
    title: "Card Chronicles Wiki",
    description: "Card Chronicles Wiki covers Roblox codes, card rolling, upgrades, lineups, waves, ranks, best cards, and beginner tips for the anime RNG game.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Card Chronicles Wiki preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Card Chronicles Wiki",
    description: "Card Chronicles Wiki covers Roblox codes, card rolling, upgrades, lineups, waves, ranks, best cards, and beginner tips for the anime RNG game.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}

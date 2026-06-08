import type { Metadata } from "next";
import { Fraunces, Newsreader, Inter_Tight, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SchemaOrg from "@/components/SchemaOrg/SchemaOrg";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CalEmbed from "@/components/CalEmbed/CalEmbed";
import CalBookingSurface from "@/components/CalEmbed/CalBookingSurface";
import { siteConfig } from "@/lib/seo";

// Display — high-contrast optical serif, the voice of the new system
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body — editorial text serif
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

// Technical labels / kickers / UI
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Kept as a fallback variable for legacy pages that still reference it inline
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const TITLE = "Rhemic AI. Get found, recommended, and booked in the AI era";
const DESCRIPTION =
  "Customers don't scroll ten links anymore. They ask once and act on one answer. Rhemic makes sure your business is the answer: found in search and AI engines, recommended by name, with every inquiry caught and turned into booked work. Any industry.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: TITLE,
    template: "%s | Rhemic AI",
  },
  description: DESCRIPTION,
  keywords: [
    "AI search visibility",
    "answer engine optimization",
    "get recommended by AI",
    "ChatGPT visibility",
    "Perplexity visibility",
    "business visibility AI era",
    "turn demand into booked work",
    "Rhemic AI",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: siteConfig.social.twitter,
  },
  alternates: {
    canonical: siteConfig.url,
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
      className={`${fraunces.variable} ${newsreader.variable} ${jetBrainsMono.variable} ${interTight.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <SchemaOrg />
        <Breadcrumbs />
        <CalEmbed />
        <CalBookingSurface />
        <div className="relative z-10">{children}</div>
        <Script
          id="hs-script-loader"
          src="https://js-na2.hs-scripts.com/246355934.js"
          strategy="afterInteractive"
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <SpeedInsights />
      </body>
    </html>
  );
}

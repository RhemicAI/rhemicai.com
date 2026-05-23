import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SchemaOrg from "@/components/SchemaOrg/SchemaOrg";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CalEmbed from "@/components/CalEmbed/CalEmbed";
import CobeGlobeHome from "@/components/CobeGlobe/CobeGlobeHome";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import { siteConfig } from "@/lib/seo";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Rhemic AI | Med Spa Growth Infrastructure for Booked Consults",
    template: "%s | Rhemic AI",
  },
  description:
    "Rhemic AI is Dallas-based patient acquisition infrastructure for U.S. med spas, improving GBP, local SEO, reviews, citations, schema, treatment pages, AI answer visibility, missed-call recovery, and ads intelligence.",
  keywords: [
    "med spa growth",
    "med spa patient acquisition",
    "med spa local SEO",
    "Google Business Profile med spa",
    "missed-call recovery",
    "AI answer visibility",
    "ads intelligence",
    "Rhemic AI",
    "Dallas med spa marketing infrastructure",
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
    title: "Rhemic AI | Med Spa Growth Infrastructure",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhemic AI | Med Spa Growth Infrastructure",
    description: siteConfig.description,
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
    <html lang="en" className={`${ibmPlexMono.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CobeGlobeHome />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[1]"
          style={{
            background: `linear-gradient(180deg, rgba(10, 10, 10, 0.0) 0%, rgba(10, 10, 10, 0.35) 55%, rgba(10, 10, 10, 0.75) 100%)`,
          }}
        />
        <SmoothScroll />
        <SchemaOrg />
        <Breadcrumbs />
        <CalEmbed />
        <div className="relative z-10">{children}</div>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <SpeedInsights />
      </body>
    </html>
  );
}

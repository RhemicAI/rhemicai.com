import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SchemaOrg from "@/components/SchemaOrg/SchemaOrg";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CalEmbed from "@/components/CalEmbed/CalEmbed";
import CobeGlobeHome from "@/components/CobeGlobe/CobeGlobeHome";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import { siteConfig } from "@/lib/seo";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Rhemic AI | Operating System for Med Spa Booked Consults",
    template: "%s | Rhemic AI",
  },
  description:
    "Rhemic AI is the Dallas-based med spa growth operating system for U.S. med spas, improving Google Business Profile, local SEO, reviews, citations, schema, treatment pages, AI search visibility, missed-call recovery, AI receptionist coverage, competitor ads intelligence, and booked consult tracking.",
  keywords: [
    "med spa growth operating system",
    "med spa patient acquisition",
    "med spa local SEO",
    "Google Business Profile med spa",
    "med spa missed-call recovery",
    "med spa AI search visibility",
    "AI receptionist for med spas",
    "competitor ads intelligence",
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
    title: "Rhemic AI | Operating System for Med Spas",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhemic AI | Operating System for Med Spas",
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
    <html lang="en" className={`${interTight.variable} ${jetBrainsMono.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CobeGlobeHome />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[1]"
          style={{
            background: `radial-gradient(ellipse 42% 34% at 90% 0%, rgba(77, 214, 224, 0.08) 0%, transparent 70%), linear-gradient(180deg, rgba(7, 9, 12, 0.0) 0%, rgba(7, 9, 12, 0.16) 100%)`,
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

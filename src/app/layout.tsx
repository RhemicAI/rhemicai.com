import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import CobeGlobeHome from "@/components/CobeGlobe/CobeGlobeHome";
import { GoogleAnalytics } from "@next/third-parties/google";
import SchemaOrg from "@/components/SchemaOrg/SchemaOrg";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CalEmbed from "@/components/CalEmbed/CalEmbed";
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
    default: "Rhemic AI | AI Visibility Platform for ChatGPT, Claude, and Perplexity",
    template: "%s | Rhemic AI",
  },
  description:
    "Rhemic AI helps businesses measure, improve, and track how often they are cited and recommended in AI answer engines like ChatGPT, Claude, Perplexity, Gemini, and Google AI experiences.",
  keywords: [
    "AEO",
    "AI Engine Optimization",
    "answer engine optimization",
    "AI answer engines",
    "AI search optimization",
    "AI visibility platform",
    "AI visibility audit",
    "Rhemic AI",
    "ChatGPT recommendations",
    "AI brand mentions",
    "schema markup",
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
    title: "Rhemic AI | AI Visibility Platform for Answer Engines",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhemic AI | AI Visibility Platform for Answer Engines",
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
        <SchemaOrg />
        <Breadcrumbs />
        <CalEmbed />
        <div className="relative z-10">{children}</div>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}

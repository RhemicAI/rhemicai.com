import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import CobeGlobe from "@/components/CobeGlobe/CobeGlobeLazy";
import ScrollRevealInit from "@/components/ScrollRevealInit";
import { GoogleAnalytics } from "@next/third-parties/google";
import SchemaOrg from "@/components/SchemaOrg/SchemaOrg";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

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
  metadataBase: new URL("https://rhemicai.com"),
  title: {
    default: "Rhemic AI - Get Recommended by AI Answer Engines | AEO Platform",
    template: "%s | Rhemic AI",
  },
  description:
    "Ensure your business appears when people ask ChatGPT, Claude, and Perplexity for recommendations. Rhemic AI optimizes your visibility in AI-powered search.",
  keywords: [
    "AEO",
    "AI search optimization",
    "AI answer engines",
    "AI Engine Optimization",
    "SEO",
    "Rhemic AI",
    "adaptive engagement optimization",
    "ChatGPT recommendations",
    "AI visibility",
    "answer engine optimization",
  ],
  authors: [{ name: "Rhemic AI" }],
  creator: "Rhemic AI",
  publisher: "Rhemic AI",
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
    title: "Rhemic AI - Get Recommended by AI Answer Engines",
    description:
      "Ensure your business appears when people ask ChatGPT, Claude, and Perplexity for recommendations. AI-powered visibility optimization.",
    url: "https://rhemicai.com",
    siteName: "Rhemic AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhemic AI - Get Recommended by AI Answer Engines",
    description:
      "Ensure your business appears when people ask ChatGPT, Claude, and Perplexity for recommendations.",
    creator: "@RhemicAI",
  },
  alternates: {
    canonical: "https://rhemicai.com",
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
        <CobeGlobe />
        <ScrollRevealInit />
        <SchemaOrg />
        <Breadcrumbs />
        <div className="relative z-10">{children}</div>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CobeGlobe from "@/components/CobeGlobe/CobeGlobe";

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Variable.woff2", style: "normal" },
    { path: "./fonts/Satoshi-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rhemic AI — Dominate AI-Generated Search Results",
  description:
    "Secure your brand's presence in AI answers through high-performance audits at 99% lower infrastructure costs. Adaptive Engagement Optimization for the AI age.",
  keywords: [
    "AEO",
    "AI search optimization",
    "AI answer engines",
    "SEO",
    "Rhemic AI",
    "adaptive engagement optimization",
  ],
  openGraph: {
    title: "Rhemic AI — Visibility Reimagined for the AI Age",
    description:
      "Dominate AI-generated search results with Adaptive Engagement Optimization.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CobeGlobe />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

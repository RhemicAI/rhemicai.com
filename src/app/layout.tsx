import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

import type { NextConfig } from "next";
import { getSecurityHeaders } from "./src/lib/securityHeaders";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@napi-rs/canvas", "pdf-parse", "pdfjs-dist"],
  outputFileTracingIncludes: {
    "/api/careers/applications": ["./node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs"],
  },
  images: {
    formats: ["image/webp", "image/avif"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: getSecurityHeaders({
        isDevelopment: process.env.NODE_ENV === "development",
      }),
    },
  ],
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.rhemicai.com" }],
      destination: "https://rhemicai.com/:path*",
      permanent: true,
    },
    // Retired 2026-07-30. The self-serve platform and the agency white-label
    // motion are both closed. Rhemic sells one thing: helping a business show
    // up everywhere customers look. Redirects rather than 404s so the pages
    // keep whatever authority and citations they earned.
    { source: "/start-free-trial", destination: "/pricing", permanent: true },
    { source: "/for-agencies", destination: "/", permanent: true },
    { source: "/ai-visibility-tools-for-agencies", destination: "/services/aeo", permanent: true },
    { source: "/best-aeo-tools", destination: "/services/aeo", permanent: true },
    { source: "/best-ai-visibility-tools", destination: "/services/aeo", permanent: true },
    { source: "/best-ai-search-optimization-tools", destination: "/services/aeo", permanent: true },
    { source: "/sample-ai-visibility-report", destination: "/pricing", permanent: true },
    { source: "/products/competitor-analysis", destination: "/services/aeo", permanent: true },
    { source: "/products/code-generation", destination: "/services/seo", permanent: true },
    // Retired lead magnets. One announced itself as paused, the other is
    // med-spa-era language.
    { source: "/free-ai-visibility-check", destination: "/pricing", permanent: true },
    // Retired page that previously redirected from inside the route handler.
    // A server-component redirect() emits 307 Temporary, so Google kept the URL
    // in the index instead of consolidating it. Declared here so it emits 308.
    { source: "/for-local-businesses", destination: "/", permanent: true },
    { source: "/free-consult-leak-calculator", destination: "/", permanent: true },
  ],
};

export default nextConfig;

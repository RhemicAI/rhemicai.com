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
  ],
};

export default nextConfig;

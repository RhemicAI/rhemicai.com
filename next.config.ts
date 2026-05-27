import type { NextConfig } from "next";
import { getSecurityHeaders } from "./src/lib/securityHeaders";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@napi-rs/canvas", "pdf-parse", "pdfjs-dist"],
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
};

export default nextConfig;

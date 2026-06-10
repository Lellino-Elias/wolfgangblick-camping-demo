import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images are pre-sized to WebP at build time, so serve them statically
    // (no on-demand optimization) → instant loads, no per-request CPU.
    unoptimized: true,
  },
  // Render Static Site builds set STATIC_EXPORT=1 → emit a fully static `out/`
  // (free hosting, no cold start). Local/web-service builds leave it unset.
  output: process.env.STATIC_EXPORT === "1" ? "export" : undefined,
};

export default nextConfig;

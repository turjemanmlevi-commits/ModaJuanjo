import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 produces a fully static site in ./out (used for GitHub Pages).
 * NEXT_PUBLIC_BASE_PATH is the sub-path the site is served from ("/ModaJuanjo" on Pages).
 */
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export", basePath, trailingSlash: true } : {}),
  images: {
    unoptimized: isStatic,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "modessae.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  agentRules: false,
  ...(isStatic
    ? {}
    : {
        async redirects() {
          return [
            // Shopify-style nested product URLs used by the live store.
            { source: "/collections/:collection/products/:handle", destination: "/products/:handle", permanent: true },
            // Order-tracking app proxy path from the live menu.
            { source: "/a/tracciamento-ordine", destination: "/pages/track-your-order", permanent: false },
            { source: "/pages/track-order", destination: "/pages/track-your-order", permanent: false },
            { source: "/products", destination: "/search", permanent: false },
            { source: "/account", destination: "https://modessae.com/account", permanent: false },
            { source: "/account/:path*", destination: "https://modessae.com/account/:path*", permanent: false },
          ];
        },
      }),
};

export default nextConfig;

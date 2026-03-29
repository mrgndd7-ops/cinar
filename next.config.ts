import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      { hostname: "**.yenisafak.com" },
      { hostname: "**.diyanethaber.com.tr" },
      { hostname: "**.googleusercontent.com" },
      { hostname: "**.googleapis.com" },
      { hostname: "**.gstatic.com" },
    ],
  },
  serverExternalPackages: ["rss-parser"],
};

export default nextConfig;

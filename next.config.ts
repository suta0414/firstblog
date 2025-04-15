import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["storage.googleapis.com", "formspace.assets.newt.so"],
  },
  experimental: {
    useCache: true,
    dynamicIO: true,
  },
};

export default nextConfig;

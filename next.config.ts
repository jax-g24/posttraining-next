import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "vz-3f73a609-be6.b-cdn.net" },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/vacancies",
        permanent: true,
      },
      {
        source: "/profile",
        destination: "/profile/vacancies",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all HTTPS image sources
      },
    ],
  },
};

export default nextConfig;

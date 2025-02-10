import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/vacancies",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

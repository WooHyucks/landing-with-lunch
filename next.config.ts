import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "with-lunch.com" }],
        destination: "https://www.with-lunch.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

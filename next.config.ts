import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        protocol: "https",
      },
      {
        hostname: "mockmind-api.uifaces.co",
      },
      { hostname: "picsum.photos" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "avatars.githubusercontent.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*", // match everything
        destination: "https://tek-core-blog.onrender.com/:path*", // redirect to Render URL
        permanent: true, // true = 301 permanent redirect, false = 302 temporary
      },
    ];
  },
};

export default nextConfig;

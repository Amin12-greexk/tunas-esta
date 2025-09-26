// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**", // izinkan semua gambar dari Sanity
      },
      // Kalau pakai ImageKit juga, tambahkan ini:
      // {
      //   protocol: "https",
      //   hostname: "ik.imagekit.io",
      //   pathname: "/**",
      // },
    ],
  },
};

export default nextConfig;

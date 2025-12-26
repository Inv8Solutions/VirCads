import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedRevalidateHeaderKeys: [],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://192.168.1.20:3000'
          }
        ]
      }
    ]
  }
};

export default nextConfig;

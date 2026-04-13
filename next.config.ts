import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@google/generative-ai', '@googlemaps/js-api-loader']
  }
};

export default nextConfig;

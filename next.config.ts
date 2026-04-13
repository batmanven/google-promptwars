import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['@google/generative-ai', '@googlemaps/js-api-loader']
};

export default nextConfig;

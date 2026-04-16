/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid intermittent build failures where `pages-manifest.json` is read before the server bundle is flushed (Next 14.2 + webpack build worker).
  experimental: {
    webpackBuildWorker: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

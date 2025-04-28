// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ensure /blocker → /blocker/ and serve the page
  trailingSlash: true,
  // skip ESLint errors on Vercel builds
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;

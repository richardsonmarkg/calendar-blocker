// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  eslint: { ignoreDuringBuilds: true }, // skip ESLint errors in Vercel CI
};

module.exports = nextConfig;

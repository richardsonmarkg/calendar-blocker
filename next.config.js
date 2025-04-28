// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,          // ← important
  eslint: { ignoreDuringBuilds: true },
}
module.exports = nextConfig

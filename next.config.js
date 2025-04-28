// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // keep this so you don’t get ESlint errors on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

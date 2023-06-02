/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  responseLimit: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        port: '',
        pathname: '/private/**',
      },
    ],
  },
};

module.exports = nextConfig;

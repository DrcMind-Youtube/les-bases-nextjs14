/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "business.leeds.ac.uk",
      },
    ],
  },
};

module.exports = nextConfig;

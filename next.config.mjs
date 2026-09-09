/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/privacy', destination: '/tietosuojaseloste', permanent: true },
    ];
  },
};

export default nextConfig;

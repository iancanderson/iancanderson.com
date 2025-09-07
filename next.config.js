/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export (replaces `next export` from Next 14+)
  output: 'export',
  images: {
    loader: 'custom',
  },
};

module.exports = nextConfig;

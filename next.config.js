// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true // GitHub Pages doesn't support image optimization
  },
  basePath: "", // If you're using a custom path, set it here
  trailingSlash: true // optional: ensures folder structure
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
// const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["prolog-api.profy.dev"],
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, "styles")],
  // },
};

module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  serverExternalPackages: ["gray-matter", "reading-time"],
};

export default nextConfig;

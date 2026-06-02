import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/radiance-beauty", // Esto le dice dónde está tu carpeta
};

export default nextConfig;

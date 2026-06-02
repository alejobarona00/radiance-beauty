import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Eliminamos la línea: output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

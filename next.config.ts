import type { NextConfig } from "next";

function normalizeBasePath(value?: string): string {
  const path = (value ?? "").trim();

  if (!path || path === "/") {
    return "";
  }

  const withLeadingSlash = path.startsWith("/")
    ? path
    : `/${path}`;

  return withLeadingSlash.replace(/\/+$/, "");
}

const basePath = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH
);

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;

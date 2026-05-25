import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

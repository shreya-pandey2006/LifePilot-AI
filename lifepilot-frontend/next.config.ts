import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a minimal, self-contained build (.next/standalone) that's
  // ideal for Docker / Railway / Render / Fly.io style hosting.
  // Vercel ignores this and uses its own build pipeline, so it's safe
  // to leave on regardless of where you deploy.
  output: "standalone",
};

export default nextConfig;

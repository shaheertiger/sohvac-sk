import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Uplift-hosted featured images come from whatever CDN host Uplift's
    // editor uploads to — not knowable/allowlistable in advance the way a
    // single fixed hostname would be. The wildcard is scoped to https only
    // and to URLs this app itself requests from the Uplift API response
    // (never arbitrary user input), which keeps the risk in line with what
    // remotePatterns is meant to guard against.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

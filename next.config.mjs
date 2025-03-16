/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            { key: "X-Robots-Tag", value: "index, follow" },
            { key: "X-Frame-Options", value: "SAMEORIGIN" },
            {
              key: "Content-Security-Policy",
              value:
                "default-src 'self'; img-src *; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
            },
          ],
        },
      ];
    },
    experimental: {
      metadataRoute: false, // ✅ Fix for sitemap issue
    },
  };
  
  export default nextConfig;
  
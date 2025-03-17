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
            value: [
              "default-src 'self';",
              "img-src * data: blob:;",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
              "style-src 'self' 'unsafe-inline';",
              "font-src 'self' data:;",
              "connect-src 'self' https://api.example.com;",
              "frame-ancestors 'none';"
            ].join(" "),
          },
        ],
      },
    ];
  },

  experimental: {
    metadataRoutes: true, // Sitemap और अन्य metadata routes के लिए जरूरी
  },

  reactStrictMode: true, // React Strict Mode Enable करें
  swcMinify: true, // SWC Minifier का इस्तेमाल करें
};

export default nextConfig;

export async function GET() {
    return new Response(
      JSON.stringify({
        name: "Shiv Shakti Home Appliance Services",
        short_name: "ShivShakti",
        description: "Expert AC Repair & Installation Services in Jaipur",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#007bff",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      }),
      {
        headers: {
          "Content-Type": "application/manifest+json",
          "Cache-Control": "public, max-age=86400, immutable",
        },
      }
    );
  }
  
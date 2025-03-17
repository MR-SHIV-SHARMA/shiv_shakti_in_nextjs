import { NextResponse } from "next/server";

export async function GET() {
  const pages = [
    { path: "/", priority: "1.0" },
    { path: "/services", priority: "0.9" },
    { path: "/about", priority: "0.8" },
    { path: "/contact", priority: "0.7" },
    { path: "/booking", priority: "0.7" },
    { path: "/service/ac-repair", priority: "0.6" },
    { path: "/service/refrigerator-repair", priority: "0.6" },
    { path: "/service/washing-machine-repair", priority: "0.6" },
    { path: "/service/geyser-repair", priority: "0.6" }
  ];

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map((page, index) =>
        `<url key=${index}><loc>https://www.shivshaktiss.in${page.path}</loc><changefreq>weekly</changefreq><priority>${page.priority}</priority></url>`
      )
      .join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}

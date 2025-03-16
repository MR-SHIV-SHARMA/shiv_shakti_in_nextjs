import { NextResponse } from "next/server";

export async function GET() {
  const pages = ["/", "/services", "/contact", "/about"];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `<url><loc>https://www.shivshaktiss.in${page}</loc></url>`
        )
        .join("")}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}

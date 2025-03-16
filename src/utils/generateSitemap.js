export async function generateSitemap() {
  const pages = ["/", "/services", "/contact", "/about"];
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map(
            (page) => `<url><loc>https://www.shivshaktiss.in${page}</loc></url>`
          )
          .join("")}
      </urlset>`;
}

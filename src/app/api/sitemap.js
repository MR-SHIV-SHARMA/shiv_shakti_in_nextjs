export async function GET() {
  const pages = ["/", "/services", "/services/ac-repair", "/contact"];

  const sitemap = pages
    .map((url) => `<url><loc>https://www.shivshaktiss.in${url}</loc></url>`)
    .join("");

  return new Response(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`,
    { headers: { "Content-Type": "application/xml" } }
  );
}

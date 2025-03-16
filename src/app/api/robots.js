export async function GET() {
    return new Response(
      `User-agent: *
  Allow: /
  Disallow: /admin
  Disallow: /login
  Sitemap: https://www.shivshaktiss.in/sitemap.xml`,
      { headers: { "Content-Type": "text/plain" } }
    );
  }
  
export async function GET() {
  const baseUrl = 'https://vibestall.tech';
  const routes = [
    '',
    '/marketplace',
    '/auth/login',
    '/auth/signup',
    '/blog/how-to-sell-your-vibecoded-app',
    '/blog/buy-app-source-code-guide',
    '/blog/keystore-signature-verification-explained',
    '/blog/vibecoded-app-marketplace-security',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? 1 : 0.8}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

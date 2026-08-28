const siteUrl = 'https://sagocream.com/links';

export const dynamic = 'force-static';

export function GET(): Response {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>monthly</changefreq>
    <priority>1</priority>
  </url>
</urlset>
`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}

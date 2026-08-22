const siteUrl = 'https://links.sagocream.com';

export const dynamic = 'force-static';

export function GET(): Response {
    return new Response(
        `User-Agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
        {
            headers: {
                'Content-Type': 'text/plain',
            },
        }
    );
}

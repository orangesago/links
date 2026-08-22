import type { MetadataRoute } from 'next';

import { siteUrl } from '@/constants/site';

export const dynamic = 'force-static';

export default function sitemap(): Readonly<MetadataRoute.Sitemap> {
    return [
        {
            url: siteUrl,
            changeFrequency: 'monthly',
            priority: 1,
        },
    ];
}

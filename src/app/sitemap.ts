import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://exploreuniverse.dev',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
    ];
}

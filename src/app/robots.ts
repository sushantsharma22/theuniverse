// ═══════════════════════════════════════════════════════════════════════════
// GOD-TIER ROBOTS.TXT CONFIGURATION
// Maximum crawl accessibility for scientific authority
// ═══════════════════════════════════════════════════════════════════════════

import { MetadataRoute } from 'next';

// Required for static export
export const dynamic = 'force-static';

const SITE_URL = 'https://exploreuniverse.dev';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ═══════════════════════════════════════════════════════════════════════
      // GENERAL CRAWLERS - Full access for maximum indexing
      // ═══════════════════════════════════════════════════════════════════════
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Protect API routes
          '/_next/static/',  // Internal Next.js assets (optimized separately)
          '/private/',       // Any private content
        ],
      },
      
      // ═══════════════════════════════════════════════════════════════════════
      // GOOGLE CRAWLERS - Priority access for primary indexing
      // ═══════════════════════════════════════════════════════════════════════
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/gallery/',
          '/scientific-data/',
        ],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/',
          '/textures/',
          '/textures/*.jpg',
          '/textures/*.png',
          '/textures/*.webp',
          '/images/',
          '/*.jpg',
          '/*.png',
          '/*.webp',
        ],
        // Explicitly index scientific imagery as educational diagrams
      },
      {
        userAgent: 'Googlebot-Video',
        allow: '/',
      },
      
      // ═══════════════════════════════════════════════════════════════════════
      // BING & MICROSOFT CRAWLERS
      // ═══════════════════════════════════════════════════════════════════════
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'msnbot',
        allow: '/',
      },
      
      // ═══════════════════════════════════════════════════════════════════════
      // SCIENTIFIC & EDUCATIONAL CRAWLERS - Full access
      // These crawlers help establish educational authority
      // ═══════════════════════════════════════════════════════════════════════
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
      },
      {
        userAgent: 'Yandex',
        allow: '/',
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
      },
      
      // ═══════════════════════════════════════════════════════════════════════
      // SOCIAL MEDIA CRAWLERS - For rich previews
      // ═══════════════════════════════════════════════════════════════════════
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      {
        userAgent: 'Pinterest',
        allow: '/',
      },
      {
        userAgent: 'Slackbot',
        allow: '/',
      },
      {
        userAgent: 'TelegramBot',
        allow: '/',
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
      },
      
      // ═══════════════════════════════════════════════════════════════════════
      // AI & RESEARCH CRAWLERS - Educational content sharing
      // ═══════════════════════════════════════════════════════════════════════
      {
        userAgent: 'GPTBot',
        allow: '/',  // Allow AI training on educational content
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      
      // ═══════════════════════════════════════════════════════════════════════
      // ACADEMIC & ARCHIVE CRAWLERS
      // ═══════════════════════════════════════════════════════════════════════
      {
        userAgent: 'ia_archiver',  // Internet Archive
        allow: '/',
      },
      {
        userAgent: 'archive.org_bot',
        allow: '/',
      },
    ],
    
    // ═══════════════════════════════════════════════════════════════════════
    // SITEMAP DECLARATION - Critical for indexing
    // ═══════════════════════════════════════════════════════════════════════
    sitemap: `${SITE_URL}/sitemap.xml`,
    
    // ═══════════════════════════════════════════════════════════════════════
    // HOST DECLARATION - Canonical domain signal
    // ═══════════════════════════════════════════════════════════════════════
    host: SITE_URL,
  };
}

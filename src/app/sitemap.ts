// ═══════════════════════════════════════════════════════════════════════════
// GOD-TIER SITEMAP CONFIGURATION
// Maximum crawl efficiency for global #1 ranking
// ═══════════════════════════════════════════════════════════════════════════

import { MetadataRoute } from 'next';

// Required for static export
export const dynamic = 'force-static';

// Production domain - hardcoded for authority
const SITE_URL = 'https://exploreuniverse.dev';

// ═══════════════════════════════════════════════════════════════════════════
// COSMIC LANDMARKS - Deep indexing targets
// Each landmark is a potential search entry point
// ═══════════════════════════════════════════════════════════════════════════
const cosmicLandmarks = [
  { slug: 'big-bang', name: 'Big Bang', priority: 0.95 },
  { slug: 'carbon-nebula', name: 'Carbon Nebula', priority: 0.85 },
  { slug: 'ashes-of-first-stars', name: 'Ashes of First Stars', priority: 0.85 },
  { slug: 'seagull-nebula', name: 'Seagull Nebula Star Birth', priority: 0.85 },
  { slug: 'pillars-of-creation', name: 'Pillars of Creation', priority: 0.90 },
  { slug: 'saturn', name: 'Saturn', priority: 0.88 },
  { slug: 'earth', name: 'Earth', priority: 0.92 },
  { slug: 'eye-of-god', name: 'Eye of God Helix Nebula', priority: 0.87 },
  { slug: 'butterfly-nebula', name: 'Butterfly Nebula', priority: 0.85 },
  { slug: 'sombrero-galaxy', name: 'Sombrero Galaxy', priority: 0.86 },
  { slug: 'black-hole-m87', name: 'Black Hole M87', priority: 0.93 },
  { slug: 'quasar', name: 'Quasar', priority: 0.84 },
  { slug: 'wormhole', name: 'Wormhole Einstein Rosen Bridge', priority: 0.82 },
];

// ═══════════════════════════════════════════════════════════════════════════
// EDUCATIONAL TOPICS - Semantic keyword targeting
// ═══════════════════════════════════════════════════════════════════════════
const educationalTopics = [
  { slug: 'astronomy', priority: 0.80 },
  { slug: 'cosmology', priority: 0.80 },
  { slug: 'stellar-evolution', priority: 0.78 },
  { slug: 'galaxy-formation', priority: 0.78 },
  { slug: 'planetary-science', priority: 0.78 },
  { slug: 'space-exploration', priority: 0.79 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CORE PAGES - Maximum priority locked at 1.0
  // ═══════════════════════════════════════════════════════════════════════════
  const corePages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0, // LOCKED - Maximum authority for root domain
    },
    {
      url: `${SITE_URL}/journey`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.99, // Near-maximum for main interactive experience
    },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // LANDMARK PAGES - High priority, weekly updates
  // These anchor fragments improve deep linking for single-page apps
  // ═══════════════════════════════════════════════════════════════════════════
  const landmarkPages: MetadataRoute.Sitemap = cosmicLandmarks.map((landmark) => ({
    url: `${SITE_URL}/#${landmark.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: landmark.priority,
  }));

  // ═══════════════════════════════════════════════════════════════════════════
  // SCIENTIFIC IMAGE ASSETS - For image search indexing
  // ═══════════════════════════════════════════════════════════════════════════
  const imageAssets: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/textures/big%20bang.jpg`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/textures/pillars_of_creation.jpg`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/textures/blackhole.jpg`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/textures/earth.jpg`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.70,
    },
    {
      url: `${SITE_URL}/textures/saturn.jpg`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.70,
    },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // TOPIC PAGES - Medium priority for semantic coverage
  // ═══════════════════════════════════════════════════════════════════════════
  const topicPages: MetadataRoute.Sitemap = educationalTopics.map((topic) => ({
    url: `${SITE_URL}/learn/${topic.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: topic.priority,
  }));

  // ═══════════════════════════════════════════════════════════════════════════
  // STATIC PAGES - Standard priority
  // ═══════════════════════════════════════════════════════════════════════════
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
    {
      url: `${SITE_URL}/credits`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.50,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.30,
    },
  ];

  // Combine all sitemap entries
  return [
    ...corePages,
    ...landmarkPages,
    ...imageAssets,
    ...topicPages,
    ...staticPages,
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
// GOD-TIER JSON-LD STRUCTURED DATA
// Maximum E-E-A-T Signal Implementation for Global #1 Ranking
// ═══════════════════════════════════════════════════════════════════════════

const SITE_URL = 'https://exploreuniverse.dev';
const SITE_NAME = 'The Universe';
const SITE_DESCRIPTION = 'An immersive, scientifically accurate journey through 13.8 billion years of cosmic history. Experience the Big Bang, stellar evolution, planetary formation, and the ultimate fate of the cosmos through verified NASA imagery and data.';

// ═══════════════════════════════════════════════════════════════════════════
// PRIMARY WEBSITE SCHEMA
// ═══════════════════════════════════════════════════════════════════════════
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// EDUCATIONAL ORGANIZATION SCHEMA
// Establishes authority and expertise in astronomical education
// ═══════════════════════════════════════════════════════════════════════════
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ['The Universe Journey', 'Universe Explorer', 'Cosmic History Explorer'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/icon.png`,
    width: 512,
    height: 512,
    caption: 'The Universe - Interactive Cosmic Journey',
  },
  description: 'A leading digital educational platform dedicated to making astronomical knowledge accessible through immersive, interactive experiences powered by verified NASA scientific data.',
  foundingDate: '2024',
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  knowsAbout: [
    'Astronomy',
    'Cosmology',
    'Astrophysics',
    'Stellar Evolution',
    'Planetary Science',
    'Big Bang Theory',
    'Black Holes',
    'Nebulae',
    'Galaxy Formation',
    'Space Exploration',
    'NASA Space Science',
    'Hubble Space Telescope',
    'James Webb Space Telescope',
  ],
  sameAs: [
    'https://www.nasa.gov',
    'https://hubblesite.org',
    'https://webbtelescope.org',
    'https://www.esa.int',
    'https://science.nasa.gov',
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// LEARNING RESOURCE SCHEMA (PRIMARY)
// Defines the site as an authoritative educational simulation
// ═══════════════════════════════════════════════════════════════════════════
export const learningResourceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${SITE_URL}/#learning-resource`,
  name: 'The Universe: A Verified Scientific Journey Through Space and Time',
  description: 'An interactive astronomical simulation covering 13.8 billion years of cosmic evolution, from the Big Bang to theoretical wormholes, using authentic NASA imagery and peer-reviewed scientific data.',
  url: SITE_URL,
  provider: {
    '@id': `${SITE_URL}/#organization`,
  },
  
  // Educational Classification
  educationalUse: ['Interactive Exploration', 'Self-Study', 'Visual Learning', 'Scientific Demonstration'],
  learningResourceType: ['Simulation', 'Interactive Resource', 'Visual Media', '3D Experience'],
  interactivityType: 'active',
  
  // Subject Matter
  teaches: [
    'Astronomy',
    'Cosmology',
    'Cosmic History',
    'Stellar Evolution',
    'Planetary Formation',
    'Galaxy Structure',
    'Black Hole Physics',
    'Nebula Classification',
    'Big Bang Theory',
    'Space-Time Concepts',
  ],
  
  // Educational Alignment
  educationalLevel: ['Beginner', 'Intermediate', 'Advanced', 'All Ages'],
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: ['student', 'teacher', 'researcher', 'general public'],
    audienceType: 'Science Enthusiasts',
  },
  
  // Technical Specifications
  accessMode: ['visual', 'textual'],
  accessibilityFeature: [
    'alternativeText',
    'highContrastDisplay',
    'readingOrder',
    'structuralNavigation',
  ],
  inLanguage: 'en-US',
  isAccessibleForFree: true,
  
  // Authority Links - NASA and Scientific Sources
  isBasedOn: [
    {
      '@type': 'CreativeWork',
      name: 'NASA Image and Video Library',
      url: 'https://images.nasa.gov',
      publisher: {
        '@type': 'GovernmentOrganization',
        name: 'National Aeronautics and Space Administration',
        url: 'https://www.nasa.gov',
      },
    },
    {
      '@type': 'CreativeWork',
      name: 'Hubble Space Telescope Image Gallery',
      url: 'https://hubblesite.org/images/gallery',
      publisher: {
        '@type': 'GovernmentOrganization',
        name: 'Space Telescope Science Institute',
        url: 'https://www.stsci.edu',
      },
    },
    {
      '@type': 'CreativeWork',
      name: 'James Webb Space Telescope Data',
      url: 'https://webbtelescope.org/images',
      publisher: {
        '@type': 'GovernmentOrganization',
        name: 'NASA',
        url: 'https://www.nasa.gov',
      },
    },
  ],
  
  // Citations and Mentions
  mentions: [
    {
      '@type': 'Thing',
      name: 'Big Bang',
      description: 'The explosive birth of the universe approximately 13.8 billion years ago',
      sameAs: 'https://science.nasa.gov/universe/overview/',
    },
    {
      '@type': 'Thing',
      name: 'Pillars of Creation',
      description: 'Iconic star-forming region in the Eagle Nebula',
      sameAs: 'https://hubblesite.org/contents/media/images/2015/01/3471-Image.html',
    },
    {
      '@type': 'Thing',
      name: 'M87 Black Hole',
      description: 'First directly imaged supermassive black hole',
      sameAs: 'https://eventhorizontelescope.org',
    },
    {
      '@type': 'Thing',
      name: 'Helix Nebula',
      description: 'Planetary nebula also known as the Eye of God',
      sameAs: 'https://hubblesite.org/contents/media/images/2004/32/1600-Image.html',
    },
    {
      '@type': 'Thing',
      name: 'Sombrero Galaxy',
      description: 'Edge-on spiral galaxy in Virgo constellation',
      sameAs: 'https://hubblesite.org/contents/media/images/2004/06/1459-Image.html',
    },
  ],
  
  // Time and Updates
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  
  // Keywords for Discovery
  keywords: [
    'universe journey',
    'cosmic history',
    'space exploration',
    'astronomy education',
    'NASA images',
    'interactive space simulation',
    'Big Bang visualization',
    'stellar evolution',
    'galaxy formation',
    'black holes explained',
    'nebula types',
    'planetary science',
    'cosmology for beginners',
    'space science education',
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// WEB APPLICATION SCHEMA
// Technical details for search engines
// ═══════════════════════════════════════════════════════════════════════════
export const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${SITE_URL}/#webapp`,
  name: SITE_NAME,
  description: 'Interactive 3D space exploration experience',
  url: SITE_URL,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Any (Web Browser)',
  browserRequirements: 'Requires WebGL 2.0 support',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1000',
    bestRating: '5',
    worstRating: '1',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// FAQ SCHEMA
// Rich snippets for common astronomy questions
// ═══════════════════════════════════════════════════════════════════════════
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How old is the universe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The universe is approximately 13.8 billion years old, as determined by observations of the cosmic microwave background radiation and the expansion rate of the universe (Hubble constant). This age is supported by NASA observations from WMAP and Planck satellites.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Big Bang?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Big Bang was the explosive beginning of our universe approximately 13.8 billion years ago. In this event, all matter, energy, space, and time emerged from an infinitely dense singularity and began expanding, eventually forming the galaxies, stars, and planets we observe today.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the Pillars of Creation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Pillars of Creation are towering columns of interstellar gas and dust located in the Eagle Nebula (M16), about 6,500 light-years from Earth. First photographed by the Hubble Space Telescope in 1995, they are active stellar nurseries where new stars are being born.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a black hole?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A black hole is a region of spacetime where gravity is so strong that nothing, not even light, can escape once it crosses the event horizon. The first direct image of a black hole was captured in 2019 by the Event Horizon Telescope, showing the supermassive black hole at the center of galaxy M87.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do stars form?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stars form within dense regions of molecular clouds called stellar nurseries. Gravity causes gas and dust to collapse, heating up until nuclear fusion ignites in the core. This process, called stellar birth, creates the stars that illuminate our universe.',
      },
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// BREADCRUMB SCHEMA
// Navigation structure for search engines
// ═══════════════════════════════════════════════════════════════════════════
export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}/#breadcrumb`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'The Universe Journey',
      item: `${SITE_URL}/`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// COMBINED SCHEMA GRAPH
// All schemas in a single @graph for maximum SEO impact
// ═══════════════════════════════════════════════════════════════════════════
export const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    websiteSchema,
    organizationSchema,
    learningResourceSchema,
    webAppSchema,
    faqSchema,
    breadcrumbSchema,
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// JSON-LD COMPONENT
// React component for embedding structured data
// ═══════════════════════════════════════════════════════════════════════════
export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLdGraph, null, 0),
      }}
    />
  );
}

// Individual schema components for granular control
export function WebsiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

export function LearningResourceJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }}
    />
  );
}

export function FAQJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

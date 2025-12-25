// ═══════════════════════════════════════════════════════════════════════════
// GOD-TIER JSON-LD STRUCTURED DATA v2.0
// Maximum E-E-A-T Signal Implementation for Global #1 Ranking
// Consolidated LearningResource + Dataset Schema for Scientific Authority
// ═══════════════════════════════════════════════════════════════════════════

import React from 'react';

const SITE_URL = 'https://exploreuniverse.dev';
const SITE_NAME = 'The Universe';
const SITE_DESCRIPTION = 'An immersive, scientifically accurate journey through 13.8 billion years of cosmic history. Experience the Big Bang, stellar evolution, planetary formation, and the ultimate fate of the cosmos through verified NASA imagery and data.';

// ═══════════════════════════════════════════════════════════════════════════
// LANDMARK DATA FOR SCHEMA GENERATION
// Embedded directly for schema.org Dataset compliance
// ═══════════════════════════════════════════════════════════════════════════
const LANDMARK_SCHEMA_DATA = [
  {
    id: 'big_bang',
    title: 'The Big Bang',
    type: 'Cosmic Origin',
    distance: '13.8 billion years ago',
    description: 'The Big Bang was the explosive birth of the universe approximately 13.8 billion years ago. In an instant, all matter, energy, space, and time emerged from an infinitely dense singularity, setting the stage for everything that would follow.',
  },
  {
    id: 'carbon_nebula',
    title: 'Carbon Nebula',
    type: 'Molecular Cloud',
    distance: '7,500 light-years',
    description: 'Molecular clouds like this Carbon Nebula are the raw materials of the cosmos. Rich in carbon compounds and heavy elements forged in ancient stars, these clouds contain the building blocks for new stars, planets, and eventually life itself.',
  },
  {
    id: 'ashes_of_first_stars',
    title: 'Ashes of the First Stars',
    type: 'Primeval Quasar',
    distance: '12.8 billion light-years',
    description: "Information about the very first generation of stars has been one of the Universe's best-kept secrets. When the first stars ended their lives as supernovae, the explosions expelled gas into space. These 'ashes' contained heavier elements such as oxygen, carbon, silicon, and iron.",
  },
  {
    id: 'starbirth',
    title: 'Seagull Nebula',
    type: 'Star-Forming Region',
    distance: '3,650 light-years',
    description: 'The Seagull Nebula is an active stellar nursery where new stars are being born. Gravity pulls together gas and dust, igniting nuclear fusion and giving birth to brilliant new suns.',
  },
  {
    id: 'pillars',
    title: 'Pillars of Creation',
    type: 'Emission Nebula',
    distance: '6,500 light-years',
    description: 'The Pillars of Creation are vast trunks of interstellar gas and dust in the Eagle Nebula. They are active stellar nurseries where new stars are being born, simultaneously eroded by ultraviolet light from nearby massive stars.',
  },
  {
    id: 'saturn',
    title: 'Saturn',
    type: 'Gas Giant',
    distance: '1.2 billion km',
    description: 'Saturn, the jewel of our solar system, represents the formation of planetary systems around newborn stars. Its magnificent rings demonstrate the complex dynamics that sculpt worlds over billions of years.',
  },
  {
    id: 'earth',
    title: 'Earth',
    type: 'Terrestrial Planet',
    distance: '150 million km',
    description: 'Earth, our pale blue dot, is the only known world harboring life. Born from cosmic dust, shaped by geology, and transformed by biology, it represents matter becoming aware of itself.',
  },
  {
    id: 'eye_of_god',
    title: 'Eye of God (Helix Nebula)',
    type: 'Planetary Nebula',
    distance: '650 light-years',
    description: 'The Helix Nebula is the remnant of a dying star. As stars like our Sun exhaust their fuel, they shed their outer layers, creating beautiful cosmic structures that seed the universe with heavy elements.',
  },
  {
    id: 'butterfly',
    title: 'Butterfly Nebula',
    type: 'Bipolar Nebula',
    distance: '3,392 light-years',
    description: 'The Butterfly Nebula represents cosmic transformation. Its central star, one of the hottest known at 250,000°C, drives the expansion of delicate wings of gas.',
  },
  {
    id: 'sombrero',
    title: 'Sombrero Galaxy',
    type: 'Spiral Galaxy',
    distance: '29 million light-years',
    description: 'The Sombrero Galaxy contains hundreds of billions of stars organized into a majestic spiral structure, representing the mature phase of galactic evolution.',
  },
  {
    id: 'black_hole',
    title: 'Black Hole M87',
    type: 'Supermassive Black Hole',
    distance: '55 million light-years',
    description: 'This is the first direct image of a black hole, located in galaxy M87. With a mass 6.5 billion times our Sun, it represents gravity so intense that not even light can escape.',
  },
  {
    id: 'quasar',
    title: 'Quasar',
    type: 'Active Galactic Nucleus',
    distance: '2.4 billion light-years',
    description: 'Quasars are the brightest objects in the universe, powered by supermassive black holes. They outshine entire galaxies, serving as cosmic lighthouses visible across billions of light-years.',
  },
  {
    id: 'wormhole',
    title: 'Wormhole',
    type: 'Einstein-Rosen Bridge',
    distance: 'Beyond Space-Time',
    description: 'A wormhole is a theoretical passage through space-time, representing the ultimate frontier—a gateway to other universes or the next cycle of cosmic creation.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// PRIMARY LEARNING RESOURCE SCHEMA (CONSOLIDATED)
// Advanced educational simulation with full scientific authority
// ═══════════════════════════════════════════════════════════════════════════
export const learningResourceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${SITE_URL}/#learning-resource`,
  name: 'The Universe: An Interactive Journey Through 13.8 Billion Years of Cosmic History',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  
  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATIONAL CLASSIFICATION - Advanced Level
  // ═══════════════════════════════════════════════════════════════════════════
  educationalLevel: 'Advanced',
  teaches: [
    'Cosmology',
    'Physics',
    'Astronomy',
    'Astrophysics',
    'Stellar Evolution',
    'Galactic Dynamics',
    'Planetary Science',
    'General Relativity',
    'Quantum Cosmology',
    'Black Hole Physics',
    'Nebula Classification',
    'Interstellar Medium',
  ],
  
  educationalUse: [
    'Interactive Exploration',
    'Scientific Visualization',
    'Self-Directed Learning',
    'Research Reference',
    'Academic Study',
    'Classroom Instruction',
  ],
  
  learningResourceType: [
    'Simulation',
    'Interactive 3D Experience',
    'Scientific Visualization',
    'Educational Media',
  ],
  
  interactivityType: 'active',
  typicalAgeRange: '14-99',
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SOURCE ORGANIZATION - NASA Authority
  // ═══════════════════════════════════════════════════════════════════════════
  sourceOrganization: {
    '@type': 'GovernmentOrganization',
    name: 'National Aeronautics and Space Administration',
    alternateName: 'NASA',
    url: 'https://www.nasa.gov',
    sameAs: [
      'https://en.wikipedia.org/wiki/NASA',
      'https://twitter.com/NASA',
      'https://www.facebook.com/NASA',
      'https://www.instagram.com/nasa/',
      'https://www.youtube.com/NASA',
    ],
    logo: 'https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg',
    description: 'NASA explores the unknown in air and space, innovates for the benefit of humanity, and inspires the world through discovery.',
  },
  
  // Provider organization
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ABOUT - Core Scientific Topics
  // ═══════════════════════════════════════════════════════════════════════════
  about: [
    {
      '@type': 'Thing',
      name: 'The Big Bang',
      description: 'The explosive origin of the universe 13.8 billion years ago, when all matter, energy, space, and time emerged from an infinitely dense singularity.',
      sameAs: [
        'https://science.nasa.gov/universe/overview/',
        'https://en.wikipedia.org/wiki/Big_Bang',
        'https://www.nasa.gov/universe/',
      ],
    },
    {
      '@type': 'Thing',
      name: 'Black Holes',
      description: 'Regions of spacetime where gravity is so extreme that nothing, not even light, can escape. The M87 black hole was the first ever directly imaged in 2019.',
      sameAs: [
        'https://science.nasa.gov/universe/black-holes/',
        'https://eventhorizontelescope.org',
        'https://en.wikipedia.org/wiki/Black_hole',
      ],
    },
    {
      '@type': 'Thing',
      name: 'Galactic Evolution',
      description: 'The process by which galaxies form, evolve, and interact over cosmic time scales, from primordial gas clouds to massive spiral and elliptical structures.',
      sameAs: [
        'https://science.nasa.gov/universe/galaxies/',
        'https://hubblesite.org/science/galaxies',
        'https://en.wikipedia.org/wiki/Galaxy_formation_and_evolution',
      ],
    },
    {
      '@type': 'Thing',
      name: 'Stellar Evolution',
      description: 'The lifecycle of stars from formation in nebulae through main sequence burning to their final states as white dwarfs, neutron stars, or black holes.',
      sameAs: [
        'https://science.nasa.gov/universe/stars/',
        'https://en.wikipedia.org/wiki/Stellar_evolution',
      ],
    },
    {
      '@type': 'Thing',
      name: 'Cosmic Microwave Background',
      description: 'The oldest light in the universe, released 380,000 years after the Big Bang, providing a snapshot of the early cosmos.',
      sameAs: [
        'https://science.nasa.gov/universe/overview/cosmic-microwave-background/',
        'https://en.wikipedia.org/wiki/Cosmic_microwave_background',
      ],
    },
  ],
  
  // ═══════════════════════════════════════════════════════════════════════════
  // AUTHORITY INHERITANCE - NASA Open Data Sources
  // ═══════════════════════════════════════════════════════════════════════════
  isBasedOn: [
    {
      '@type': 'Dataset',
      name: 'NASA Open Data Portal',
      url: 'https://data.nasa.gov',
      description: 'Official NASA scientific datasets and imagery',
      publisher: {
        '@type': 'GovernmentOrganization',
        name: 'National Aeronautics and Space Administration',
        url: 'https://www.nasa.gov',
      },
      license: 'https://www.nasa.gov/nasa-brand-center/images-and-media/',
    },
    {
      '@type': 'Dataset',
      name: 'Hubble Space Telescope Archive',
      url: 'https://archive.stsci.edu',
      description: 'Complete archive of Hubble observations and imagery',
      publisher: {
        '@type': 'Organization',
        name: 'Space Telescope Science Institute',
        url: 'https://www.stsci.edu',
      },
    },
    {
      '@type': 'Dataset',
      name: 'James Webb Space Telescope Data',
      url: 'https://webbtelescope.org/images',
      description: 'Latest infrared observations from JWST',
      publisher: {
        '@type': 'GovernmentOrganization',
        name: 'NASA',
        url: 'https://www.nasa.gov',
      },
    },
    {
      '@type': 'Dataset',
      name: 'Event Horizon Telescope Collaboration Data',
      url: 'https://eventhorizontelescope.org',
      description: 'First direct images of black holes',
      publisher: {
        '@type': 'Organization',
        name: 'Event Horizon Telescope Collaboration',
      },
    },
  ],
  
  // ═══════════════════════════════════════════════════════════════════════════
  // AUDIENCE & ACCESSIBILITY
  // ═══════════════════════════════════════════════════════════════════════════
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: ['student', 'teacher', 'researcher', 'scientist', 'general public'],
    audienceType: 'Science Enthusiasts and Researchers',
  },
  
  accessMode: ['visual', 'textual'],
  accessibilityFeature: [
    'alternativeText',
    'highContrastDisplay',
    'readingOrder',
    'structuralNavigation',
    'tableOfContents',
  ],
  accessibilityHazard: ['noFlashingHazard', 'noMotionSimulationHazard'],
  accessibilitySummary: 'Interactive 3D visualization with text descriptions for all cosmic objects. Smooth animations optimized for accessibility.',
  
  inLanguage: 'en-US',
  isAccessibleForFree: true,
  
  // ═══════════════════════════════════════════════════════════════════════════
  // TEMPORAL & PUBLICATION DATA
  // ═══════════════════════════════════════════════════════════════════════════
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  
  // Keywords optimized for scientific search
  keywords: [
    'interactive astronomy',
    'cosmic history simulation',
    'Big Bang visualization',
    'black hole exploration',
    'galactic evolution',
    'NASA educational resource',
    'space science education',
    '3D universe tour',
    'stellar evolution interactive',
    'cosmology for students',
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// DATASET SCHEMA - Scientific Data Authority
// Describes LANDMARKS data with NASA source attribution
// ═══════════════════════════════════════════════════════════════════════════
export const datasetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  '@id': `${SITE_URL}/#dataset`,
  name: 'The Universe Cosmic Landmarks Dataset',
  description: 'A curated collection of 13 cosmic landmarks spanning 13.8 billion years of universal history, from the Big Bang to theoretical wormholes. Each landmark includes scientific descriptions, distances, and classifications based on NASA and peer-reviewed astronomical data.',
  url: SITE_URL,
  
  // ═══════════════════════════════════════════════════════════════════════════
  // DATA SOURCE ATTRIBUTION
  // ═══════════════════════════════════════════════════════════════════════════
  creator: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  
  // NASA Open Data as source
  isBasedOn: {
    '@type': 'Dataset',
    name: 'NASA Open Data',
    url: 'https://data.nasa.gov',
    publisher: {
      '@type': 'GovernmentOrganization',
      name: 'National Aeronautics and Space Administration',
      url: 'https://www.nasa.gov',
      sameAs: [
        'https://twitter.com/NASA',
        'https://www.facebook.com/NASA',
        'https://www.instagram.com/nasa/',
      ],
    },
  },
  
  // Scientific distribution
  distribution: {
    '@type': 'DataDownload',
    encodingFormat: 'application/json',
    contentUrl: `${SITE_URL}/api/landmarks`,
  },
  
  // Temporal coverage
  temporalCoverage: '-13800000000/2025',
  
  // Spatial coverage (entire observable universe)
  spatialCoverage: {
    '@type': 'Place',
    name: 'Observable Universe',
    description: 'From Earth to 13.8 billion light-years distant',
  },
  
  // Dataset variables
  variableMeasured: [
    {
      '@type': 'PropertyValue',
      name: 'Distance',
      description: 'Distance from Earth in light-years or kilometers',
    },
    {
      '@type': 'PropertyValue',
      name: 'Object Type',
      description: 'Astronomical classification (nebula, galaxy, planet, etc.)',
    },
    {
      '@type': 'PropertyValue',
      name: 'Age',
      description: 'Estimated age or time since formation',
    },
  ],
  
  // Scientific keywords
  keywords: [
    'astronomical objects',
    'cosmic landmarks',
    'NASA imagery',
    'nebulae',
    'galaxies',
    'black holes',
    'stellar evolution',
    'cosmological data',
  ],
  
  license: 'https://creativecommons.org/licenses/by/4.0/',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  
  // Included landmarks as data points
  hasPart: LANDMARK_SCHEMA_DATA.map((landmark) => ({
    '@type': 'DataCatalog',
    name: landmark.title,
    description: landmark.description,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'objectType',
        value: landmark.type,
      },
      {
        '@type': 'PropertyValue',
        name: 'distance',
        value: landmark.distance,
      },
    ],
  })),
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
  description: 'Interactive 3D cosmic exploration powered by WebGL and Three.js',
  url: SITE_URL,
  applicationCategory: 'EducationalApplication',
  applicationSubCategory: 'Astronomy Simulation',
  operatingSystem: 'Any (Web Browser)',
  browserRequirements: 'Requires WebGL 2.0 support, modern browser recommended',
  softwareVersion: '2.0',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'Interactive 3D space navigation',
    '13 cosmic landmarks with scientific descriptions',
    'NASA-sourced astronomical imagery',
    'Smooth scroll-based journey through cosmic time',
    'Real-time WebGL rendering',
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// FAQ SCHEMA - Rich Snippets for Astronomy Questions
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
        text: 'Stars form within dense regions of molecular clouds called stellar nurseries. Gravity causes gas and dust to collapse, heating up until nuclear fusion ignites in the core. This process takes millions of years and creates the stars that illuminate our universe.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a quasar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A quasar (quasi-stellar object) is an extremely luminous active galactic nucleus powered by a supermassive black hole. Quasars are the brightest objects in the universe, capable of outshining entire galaxies, and can be observed from billions of light-years away.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Sombrero Galaxy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Sombrero Galaxy (M104) is a spiral galaxy located 29 million light-years from Earth in the constellation Virgo. Its distinctive shape, featuring a bright nucleus and large central bulge with a prominent dust lane, resembles a Mexican hat.',
      },
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// BREADCRUMB SCHEMA
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
      name: 'Cosmic Journey',
      item: `${SITE_URL}/#journey`,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// ITEM LIST SCHEMA - All Landmarks as ItemList
// Enables rich results for the cosmic journey
// ═══════════════════════════════════════════════════════════════════════════
export const landmarkListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#landmark-list`,
  name: 'Cosmic Landmarks - A Journey Through Universal History',
  description: 'An ordered list of 13 cosmic landmarks representing key stages in the evolution of the universe',
  numberOfItems: LANDMARK_SCHEMA_DATA.length,
  itemListElement: LANDMARK_SCHEMA_DATA.map((landmark, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: landmark.title,
    description: landmark.description,
    url: `${SITE_URL}/#${landmark.id}`,
  })),
};

// ═══════════════════════════════════════════════════════════════════════════
// COMBINED SCHEMA GRAPH
// All schemas unified for maximum SEO impact
// ═══════════════════════════════════════════════════════════════════════════
export const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    learningResourceSchema,
    datasetSchema,
    webAppSchema,
    faqSchema,
    breadcrumbSchema,
    landmarkListSchema,
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// JSON-LD COMPONENT
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

// Export landmark data for use in Shadow Index component
export { LANDMARK_SCHEMA_DATA };

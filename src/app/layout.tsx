import type { Metadata, Viewport } from 'next';
import { Geist, Playfair_Display } from 'next/font/google';
import './globals.css';
import JsonLd from './jsonld';

// ═══════════════════════════════════════════════════════════════════════════
// FONT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap', // Optimize CLS
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600'],
  display: 'swap', // Optimize CLS
});

// ═══════════════════════════════════════════════════════════════════════════
// SEO CONSTANTS - Production Domain Authority
// ═══════════════════════════════════════════════════════════════════════════
const SITE_URL = 'https://exploreuniverse.dev';
const SITE_NAME = 'The Universe';
const SITE_TITLE = 'The Universe: A Verified Scientific Journey Through Space and Time';
const SITE_DESCRIPTION = 'Embark on an immersive, scientifically verified journey through 13.8 billion years of cosmic history. Experience the Big Bang, witness stellar birth in the Pillars of Creation, explore planetary systems, and venture into black holes—all powered by authentic NASA imagery and peer-reviewed astronomical data.';

// ═══════════════════════════════════════════════════════════════════════════
// GOD-TIER METADATA CONFIGURATION
// Maximum E-E-A-T Signal Implementation
// ═══════════════════════════════════════════════════════════════════════════
export const metadata: Metadata = {
  // ═══════════════════════════════════════════════════════════════════════════
  // CORE METADATA
  // ═══════════════════════════════════════════════════════════════════════════
  metadataBase: new URL(SITE_URL),
  
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME} - Scientific Space Exploration`,
  },
  
  description: SITE_DESCRIPTION,
  
  // ═══════════════════════════════════════════════════════════════════════════
  // AUTHORITY & CLASSIFICATION
  // ═══════════════════════════════════════════════════════════════════════════
  applicationName: SITE_NAME,
  authors: [
    { name: 'The Universe Team', url: SITE_URL },
    { name: 'NASA (Data Source)', url: 'https://www.nasa.gov' },
  ],
  generator: 'Next.js',
  keywords: [
    // Primary Keywords
    'universe journey',
    'cosmic history',
    'space exploration',
    'astronomy education',
    
    // Scientific Terms
    'Big Bang visualization',
    'stellar evolution',
    'galaxy formation',
    'black hole simulation',
    'nebula exploration',
    'planetary science',
    'cosmology',
    'astrophysics',
    
    // NASA & Authority
    'NASA imagery',
    'Hubble telescope images',
    'James Webb telescope',
    'scientific visualization',
    
    // Educational
    'interactive space learning',
    'astronomy for beginners',
    'cosmic timeline',
    'universe age',
    '13.8 billion years',
    
    // Specific Features
    'Pillars of Creation',
    'Helix Nebula',
    'Sombrero Galaxy',
    'M87 black hole',
    'Eagle Nebula',
    'Butterfly Nebula',
    
    // Experience Keywords
    '3D space experience',
    'immersive astronomy',
    'virtual universe tour',
    'cosmic journey simulator',
  ],
  
  referrer: 'origin-when-cross-origin',
  creator: 'The Universe Team',
  publisher: SITE_NAME,
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CLASSIFICATION - Educational & Scientific
  // ═══════════════════════════════════════════════════════════════════════════
  category: 'Education',
  classification: 'Scientific Resource',
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ROBOTS & INDEXING
  // ═══════════════════════════════════════════════════════════════════════════
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CANONICAL URL - Consolidate ranking power
  // ═══════════════════════════════════════════════════════════════════════════
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // OPEN GRAPH - Social & Rich Previews (Production URLs)
  // ═══════════════════════════════════════════════════════════════════════════
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'The Universe - An Immersive Journey Through 13.8 Billion Years of Cosmic History',
        type: 'image/png',
      },
      {
        url: `${SITE_URL}/og-image-square.png`,
        width: 1200,
        height: 1200,
        alt: 'The Universe - Scientific Space Exploration',
        type: 'image/png',
      },
    ],
    countryName: 'United States',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // TWITTER CARD - Maximum visibility
  // ═══════════════════════════════════════════════════════════════════════════
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
    creator: '@UniverseJourney',
    site: '@UniverseJourney',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ICONS & FAVICONS
  // ═══════════════════════════════════════════════════════════════════════════
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // APP MANIFEST - PWA Support
  // ═══════════════════════════════════════════════════════════════════════════
  manifest: '/manifest.json',
  
  // ═══════════════════════════════════════════════════════════════════════════
  // VERIFICATION - Search Console & Analytics
  // ═══════════════════════════════════════════════════════════════════════════
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    // Add your verification codes here
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL META TAGS
  // ═══════════════════════════════════════════════════════════════════════════
  other: {
    // Educational Classification
    'dc.type': 'InteractiveResource',
    'dc.subject': 'Astronomy; Cosmology; Space Science; Education',
    'dc.creator': 'The Universe Team',
    'dc.publisher': SITE_NAME,
    'dc.language': 'en',
    'dc.rights': 'Educational Use',
    
    // Schema Hints
    'article:section': 'Science',
    'article:tag': 'Astronomy, Space, Universe, NASA, Education',
    
    // Geographic & Language
    'geo.region': 'US',
    'content-language': 'en-US',
    
    // App Links
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SITE_NAME,
    
    // Security
    'referrer': 'strict-origin-when-cross-origin',
    
    // Performance Hints
    'x-dns-prefetch-control': 'on',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// VIEWPORT CONFIGURATION
// Optimized for Core Web Vitals
// ═══════════════════════════════════════════════════════════════════════════
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000005' },
    { media: '(prefers-color-scheme: dark)', color: '#000005' },
  ],
  colorScheme: 'dark',
};

// ═══════════════════════════════════════════════════════════════════════════
// ROOT LAYOUT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        <JsonLd />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="https://www.nasa.gov" />
        <link rel="dns-prefetch" href="https://images.nasa.gov" />
        <link rel="dns-prefetch" href="https://hubblesite.org" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* Educational Content Indicators */}
        <meta name="audience" content="all" />
        <meta name="subject" content="Astronomy and Space Science Education" />
        <meta name="topic" content="Interactive Cosmic Journey" />
        <meta name="summary" content={SITE_DESCRIPTION} />
        
        {/* Copyright & Attribution */}
        <meta name="copyright" content="The Universe Team" />
        <meta name="owner" content="The Universe Team" />
        <meta name="url" content={SITE_URL} />
        <meta name="identifier-URL" content={SITE_URL} />
        
        {/* Page Classification */}
        <meta name="page-type" content="Educational Interactive" />
        <meta name="page-topic" content="Space Science" />
        <meta name="category" content="Education" />
      </head>
      <body className="bg-[#000005] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

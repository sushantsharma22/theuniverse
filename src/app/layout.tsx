import type { Metadata } from 'next';
import { Geist, Playfair_Display } from 'next/font/google';
import './globals.css';
import JsonLd from './jsonld';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://exploreuniverse.dev'),
  title: 'The Universe | A Journey Through Space and Time',
  description: 'An immersive journey through 13.8 billion years of cosmic history using NASA imagery.',
  keywords: ['universe', 'space', 'cosmos', 'NASA', 'astronomy', 'Big Bang'],
  authors: [{ name: 'Universe Journey' }],
  openGraph: {
    title: 'The Universe | A Journey Through Space and Time',
    description: 'Experience 13.8 billion years of cosmic history',
    url: 'https://exploreuniverse.dev',
    siteName: 'The Universe Journey',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Universe Journey Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Universe | A Journey Through Space and Time',
    description: 'Experience 13.8 billion years of cosmic history',
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <body className="bg-[#000005] text-white overflow-x-hidden">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}

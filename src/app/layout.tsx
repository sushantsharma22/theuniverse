import type { Metadata } from 'next';
import { Geist, Playfair_Display } from 'next/font/google';
import './globals.css';

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
  title: 'The Universe | A Journey Through Time',
  description: 'An immersive journey through 13.8 billion years of cosmic history using NASA imagery.',
  keywords: ['universe', 'space', 'cosmos', 'NASA', 'astronomy', 'Big Bang'],
  authors: [{ name: 'Universe Journey' }],
  openGraph: {
    title: 'The Universe | A Journey Through Time',
    description: 'Experience 13.8 billion years of cosmic history',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <body className="bg-[#000005] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

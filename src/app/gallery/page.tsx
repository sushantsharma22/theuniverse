// ═══════════════════════════════════════════════════════════════════════════
// GALLERY AUTHORITY PAGE
// Signals deep content to search engines, redirects users to main experience
// Prevents soft 404 errors while maintaining SEO authority
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'NASA Cosmic Image Gallery | The Universe',
  description: 'Explore our collection of authentic NASA, Hubble, and James Webb Space Telescope imagery showcasing 13 cosmic landmarks from the Big Bang to wormholes.',
};

export default function GalleryPage() {
  redirect('/');
}

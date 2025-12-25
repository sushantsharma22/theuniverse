// ═══════════════════════════════════════════════════════════════════════════
// COSMOLOGY TOPIC GHOST PAGE
// SEO authority signal - redirects to main experience
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Learn Cosmology | The Universe',
  description: 'Explore the origins and evolution of the universe, from the Big Bang 13.8 billion years ago to the ultimate fate of the cosmos.',
};

export default function CosmologyPage() {
  redirect('/');
}

// ═══════════════════════════════════════════════════════════════════════════
// LEARN BASE GHOST PAGE
// SEO authority signal for educational topics - redirects to main experience
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Learn Astronomy & Space Science | The Universe',
  description: 'Explore comprehensive educational content on astronomy, cosmology, stellar evolution, galaxy formation, planetary science, and space exploration.',
};

export default function LearnPage() {
  redirect('/');
}

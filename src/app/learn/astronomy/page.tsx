// ═══════════════════════════════════════════════════════════════════════════
// ASTRONOMY TOPIC GHOST PAGE
// SEO authority signal - redirects to main experience
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Learn Astronomy | The Universe',
  description: 'Master astronomy fundamentals through interactive 3D visualization of cosmic phenomena, from stellar evolution to galactic dynamics.',
};

export default function AstronomyPage() {
  redirect('/');
}

// ═══════════════════════════════════════════════════════════════════════════
// SPACE EXPLORATION TOPIC GHOST PAGE
// SEO authority signal - redirects to main experience
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Learn Space Exploration | The Universe',
  description: 'Follow humanity\'s journey into space through NASA missions, space telescopes, and future exploration of our solar system and beyond.',
};

export default function SpaceExplorationPage() {
  redirect('/');
}

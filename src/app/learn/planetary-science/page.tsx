// ═══════════════════════════════════════════════════════════════════════════
// PLANETARY SCIENCE TOPIC GHOST PAGE
// SEO authority signal - redirects to main experience
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Learn Planetary Science | The Universe',
  description: 'Study planetary formation, solar system dynamics, and the search for habitable worlds across our galaxy and beyond.',
};

export default function PlanetarySciencePage() {
  redirect('/');
}

// ═══════════════════════════════════════════════════════════════════════════
// GALAXY FORMATION TOPIC GHOST PAGE
// SEO authority signal - redirects to main experience
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Learn Galaxy Formation | The Universe',
  description: 'Discover how galaxies form and evolve over billions of years, from primordial density fluctuations to mature spiral and elliptical structures.',
};

export default function GalaxyFormationPage() {
  redirect('/');
}

// ═══════════════════════════════════════════════════════════════════════════
// STELLAR EVOLUTION TOPIC GHOST PAGE
// SEO authority signal - redirects to main experience
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Learn Stellar Evolution | The Universe',
  description: 'Understand the complete lifecycle of stars, from birth in molecular clouds to death as white dwarfs, neutron stars, or black holes.',
};

export default function StellarEvolutionPage() {
  redirect('/');
}

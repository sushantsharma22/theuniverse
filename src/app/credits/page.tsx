// ═══════════════════════════════════════════════════════════════════════════
// CREDITS GHOST PAGE
// SEO authority signal - redirects to main experience
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Credits & Data Sources | The Universe',
  description: 'All astronomical imagery and data sourced from NASA, Hubble Space Telescope, James Webb Space Telescope, and the Event Horizon Telescope Collaboration.',
};

export default function CreditsPage() {
  redirect('/');
}

// ═══════════════════════════════════════════════════════════════════════════
// JOURNEY GHOST PAGE
// SEO authority signal - redirects to main experience
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Interactive Cosmic Journey | The Universe',
  description: 'Begin your immersive journey through 13.8 billion years of cosmic history, from the Big Bang to wormholes.',
};

export default function JourneyPage() {
  redirect('/');
}

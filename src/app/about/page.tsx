// ═══════════════════════════════════════════════════════════════════════════
// ABOUT GHOST PAGE
// SEO authority signal - redirects to main experience
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'About The Universe Project | Scientific Space Education',
  description: 'Learn about our mission to provide scientifically accurate astronomy education through immersive 3D visualization powered by NASA data.',
};

export default function AboutPage() {
  redirect('/');
}

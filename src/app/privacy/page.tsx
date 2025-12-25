// ═══════════════════════════════════════════════════════════════════════════
// PRIVACY GHOST PAGE
// SEO authority signal - redirects to main experience
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Privacy Policy | The Universe',
  description: 'Privacy policy for The Universe educational astronomy platform. We respect your privacy and do not collect personal data.',
};

export default function PrivacyPage() {
  redirect('/');
}

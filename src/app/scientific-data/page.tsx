// ═══════════════════════════════════════════════════════════════════════════
// SCIENTIFIC DATA AUTHORITY PAGE
// Signals educational datasets to search engines, redirects users to main experience
// Prevents soft 404 errors while maintaining SEO authority
// ═══════════════════════════════════════════════════════════════════════════

import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Scientific Astronomy Datasets | The Universe',
  description: 'Access comprehensive astronomical data for all 13 cosmic landmarks, including distance measurements, classifications, and verified scientific descriptions from NASA Open Data.',
};

export default function DataPage() {
  redirect('/');
}

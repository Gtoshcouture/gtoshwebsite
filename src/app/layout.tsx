import type { Metadata } from 'next';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

export const metadata: Metadata = {
  title: 'GTOSH — Sculpted Energy',
  description: 'GTOSH explores form, movement, and structure through wearable design.',
  openGraph: { title: 'GTOSH — Sculpted Energy', description: 'Sculptural fashion. Minimal but bold.', url: 'https://gtosh.com', siteName: 'GTOSH', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

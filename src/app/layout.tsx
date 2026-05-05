import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'GTOSH — Sculpted Energy',
  description: 'GTOSH explores form, movement, and structure through wearable design. Sculptural fashion for those who notice everything.',
  openGraph: {
    title: 'GTOSH — Sculpted Energy',
    description: 'Sculptural fashion. Minimal but bold.',
    url: 'https://gtosh.com',
    siteName: 'GTOSH',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

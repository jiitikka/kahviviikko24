import type { Metadata } from 'next';
import { bricolage, literata } from '@/app/fonts';
import './globals.css';
import ConsentProvider from './components/consent/ConsentProvider';

export const metadata: Metadata = {
  // The apex redirects to www, so absolute URLs and canonicals resolve there.
  metadataBase: new URL('https://www.tampereenkahviviikko.fi'),
  title: 'Tampereen kahviviikko 1.–11.10.2026',
  description:
    'Tampereen kahviviikko 1.–11.10.2026: 18 kahvilaa, kahviaiheisia tapahtumia ja epäkantiskortti, jolla joka viides kahvi on ilmainen.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tampereen kahviviikko 1.–11.10.2026',
    description:
      'Parempaa kahvia kansalle. 18 kahvilaa, tapahtumia ja epäkantiskortti — joka viides kahvi on ilmainen.',
    url: '/',
    siteName: 'Tampereen kahviviikko',
    locale: 'fi_FI',
    type: 'website',
  },
  verification: {
    google: 'fJTi1kgCeV0uuPKqLrrQxaHfU7JZoXZCMZoxa6ue1mE',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" className={`${bricolage.variable} ${literata.variable}`}>
      <body>
        <a href="#sisalto" className="tkv-skip-link">
          Siirry sisältöön
        </a>
        <ConsentProvider>{children}</ConsentProvider>
      </body>
    </html>
  );
}

import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://tools.digitalivez.com'),
  title: { default: 'Digitalivez Tools | Free Business Calculators & Online Tools', template: '%s | Digitalivez Tools' },
  description: 'Free, practical business calculators and online tools for freelancers, small businesses, and independent professionals. Smarter tools. Better business decisions.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Digitalivez Tools | Free Business Calculators & Online Tools', description: 'Free, practical business tools for clearer everyday decisions.', url: 'https://tools.digitalivez.com/', siteName: 'Digitalivez Tools', type: 'website' },
  twitter: { card: 'summary', title: 'Digitalivez Tools | Free Business Calculators & Online Tools', description: 'Free, practical business tools for clearer everyday decisions.' },
  applicationName: 'Digitalivez Tools',
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f8f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [{ '@type': 'Organization', '@id': 'https://tools.digitalivez.com/#organization', name: 'Digitalivez Tools', url: 'https://tools.digitalivez.com/' }, { '@type': 'WebSite', '@id': 'https://tools.digitalivez.com/#website', name: 'Digitalivez Tools', url: 'https://tools.digitalivez.com/', publisher: { '@id': 'https://tools.digitalivez.com/#organization' }, inLanguage: 'en' }] }).replace(/</g, '\\u003c') }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

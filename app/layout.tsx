import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import StructuredData from '@/components/StructuredData'
import CustomCursor from '@/components/CustomCursor'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import PerformanceOptimizer from '@/components/PerformanceOptimizer'
import config from '@/lib/config'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const sora = Sora({ 
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nexora-agenceweb.fr'),
  title: {
    default: 'Nexora - Sites web propulsés par l\'IA',
    template: '%s | Nexora'
  },
  description: 'Des sites web propulsés par l\'IA, beaux, rapides et accessibles à tous. Création express de sites modernes, e-commerce et applications web. +300 clients satisfaits.',
  keywords: [
    'site web',
    'création site',
    'IA',
    'développement web',
    'site vitrine',
    'e-commerce',
    'one page',
    'application web',
    'développeur web',
    'agence web',
    'création site internet',
    'site professionnel',
    'web design',
    'responsive design',
    'SEO',
    'référencement'
  ],
  authors: [{ name: 'Nexora', url: 'https://nexora-agenceweb.fr' }],
  creator: 'Nexora',
  publisher: 'Nexora',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://nexora-agenceweb.fr',
    title: 'Nexora - Sites web propulsés par l\'IA',
    description: 'Des sites web propulsés par l\'IA, beaux, rapides et accessibles à tous. +300 clients satisfaits.',
    siteName: 'Nexora',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexora - Sites web propulsés par l\'IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexora - Sites web propulsés par l\'IA',
    description: 'Des sites web propulsés par l\'IA, beaux, rapides et accessibles à tous. +300 clients satisfaits.',
    images: ['/og-image.jpg'],
    creator: '@nexora',
  },
  alternates: {
    canonical: 'https://nexora-agenceweb.fr',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable}`} data-theme="dark">
      <head>
        <StructuredData type="organization" data={{}} />
        <StructuredData type="website" data={{}} />
        <StructuredData type="localBusiness" data={{}} />
        <StructuredData type="softwareApplication" data={{}} />
        <GoogleAnalytics GA_TRACKING_ID={config.analytics.googleAnalyticsId} />
      </head>
      <body className="font-sans">
        <Navigation />
        <main className="pt-18">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <CustomCursor enabled={true} trail={true} magnetic={true} />
        <PerformanceOptimizer />
      </body>
    </html>
  )
}

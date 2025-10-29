import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://nexora.fr'),
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
  authors: [{ name: 'Nexora', url: 'https://nexora.fr' }],
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
    url: 'https://nexora.fr',
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
    canonical: 'https://nexora.fr',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
}

export const generatePageMetadata = (
  title: string,
  description: string,
  path: string,
  keywords?: string[]
): Metadata => ({
  ...defaultMetadata,
  title,
  description,
  keywords: keywords ? [...(defaultMetadata.keywords as string[]), ...keywords] : defaultMetadata.keywords,
  openGraph: {
    ...defaultMetadata.openGraph,
    title,
    description,
    url: `https://nexora.fr${path}`,
  },
  alternates: {
    canonical: `https://nexora.fr${path}`,
  },
})

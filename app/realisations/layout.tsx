import type { Metadata } from 'next'
import config from '@/lib/config'

export const metadata: Metadata = {
  title: 'Nos Réalisations - Portfolio de Sites Web',
  description: `Découvrez nos réalisations : sites web modernes, e-commerce, applications web. Portfolio de +300 projets réussis. Mariage Parfait, Loomeo, Fred Kross et bien d'autres.`,
  keywords: [
    'portfolio nexora',
    'réalisations sites web',
    'exemples sites web',
    'portfolio agence web',
    'projets sites internet',
    'cas clients sites web'
  ],
  openGraph: {
    title: 'Nos Réalisations - Portfolio de Sites Web',
    description: 'Découvrez nos réalisations : sites web modernes, e-commerce, applications web. Portfolio de +300 projets réussis.',
    url: `${config.company.website}/realisations`,
  },
  alternates: {
    canonical: `${config.company.website}/realisations`,
  },
}

export default function RealisationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
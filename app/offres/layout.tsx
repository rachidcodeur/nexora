import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Offres - Nexora',
  description: 'Découvrez nos packs de création de sites web : One Page (249€), Site Vitrine 5 pages (499€), E-commerce 20 produits (799€). Livraison rapide avec l\'IA.',
}

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

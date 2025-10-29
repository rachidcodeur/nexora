import type { Metadata } from 'next'
import config from '@/lib/config'

export const metadata: Metadata = {
  title: 'Nos Offres - Sites Web Propulsés par l\'IA',
  description: `Découvrez nos offres de création de sites web : One Page (${config.offers.onePage.price}€), Site Vitrine 5 pages (${config.offers.vitrine.price}€), E-commerce 20 produits (${config.offers.ecommerce.price}€), Application web (${config.offers.application.price}€). Propulsés par l'IA, livrés en 48h.`,
  keywords: [
    'offres site web',
    'prix site internet',
    'création site one page',
    'site vitrine prix',
    'e-commerce prix',
    'application web prix',
    'site web pas cher',
    'création site rapide'
  ],
  openGraph: {
    title: 'Nos Offres - Sites Web Propulsés par l\'IA',
    description: `Découvrez nos offres de création de sites web : One Page (${config.offers.onePage.price}€), Site Vitrine 5 pages (${config.offers.vitrine.price}€), E-commerce 20 produits (${config.offers.ecommerce.price}€), Application web (${config.offers.application.price}€).`,
    url: `${config.company.website}/offres`,
  },
  alternates: {
    canonical: `${config.company.website}/offres`,
  },
}

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

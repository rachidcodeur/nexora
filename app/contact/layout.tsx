import type { Metadata } from 'next'
import config from '@/lib/config'

export const metadata: Metadata = {
  title: 'Contact - Demandez Votre Devis Gratuit',
  description: `Contactez ${config.company.name} pour votre projet de site web. Devis gratuit en 24h. Téléphone: ${config.company.phone}, email: ${config.company.email}. +300 clients satisfaits. Création de sites web propulsés par l'IA.`,
  keywords: [
    'contact nexora',
    'devis site web gratuit',
    'création site web contact',
    'agence web contact',
    'développeur web contact',
    'devis gratuit site internet'
  ],
  openGraph: {
    title: 'Contact - Demandez Votre Devis Gratuit',
    description: `Contactez ${config.company.name} pour votre projet de site web. Devis gratuit en 24h. +300 clients satisfaits.`,
    url: `${config.company.website}/contact`,
  },
  alternates: {
    canonical: `${config.company.website}/contact`,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
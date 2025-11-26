import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Connexion - Nexora',
  description: 'Connectez-vous à votre compte Nexora pour accéder à vos commandes et factures.',
}

export default function ConnexionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


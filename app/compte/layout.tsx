import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mon Compte - Nexora',
  description: 'Gérez vos commandes, téléchargez vos factures et demandez des remboursements.',
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


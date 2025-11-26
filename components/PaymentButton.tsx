'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import Button from './Button'
import { ArrowRight, CreditCard } from 'lucide-react'

interface PaymentButtonProps {
  offerId: string
  offerName: string
  price: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function PaymentButton({
  offerId,
  offerName,
  price,
  className = '',
  size = 'lg',
}: PaymentButtonProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [processing, setProcessing] = useState(false)

  const handlePayment = async () => {
    // Vérifier l'utilisateur au moment du clic (au cas où loading serait bloqué)
    let currentUser = user
    
    // Si l'utilisateur n'est pas disponible, essayer de le récupérer directement
    if (!currentUser) {
      try {
        const { data: { user: fetchedUser }, error } = await supabase.auth.getUser()
        if (!error && fetchedUser) {
          currentUser = fetchedUser
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error)
      }
    }

    if (!currentUser) {
      // Rediriger vers la page de connexion en mode inscription
      // pour faciliter la création de compte avant le paiement
      console.log('🔄 [PaymentButton] Utilisateur non connecté, redirection vers la page de connexion')
      const redirectUrl = `/connexion?mode=register&redirect=payment&offerId=${encodeURIComponent(offerId)}`
      console.log('🔄 [PaymentButton] URL de redirection:', redirectUrl)
      // Utiliser window.location.href pour forcer la navigation
      window.location.href = redirectUrl
      return
    }

    setProcessing(true)

    try {
      console.log('🔄 [PaymentButton] Début de la création de la session checkout', { offerId, userId: currentUser.id })
      
      // Créer la session de checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offerId,
          userId: currentUser.id,
        }),
      })

      console.log('📡 [PaymentButton] Réponse reçue:', { status: response.status, ok: response.ok })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur HTTP ' + response.status }))
        console.error('❌ [PaymentButton] Erreur API checkout:', errorData)
        const errorMessage = errorData.error || errorData.message || `Erreur ${response.status}: ${response.statusText}`
        const details = errorData.details ? `\n\nDétails: ${errorData.details}` : ''
        alert(`Erreur lors de la création de la session de paiement:\n\n${errorMessage}${details}\n\nVérifiez la console du navigateur (F12) pour plus de détails.`)
        setProcessing(false)
        return
      }

      const data = await response.json()
      console.log('📦 [PaymentButton] Données reçues:', { hasUrl: !!data.url, hasError: !!data.error, data })

      if (data.error) {
        console.error('❌ [PaymentButton] Erreur dans la réponse:', data)
        const errorMessage = data.error || 'Erreur inconnue'
        const details = data.details ? `\n\nDétails: ${data.details}` : ''
        alert(`Erreur lors de la création de la session de paiement:\n\n${errorMessage}${details}\n\nVérifiez la console du navigateur (F12) pour plus de détails.`)
        setProcessing(false)
        return
      }

      if (!data.url) {
        console.error('❌ [PaymentButton] URL de session manquant dans la réponse:', data)
        alert(`Erreur: URL de session manquant. Réponse reçue: ${JSON.stringify(data)}`)
        setProcessing(false)
        return
      }

      // Vérifier que l'URL est valide
      if (typeof data.url !== 'string' || !data.url.startsWith('http')) {
        console.error('❌ [PaymentButton] URL invalide:', data.url)
        alert(`Erreur: URL de session invalide: ${data.url}`)
        setProcessing(false)
        return
      }

      // Rediriger directement vers l'URL de la session Stripe
      // Utiliser window.location.replace() pour éviter que l'utilisateur puisse revenir en arrière
      console.log('🔄 [PaymentButton] Redirection vers Stripe Checkout:', data.url)
      try {
        window.location.replace(data.url)
      } catch (redirectError) {
        console.error('❌ [PaymentButton] Erreur lors de la redirection:', redirectError)
        // Fallback: utiliser window.location.href
        window.location.href = data.url
      }
    } catch (error) {
      console.error('❌ [PaymentButton] Erreur lors de la création de la session:', error)
      alert(`Erreur lors de la création de la session de paiement: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
      setProcessing(false)
    }
  }

  return (
    <>
      <Button
        onClick={handlePayment}
        variant="primary"
        size={size}
        className={className}
        disabled={processing}
      >
        {processing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Traitement...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Payer {price}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, signOut } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import AuthModal from '@/components/AuthModal'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { 
  Package, 
  Download, 
  RefreshCw, 
  LogOut, 
  User as UserIcon,
  Calendar,
  Euro,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'

interface Order {
  id: string
  offer_name: string
  amount: number
  currency: string
  status: string
  created_at: string
  refunded_at: string | null
  stripe_payment_intent_id: string | null
}

export default function AccountPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [refundingOrderId, setRefundingOrderId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthModal(true)
    }
  }, [user, loading])

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  // Rafraîchir les commandes quand on arrive depuis un paiement réussi
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')
    
    if (params.get('success') === 'true' && user) {
      // Si on a un session_id, synchroniser la commande (solution de secours si webhook n'a pas fonctionné)
      if (sessionId) {
        console.log('🔄 [COMPTE] Synchronisation de la commande pour session:', sessionId)
        fetch('/api/orders/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            userId: user.id,
          }),
        })
          .then(res => res.json())
          .then(data => {
            console.log('📦 [COMPTE] Résultat de la synchronisation:', data)
            // Attendre un peu puis rafraîchir les commandes
            setTimeout(() => {
              fetchOrders()
            }, 1000)
          })
          .catch(error => {
            console.error('❌ [COMPTE] Erreur lors de la synchronisation:', error)
            // Rafraîchir quand même les commandes
            setTimeout(() => {
              fetchOrders()
            }, 2000)
          })
      } else {
        // Attendre un peu pour laisser le temps au webhook de s'exécuter
        setTimeout(() => {
          fetchOrders()
        }, 2000)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    // Vérifier les paramètres URL pour les messages de succès/échec
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      setSuccessMessage('Paiement effectué avec succès !')
      // Nettoyer l'URL après un délai pour laisser le temps à la synchronisation
      setTimeout(() => {
        window.history.replaceState({}, '', '/compte')
      }, 3000)
      // Masquer le message après 5 secondes
      setTimeout(() => setSuccessMessage(null), 5000)
    }
    if (params.get('canceled') === 'true') {
      setSuccessMessage('Paiement annulé. Vous pouvez réessayer à tout moment.')
      window.history.replaceState({}, '', '/compte')
      setTimeout(() => setSuccessMessage(null), 5000)
    }
  }, [])

  const fetchOrders = async () => {
    if (!user) return

    try {
      console.log('🔍 [COMPTE] Récupération des commandes pour user:', user.id)
      const { data, error } = await supabase
        .from('nexora_orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ [COMPTE] Erreur lors de la récupération des commandes:', error)
        throw error
      }
      
      console.log('✅ [COMPTE] Commandes récupérées:', data?.length || 0, data)
      setOrders(data || [])
    } catch (error) {
      console.error('❌ [COMPTE] Erreur lors de la récupération des commandes:', error)
    } finally {
      setOrdersLoading(false)
    }
  }

  const handleDownloadInvoice = async (orderId: string) => {
    if (!user) return

    try {
      // Ouvrir la facture PDF en français dans un nouvel onglet
      const invoiceUrl = `/api/invoice/pdf?orderId=${orderId}&userId=${user.id}`
      const newWindow = window.open(invoiceUrl, '_blank')
      
      // Si la fenêtre s'ouvre, attendre un peu puis déclencher l'impression PDF
      if (newWindow) {
        setTimeout(() => {
          newWindow.print()
        }, 500)
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement de la facture:', error)
      alert('Erreur lors du téléchargement de la facture')
    }
  }

  const handleRefund = async (orderId: string) => {
    if (!user) return
    if (!confirm('Êtes-vous sûr de vouloir demander un remboursement pour cette commande ?')) {
      return
    }

    setRefundingOrderId(orderId)

    try {
      const response = await fetch('/api/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          userId: user.id,
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert('Remboursement effectué avec succès')
        fetchOrders() // Rafraîchir la liste
      } else {
        alert(data.error || 'Erreur lors du remboursement')
      }
    } catch (error) {
      console.error('Erreur lors du remboursement:', error)
      alert('Erreur lors du remboursement')
    } finally {
      setRefundingOrderId(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'refunded':
        return <RefreshCw className="w-5 h-5 text-orange-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminée'
      case 'refunded':
        return 'Remboursée'
      case 'failed':
        return 'Échouée'
      default:
        return 'En attente'
    }
  }

  if (loading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
          <p className="text-text-2">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => {
            setShowAuthModal(false)
            router.push('/')
          }}
        />
      </>
    )
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: '150px' }}>
      <section className="section">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Mon Compte</h1>
                <p className="text-text-2">
                  Bienvenue, {user.user_metadata?.name || user.email}
                </p>
              </div>
              <Button
                onClick={async () => {
                  await signOut()
                }}
                variant="secondary"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-brand/20 border border-brand/50 rounded-lg text-brand">
              {successMessage}
            </div>
          )}

          {/* User Info */}
          <Card className="p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-brand" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {user.user_metadata?.name || 'Utilisateur'}
                </h3>
                <p className="text-text-2">{user.email}</p>
              </div>
            </div>
          </Card>

          {/* Orders Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Package className="w-6 h-6 mr-2 text-brand" />
                Mes Commandes
              </h2>
              <Button
                onClick={fetchOrders}
                variant="secondary"
                size="sm"
                disabled={ordersLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${ordersLoading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
            </div>

            {orders.length === 0 ? (
              <Card className="p-12 text-center">
                <Package className="w-16 h-16 text-text-2 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Aucune commande</h3>
                <p className="text-text-2 mb-6">
                  Vous n'avez pas encore de commandes.
                </p>
                <Button href="/offres" variant="primary">
                  Voir les offres
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-6" hover>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusIcon(order.status)}
                          <h3 className="text-xl font-semibold">
                            {order.offer_name}
                          </h3>
                          <span className="px-3 py-1 bg-surface-2 rounded-full text-sm">
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-2">
                          <div className="flex items-center space-x-2">
                            <Euro className="w-4 h-4" />
                            <span className="font-semibold text-white">
                              {formatPrice(order.amount, order.currency)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(order.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        {order.status === 'completed' && (
                          <>
                            <Button
                              onClick={() => handleDownloadInvoice(order.id)}
                              variant="secondary"
                              size="sm"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Facture
                            </Button>
                            <Button
                              onClick={() => handleRefund(order.id)}
                              variant="secondary"
                              size="sm"
                              disabled={refundingOrderId === order.id}
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              {refundingOrderId === order.id
                                ? 'Traitement...'
                                : 'Remboursement'}
                            </Button>
                          </>
                        )}
                        {order.status === 'refunded' && order.refunded_at && (
                          <div className="text-sm text-text-2">
                            Remboursé le {formatDate(order.refunded_at)}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}


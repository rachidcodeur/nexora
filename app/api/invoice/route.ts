import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const orderId = searchParams.get('orderId')
    const userId = searchParams.get('userId')

    if (!orderId || !userId) {
      return NextResponse.json(
        { error: 'orderId et userId sont requis' },
        { status: 400 }
      )
    }

    // Vérifier que la commande appartient à l'utilisateur
    const { data: order, error: orderError } = await supabaseAdmin
      .from('nexora_orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', userId)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      )
    }

    if (!order.stripe_payment_intent_id) {
      return NextResponse.json(
        { error: 'Payment Intent non trouvé pour cette commande' },
        { status: 400 }
      )
    }

    // Récupérer le payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(
      order.stripe_payment_intent_id
    )

    // Récupérer les charges associées
    const charges = await stripe.charges.list({
      payment_intent: order.stripe_payment_intent_id,
      limit: 1,
    })

    if (charges.data.length === 0) {
      return NextResponse.json(
        { error: 'Charge non trouvée' },
        { status: 404 }
      )
    }

    const charge = charges.data[0]

    // Générer une facture PDF via Stripe
    // Note: Stripe génère automatiquement des factures pour les paiements réussis
    // Vous pouvez récupérer l'URL de la facture depuis le dashboard Stripe
    // ou utiliser l'API Stripe Invoicing pour créer des factures personnalisées

    // Pour l'instant, retournons les informations de la charge
    // L'utilisateur peut télécharger la facture depuis le dashboard Stripe
    const invoiceUrl = charge.receipt_url || `https://dashboard.stripe.com/payments/${charge.id}`

    return NextResponse.json({
      invoiceUrl,
      chargeId: charge.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      createdAt: order.created_at,
    })
  } catch (error: any) {
    console.error('Erreur lors de la récupération de la facture:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la récupération de la facture' },
      { status: 500 }
    )
  }
}


import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: Request) {
  try {
    const { orderId, userId } = await req.json()

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

    if (order.status === 'refunded') {
      return NextResponse.json(
        { error: 'Cette commande a déjà été remboursée' },
        { status: 400 }
      )
    }

    if (!order.stripe_payment_intent_id) {
      return NextResponse.json(
        { error: 'Payment Intent non trouvé pour cette commande' },
        { status: 400 }
      )
    }

    // Créer le remboursement via Stripe
    const refund = await stripe.refunds.create({
      payment_intent: order.stripe_payment_intent_id,
      reason: 'requested_by_customer',
    })

    // Mettre à jour le statut de la commande
    const { error: updateError } = await supabaseAdmin
      .from('nexora_orders')
      .update({
        status: 'refunded',
        refunded_at: new Date().toISOString(),
        stripe_refund_id: refund.id,
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('Erreur lors de la mise à jour de la commande:', updateError)
    }

    return NextResponse.json({
      success: true,
      refundId: refund.id,
      message: 'Remboursement effectué avec succès',
    })
  } catch (error: any) {
    console.error('Erreur lors du remboursement:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur lors du remboursement' },
      { status: 500 }
    )
  }
}


import { NextResponse } from 'next/server'
import { stripe, OFFER_PRICES, OFFER_NAMES } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { sessionId, userId } = body

    if (!sessionId || !userId) {
      return NextResponse.json(
        { error: 'sessionId et userId sont requis' },
        { status: 400 }
      )
    }

    console.log('🔄 [SYNC] Synchronisation de la commande:', { sessionId, userId })

    // Vérifier si la commande existe déjà
    const { data: existingOrder } = await supabaseAdmin
      .from('nexora_orders')
      .select('id')
      .eq('stripe_session_id', sessionId)
      .single()

    if (existingOrder) {
      console.log('✅ [SYNC] Commande déjà existante:', existingOrder.id)
      return NextResponse.json({ 
        success: true, 
        message: 'Commande déjà synchronisée',
        orderId: existingOrder.id 
      })
    }

    // Récupérer les détails de la session Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    })

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Le paiement n\'est pas encore complété' },
        { status: 400 }
      )
    }

    const userIdFromMetadata = session.metadata?.userId
    const offerId = session.metadata?.offerId
    const offerName = session.metadata?.offerName

    if (!userIdFromMetadata || !offerId) {
      console.error('❌ [SYNC] Métadonnées manquantes:', session.metadata)
      return NextResponse.json(
        { error: 'Métadonnées de session manquantes' },
        { status: 400 }
      )
    }

    // Vérifier que l'utilisateur correspond
    if (userIdFromMetadata !== userId) {
      return NextResponse.json(
        { error: 'L\'utilisateur ne correspond pas à la session' },
        { status: 403 }
      )
    }

    const paymentIntentId = session.payment_intent 
      ? (typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent.id)
      : null

    // Créer la commande
    const { data: insertedOrder, error: insertError } = await supabaseAdmin
      .from('nexora_orders')
      .insert({
        user_id: userId,
        stripe_session_id: sessionId,
        stripe_payment_intent_id: paymentIntentId,
        offer_id: offerId,
        offer_name: offerName || OFFER_NAMES[offerId] || 'Offre inconnue',
        amount: session.amount_total || 0,
        currency: session.currency || 'eur',
        status: 'completed',
        customer_email: session.customer_email || null,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      console.error('❌ [SYNC] Erreur lors de l\'insertion:', insertError)
      return NextResponse.json(
        { error: 'Erreur lors de la création de la commande', details: insertError.message },
        { status: 500 }
      )
    }

    console.log('✅ [SYNC] Commande créée avec succès:', insertedOrder.id)
    return NextResponse.json({ 
      success: true, 
      message: 'Commande synchronisée avec succès',
      orderId: insertedOrder.id 
    })
  } catch (error: any) {
    console.error('❌ [SYNC] Erreur:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la synchronisation' },
      { status: 500 }
    )
  }
}


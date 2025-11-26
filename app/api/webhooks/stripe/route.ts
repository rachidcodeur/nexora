import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  try {
    console.log('📥 [WEBHOOK] Événement reçu:', event.type, event.id)
    
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        console.log('✅ [WEBHOOK] checkout.session.completed pour session:', session.id)
        console.log('📋 [WEBHOOK] Métadonnées de la session:', session.metadata)
        console.log('💰 [WEBHOOK] Montant:', session.amount_total, session.currency)
        console.log('📧 [WEBHOOK] Email client:', session.customer_email)

        // Récupérer les métadonnées
        const userId = session.metadata?.userId
        const offerId = session.metadata?.offerId
        const offerName = session.metadata?.offerName

        if (!userId || !offerId) {
          console.error('❌ [WEBHOOK] Missing metadata in session:', {
            sessionId: session.id,
            userId,
            offerId,
            metadata: session.metadata,
          })
          break
        }
        
        console.log('✅ [WEBHOOK] Métadonnées valides:', { userId, offerId, offerName })

        // Récupérer le payment intent pour obtenir plus d'informations
        const paymentIntentId = session.payment_intent as string
        let paymentIntent: Stripe.PaymentIntent | null = null

        if (paymentIntentId) {
          paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
        }

        // Créer l'enregistrement de commande dans Supabase
        console.log('📦 [WEBHOOK] Création de la commande:', {
          userId,
          offerId,
          offerName,
          amount: session.amount_total,
          sessionId: session.id,
        })

        const { data: insertedOrder, error: insertError } = await supabaseAdmin
          .from('nexora_orders')
          .insert({
            user_id: userId,
            stripe_session_id: session.id,
            stripe_payment_intent_id: paymentIntentId || null,
            offer_id: offerId,
            offer_name: offerName,
            amount: session.amount_total, // en centimes
            currency: session.currency || 'eur',
            status: 'completed',
            customer_email: session.customer_email || null,
            created_at: new Date().toISOString(),
          })
          .select()

        if (insertError) {
          console.error('❌ [WEBHOOK] Erreur lors de l\'insertion de la commande:', insertError)
          console.error('Détails:', {
            code: insertError.code,
            message: insertError.message,
            details: insertError.details,
            hint: insertError.hint,
          })
        } else {
          console.log('✅ [WEBHOOK] Commande créée avec succès:', insertedOrder?.[0]?.id)
        }

        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('PaymentIntent succeeded:', paymentIntent.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('PaymentIntent failed:', paymentIntent.id)
        
        // Mettre à jour le statut de la commande si elle existe
        if (paymentIntent.metadata?.sessionId) {
          await supabaseAdmin
            .from('nexora_orders')
            .update({ status: 'failed' })
            .eq('stripe_session_id', paymentIntent.metadata.sessionId)
        }
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const paymentIntentId = charge.payment_intent as string

        if (paymentIntentId) {
          // Mettre à jour le statut de la commande
          await supabaseAdmin
            .from('nexora_orders')
            .update({ 
              status: 'refunded',
              refunded_at: new Date().toISOString(),
            })
            .eq('stripe_payment_intent_id', paymentIntentId)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Erreur lors du traitement du webhook:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}


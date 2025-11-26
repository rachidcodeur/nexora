import { NextResponse } from 'next/server'
import { stripe, OFFER_PRICES, OFFER_NAMES } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: Request) {
  console.log('🔵 [CHECKOUT] Début de la requête')
  try {
    // Vérifier les variables d'environnement
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ STRIPE_SECRET_KEY is not set')
      return NextResponse.json(
        { 
          error: 'Configuration Stripe manquante. Vérifiez que STRIPE_SECRET_KEY est définie dans votre fichier .env.local et redémarrez le serveur (npm run dev)',
          details: 'Les variables d\'environnement ne sont chargées qu\'au démarrage du serveur'
        },
        { status: 500 }
      )
    }
    console.log('✅ STRIPE_SECRET_KEY est définie')

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      console.error('❌ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set')
      return NextResponse.json(
        { 
          error: 'Configuration Stripe manquante. Vérifiez que NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY est définie dans votre fichier .env.local et redémarrez le serveur',
          details: 'Les variables d\'environnement ne sont chargées qu\'au démarrage du serveur'
        },
        { status: 500 }
      )
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase configuration is missing')
      return NextResponse.json(
        { error: 'Configuration Supabase manquante. Vérifiez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { offerId, userId } = body
    
    console.log('📦 [CHECKOUT] Paramètres reçus:', { offerId, userId: userId ? `${userId.substring(0, 8)}...` : 'manquant' })

    if (!offerId || !userId) {
      console.error('❌ Missing parameters:', { offerId, userId })
      return NextResponse.json(
        { error: 'offerId et userId sont requis' },
        { status: 400 }
      )
    }

    const price = OFFER_PRICES[offerId]
    const offerName = OFFER_NAMES[offerId]

    console.log('💰 [CHECKOUT] Offre:', { offerId, offerName, price })

    if (!price || !offerName) {
      console.error('❌ Offer not found:', offerId)
      return NextResponse.json(
        { error: `Offre non trouvée: ${offerId}` },
        { status: 404 }
      )
    }

    // Récupérer les informations de l'utilisateur
    let userData, userError
    try {
      const result = await supabaseAdmin.auth.admin.getUserById(userId)
      userData = result.data
      userError = result.error
    } catch (err: any) {
      console.error('Erreur Supabase auth.admin.getUserById:', err)
      return NextResponse.json(
        { error: `Erreur lors de la récupération de l'utilisateur: ${err.message}` },
        { status: 500 }
      )
    }
    
    if (userError || !userData?.user) {
      console.error('User not found:', userError)
      return NextResponse.json(
        { error: `Utilisateur non trouvé: ${userError?.message || 'Utilisateur introuvable'}` },
        { status: 404 }
      )
    }

    const userEmail = userData.user.email
    if (!userEmail) {
      console.error('❌ User email is missing')
      return NextResponse.json(
        { error: 'Email utilisateur manquant' },
        { status: 400 }
      )
    }

    const userName = userData.user.user_metadata?.name || userEmail
    console.log('👤 [CHECKOUT] Utilisateur:', { email: userEmail, name: userName })

    // Vérifier que Stripe est initialisé
    if (!stripe) {
      console.error('❌ Stripe n\'est pas initialisé')
      return NextResponse.json(
        { 
          error: 'Stripe n\'est pas initialisé. Vérifiez STRIPE_SECRET_KEY dans .env.local et redémarrez le serveur',
          details: 'Les variables d\'environnement ne sont chargées qu\'au démarrage du serveur'
        },
        { status: 500 }
      )
    }
    console.log('✅ Stripe est initialisé')

    // Créer la session de checkout Stripe
    console.log('🔄 [CHECKOUT] Création de la session Stripe...')
    let session
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: offerName,
                description: `Commande de ${offerName}`,
              },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/compte?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/offres?canceled=true`,
        customer_email: userEmail,
        metadata: {
          userId,
          offerId,
          offerName,
        },
      })
    } catch (stripeError: any) {
      console.error('❌ Erreur Stripe checkout.sessions.create:', stripeError)
      console.error('Type:', stripeError.type)
      console.error('Code:', stripeError.code)
      console.error('Message:', stripeError.message)
      return NextResponse.json(
        { 
          error: `Erreur Stripe: ${stripeError.message || 'Impossible de créer la session de paiement'}`,
          details: stripeError.type ? `Type: ${stripeError.type}, Code: ${stripeError.code || 'N/A'}` : undefined,
          stripeError: {
            type: stripeError.type,
            code: stripeError.code,
            message: stripeError.message,
          }
        },
        { status: 500 }
      )
    }

    if (!session || !session.id) {
      console.error('❌ Session créée mais ID manquant')
      return NextResponse.json(
        { error: 'Erreur: Session créée mais ID manquant' },
        { status: 500 }
      )
    }

    if (!session.url) {
      console.error('❌ Session créée mais URL manquante:', { sessionId: session.id, session })
      return NextResponse.json(
        { error: 'Erreur: URL de session Stripe manquante. La session a été créée mais l\'URL n\'est pas disponible.' },
        { status: 500 }
      )
    }

    console.log('✅ [CHECKOUT] Session créée avec succès:', { sessionId: session.id, url: session.url })
    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Erreur inattendue lors de la création de la session checkout:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création de la session' },
      { status: 500 }
    )
  }
}

